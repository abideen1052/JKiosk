import AsyncStorage from '@react-native-async-storage/async-storage';

const MAIL_KEY = '@report_email';

export const getSavedEmail = async (): Promise<string> => {
  try {
    return (await AsyncStorage.getItem(MAIL_KEY)) || '';
  } catch {
    return '';
  }
};

export const saveEmail = async (email: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(MAIL_KEY, email.trim());
  } catch (err) {
    console.error('Failed to save email:', err);
  }
};
