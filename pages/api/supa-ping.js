// pages/api/supa-ping.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const SERVICE =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    '';

  if (!URL || !SERVICE) {
    return res.status(500).json({
      ok: false,
      code: 'MISSING_ENVS',
      message: 'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE).',
    });
  }

  // Decode role to ensure it’s the service key
  try {
    const part = SERVICE.split('.')[1];
    if (part) {
      const decoded = JSON.parse(Buffer.from(part, 'base64').toString('utf8'));
      if (decoded?.role !== 'service_role') {
        return res.status(500).json({
          ok: false,
          code: 'WRONG_KEY',
          message: 'This is the ANON key. Paste the SERVICE ROLE key in your Vercel env.',
          details: { decodedRole: decoded?.role || null },
        });
      }
    }
  } catch {}

  try {
    const supabase = createClient(URL, SERVICE, { auth: { persistSession: false } });
    // simple, table-free call: use PostgREST RPC `now()` via SQL function emulation
    const { data, error } = await supabase.rpc('pg_catalog.now'); // will error on many setups
    // If the above errors (likely), fallback to a harmless select against pg settings
    if (error) {
      const { data: version, error: verErr } = await supabase.from('pg_settings').select('name').limit(1);
      if (verErr) {
        return res.status(500).json({
          ok: false,
          code: 'CONNECT_FAILED',
          message: verErr.message || error.message,
        });
      }
      return res.status(200).json({ ok: true, note: 'Connected to Supabase with service role.', via: 'pg_settings' });
    }
    return res.status(200).json({ ok: true, note: 'Connected to Supabase with service role.', via: 'rpc now()' });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      code: 'CLIENT_ERROR',
      message: e?.message || 'Unknown client error',
    });
  }
}
