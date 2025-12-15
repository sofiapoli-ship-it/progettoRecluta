import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('❌ Supabase env mancanti');
  throw new Error('Supabase config mancante');
}

export const supabase = createClient(url, key);

console.log('✅ Supabase client inizializzato');