import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: string;
}

interface MembersState {
    tasks: Task[];
    performanceStats: {
        tasksCompleted: number;
        efficiency: number;
    };
    isLoading: boolean;
}

const initialState: MembersState = {
    tasks: [
        { id: '1', title: 'Review Merchant Docs', status: 'pending', dueDate: '2024-12-30' },
    ],
    performanceStats: {
        tasksCompleted: 42,
        efficiency: 94,
    },
    isLoading: false,
};

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        updateTaskStatus: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) task.status = action.payload.status;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setTasks, updateTaskStatus, setLoading } = membersSlice.actions;
export default membersSlice.reducer;
