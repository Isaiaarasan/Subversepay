import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsState {
  startDate: string;
  endDate: string;
  timeRange: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  startDate: '',
  endDate: '',
  timeRange: 'Last 7 days',
  isLoading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.timeRange = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setStartDate, setEndDate, setTimeRange, setLoading, setError } = analyticsSlice.actions;
export default analyticsSlice.reducer;

