import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  unit: string;
  threshold: {
    warning: number;
    critical: number;
  };
  lastUpdated: string;
}

export interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  message: string;
  source: string;
  stackTrace?: string;
  resolved: boolean;
}

interface SystemHealthState {
  metrics: SystemMetric[];
  errorLogs: ErrorLog[];
  timeRange: string;
  loading: boolean;
  error: string | null;
}

const initialState: SystemHealthState = {
  metrics: [],
  errorLogs: [],
  timeRange: 'Last 24 hours',
  loading: false,
  error: null,
};

const systemHealthSlice = createSlice({
  name: 'systemHealth',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<SystemMetric[]>) => {
      state.metrics = action.payload;
    },
    setErrorLogs: (state, action: PayloadAction<ErrorLog[]>) => {
      state.errorLogs = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.timeRange = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateMetric: (state, action: PayloadAction<SystemMetric>) => {
      const index = state.metrics.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.metrics[index] = action.payload;
      }
    },
    addErrorLog: (state, action: PayloadAction<ErrorLog>) => {
      state.errorLogs.unshift(action.payload);
    },
    resolveErrorLog: (state, action: PayloadAction<string>) => {
      const log = state.errorLogs.find((e) => e.id === action.payload);
      if (log) {
        log.resolved = true;
      }
    },
  },
});

export const {
  setMetrics,
  setErrorLogs,
  setTimeRange,
  setLoading,
  setError,
  updateMetric,
  addErrorLog,
  resolveErrorLog,
} = systemHealthSlice.actions;

export default systemHealthSlice.reducer;