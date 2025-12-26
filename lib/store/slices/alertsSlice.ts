import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertType = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';

export interface Alert {
  id: number;
  type: AlertType;
  source: string;
  message: string;
  time: string;
  category: string;
}

interface AlertsState {
  alerts: Alert[];
  filterType: AlertType | 'All';
  showFilter: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AlertsState = {
  alerts: [
    {
      id: 1,
      type: 'Critical',
      source: 'Payment Gateway',
      message: 'High failure rate detected (15%) in last hour for HDFC Netbanking.',
      time: '10 mins ago',
      category: 'Payment Failures',
    },
    {
      id: 2,
      type: 'High',
      source: 'SpeedNet ISP',
      message: 'Sudden 20% drop in active subscribers detected.',
      time: '45 mins ago',
      category: 'Subscriber Drop',
    },
    {
      id: 3,
      type: 'Medium',
      source: 'Support Desk',
      message: "Unusual spike in support tickets from 'CableNet Sols'.",
      time: '2 hours ago',
      category: 'Support Tickets',
    },
    {
      id: 4,
      type: 'Low',
      source: 'System',
      message: 'Routine database optimization completed with warnings.',
      time: '5 hours ago',
      category: 'Maintenance',
    },
    {
      id: 5,
      type: 'Info',
      source: 'Onboarding',
      message: "New merchant 'Urban Fibernet' documentation verified.",
      time: '1 day ago',
      category: 'Onboarding',
    },
  ],
  filterType: 'All',
  showFilter: false,
  isLoading: false,
  error: null,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setFilterType: (state, action: PayloadAction<AlertType | 'All'>) => {
      state.filterType = action.payload;
    },
    setShowFilter: (state, action: PayloadAction<boolean>) => {
      state.showFilter = action.payload;
    },
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.unshift(action.payload);
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      state.alerts = state.alerts.filter((a) => a.id !== action.payload);
    },
    updateAlert: (state, action: PayloadAction<Alert>) => {
      const index = state.alerts.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.alerts[index] = action.payload;
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

export const { setFilterType, setShowFilter, addAlert, removeAlert, updateAlert, setLoading, setError } = alertsSlice.actions;
export default alertsSlice.reducer;

