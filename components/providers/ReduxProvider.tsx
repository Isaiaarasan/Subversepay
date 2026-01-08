'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

// Dashboard-specific provider
import { dashboardStore } from '@/app/(dashboard)/dashboard/_services/store';

export function DashboardReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={dashboardStore}>{children}</Provider>;
}
