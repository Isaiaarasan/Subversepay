import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
    isSidebarOpen: boolean;
    isMobileMenuOpen: boolean;
    isSearchOpen: boolean;
    globalSearchQuery: string;
    isGlobalLoading: boolean;
}

const initialState: DashboardState = {
    isSidebarOpen: true,
    isMobileMenuOpen: false,
    isSearchOpen: false,
    globalSearchQuery: '',
    isGlobalLoading: false,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.isSidebarOpen = action.payload;
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMobileMenuOpen = action.payload;
        },
        toggleSearch: (state) => {
            state.isSearchOpen = !state.isSearchOpen;
        },
        setSearchOpen: (state, action: PayloadAction<boolean>) => {
            state.isSearchOpen = action.payload;
        },
        setGlobalSearchQuery: (state, action: PayloadAction<string>) => {
            state.globalSearchQuery = action.payload;
        },
        setGlobalLoading: (state, action: PayloadAction<boolean>) => {
            state.isGlobalLoading = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    setSidebarOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
    toggleSearch,
    setSearchOpen,
    setGlobalSearchQuery,
    setGlobalLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
