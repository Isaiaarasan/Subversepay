import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Customer {
    id: number;
    name: string;
    email: string;
    merchant: string;
    joined: string;
}

// 1. Setup Adapter (Automatically handles normalization)
const customersAdapter = createEntityAdapter<Customer>({
    // selectId: (customer) => customer.id, // Default is 'id', so we can omit this
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = customersAdapter.getInitialState({
    searchQuery: "",
    isLoading: false,
    error: null as string | null,
});

// Seed initial state with mock data
const initialCustomers: Customer[] = [
    { id: 1, name: "Alice Brown", email: "alice@gmail.com", merchant: "SpeedNet ISP", joined: "Oct 24, 2024" },
    { id: 2, name: "Bob White", email: "bob@yahoo.com", merchant: "FitZone Gyms", joined: "Oct 22, 2024" },
    { id: 3, name: "Charlie Green", email: "charlie@outlook.com", merchant: "CableNet Sols", joined: "Oct 20, 2024" },
];

// Helper to normalize data for initial state
const filledState = customersAdapter.upsertMany(initialState, initialCustomers);

const customersSlice = createSlice({
    name: 'customers',
    initialState: filledState,
    reducers: {
        setCustomers: customersAdapter.setAll,
        addCustomer: customersAdapter.addOne,
        updateCustomer: customersAdapter.updateOne,
        removeCustomer: customersAdapter.removeOne,

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        // We can keep specific complex reducers if needed, but adapter handles most
    },
});

export const {
    setCustomers,
    setSearchQuery,
    setLoading,
    addCustomer,
    updateCustomer,
    removeCustomer
} = customersSlice.actions;

// 4. Export memoized selectors
export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomerById,
    selectIds: selectCustomerIds,
} = customersAdapter.getSelectors((state: RootState) => state.customers);

// 5. Create specific memoized selector for filtering
export const selectFilteredCustomers = createSelector(
    [selectAllCustomers, (state: RootState) => state.customers.searchQuery],
    (customers, query) => {
        if (!query) return customers;
        return customers.filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.email.toLowerCase().includes(query.toLowerCase()) ||
            c.merchant.toLowerCase().includes(query.toLowerCase())
        );
    }
);

export const selectCustomersLoading = (state: RootState) => state.customers.isLoading;
export const selectCustomersSearchQuery = (state: RootState) => state.customers.searchQuery;

export default customersSlice.reducer;
