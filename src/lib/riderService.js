// src/lib/riderService.js
import { supabase } from './supabase'; // ← check this path is right

export const getRiderByMobile = async mobile => {
  try {
    const { data, error } = await supabase
      .from('riders')
      .select('*')
      .eq('mobile', mobile)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // not found = normal
      throw error;
    }
    return data;
  } catch (err) {
    console.error('Error fetching rider:', err.message);
    return null;
  }
};

export const saveNewRider = async (mobile, name, company) => {
  try {
    const { data, error } = await supabase
      .from('riders')
      .insert([{ mobile, name, company }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error saving rider:', err.message);
    throw err;
  }
};

export const updateRiderDetails = async (mobile, name, company) => {
  try {
    const { error } = await supabase
      .from('riders')
      .update({
        name,
        last_seen: new Date().toISOString(),
        company,
      })
      .eq('mobile', mobile);

    if (error) throw error;
  } catch (err) {
    console.error('Error updating rider:', err.message);
    throw err;
  }
};

export const saveDeliveryLog = async (
  mobile,
  rider_name,
  company,
  order_number,
) => {
  try {
    const today = new Date();
    const order_date = today.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('delivery_logs')
      .insert([{ mobile, rider_name, company, order_number, order_date }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error saving log:', err.message);
    throw err;
  }
};

export const getAllDeliveryLogs = async filters => {
  try {
    let query = supabase
      .from('delivery_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.company && filters.company !== 'All') {
      query = query.eq('company', filters.company);
    }

    if (filters.month) {
      // filters.month is 'YYYY-MM'
      const [year, month] = filters.month.split('-');
      const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
      
      const startDate = `${filters.month}-01`;
      const endDate = `${filters.month}-${lastDay}`;
      
      query = query.gte('order_date', startDate).lte('order_date', endDate);
    }

    if (filters.search) {
      query = query.ilike('order_number', `%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching all logs:', err);
    return [];
  }
};
