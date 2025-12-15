import { createClient } from '@supabase/supabase-js';

// Variabili d'ambiente necessarie
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

// Fail fast: se manca qualcosa, fermiamo subito l'app
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    'Configurazione Supabase mancante. Verifica SUPABASE_URL e SUPABASE_KEY nel file .env'
  );
}

// Creazione client Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Log utile in fase di sviluppo
if (process.env.NODE_ENV !== 'production') {
  console.log('Supabase client inizializzato');
}