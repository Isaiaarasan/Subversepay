import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Manager {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'Active' | 'Inactive';
  joinedDate?: string;
  personalDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    dateOfBirth?: string;
    pan?: string;
    aadhaar?: string;
  };
  bankingDetails?: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    branch?: string;
  };
  customers?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    joinedDate: string;
    status: string;
  }[];
  collections?: {
    id: number;
    amount: string;
    date: string;
    customer: string;
    status: string;
    paymentMethod: string;
  }[];
}

interface ManagersState {
  managers: Manager[];
  searchQuery: string;
  statusFilter: string;
  selectedManager: Manager | null;
  deactivateId: number | null;
  deactivateReason: string;
  startDate: string;
  endDate: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ManagersState = {
  isLoading: false,
  error: null,
  managers: [
    {
      id: 1,
      name: 'Arjun Kumar',
      email: 'arjun@speednet.com',
      phone: '+91 98765 43210',
      role: 'General Manager',
      status: 'Active',
      joinedDate: '2024-01-15',
      personalDetails: {
        firstName: 'Arjun',
        lastName: 'Kumar',
        email: 'arjun@speednet.com',
        phone: '+91 98765 43210',
        address: '123, Tech Park, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        dateOfBirth: '1990-05-15',
        pan: 'ABCDE1234F',
        aadhaar: '1234 5678 9012',
      },
      bankingDetails: {
        bankName: 'HDFC Bank',
        accountNumber: '1234567890',
        ifscCode: 'HDFC0001234',
        accountHolderName: 'Arjun Kumar',
        branch: 'Bangalore Main',
      },
      customers: [
        { id: 1, name: 'Rajesh Patel', email: 'rajesh.patel@example.com', phone: '+91 98765 11111', joinedDate: '2024-01-20', status: 'Active' },
        { id: 2, name: 'Sneha Reddy', email: 'sneha.reddy@example.com', phone: '+91 98765 22222', joinedDate: '2024-02-15', status: 'Active' },
        { id: 3, name: 'Vikram Sharma', email: 'vikram.sharma@example.com', phone: '+91 98765 33333', joinedDate: '2024-03-10', status: 'Active' },
        { id: 4, name: 'Anita Desai', email: 'anita.desai@example.com', phone: '+91 98765 44444', joinedDate: '2024-03-25', status: 'Active' },
      ],
      collections: [
        { id: 1, amount: '₹5,000', date: '2024-01-25', customer: 'Rajesh Patel', status: 'Completed', paymentMethod: 'UPI' },
        { id: 2, amount: '₹3,500', date: '2024-02-10', customer: 'Sneha Reddy', status: 'Completed', paymentMethod: 'Card' },
        { id: 3, amount: '₹6,200', date: '2024-03-15', customer: 'Vikram Sharma', status: 'Completed', paymentMethod: 'UPI' },
        { id: 4, amount: '₹4,800', date: '2024-03-30', customer: 'Anita Desai', status: 'Completed', paymentMethod: 'Net Banking' },
      ],
    },
    {
      id: 2,
      name: 'Ravi Mehta',
      email: 'ravi@cablenet.in',
      phone: '+91 98765 11111',
      role: 'Operations Manager',
      status: 'Active',
      joinedDate: '2024-02-20',
      personalDetails: {
        firstName: 'Ravi',
        lastName: 'Mehta',
        email: 'ravi@cablenet.in',
        phone: '+91 98765 11111',
        address: '45, Media Street, Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        dateOfBirth: '1988-08-20',
        pan: 'FGHIJ5678K',
        aadhaar: '2345 6789 0123',
      },
      bankingDetails: {
        bankName: 'ICICI Bank',
        accountNumber: '0987654321',
        ifscCode: 'ICIC0001234',
        accountHolderName: 'Ravi Mehta',
        branch: 'Mumbai Central',
      },
      customers: [
        { id: 5, name: 'Mohammed Ali', email: 'mohammed.ali@example.com', phone: '+91 98765 55555', joinedDate: '2024-03-01', status: 'Active' },
        { id: 6, name: 'Kavita Nair', email: 'kavita.nair@example.com', phone: '+91 98765 66666', joinedDate: '2024-03-18', status: 'Active' },
        { id: 7, name: 'Rohit Verma', email: 'rohit.verma@example.com', phone: '+91 98765 77777', joinedDate: '2024-04-05', status: 'Active' },
      ],
      collections: [
        { id: 5, amount: '₹4,200', date: '2024-03-05', customer: 'Mohammed Ali', status: 'Completed', paymentMethod: 'Net Banking' },
        { id: 6, amount: '₹5,500', date: '2024-03-22', customer: 'Kavita Nair', status: 'Completed', paymentMethod: 'UPI' },
        { id: 7, amount: '₹7,300', date: '2024-04-10', customer: 'Rohit Verma', status: 'Completed', paymentMethod: 'Card' },
      ],
    },
    {
      id: 3,
      name: 'Priya Singh',
      email: 'priya@speednet.com',
      phone: '+91 98765 22222',
      role: 'Regional Manager',
      status: 'Inactive',
      joinedDate: '2023-11-12',
      personalDetails: {
        firstName: 'Priya',
        lastName: 'Singh',
        email: 'priya@speednet.com',
        phone: '+91 98765 22222',
        address: '78, Health Avenue, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        dateOfBirth: '1992-03-10',
        pan: 'KLMNO9012P',
        aadhaar: '3456 7890 1234',
      },
      bankingDetails: {
        bankName: 'SBI',
        accountNumber: '1122334455',
        ifscCode: 'SBIN0001234',
        accountHolderName: 'Priya Singh',
        branch: 'Delhi Main',
      },
      customers: [
        { id: 8, name: 'Deepak Joshi', email: 'deepak.joshi@example.com', phone: '+91 98765 88888', joinedDate: '2024-01-10', status: 'Active' },
      ],
      collections: [
        { id: 8, amount: '₹3,000', date: '2024-01-15', customer: 'Deepak Joshi', status: 'Completed', paymentMethod: 'UPI' },
      ],
    },
    {
      id: 4,
      name: 'Amit Shah',
      email: 'amit.shah@subverse.ai',
      phone: '+91 98765 44444',
      role: 'Sales Manager',
      status: 'Active',
      joinedDate: '2024-03-05',
      personalDetails: {
        firstName: 'Amit',
        lastName: 'Shah',
        email: 'amit.shah@subverse.ai',
        phone: '+91 98765 44444',
        address: '12, Business Hub, Pune',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        dateOfBirth: '1989-11-25',
        pan: 'MNOPQ3456R',
        aadhaar: '4567 8901 2345',
      },
      bankingDetails: {
        bankName: 'Axis Bank',
        accountNumber: '2233445566',
        ifscCode: 'UTIB0001234',
        accountHolderName: 'Amit Shah',
        branch: 'Pune Central',
      },
      customers: [
        { id: 9, name: 'Sunita Rao', email: 'sunita.rao@example.com', phone: '+91 98765 99999', joinedDate: '2024-03-12', status: 'Active' },
        { id: 10, name: 'Pradeep Kumar', email: 'pradeep.kumar@example.com', phone: '+91 98765 10101', joinedDate: '2024-03-28', status: 'Active' },
        { id: 11, name: 'Meera Iyer', email: 'meera.iyer@example.com', phone: '+91 98765 20202', joinedDate: '2024-04-08', status: 'Active' },
        { id: 12, name: 'Nikhil Agarwal', email: 'nikhil.agarwal@example.com', phone: '+91 98765 30303', joinedDate: '2024-04-15', status: 'Active' },
      ],
      collections: [
        { id: 9, amount: '₹8,500', date: '2024-03-18', customer: 'Sunita Rao', status: 'Completed', paymentMethod: 'Card' },
        { id: 10, amount: '₹6,700', date: '2024-04-02', customer: 'Pradeep Kumar', status: 'Completed', paymentMethod: 'UPI' },
        { id: 11, amount: '₹9,200', date: '2024-04-12', customer: 'Meera Iyer', status: 'Completed', paymentMethod: 'Net Banking' },
        { id: 12, amount: '₹5,400', date: '2024-04-20', customer: 'Nikhil Agarwal', status: 'Completed', paymentMethod: 'UPI' },
      ],
    },
    {
      id: 5,
      name: 'Suresh Menon',
      email: 'suresh.menon@subverse.ai',
      phone: '+91 98765 55555',
      role: 'Customer Relations Manager',
      status: 'Active',
      joinedDate: '2024-02-10',
      personalDetails: {
        firstName: 'Suresh',
        lastName: 'Menon',
        email: 'suresh.menon@subverse.ai',
        phone: '+91 98765 55555',
        address: '56, Commercial Street, Chennai',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
        dateOfBirth: '1991-07-18',
        pan: 'QRSTU5678V',
        aadhaar: '5678 9012 3456',
      },
      bankingDetails: {
        bankName: 'Indian Bank',
        accountNumber: '3344556677',
        ifscCode: 'IDIB0001234',
        accountHolderName: 'Suresh Menon',
        branch: 'Chennai Main',
      },
      customers: [
        { id: 13, name: 'Lakshmi Priya', email: 'lakshmi.priya@example.com', phone: '+91 98765 40404', joinedDate: '2024-02-20', status: 'Active' },
        { id: 14, name: 'Ganesh Subramanian', email: 'ganesh.sub@example.com', phone: '+91 98765 50505', joinedDate: '2024-03-05', status: 'Active' },
        { id: 15, name: 'Divya Krishnan', email: 'divya.krishnan@example.com', phone: '+91 98765 60606', joinedDate: '2024-03-22', status: 'Active' },
        { id: 16, name: 'Arvind Swamy', email: 'arvind.swamy@example.com', phone: '+91 98765 70707', joinedDate: '2024-04-10', status: 'Active' },
        { id: 17, name: 'Shruti Venkatesh', email: 'shruti.venkatesh@example.com', phone: '+91 98765 80808', joinedDate: '2024-04-18', status: 'Active' },
      ],
      collections: [
        { id: 13, amount: '₹4,600', date: '2024-02-25', customer: 'Lakshmi Priya', status: 'Completed', paymentMethod: 'UPI' },
        { id: 14, amount: '₹7,800', date: '2024-03-10', customer: 'Ganesh Subramanian', status: 'Completed', paymentMethod: 'Card' },
        { id: 15, amount: '₹5,900', date: '2024-03-28', customer: 'Divya Krishnan', status: 'Completed', paymentMethod: 'Net Banking' },
        { id: 16, amount: '₹8,100', date: '2024-04-15', customer: 'Arvind Swamy', status: 'Completed', paymentMethod: 'UPI' },
        { id: 17, amount: '₹6,500', date: '2024-04-22', customer: 'Shruti Venkatesh', status: 'Completed', paymentMethod: 'Card' },
      ],
    },
    {
      id: 6,
      name: 'Kiran Deshmukh',
      email: 'kiran.deshmukh@subverse.ai',
      phone: '+91 98765 66666',
      role: 'Field Operations Manager',
      status: 'Active',
      joinedDate: '2024-01-25',
      personalDetails: {
        firstName: 'Kiran',
        lastName: 'Deshmukh',
        email: 'kiran.deshmukh@subverse.ai',
        phone: '+91 98765 66666',
        address: '89, Industrial Area, Hyderabad',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500001',
        dateOfBirth: '1990-09-30',
        pan: 'VWXYZ6789A',
        aadhaar: '6789 0123 4567',
      },
      bankingDetails: {
        bankName: 'State Bank of Hyderabad',
        accountNumber: '4455667788',
        ifscCode: 'SBHY0001234',
        accountHolderName: 'Kiran Deshmukh',
        branch: 'Hyderabad Central',
      },
      customers: [
        { id: 18, name: 'Ramesh Naidu', email: 'ramesh.naidu@example.com', phone: '+91 98765 90909', joinedDate: '2024-02-05', status: 'Active' },
        { id: 19, name: 'Swathi Reddy', email: 'swathi.reddy@example.com', phone: '+91 98765 01010', joinedDate: '2024-02-22', status: 'Active' },
        { id: 20, name: 'Venkat Rao', email: 'venkat.rao@example.com', phone: '+91 98765 11111', joinedDate: '2024-03-15', status: 'Active' },
        { id: 21, name: 'Anjali Sharma', email: 'anjali.sharma@example.com', phone: '+91 98765 12121', joinedDate: '2024-04-01', status: 'Active' },
        { id: 22, name: 'Sai Kumar', email: 'sai.kumar@example.com', phone: '+91 98765 13131', joinedDate: '2024-04-12', status: 'Active' },
        { id: 23, name: 'Madhuri Patel', email: 'madhuri.patel@example.com', phone: '+91 98765 14141', joinedDate: '2024-04-20', status: 'Active' },
      ],
      collections: [
        { id: 18, amount: '₹5,200', date: '2024-02-10', customer: 'Ramesh Naidu', status: 'Completed', paymentMethod: 'UPI' },
        { id: 19, amount: '₹7,400', date: '2024-02-28', customer: 'Swathi Reddy', status: 'Completed', paymentMethod: 'Card' },
        { id: 20, amount: '₹6,800', date: '2024-03-20', customer: 'Venkat Rao', status: 'Completed', paymentMethod: 'Net Banking' },
        { id: 21, amount: '₹9,500', date: '2024-04-05', customer: 'Anjali Sharma', status: 'Completed', paymentMethod: 'UPI' },
        { id: 22, amount: '₹4,300', date: '2024-04-15', customer: 'Sai Kumar', status: 'Completed', paymentMethod: 'Card' },
        { id: 23, amount: '₹8,700', date: '2024-04-25', customer: 'Madhuri Patel', status: 'Completed', paymentMethod: 'UPI' },
      ],
    },
  ],
  searchQuery: '',
  statusFilter: 'all',
  selectedManager: null,
  deactivateId: null,
  deactivateReason: '',
  startDate: '',
  endDate: '',
};

const managersSlice = createSlice({
  name: 'managers',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setSelectedManager: (state, action: PayloadAction<Manager | null>) => {
      state.selectedManager = action.payload;
    },
    setDeactivateId: (state, action: PayloadAction<number | null>) => {
      state.deactivateId = action.payload;
    },
    setDeactivateReason: (state, action: PayloadAction<string>) => {
      state.deactivateReason = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    updateManager: (state, action: PayloadAction<Manager>) => {
      const index = state.managers.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.managers[index] = action.payload;
      }
    },
    addManager: (state, action: PayloadAction<Manager>) => {
      state.managers.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setStatusFilter,
  setSelectedManager,
  setDeactivateId,
  setDeactivateReason,
  setStartDate,
  setEndDate,
  updateManager,
  addManager,
  setLoading,
  setError,
} = managersSlice.actions;
export default managersSlice.reducer;
