import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Settlement {
  id: string;
  txnId: string;
  from: string;
  to: string;
  bank: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Processing';
  merchantId: string;
  merchantName: string;
  reference: string;
}

interface SettlementsState {
  settlements: Settlement[];
  searchQuery: string;
  statusFilter: 'all' | 'pending' | 'completed' | 'failed' | 'processing';
  startDate: string;
  endDate: string;
  loading: boolean;
  error: string | null;
}

const initialState: SettlementsState = {
  settlements: [],
  searchQuery: '',
  statusFilter: 'all',
  startDate: '',
  endDate: '',
  loading: false,
  error: null,
};

const settlementsSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {
    setSettlements: (state, action: PayloadAction<Settlement[]>) => {
      state.settlements = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<SettlementsState['statusFilter']>) => {
      state.statusFilter = action.payload;
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
    updateSettlement: (state, action: PayloadAction<Settlement>) => {
      const index = state.settlements.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.settlements[index] = action.payload;
      }
    },
    addSettlement: (state, action: PayloadAction<Settlement>) => {
      state.settlements.unshift(action.payload);
    },
  },
});

export const {
  setSettlements,
  setSearchQuery,
  setStatusFilter,
  setStartDate,
  setEndDate,
  setLoading,
  setError,
  updateSettlement,
  addSettlement,
} = settlementsSlice.actions;

export default settlementsSlice.reducer;