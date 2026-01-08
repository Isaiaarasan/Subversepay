import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import overviewReducer from './overviewSlice';
import merchantsReducer from './merchantsSlice';
import approvalsReducer from './approvalsSlice';
import analyticsReducer from './analyticsSlice';
import alertsReducer from './alertsSlice';
import settlementsReducer from './settlementsSlice';
import systemHealthReducer from './systemHealthSlice';
import ticketsReducer from './ticketsSlice';

export const dashboardStore = configureStore({
  reducer: {
    overview: overviewReducer,
    merchants: merchantsReducer,
    approvals: approvalsReducer,
    analytics: analyticsReducer,
    alerts: alertsReducer,
    settlements: settlementsReducer,
    systemHealth: systemHealthReducer,
    tickets: ticketsReducer,
  },
});

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardAppDispatch = typeof dashboardStore.dispatch;

// Typed hooks for dashboard store
export const useAppDispatch = useDispatch.withTypes<DashboardAppDispatch>();
export const useAppSelector = useSelector.withTypes<DashboardRootState>();