import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    merchant: string;
    joined: string;
    planStatus: 'Active' | 'Expired';
    paymentMethod?: string;
    isAutopay: boolean;
    personalDetails?: {
        address?: string;
        city?: string;
        state?: string;
        pincode?: string;
    };
    planDetails?: {
        planName?: string;
        planAmount?: string;
        billingCycle?: string;
        startDate?: string;
        endDate?: string;
    };
    paymentHistory?: {
        id: number;
        date: string;
        amount: string;
        status: 'Paid' | 'Pending' | 'Failed';
        paymentMethod: string;
    }[];
}

// 1. Setup Adapter (Automatically handles normalization)
const customersAdapter = createEntityAdapter<Customer>({
    // selectId: (customer) => customer.id, // Default is 'id', so we can omit this
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = customersAdapter.getInitialState({
    searchQuery: "",
    planStatusFilter: "all",
    isLoading: false,
    error: null as string | null,
});

// Seed initial state with mock data
const initialCustomers: Customer[] = [
 
    { 
        id: 1, 
        name: "Bob White", 
        email: "bob@yahoo.com", 
        phone: "+91 98765 11111",
        merchant: "FitZone Gyms", 
        joined: "Oct 22, 2024",
        planStatus: "Active",
        paymentMethod: "Card",
        isAutopay: false,
        personalDetails: {
            address: "45, Fitness Street",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001"
        },
        planDetails: {
            planName: "Basic Plan",
            planAmount: "₹499",
            billingCycle: "Monthly",
            startDate: "2024-10-15",
            endDate: "2024-11-15"
        },
        paymentHistory: [
            { id: 1, date: "2024-10-15", amount: "₹499", status: "Paid", paymentMethod: "Card" },
            { id: 2, date: "2024-09-15", amount: "₹499", status: "Paid", paymentMethod: "Card" }
        ]
    },
    { 
        id: 2, 
        name: "Charlie Green", 
        email: "charlie@outlook.com", 
        phone: "+91 98765 22222",
        merchant: "CableNet Sols", 
        joined: "Oct 20, 2024",
        planStatus: "Expired",
        paymentMethod: "Net Banking",
        isAutopay: true,
        personalDetails: {
            address: "78, Media Avenue",
            city: "Delhi",
            state: "Delhi",
            pincode: "110001"
        },
        planDetails: {
            planName: "Standard Plan",
            planAmount: "₹799",
            billingCycle: "Monthly",
            startDate: "2024-09-01",
            endDate: "2024-10-01"
        },
        paymentHistory: [
            { id: 1, date: "2024-09-01", amount: "₹799", status: "Paid", paymentMethod: "Net Banking" },
            { id: 2, date: "2024-08-01", amount: "₹799", status: "Paid", paymentMethod: "Net Banking" },
            { id: 3, date: "2024-10-01", amount: "₹799", status: "Pending", paymentMethod: "Net Banking" }
        ]
    },
    {
        id: 3,
        name: "David Wilson",
        email: "david.wilson@gmail.com",
        phone: "+91 98765 33333",
        merchant: "EduTech Academy",
        joined: "Oct 18, 2024",
        planStatus: "Active",
        paymentMethod: "Card",
        isAutopay: true,
        personalDetails: {
            address: "567, Learning Hub",
            city: "Hyderabad",
            state: "Telangana",
            pincode: "500001"
        },
        planDetails: {
            planName: "Pro Plan",
            planAmount: "₹1299",
            billingCycle: "Monthly",
            startDate: "2024-10-01",
            endDate: "2024-11-01"
        },
        paymentHistory: [
            { id: 1, date: "2024-10-01", amount: "₹1299", status: "Paid", paymentMethod: "Card" },
            { id: 2, date: "2024-09-01", amount: "₹1299", status: "Paid", paymentMethod: "UPI" }
        ]
    },
    {
        id: 4,
        name: "Emma Davis",
        email: "emma.davis@hotmail.com",
        phone: "+91 98765 44444",
        merchant: "HealthFirst Clinic",
        joined: "Oct 15, 2024",
        planStatus: "Expired",
        paymentMethod: "UPI",
        isAutopay: false,
        personalDetails: {
            address: "89, Wellness Center",
            city: "Chennai",
            state: "Tamil Nadu",
            pincode: "600001"
        },
        planDetails: {
            planName: "Premium Health",
            planAmount: "₹899",
            billingCycle: "Monthly",
            startDate: "2024-09-15",
            endDate: "2024-10-15"
        },
        paymentHistory: [
            { id: 1, date: "2024-09-15", amount: "₹899", status: "Paid", paymentMethod: "UPI" },
            { id: 2, date: "2024-08-15", amount: "₹899", status: "Failed", paymentMethod: "UPI" },
            { id: 3, date: "2024-10-15", amount: "₹899", status: "Pending", paymentMethod: "UPI" }
        ]
    },
    {
        id: 5,
        name: "Frank Miller",
        email: "frank.miller@outlook.com",
        phone: "+91 98765 55555",
        merchant: "StreamLine Entertainment",
        joined: "Oct 12, 2024",
        planStatus: "Active",
        paymentMethod: "Net Banking",
        isAutopay: true,
        personalDetails: {
            address: "234, Entertainment Plaza",
            city: "Pune",
            state: "Maharashtra",
            pincode: "411001"
        },
        planDetails: {
            planName: "Ultimate Streaming",
            planAmount: "₹699",
            billingCycle: "Monthly",
            startDate: "2024-10-01",
            endDate: "2024-11-01"
        },
        paymentHistory: [
            { id: 1, date: "2024-10-01", amount: "₹699", status: "Paid", paymentMethod: "Net Banking" },
            { id: 2, date: "2024-09-01", amount: "₹699", status: "Paid", paymentMethod: "Card" },
            { id: 3, date: "2024-08-01", amount: "₹699", status: "Paid", paymentMethod: "Net Banking" }
        ]
    },
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
        setPlanStatusFilter: (state, action: PayloadAction<string>) => {
            state.planStatusFilter = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setSelectedCustomer: (state, action: PayloadAction<Customer | null>) => {
            // This will be handled in the component state, but we can add it here if needed
        },
        // We can keep specific complex reducers if needed, but adapter handles most
    },
});

export const {
    setCustomers,
    setSearchQuery,
    setPlanStatusFilter,
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
    [selectAllCustomers, (state: RootState) => state.customers.searchQuery, (state: RootState) => state.customers.planStatusFilter],
    (customers, query, planStatusFilter) => {
        let filtered = customers;
        
        // Filter by search query (name and email)
        if (query) {
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query.toLowerCase()) ||
                c.email.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        // Filter by plan status
        if (planStatusFilter !== 'all') {
            filtered = filtered.filter(c => c.planStatus === planStatusFilter);
        }
        
        return filtered;
    }
);

export const selectCustomersLoading = (state: RootState) => state.customers.isLoading;
export const selectCustomersSearchQuery = (state: RootState) => state.customers.searchQuery;
export const selectCustomersPlanStatusFilter = (state: RootState) => state.customers.planStatusFilter;

export default customersSlice.reducer;
