import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrganizationSummary {
    id: string;
    name: string;
    userCount: number;
    status: string;
}

interface SuperAdminState {
    totalOrganizations: number;
    systemHealth: string;
    organizations: OrganizationSummary[];
    isLoading: boolean;
}

const initialState: SuperAdminState = {
    totalOrganizations: 12,
    systemHealth: "99.9%",
    organizations: [],
    isLoading: false,
};

const superAdminSlice = createSlice({
    name: 'superAdmin',
    initialState,
    reducers: {
        setStats: (state, action: PayloadAction<{ totalOrganizations: number; systemHealth: string }>) => {
            state.totalOrganizations = action.payload.totalOrganizations;
            state.systemHealth = action.payload.systemHealth;
        },
        setOrganizations: (state, action: PayloadAction<OrganizationSummary[]>) => {
            state.organizations = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setStats, setOrganizations, setLoading } = superAdminSlice.actions;
export default superAdminSlice.reducer;
