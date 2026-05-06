import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  COMPANIES: '@companies',
  DELIVERY_LOGS: '@delivery_logs',
  CLIENT_SESSION: '@client_session',
};

// Helper for parsing JSON safely
const safeParse = (data: string | null) => {
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('JSON Parse Error:', e);
    return null;
  }
};

export const getLogs = async (filters: any = {}) => {
  try {
    const data = await AsyncStorage.getItem(KEYS.DELIVERY_LOGS);
    let logs = safeParse(data) || [];

    // Sort by createdAt descending
    logs.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filters) {
      if (filters.company && filters.company !== 'All') {
        logs = logs.filter((log: any) => log.company === filters.company);
      }
      if (filters.month) {
        logs = logs.filter((log: any) => log.orderDate.startsWith(filters.month));
      }
      if (filters.search) {
        logs = logs.filter((log: any) =>
          log.orderNumber.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
    }
    return logs;
  } catch (error) {
    console.error('Error in getLogs:', error);
    return [];
  }
};

export const saveLog = async (mobile: string, name: string, company: string, orderNumber: string) => {
  try {
    const data = await AsyncStorage.getItem(KEYS.DELIVERY_LOGS);
    const logs = safeParse(data) || [];

    const now = new Date();
    const newLog = {
      id: Date.now().toString(),
      mobile,
      name,
      company,
      orderNumber,
      orderDate: now.toISOString().split('T')[0],
      createdAt: now.toISOString(),
    };

    logs.push(newLog);
    await AsyncStorage.setItem(KEYS.DELIVERY_LOGS, JSON.stringify(logs));
    return newLog;
  } catch (error) {
    console.error('Error in saveLog:', error);
    throw error;
  }
};

export const getRiderByMobile = async (mobile: string) => {
  try {
    const logs = await getLogs();
    // Find most recent entry for this mobile
    const lastEntry = logs.find((log: any) => log.mobile === mobile);
    if (lastEntry) {
      return { name: lastEntry.name, company: lastEntry.company };
    }
    return null;
  } catch (error) {
    console.error('Error in getRiderByMobile:', error);
    return null;
  }
};

export const getCompanies = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPANIES);
    const companies = safeParse(data) || [];
    return companies.sort((a: any, b: any) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error in getCompanies:', error);
    return [];
  }
};

export const saveCompany = async (name: string, logo_url: string, id?: string) => {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPANIES);
    const companies = safeParse(data) || [];

    let result;
    if (id) {
      // Update
      const index = companies.findIndex((c: any) => c.id === id);
      if (index !== -1) {
        companies[index] = { ...companies[index], name, logo_url };
        result = companies[index];
      }
    } else {
      // Create
      const newCompany = {
        id: Date.now().toString(),
        name,
        logo_url,
        created_at: new Date().toISOString(),
      };
      companies.push(newCompany);
      result = newCompany;
    }

    await AsyncStorage.setItem(KEYS.COMPANIES, JSON.stringify(companies));
    return result;
  } catch (error) {
    console.error('Error in saveCompany:', error);
    throw error;
  }
};

export const deleteCompany = async (id: string) => {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPANIES);
    const companies = safeParse(data) || [];
    const filtered = companies.filter((c: any) => c.id !== id);
    await AsyncStorage.setItem(KEYS.COMPANIES, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error in deleteCompany:', error);
    throw error;
  }
};

// No-op compatibility functions for redundant Rider table logic
export const saveNewRider = async () => true;
export const updateRiderDetails = async () => true;

// Client Session management
export const saveClientSession = async (client: any) => {
  try {
    await AsyncStorage.setItem(KEYS.CLIENT_SESSION, JSON.stringify(client));
  } catch (error) {
    console.error('Error in saveClientSession:', error);
  }
};

export const getClientSession = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.CLIENT_SESSION);
    return safeParse(data);
  } catch (error) {
    console.error('Error in getClientSession:', error);
    return null;
  }
};

export const clearClientSession = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.CLIENT_SESSION);
  } catch (error) {
    console.error('Error in clearClientSession:', error);
  }
};
