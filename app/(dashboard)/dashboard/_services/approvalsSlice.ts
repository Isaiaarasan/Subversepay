import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Approval {
  id: string;
  type: string;
  entity: string;
  appliedDate: string;
  documents: boolean;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedBy: string;
  details: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface ApprovalsState {
  approvals: Approval[];
  searchTerm: string;
  filterStatus: 'all' | 'pending' | 'approved' | 'rejected';
  startDate: string;
  endDate: string;
  selectedApproval: Approval | null;
  rejectId: string | null;
  rejectReason: string;
  approveId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApprovalsState = {
  approvals: [],
  searchTerm: '',
  filterStatus: 'all',
  startDate: '',
  endDate: '',
  selectedApproval: null,
  rejectId: null,
  rejectReason: '',
  approveId: null,
  loading: false,
  error: null,
};

const approvalsSlice = createSlice({
  name: 'approvals',
  initialState,
  reducers: {
    setApprovals: (state, action: PayloadAction<Approval[]>) => {
      state.approvals = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<ApprovalsState['filterStatus']>) => {
      state.filterStatus = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setSelectedApproval: (state, action: PayloadAction<Approval | null>) => {
      state.selectedApproval = action.payload;
    },
    setRejectId: (state, action: PayloadAction<string | null>) => {
      state.rejectId = action.payload;
    },
    setRejectReason: (state, action: PayloadAction<string>) => {
      state.rejectReason = action.payload;
    },
    setApproveId: (state, action: PayloadAction<string | null>) => {
      state.approveId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateApproval: (state, action: PayloadAction<Approval>) => {
      const index = state.approvals.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.approvals[index] = action.payload;
      }
    },
    removeApproval: (state, action: PayloadAction<string>) => {
      state.approvals = state.approvals.filter((a) => a.id !== action.payload);
    },
  },
});

export const {
  setApprovals,
  setSearchTerm,
  setFilterStatus,
  setStartDate,
  setEndDate,
  setSelectedApproval,
  setRejectId,
  setRejectReason,
  setApproveId,
  setLoading,
  setError,
  updateApproval,
  removeApproval,
} = approvalsSlice.actions;

export default approvalsSlice.reducer;