import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Organization {
    id: string;
    name: string;
    cin?: string;
    company_pan?: string;
    status: 'active' | 'inactive' | 'verified';
    created_by: string;
}

interface AdminState {
    organization: Organization | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    organization: null,
    isLoading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setOrganization: (state, action: PayloadAction<Organization>) => {
            state.organization = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setOrganization, setLoading, setError } = adminSlice.actions;
export default adminSlice.reducer;
