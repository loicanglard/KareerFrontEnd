import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

let supabase: SupabaseClient | null = null

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    '[Supabase] Missing env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see /project/.env.example). ' +
    'App will run without Supabase features.'
  )
} else {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

export { supabase }
