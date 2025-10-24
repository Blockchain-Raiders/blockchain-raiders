// pages/api/raid-click-debug.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const report = {
    env: { hasUrl: !!URL, hasServiceRole: !!SERVICE_ROLE },
    getCounters: null,
    rpcTest: null,
  };

  if (!URL || !SERVICE_ROLE) {
    return res.status(500).json({
      ok: false,
      report,
      message: 'Missing envs: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY',
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

  res.status(200).json({ ok: true, report });
}
