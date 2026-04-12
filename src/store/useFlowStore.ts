import { create } from 'zustand';

interface FlowState {
  mobile: string;
  name: string;
  company: string;
  orderNumber: string;
  orderDate: string;
  isReturning: boolean;

  // Actions
  setMobile: (mobile: string) => void;
  setName: (name: string) => void;
  setCompany: (company: string) => void;
  setOrderNumber: (orderNumber: string) => void;
  setOrderDate: (orderDate: string) => void;
  setIsReturning: (isReturning: boolean) => void;

  // Bulks
  setRiderDetails: (data: {
    name: string;
    company: string;
    mobile: string;
    isReturning: boolean;
  }) => void;
  resetFlow: () => void;
}

const initialState = {
  mobile: '',
  name: '',
  company: '',
  orderNumber: '',
  orderDate: new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }),
  isReturning: false,
};

export const useFlowStore = create<FlowState>(set => ({
  ...initialState,

  setMobile: mobile => {
    set({ mobile });
  },
  setName: name => {
    set({ name });
  },
  setCompany: company => {
    set({ company });
  },
  setOrderNumber: orderNumber => {
    set({ orderNumber });
  },
  setOrderDate: orderDate => {
    set({ orderDate });
  },
  setIsReturning: isReturning => {
    set({ isReturning });
  },

  setRiderDetails: data => {
    set({
      name: data.name,
      company: data.company,
      mobile: data.mobile,
      isReturning: data.isReturning,
    });
  },

  resetFlow: () => {
    console.log('--- FLOW STATE RESET ---');
    set(initialState);
  },
}));
