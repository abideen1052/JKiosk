import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

const LAST_PING_KEY = '@last_ping';

export const keepSupabaseAlive = async () => {
  try {
    const lastPing = await AsyncStorage.getItem(LAST_PING_KEY);
    const now = Date.now();

    // Only ping if last ping was more than 3 days ago
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    if (lastPing && now - parseInt(lastPing) < threeDays) {
      console.log('Ping not needed yet');
      return;
    }

    // Simple lightweight query — just reads one row
    await supabase.from('clients').select('id').limit(1);

    // Save last ping time
    await AsyncStorage.setItem(LAST_PING_KEY, now.toString());
    console.log('Supabase pinged successfully');
  } catch (err) {
    console.log('Ping failed:', err);
  }
};
