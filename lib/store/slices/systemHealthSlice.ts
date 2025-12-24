import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ErrorLog {
  id: string;
  code: number;
  endpoint: string;
  message: string;
  time: string;
}

interface SystemHealthState {
  timeRange: string;
  errorLogs: ErrorLog[];
}

const initialState: SystemHealthState = {
  timeRange: 'Current Day',
  errorLogs: [
    {
      id: 'ERR-5011',
      code: 500,
      endpoint: '/api/v1/payments/initiate',
      message: 'Internal Server Error: Database Connection Limit Exceeded',
      time: '10:42 AM',
    },
    {
      id: 'ERR-5012',
      code: 503,
      endpoint: '/api/v1/webhooks/hdfc',
      message: 'Service Unavailable: Upstream Timeout',
      time: '11:15 AM',
    },
    {
      id: 'ERR-5013',
      code: 500,
      endpoint: '/api/v1/merchants/onboard',
      message: 'Unhandled Exception: Null Reference at Service.User',
      time: '01:20 PM',
    },
  ],
};

const systemHealthSlice = createSlice({
  name: 'systemHealth',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.timeRange = action.payload;
    },
    addErrorLog: (state, action: PayloadAction<ErrorLog>) => {
      state.errorLogs.unshift(action.payload);
    },
    removeErrorLog: (state, action: PayloadAction<string>) => {
      state.errorLogs = state.errorLogs.filter((log) => log.id !== action.payload);
    },
  },
});

export const { setTimeRange, addErrorLog, removeErrorLog } = systemHealthSlice.actions;
export default systemHealthSlice.reducer;

