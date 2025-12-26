import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Settlement {
  id: string;
  from: string;
  to: string;
  amount: string;
  status: string;
  date: string;
  bankLogo: string;
}

interface SettlementsState {
  settlements: Settlement[];
  searchQuery: string;
  statusFilter: string;
  startDate: string;
  endDate: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: SettlementsState = {
  isLoading: false,
  error: null,
  settlements: [
    {
      id: 'SET-2024-001',
      from: 'SubversePay',
      to: 'SpeedNet ISP',
      amount: '₹45,200.00',
      status: 'Completed',
      date: 'Oct 24, 2024',
      bankLogo: 'HDFC',
    },
    {
      id: 'SET-2024-002',
      from: 'SubversePay',
      to: 'CableNet Sols',
      amount: '₹12,450.00',
      status: 'Processing',
      date: 'Oct 24, 2024',
      bankLogo: 'ICICI',
    },
    {
      id: 'SET-2024-003',
      from: 'SubversePay',
      to: 'FitZone Gyms',
      amount: '₹8,900.00',
      status: 'Failed',
      date: 'Oct 23, 2024',
      bankLogo: 'SBI',
    },
    {
      id: 'SET-2024-004',
      from: 'SubversePay',
      to: 'TechStart Hub',
      amount: '₹1,25,000.00',
      status: 'Completed',
      date: 'Oct 23, 2024',
      bankLogo: 'AXIS',
    },
    {
      id: 'SET-2024-005',
      from: 'SubversePay',
      to: 'Coffee House',
      amount: '₹3,400.00',
      status: 'Completed',
      date: 'Oct 22, 2024',
      bankLogo: 'PNB',
    },
  ],
  searchQuery: '',
  statusFilter: 'all',
  startDate: '',
  endDate: '',
};

const settlementsSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    addSettlement: (state, action: PayloadAction<Settlement>) => {
      state.settlements.unshift(action.payload);
    },
    updateSettlement: (state, action: PayloadAction<Settlement>) => {
      const index = state.settlements.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.settlements[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setStatusFilter, setStartDate, setEndDate, addSettlement, updateSettlement, setLoading, setError } =
  settlementsSlice.actions;
export default settlementsSlice.reducer;

