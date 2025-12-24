import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ticket {
  id: string;
  title: string;
  priority: string;
  user: string;
  status: string;
  date: string;
  description: string;
  type: string;
  attachments: boolean;
  createdDate?: string;
}

interface TicketsState {
  tickets: Ticket[];
  activeTab: 'active' | 'closed';
  selectedTicket: Ticket | null;
  closeTicketReason: string;
  showCloseModal: boolean;
  searchQuery: string;
  startDate: string;
  endDate: string;
}

const initialState: TicketsState = {
  tickets: [
    {
      id: 'TCK-9921',
      title: 'API Integration Error',
      priority: 'High',
      user: 'John Doe (Manager)',
      status: 'Open',
      date: '2 hours ago',
      description: 'Getting 500 errors on the payment endpoint repeatedly.',
      type: 'Manager',
      attachments: true,
      createdDate: '2024-10-24',
    },
    {
      id: 'TCK-9922',
      title: 'Settlement Delay Check',
      priority: 'Medium',
      user: 'Alice Smith (Admin)',
      status: 'In Progress',
      date: '5 hours ago',
      description: "Settlement for ID SET-2024-001 hasn't reflected yet.",
      type: 'Admin',
      attachments: false,
      createdDate: '2024-10-24',
    },
    {
      id: 'TCK-9920',
      title: 'Login Failure for Staff',
      priority: 'Critical',
      user: 'Tech Team (Customer)',
      status: 'Open',
      date: '1 day ago',
      description: 'Staff members unable to login from new IP range.',
      type: 'Customer',
      attachments: true,
      createdDate: '2024-10-23',
    },
    {
      id: 'TCK-9919',
      title: 'Merchant Onboarding Issue',
      priority: 'Medium',
      user: 'Sarah Wilson (Merchant)',
      status: 'Open',
      date: '3 hours ago',
      description: 'New merchant unable to complete registration process.',
      type: 'Merchant',
      attachments: false,
      createdDate: '2024-10-24',
    },
    {
      id: 'TCK-9918',
      title: 'Webhook Delivery Failure',
      priority: 'High',
      user: 'Dev Team (Admin)',
      status: 'In Progress',
      date: '6 hours ago',
      description: 'Payment webhooks not being delivered to merchant endpoint.',
      type: 'Admin',
      attachments: true,
      createdDate: '2024-10-24',
    },
    {
      id: 'TCK-9917',
      title: 'Transaction Timeout',
      priority: 'Critical',
      user: 'Bob Johnson (Customer)',
      status: 'Open',
      date: '8 hours ago',
      description: 'Payment transactions timing out during peak hours.',
      type: 'Customer',
      attachments: false,
      createdDate: '2024-10-24',
    },
    {
      id: 'TCK-9916',
      title: 'Dashboard Loading Slow',
      priority: 'Low',
      user: 'Mike Chen (Manager)',
      status: 'Open',
      date: '1 day ago',
      description: 'Dashboard taking too long to load analytics data.',
      type: 'Manager',
      attachments: true,
      createdDate: '2024-10-23',
    },
    {
      id: 'TCK-9915',
      title: 'Refund Request Processing',
      priority: 'Medium',
      user: 'Lisa Park (Merchant)',
      status: 'Closed',
      date: '2 days ago',
      description: 'Refund request taking longer than usual to process.',
      type: 'Merchant',
      attachments: false,
      createdDate: '2024-10-22',
    },
    {
      id: 'TCK-9914',
      title: 'API Rate Limiting',
      priority: 'High',
      user: 'Tom Brown (Admin)',
      status: 'Closed',
      date: '3 days ago',
      description: 'API calls being rate limited unexpectedly.',
      type: 'Admin',
      attachments: true,
      createdDate: '2024-10-21',
    },
  ],
  activeTab: 'active',
  selectedTicket: null,
  closeTicketReason: '',
  showCloseModal: false,
  searchQuery: '',
  startDate: '',
  endDate: '',
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'active' | 'closed'>) => {
      state.activeTab = action.payload;
    },
    setSelectedTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.selectedTicket = action.payload;
    },
    setCloseTicketReason: (state, action: PayloadAction<string>) => {
      state.closeTicketReason = action.payload;
    },
    setShowCloseModal: (state, action: PayloadAction<boolean>) => {
      state.showCloseModal = action.payload;
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
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.unshift(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    closeTicket: (state, action: PayloadAction<string>) => {
      const ticket = state.tickets.find((t) => t.id === action.payload);
      if (ticket) {
        ticket.status = 'Closed';
      }
    },
  },
});

export const {
  setActiveTab,
  setSelectedTicket,
  setCloseTicketReason,
  setShowCloseModal,
  setSearchQuery,
  setStartDate,
  setEndDate,
  addTicket,
  updateTicket,
  closeTicket,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;

