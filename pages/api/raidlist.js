// pages/api/raidlist.js
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // ensure this is set in Vercel

const supabase = url && key ? createClient(url, key) : null;

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Only POST allowed' });
  }

  if (!supabase) {
    return res.status(500).json({ ok: false, error: 'Misconfigured Supabase env' });
  }

  try {
    const { email = '', wallet = '', raid_time = '' } = req.body || {};

    // Honeypot: real users will keep this empty
    if (typeof raid_time === 'string' && raid_time.trim().length > 0) {
      return res.status(200).json({ ok: true });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      return res.status(400).json({ ok: false, error: 'Valid email required' });
    }

    // Optional very light wallet sanity check (base58-like)
    const w = wallet.trim();
    if (w && !/^[1-9A-HJ-NP-Za-km-z]{20,60}$/.test(w)) {
      return res.status(400).json({ ok: false, error: 'Wallet format looks off' });
    }

    const { error } = await supabase
      .from('raidlist')
      .insert([{ email: email.trim(), wallet: w || null }]);

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    return res.status(200).json({ ok: true, message: 'Signed up' });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Unexpected error' });
  }
}