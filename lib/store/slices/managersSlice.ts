import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Manager {
    id: number;
    name: string;
    email: string;
    role: string;
    lastActive: string;
}

interface ManagersState {
    managers: Manager[];
    searchQuery: string;
    isLoading: boolean;
    error: string | null;
}

const initialState: ManagersState = {
    managers: [
        { id: 1, name: "John Doe", email: "john@subverse.ai", role: "Ops Manager", lastActive: "2 mins ago" },
        { id: 2, name: "Jane Smith", email: "jane@subverse.ai", role: "Support Lead", lastActive: "1 hour ago" },
        { id: 3, name: "Mike Johnson", email: "mike@subverse.ai", role: "Finance Manager", lastActive: "1 day ago" },
    ],
    searchQuery: "",
    isLoading: false,
    error: null,
};

const managersSlice = createSlice({
    name: 'managers',
    initialState,
    reducers: {
        setManagers: (state, action: PayloadAction<Manager[]>) => {
            state.managers = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        addManager: (state, action: PayloadAction<Manager>) => {
            state.managers.push(action.payload);
        },
    },
});

export const { setManagers, setSearchQuery, setLoading, addManager } = managersSlice.actions;
export default managersSlice.reducer;
