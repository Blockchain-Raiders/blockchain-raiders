import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE;

if (!url || !key) {
  console.warn('[Supabase] Missing env vars');
}

export const supabaseAdmin = createClient(url, key, {
  auth: { persistSession: false }
});
