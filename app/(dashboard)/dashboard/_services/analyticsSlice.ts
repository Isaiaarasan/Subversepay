import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsState {
  startDate: string;
  endDate: string;
  timeRange: string;
  data: {
    totalRevenue: number;
    activeUsers: number;
    conversionRate: number;
    avgTransaction: number;
    topMerchants: Array<{
      name: string;
      revenue: string;
      growth: string;
    }>;
    geographicDistribution: Array<{
      region: string;
      percentage: number;
      amount: string;
    }>;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  startDate: '',
  endDate: '',
  timeRange: 'Last 7 days',
  data: null,
  loading: false,
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
    setAnalyticsData: (state, action: PayloadAction<AnalyticsState['data']>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setTimeRange,
  setAnalyticsData,
  setLoading,
  setError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;