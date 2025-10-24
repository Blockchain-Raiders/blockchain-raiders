// pages/api/raid-click-debug.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Accept either env name so we can see what's actually set in Vercel
  const SERVICE_ROLE =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    '';

  // Try to decode the JWT to confirm it's the SERVICE ROLE token
  let decoded = null;
  try {
    const part = SERVICE_ROLE.split('.')[1];
    if (part) decoded = JSON.parse(Buffer.from(part, 'base64url').toString('utf8'));
  } catch {}

  const report = {
    env: {
      hasUrl: !!URL,
      hasServiceRoleVar: !!SERVICE_ROLE,
      serviceRoleLen: SERVICE_ROLE.length,
      decodedRole: decoded?.role || null, // should be "service_role"
      decodedIss: decoded?.iss || null,
      decodedExp: decoded?.exp || null,
    },
    getCounters: null,
    rpcTest: null,
  };

  if (!URL || !SERVICE_ROLE) {
    return res.status(500).json({
      ok: false,
      report,
      message:
        'Missing envs in this environment: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_ROLE).',
    });
  }

  const supabase = createClient(URL, SERVICE_ROLE, { auth: { persistSession: false } });

  try {
    const { data, error } = await supabase
      .from('counters')
      .select('k,total')
      .eq('k', 'raid_clicks_global')
      .maybeSingle();
    report.getCounters = { ok: !error, data, error: error?.message ?? null };
  } catch (e) {
    report.getCounters = { ok: false, error: String(e) };
  }

  try {
    const { data, error } = await supabase.rpc('raid_click_increment', { p_key: 'raid_clicks_global' });
    report.rpcTest = { ok: !error, data, error: error?.message ?? null };
  } catch (e) {
    report.rpcTest = { ok: false, error: String(e) };
  }

  return res.status(200).json({ ok: true, report });
}
