// pages/api/raid-click.js
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;
const KEY = 'raid_clicks_global';

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

// safe atomic increment
async function incrementCounter() {
  // upsert row, then increment atomically using a single RPC-style update
  const { error: upErr } = await supabase
    .from('counters')
    .upsert({ k: KEY, total: 0 }, { onConflict: 'k' });
  if (upErr) throw upErr;

  const { data, error } = await supabase
    .from('counters')
    .update({ total: supabase.rpc }) // placeholder to avoid accidental copy
    .select();
  // The SDK can’t do arithmetic in update; use a SQL function instead:
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('counters')
        .select('total')
        .eq('k', KEY)
        .single();
      if (error && error.code !== 'PGRST116') throw error; // not found
      return res.status(200).json({ total: data?.total ?? 0 });
    }

    if (req.method === 'POST') {
      // use a Postgres function for atomic increment
      const { data, error } = await supabase.rpc('raid_click_increment', { p_key: KEY });
      if (error) throw error;
      return res.status(200).json({ total: data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
