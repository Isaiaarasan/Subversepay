import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TicketStatus = 'Open' | 'In Progress' | 'Closed';
export type TicketPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Ticket {
  id: string;
  title: string;
  priority: TicketPriority;
  user: string;
  status: TicketStatus;
  date: string;
  description: string;
  type: string;
  attachments: boolean;
  createdDate?: string;
  created_by?: string;
  assigned_to?: string;
}

interface TicketsState {
  tickets: Ticket[];
  activeTab: 'active' | 'closed';
  selectedTicket: Ticket | null;
  searchQuery: string;
  startDate: string;
  endDate: string;
  closeTicketReason: string;
  showCloseModal: boolean;
}

const initialState: TicketsState = {
  tickets: [],
  activeTab: 'active',
  selectedTicket: null,
  searchQuery: '',
  startDate: '',
  endDate: '',
  closeTicketReason: '',
  showCloseModal: false,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<'active' | 'closed'>) => {
      state.activeTab = action.payload;
    },
    setSelectedTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.selectedTicket = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setCloseTicketReason: (state, action: PayloadAction<string>) => {
      state.closeTicketReason = action.payload;
    },
    setShowCloseModal: (state, action: PayloadAction<boolean>) => {
      state.showCloseModal = action.payload;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.unshift(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    removeTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  setTickets,
  setActiveTab,
  setSelectedTicket,
  setSearchQuery,
  setStartDate,
  setEndDate,
  setCloseTicketReason,
  setShowCloseModal,
  addTicket,
  updateTicket,
  removeTicket,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;