import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Payment {
    id: string;
    customerName: string;
    customerEmail: string;
    amount: number;
    paymentMethod: string;
    status: 'completed' | 'pending' | 'failed';
    transactionId: string;
    date: string; // Store as ISO string for serializability
    planName: string;
}

// 1. Setup Adapter (Automatically handles normalization)
const paymentsAdapter = createEntityAdapter<Payment>({
    sortComparer: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(), // Sort by date descending
});

const initialState = paymentsAdapter.getInitialState({
    searchQuery: "",
    statusFilter: "all",
    paymentMethodFilter: "all",
    dateFilter: "currentMonth" as 'currentMonth' | 'past3Months' | 'custom',
    customDateRange: {
        start: '',
        end: '',
    },
    isLoading: false,
    error: null as string | null,
});

// Seed initial state with mock data
const initialPayments: Payment[] = [
  
    {
        id: '1',
        customerName: 'Bob White',
        customerEmail: 'bob@yahoo.com',
        amount: 499,
        paymentMethod: 'Credit Card',
        status: 'completed',
        transactionId: 'TXN_20260124002',
        date: '2026-01-24T00:00:00.000Z',
        planName: 'Basic Plan'
    },
    {
        id: '2',
        customerName: 'Charlie Green',
        customerEmail: 'charlie@outlook.com',
        amount: 799,
        paymentMethod: 'Net Banking',
        status: 'pending',
        transactionId: 'TXN_20260123003',
        date: '2026-01-23T00:00:00.000Z',
        planName: 'Standard Plan'
    },
    {
        id: '3',
        customerName: 'David Wilson',
        customerEmail: 'david.wilson@gmail.com',
        amount: 1299,
        paymentMethod: 'Credit Card',
        status: 'failed',
        transactionId: 'TXN_20260122004',
        date: '2026-01-22T00:00:00.000Z',
        planName: 'Pro Plan'
    },
    {
        id: '4',
        customerName: 'Emma Davis',
        customerEmail: 'emma.davis@hotmail.com',
        amount: 899,
        paymentMethod: 'UPI',
        status: 'completed',
        transactionId: 'TXN_20260121005',
        date: '2026-01-21T00:00:00.000Z',
        planName: 'Premium Health'
    },
];

// Helper to normalize data for initial state
const filledState = paymentsAdapter.upsertMany(initialState, initialPayments);

const paymentsSlice = createSlice({
    name: 'payments',
    initialState: filledState,
    reducers: {
        setPayments: paymentsAdapter.setAll,
        addPayment: paymentsAdapter.addOne,
        updatePayment: paymentsAdapter.updateOne,
        removePayment: paymentsAdapter.removeOne,

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setStatusFilter: (state, action: PayloadAction<string>) => {
            state.statusFilter = action.payload;
        },
        setPaymentMethodFilter: (state, action: PayloadAction<string>) => {
            state.paymentMethodFilter = action.payload;
        },
        setDateFilter: (state, action: PayloadAction<'currentMonth' | 'past3Months' | 'custom'>) => {
            state.dateFilter = action.payload;
        },
        setCustomDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
            state.customDateRange = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        // We can keep specific complex reducers if needed, but adapter handles most
    },
});

// Export the actions
export const {
    setPayments,
    addPayment,
    updatePayment,
    removePayment,
    setSearchQuery,
    setStatusFilter,
    setPaymentMethodFilter,
    setDateFilter,
    setCustomDateRange,
    setLoading,
} = paymentsSlice.actions;

// Export the selectors
export const {
    selectAll: selectAllPayments,
    selectById: selectPaymentById,
    selectIds: selectPaymentIds,
} = paymentsAdapter.getSelectors((state: RootState) => state.payments);

// Custom selectors
export const selectFilteredPayments = createSelector(
    [selectAllPayments, (state: RootState) => state.payments],
    (payments, paymentState) => {
        let filtered = payments;

        // Apply date filter
        const now = new Date();
        let startDate: Date;
        let endDate: Date = new Date(now);

        switch (paymentState.dateFilter) {
            case 'currentMonth':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'past3Months':
                startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
                break;
            case 'custom':
                if (paymentState.customDateRange.start && paymentState.customDateRange.end) {
                    startDate = new Date(paymentState.customDateRange.start);
                    endDate = new Date(paymentState.customDateRange.end);
                } else {
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                }
                break;
            default:
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        filtered = filtered.filter(payment => {
            const paymentDate = new Date(payment.date);
            return paymentDate >= startDate && paymentDate <= endDate;
        });

        // Apply search filter
        if (paymentState.searchQuery) {
            filtered = filtered.filter(payment =>
                payment.customerName.toLowerCase().includes(paymentState.searchQuery.toLowerCase()) ||
                payment.customerEmail.toLowerCase().includes(paymentState.searchQuery.toLowerCase()) ||
                payment.transactionId.toLowerCase().includes(paymentState.searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (paymentState.statusFilter !== 'all') {
            filtered = filtered.filter(payment => payment.status === paymentState.statusFilter);
        }

        // Apply payment method filter
        if (paymentState.paymentMethodFilter !== 'all') {
            filtered = filtered.filter(payment => payment.paymentMethod === paymentState.paymentMethodFilter);
        }

        return filtered;
    }
);

export default paymentsSlice.reducer;