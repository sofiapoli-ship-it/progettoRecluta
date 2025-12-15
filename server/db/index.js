import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    'Configurazione Supabase mancante. Verifica SUPABASE_URL e SUPABASE_ANON_KEY nel file .env'
  );
}

export const supabase = createClient(url, key);

console.log('✅ Supabase client inizializzato');