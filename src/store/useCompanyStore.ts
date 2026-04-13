import { create } from 'zustand';
import { getAllCompanies } from '../lib/companyService';

interface Company {
  id: string;
  name: string;
  logo_url: string;
  created_at?: string;
}

interface CompanyState {
  companies: Company[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Actions
  fetchCompanies: (force?: boolean) => Promise<void>;
  addCompanyToStore: (company: Company) => void;
  updateCompanyInStore: (company: Company) => void;
  removeCompanyFromStore: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
  companies: [],
  loading: false,
  error: null,
  lastFetched: null,

  fetchCompanies: async (force = false) => {
    const { lastFetched, companies } = get();
    
    // Only fetch if forced or if no data or if it's been a while (e.g. 5 minutes)
    // The user said: "if there is already data in zustand no need to fetch every time fetch if the the company added again so only first time will the api will call"
    if (!force && companies.length > 0) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await getAllCompanies();
      set({ 
        companies: data || [], 
        loading: false, 
        lastFetched: Date.now() 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addCompanyToStore: (company: Company) => {
    set(state => ({
      companies: [...state.companies, company].sort((a, b) => a.name.localeCompare(b.name))
    }));
  },

  updateCompanyInStore: (company: Company) => {
    set(state => ({
      companies: state.companies.map(c => c.id === company.id ? company : c)
        .sort((a, b) => a.name.localeCompare(b.name))
    }));
  },

  removeCompanyFromStore: (id: string) => {
    set(state => ({
      companies: state.companies.filter(c => c.id !== id)
    }));
  },

  setLoading: (loading: boolean) => set({ loading }),
}));
