// pages/api/raid-click.js
import { createClient } from '@supabase/supabase-js';

// ✅ Force Node runtime so Buffer/base64 etc. are available
export const config = { runtime: 'nodejs' };

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Accept either env var name so your current Vercel setup works
const SERVICE_ROLE =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE ||
  '';

const KEY = 'raid_clicks_global';

function send(res, status, obj) {
  try {
    res.status(status);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  } catch {}
  res.end(JSON.stringify(obj));
}

function decodeRole(token) {
  try {
    const part = token.split('.')[1];
    if (!part) return null;
    const json = Buffer.from(part, 'base64url').toString('utf8');
    return JSON.parse(json)?.role ?? null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const diag = req.query.diag === '1';

  // Quick diagnostics snapshot
  const diagInfo = {
    urlPresent: !!URL,
    serviceVarPresent: !!SERVICE_ROLE,
    serviceLen: SERVICE_ROLE.length,
    decodedRole: decodeRole(SERVICE_ROLE), // should be "service_role"
    method: req.method,
  };

  if (!URL || !SERVICE_ROLE) {
    return send(res, 500, {
      ok: false,
      code: 'MISSING_ENVS',
      message:
        'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE) in this environment.',
      diag: diag ? diagInfo : undefined,
    });
  }

  // Warn if the wrong key is set
  const role = diagInfo.decodedRole;
  if (role && role !== 'service_role') {
    return send(res, 500, {
      ok: false,
      code: 'WRONG_KEY',
      message:
        'You provided the ANON key. Paste the SERVICE ROLE key into SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE).',
      diag: diag ? diagInfo : undefined,
    });
  }

  const supabase = createClient(URL, SERVICE_ROLE, { auth: { persistSession: false } });

  try {
    if (req.method === 'GET') {
      // Read current total (table may not exist yet)
      const { data, error } = await supabase
        .from('counters')
        .select('total')
        .eq('k', KEY)
        .maybeSingle();

      if (error) {
        return send(res, 500, {
          ok: false,
          code: 'READ_FAILED',
          message: error.message,
          diag: diag ? diagInfo : undefined,
        });
      }

      return send(res, 200, {
        ok: true,
        total: data?.total ?? 0,
        diag: diag ? diagInfo : undefined,
      });
    }

    if (req.method === 'POST') {
      // Try RPC first; if missing, fall back to upsert + read + write
      const rpc = await supabase.rpc('raid_click_increment', { p_key: KEY });
      if (!rpc.error && typeof rpc.data !== 'undefined') {
        return send(res, 200, {
          ok: true,
          total: Number(rpc.data),
          used: 'rpc',
          diag: diag ? diagInfo : undefined,
        });
      }

      // Fallback path (works without the function)
      // Ensure row
      const up = await supabase
        .from('counters')
        .upsert({ k: KEY, total: 0 }, { onConflict: 'k' });
      if (up.error) {
        return send(res, 500, {
          ok: false,
          code: 'UPSERT_FAILED',
          message: up.error.message,
          diag: diag ? diagInfo : undefined,
        });
      }

      // Read current
      const rd = await supabase
        .from('counters')
        .select('total')
        .eq('k', KEY)
        .single();
      if (rd.error) {
        return send(res, 500, {
          ok: false,
          code: 'READ_AFTER_UPSERT_FAILED',
          message: rd.error.message,
          diag: diag ? diagInfo : undefined,
        });
      }

      // Increment and write
      const newTotal = (rd.data?.total ?? 0) + 1;
      const wr = await supabase
        .from('counters')
        .update({ total: newTotal })
        .eq('k', KEY)
        .select('total')
      .single();
      if (wr.error) {
        return send(res, 500, {
          ok: false,
          code: 'WRITE_FAILED',
          message: wr.error.message,
          diag: diag ? diagInfo : undefined,
        });
      }

      return send(res, 200, {
        ok: true,
        total: wr.data.total,
        used: 'fallback',
        diag: diag ? diagInfo : undefined,
      });
    }

    return send(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Use GET or POST' });
  } catch (e) {
    return send(res, 500, {
      ok: false,
      code: 'SERVER_ERROR',
      message: e?.message || 'Unknown error',
      diag: diag ? diagInfo : undefined,
    });
  }
}
