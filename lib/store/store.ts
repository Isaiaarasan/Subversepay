import { configureStore } from '@reduxjs/toolkit';
import overviewReducer from './slices/overviewSlice';
import merchantsReducer from './slices/merchantsSlice';
import approvalsReducer from './slices/approvalsSlice';
import analyticsReducer from './slices/analyticsSlice';
import alertsReducer from './slices/alertsSlice';
import settlementsReducer from './slices/settlementsSlice';
import systemHealthReducer from './slices/systemHealthSlice';
import ticketsReducer from './slices/ticketsSlice';

export const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

