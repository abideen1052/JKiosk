import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const URL_DEV = 'https://pceckvogoubcwaxdhoah.supabase.co';
const KEY_DEV =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZWNrdm9nb3ViY3dheGRob2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDA3MzUsImV4cCI6MjA5MTkxNjczNX0.0q7VRK2jokF35mFm6L-4RKkRnsUckUFV2co5DHNHQao';

const URL_PROD = 'https://auliemgklqjihvlqngaj.supabase.co';
const KEY_PROD =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1bGllbWdrbHFqaWh2bHFuZ2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTE1NDEsImV4cCI6MjA5MTQ4NzU0MX0.1o5bDW9lruQE2TRqMMIr86_Y7QqFoeNJQMjnaM6TTWY';

const SUPABASE_URL = URL_DEV;
const SUPABASE_ANON_KEY = KEY_DEV;

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
