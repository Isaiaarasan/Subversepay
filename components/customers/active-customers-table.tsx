"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    Eye,
    Bell,
    RefreshCw,
    Plus,
    Upload,
    X,
} from 'lucide-react';
import CustomerDetailsModalContent from './customer-details-modal-content';
import AddCustomerForm from './add-customer-form';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import {
    setSearchQuery,
    setPlanStatusFilter,
    selectFilteredCustomers,
    Customer,
} from '@/lib/store/slices/customersSlice';

const ActiveCustomersTable: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUploadCSV, setShowUploadCSV] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const dispatch = useAppDispatch();
    
    const {
        searchQuery,
        planStatusFilter,
    } = useAppSelector((state) => state.customers);
    
    const filteredCustomers = useAppSelector(selectFilteredCustomers);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSendReminder = (customer: Customer) => {
        if (window.confirm(`Send payment reminder to ${customer.name}?`)) {
            // TODO: Implement send reminder logic
            alert(`Payment reminder sent to ${customer.email}`);
        }
    };

    const handleTriggerRetry = (customer: Customer) => {
        if (window.confirm(`Trigger payment retry for ${customer.name}?`)) {
            // TODO: Implement trigger retry logic
            alert(`Payment retry triggered for ${customer.name}`);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="relative z-30 flex flex-col sm:flex-row justify-between items-stretch gap-4 bg-white dark:bg-gray-900/80 backdrop-blur-xl p-1 rounded-xl border border-transparent dark:border-gray-800">

                {/* Search Bar */}
                <div className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 flex-1 sm:max-w-md">
                    <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-text w-full group-focus-within:bg-gray-50 dark:group-focus-within:bg-gray-800/50">
                        <div className="flex flex-col justify-center w-full">
                            <div className="flex items-center gap-2">
                                <Search className="text-blue-500 shrink-0" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search by name, email..."
                                    value={searchQuery}
                                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                    className="bg-transparent font-semibold text-xs text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch">

                    {/* Plan Status Filter */}
                    <div className="group relative main-dropdown flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full min-w-[140px]">
                            <div className="flex flex-col justify-center w-full">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Filter Status</span>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Filter size={14} className="text-purple-500" />
                                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                                            {planStatusFilter === 'all' ? 'All Status' : planStatusFilter}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 z-10" />
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-50">
                                {['all', 'Active', 'Expired'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => dispatch(setPlanStatusFilter(status))}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${planStatusFilter === status ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        {status === 'all' ? 'All Customers' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Add Customer Button */}
                    <div className="group relative">
                        <button 
                            onClick={() => setShowAddForm(true)}
                            className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-300 w-full"
                        >
                            <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent transition-colors w-full h-full">
                                <div className="flex flex-col justify-center w-full h-full">
                                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Action</span>
                                    <div className="flex items-center gap-2">
                                        <Plus size={14} className="text-blue-500" />
                                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">Add Customer</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                        {/* Upload Type Dropdown */}
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-50">
                            <button
                                onClick={() => {
                                    setShowUploadCSV(true);
                                    setShowAddForm(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <Upload size={14} />
                                Upload CSV
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddForm(true);
                                    setShowUploadCSV(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <Plus size={14} />
                                Add Customer Form
                            </button>
                        </div>
                    </div>

                    {/* Export Button */}
                    <button className="group flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-300">
                        <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent transition-colors w-full h-full">
                            <div className="flex flex-col justify-center w-full h-full">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Action</span>
                                <div className="flex items-center gap-2">
                                    <Download size={14} className="text-emerald-500" />
                                    <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">Export CSV</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer Name</th>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Merchant</th>
                                <th className="px-6 py-4 text-center text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan Status</th>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Method</th>
                                <th className="px-6 py-4 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredCustomers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <td className="px-6 py-3 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-100 dark:border-blue-900/30 text-[10px]">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-gray-100 text-xs hover:text-blue-600 transition-colors">{customer.name}</div>
                                                <div className="text-[10px] text-gray-500 dark:text-gray-400">#{customer.id}</div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); }}
                                                    className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline mt-1 font-medium"
                                                >
                                                    <Eye size={10} /> View Details
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-xs text-gray-600 dark:text-gray-400 font-medium">{customer.email}</td>
                                    <td className="px-6 py-3">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                            {customer.merchant}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${customer.planStatus === 'Active'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
                                            }`}>
                                            {customer.planStatus}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-xs text-gray-600 dark:text-gray-400 font-medium">
                                        {customer.paymentMethod || 'N/A'}
                                    </td>
                                    <td className="px-6 py-3 text-xs text-gray-600 dark:text-gray-400 font-medium">{customer.joined}</td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2 min-w-[200px]">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSendReminder(customer);
                                                }}
                                                className="group flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-200 transition-all shadow-sm"
                                                title="Send Payment Reminder"
                                            >
                                                <Bell size={12} className="group-hover:scale-110 transition-transform" />
                                                <span>Reminder</span>
                                            </button>
                                            {customer.isAutopay && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTriggerRetry(customer);
                                                    }}
                                                    className="group flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-purple-100 dark:border-purple-900/30 bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-200 transition-all shadow-sm"
                                                    title="Trigger Payment Retry"
                                                >
                                                    <RefreshCw size={12} className="group-hover:scale-110 transition-transform" />
                                                    <span>Retry</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="text-gray-500 dark:text-gray-400 text-xs">Showing <span className="font-bold text-gray-900 dark:text-white">1-{filteredCustomers.length}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredCustomers.length}</span></div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Customer Details Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedCustomer && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedCustomer(null)}
                        >
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="bg-slate-50 dark:bg-gray-950 w-full max-w-4xl h-full shadow-2xl overflow-y-auto"
                                onClick={e => e.stopPropagation()}
                            >
                                <CustomerDetailsModalContent
                                    customer={selectedCustomer}
                                    onClose={() => setSelectedCustomer(null)}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Add Customer Form Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowAddForm(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-white dark:bg-gray-900 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col"
                                onClick={e => e.stopPropagation()}
                            >
                                <AddCustomerForm onClose={() => setShowAddForm(false)} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Upload CSV Modal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {showUploadCSV && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowUploadCSV(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upload CSV</h3>
                                        <button
                                            onClick={() => setShowUploadCSV(false)}
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                                        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Drop your CSV file here or click to browse</p>
                                        <input type="file" accept=".csv" className="hidden" id="csv-upload" />
                                        <label
                                            htmlFor="csv-upload"
                                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 text-sm font-medium"
                                        >
                                            Select File
                                        </label>
                                    </div>
                                    <div className="mt-6 flex gap-3 justify-end">
                                        <button
                                            onClick={() => setShowUploadCSV(false)}
                                            className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                // TODO: Implement CSV upload logic
                                                alert('CSV upload functionality to be implemented');
                                                setShowUploadCSV(false);
                                            }}
                                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default ActiveCustomersTable;
