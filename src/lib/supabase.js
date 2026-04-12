import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://auliemgklqjihvlqngaj.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1bGllbWdrbHFqaWh2bHFuZ2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTE1NDEsImV4cCI6MjA5MTQ4NzU0MX0.1o5bDW9lruQE2TRqMMIr86_Y7QqFoeNJQMjnaM6TTWY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-react-native',
    },
  },
});
