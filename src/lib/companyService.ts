import { supabase } from './supabase';

export const getAllCompanies = async () => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error('Error fetching companies:', err.message);
    return [];
  }
};

export const createCompany = async (name: string, logo_url: string) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert([{ name, logo_url }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error('Error creating company:', err.message);
    throw err;
  }
};

export const updateCompany = async (
  id: string,
  name: string,
  logo_url: string,
) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .update({ name, logo_url })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error('Error updating company:', err.message);
    throw err;
  }
};

export const deleteCompany = async (id: string) => {
  try {
    const { error } = await supabase.from('companies').delete().eq('id', id);

    if (error) throw error;
    return true;
  } catch (err: any) {
    console.error('Error deleting company:', err.message);
    throw err;
  }
};
