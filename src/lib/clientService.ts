import DeviceInfo from 'react-native-device-info';
import { supabase } from './supabase';
import { saveClientSession } from './storage';

export const getDeviceId = async () => {
  return await DeviceInfo.getUniqueId();
};

export const loginClient = async (email: string, password: string) => {
  try {
    const deviceId = await getDeviceId();

    // CHANGE: use .maybeSingle() instead of .single()
    const { data: client, error: fetchError } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .eq('password', password.trim())
      .maybeSingle(); // ← never crashes on 0 rows

    if (fetchError) {
      console.log('fetchError', fetchError);
      return { success: false, message: 'Something went wrong' };
    }

    // Now safely check if client exists
    if (!client) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Check is_active
    if (!client.is_active) {
      return { success: false, message: 'Account disabled. Contact support.' };
    }

    // First login — save device ID
    if (!client.device_id) {
      await supabase
        .from('clients')
        .update({ device_id: deviceId })
        .eq('id', client.id);

      await saveClientSession(client);
      return { success: true, client };
    }

    // Check device ID matches
    if (client.device_id !== deviceId) {
      return { 
        success: false, 
        message: 'This account is linked to another device.' 
      };
    }

    await saveClientSession(client);
    return { success: true, client };

  } catch (err: any) {
    console.error('Login error:', err.message);
    return { success: false, message: 'Login failed. Try again.' };
  }
};
