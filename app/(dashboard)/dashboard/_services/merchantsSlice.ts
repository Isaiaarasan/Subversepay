import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Merchant {
  id: string;
  name: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  type: string;
  appliedDate: string;
  documents: boolean;
  sector: string;
  contactEmail: string;
  phone: string;
  tpvToday: number;
  totalTransactions: number;
  lastActivity: string;
}

interface MerchantsState {
  merchants: Merchant[];
  searchQuery: string;
  statusFilter: 'all' | 'active' | 'inactive' | 'pending' | 'suspended';
  selectedMerchant: Merchant | null;
  deactivateId: string | null;
  deactivateReason: string;
  startDate: string;
  endDate: string;
  loading: boolean;
  error: string | null;
}

const initialState: MerchantsState = {
  merchants: [],
  searchQuery: '',
  statusFilter: 'all',
  selectedMerchant: null,
  deactivateId: null,
  deactivateReason: '',
  startDate: '',
  endDate: '',
  loading: false,
  error: null,
};

const merchantsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    setMerchants: (state, action: PayloadAction<Merchant[]>) => {
      state.merchants = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<MerchantsState['statusFilter']>) => {
      state.statusFilter = action.payload;
    },
    setSelectedMerchant: (state, action: PayloadAction<Merchant | null>) => {
      state.selectedMerchant = action.payload;
    },
    setDeactivateId: (state, action: PayloadAction<string | null>) => {
      state.deactivateId = action.payload;
    },
    setDeactivateReason: (state, action: PayloadAction<string>) => {
      state.deactivateReason = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateMerchant: (state, action: PayloadAction<Merchant>) => {
      const index = state.merchants.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.merchants[index] = action.payload;
      }
    },
    removeMerchant: (state, action: PayloadAction<string>) => {
      state.merchants = state.merchants.filter((m) => m.id !== action.payload);
    },
  },
});

export const {
  setMerchants,
  setSearchQuery,
  setStatusFilter,
  setSelectedMerchant,
  setDeactivateId,
  setDeactivateReason,
  setStartDate,
  setEndDate,
  setLoading,
  setError,
  updateMerchant,
  removeMerchant,
} = merchantsSlice.actions;

export default merchantsSlice.reducer;