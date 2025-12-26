import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TeamMember {
    id: string;
    name: string;
    activeTasks: number;
}

interface TeamLeadState {
    teamMembers: TeamMember[];
    isLoading: boolean;
}

const initialState: TeamLeadState = {
    teamMembers: [
        { id: '1', name: 'Sarah Jones', activeTasks: 3 },
        { id: '2', name: 'David Lee', activeTasks: 1 },
    ],
    isLoading: false,
};

const teamLeadSlice = createSlice({
    name: 'teamLead',
    initialState,
    reducers: {
        setTeamMembers: (state, action: PayloadAction<TeamMember[]>) => {
            state.teamMembers = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setTeamMembers, setLoading } = teamLeadSlice.actions;
export default teamLeadSlice.reducer;
