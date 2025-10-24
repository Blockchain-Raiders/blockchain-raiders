// pages/api/raid-click.js
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Accept either env name so your current Vercel setup works
const SERVICE_ROLE =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE;

const KEY = 'raid_clicks_global';

function noStore(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

function wrongKeyJson(res, decodedRole) {
  return res.status(500).json({
    code: 'WRONG_KEY',
    message:
      'You provided the ANON key. Paste the SERVICE ROLE key into SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE).',
    details: { decodedRole },
  });
}

export default async function handler(req, res) {
  noStore(res);

  if (!URL || !SERVICE_ROLE) {
    return res.status(500).json({
      code: 'MISSING_ENVS',
      message:
        'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE) in this environment.',
    });
  }

  // Detect anon key mistake
  try {
    const part = SERVICE_ROLE.split('.')[1];
    if (part) {
      const decoded = JSON.parse(Buffer.from(part, 'base64url').toString('utf8'));
      if (decoded?.role !== 'service_role') return wrongKeyJson(res, decoded?.role || null);
    }
  } catch {
    // ignore
  }

  const supabase = createClient(URL, SERVICE_ROLE, { auth: { persistSession: false } });

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('counters')
        .select('total')
        .eq('k', KEY)
        .maybeSingle();

      if (error) {
        return res.status(500).json({ code: 'READ_FAILED', message: error.message });
      }
      return res.status(200).json({ total: data?.total ?? 0 });
    }

    if (req.method === 'POST') {
      // 1) Try atomic RPC increment
      const { data, error } = await supabase.rpc('raid_click_increment', { p_key: KEY });

      if (!error) {
        return res.status(200).json({ total: Number(data) });
      }

      // 2) If RPC missing, do a safe two-step fallback (ensure row, then increment)
      if (/does not exist|function/i.test(error.message)) {
        // ensure row exists
        const { error: upsertErr } = await supabase
          .from('counters')
          .upsert({ k: KEY, total: 0 }, { onConflict: 'k' });
        if (upsertErr) {
          return res.status(500).json({ code: 'UPSERT_FAILED', message: upsertErr.message });
        }

        // read current
        const { data: current, error: readErr } = await supabase
          .from('counters')
          .select('total')
          .eq('k', KEY)
          .single();
        if (readErr) {
          return res.status(500).json({ code: 'READ_AFTER_UPSERT_FAILED', message: readErr.message });
        }

        // write incremented
        const newTotal = (current?.total ?? 0) + 1;
        const { data: updated, error: writeErr } = await supabase
          .from('counters')
          .update({ total: newTotal })
          .eq('k', KEY)
          .select('total')
          .single();
        if (writeErr) {
          return res.status(500).json({ code: 'WRITE_FAILED', message: writeErr.message });
        }

        return res.status(200).json({ total: updated.total });
      }

      // Other errors
      return res.status(500).json({
        code: 'INCREMENT_FAILED',
        message: error.message || 'Unknown increment error',
      });
    }

    return res.status(405).json({ code: 'METHOD_NOT_ALLOWED', message: 'Use GET or POST' });
  } catch (e) {
    return res.status(500).json({ code: 'SERVER_ERROR', message: e?.message || 'Unknown error' });
  }
}
