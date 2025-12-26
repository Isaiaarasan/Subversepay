import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Stat {
  title: string;
  value: string;
  subtext: string;
  icon: string;
  trend: 'up' | 'down';
  trendValue: string;
}

interface RecentActivity {
  action: string;
  time: string;
  type: 'success' | 'info' | 'warning';
}

interface PendingApproval {
  name: string;
  date: string;
  type: string;
}

interface OverviewState {
  timeRange: string;
  stats: Stat[];
  recentActivities: RecentActivity[];
  pendingApprovals: PendingApproval[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OverviewState = {
  isLoading: false,
  error: null,
  timeRange: 'This Month',
  stats: [
    {
      title: 'Total Merchants',
      value: '45',
      subtext: 'Platform partners',
      icon: 'Users',
      trend: 'up',
      trendValue: '+3 this week',
    },
    {
      title: 'Total Managers',
      value: '12',
      subtext: 'Operational staff',
      icon: 'Shield',
      trend: 'up',
      trendValue: '+1 newly added',
    },
    {
      title: 'Total Customers',
      value: '1.25L',
      subtext: 'End users',
      icon: 'UserCheck',
      trend: 'up',
      trendValue: '+12.5% Growth',
    },
    {
      title: 'Total TPV',
      value: '₹8.5 Cr',
      subtext: 'Processed Volume',
      icon: 'CreditCard',
      trend: 'up',
      trendValue: '+8.2%',
    },
  ],
  recentActivities: [
    { action: 'New merchant onboarded', time: '2 mins ago', type: 'success' },
    { action: 'Payment processed', time: '5 mins ago', type: 'info' },
    { action: 'Approval request received', time: '10 mins ago', type: 'warning' },
    { action: 'System health check completed', time: '15 mins ago', type: 'success' },
  ],
  pendingApprovals: [
    { name: 'Urban Fibernet Pvt Ltd', date: '2 mins ago', type: 'ISP' },
    { name: 'SkyHigh Travels', date: '1 hour ago', type: 'Travel' },
    { name: 'Fresh Mart Chain', date: '4 hours ago', type: 'Retail' },
  ],
};

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.timeRange = action.payload;
    },
    setStats: (state, action: PayloadAction<Stat[]>) => {
      state.stats = action.payload;
    },
    setRecentActivities: (state, action: PayloadAction<RecentActivity[]>) => {
      state.recentActivities = action.payload;
    },
    setPendingApprovals: (state, action: PayloadAction<PendingApproval[]>) => {
      state.pendingApprovals = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTimeRange, setStats, setRecentActivities, setPendingApprovals, setLoading, setError } = overviewSlice.actions;
export default overviewSlice.reducer;

