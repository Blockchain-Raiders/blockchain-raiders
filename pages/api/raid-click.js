// pages/api/raid-click.js
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// ✅ Accept both naming styles so it works with your current Vercel env
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

export default async function handler(req, res) {
  noStore(res);

  if (!URL || !SERVICE_ROLE) {
    console.error('[raid-click] Missing envs:', {
      hasUrl: !!URL,
      hasService: !!SERVICE_ROLE,
    });
    return res.status(500).json({
      code: 'MISSING_ENVS',
      message:
        'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE in your environment.',
    });
  }

  const supabase = createClient(URL, SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('counters')
        .select('total')
        .eq('k', KEY)
        .maybeSingle();

      if (error) {
        console.error('[raid-click][GET] supabase error:', error);
        return res
          .status(500)
          .json({ code: 'READ_FAILED', message: error.message });
      }

      return res.status(200).json({ total: data?.total ?? 0 });
    }

    if (req.method === 'POST') {
      // Atomic increment via RPC (must exist in Supabase SQL)
      const { data, error } = await supabase.rpc('raid_click_increment', {
        p_key: KEY,
      });

      if (error) {
        console.error('[raid-click][POST] supabase error:', error);
        const code = /does not exist|function/i.test(error.message)
          ? 'RPC_MISSING'
          : 'INCREMENT_FAILED';
        return res.status(500).json({
          code,
          message:
            code === 'RPC_MISSING'
              ? 'Missing SQL function raid_click_increment. Run the SQL from setup step.'
              : error.message,
        });
      }

      return res.status(200).json({ total: Number(data) });
    }

    return res
      .status(405)
      .json({ code: 'METHOD_NOT_ALLOWED', message: 'Use GET or POST' });
  } catch (e) {
    console.error('[raid-click] unexpected error:', e);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      message: e?.message || 'Unknown error',
    });
  }
}
