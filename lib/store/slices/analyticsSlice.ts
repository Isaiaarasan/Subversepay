import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsState {
  startDate: string;
  endDate: string;
  timeRange: string;
}

const initialState: AnalyticsState = {
  startDate: '',
  endDate: '',
  timeRange: 'Last 7 days',
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
  },
});

export const { setStartDate, setEndDate, setTimeRange } = analyticsSlice.actions;
export default analyticsSlice.reducer;

