"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    Calendar,
    FileText,
    FileSpreadsheet,
    Eye,
    RefreshCw,
    ChevronDown,
    X,
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import {
    selectFilteredPayments,
    setSearchQuery,
    setStatusFilter,
    setPaymentMethodFilter,
    setDateFilter,
    setCustomDateRange,
} from '@/lib/store/slices/paymentsSlice';

type DateFilter = 'currentMonth' | 'past3Months' | 'custom';

const PaymentHistoryTable: React.FC = () => {
    const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
    const dispatch = useAppDispatch();

    const {
        searchQuery,
        statusFilter,
        paymentMethodFilter,
        dateFilter,
        customDateRange,
    } = useAppSelector((state) => state.payments);

    const filteredPayments = useAppSelector(selectFilteredPayments);

    // Initialize custom date picker based on Redux state
    useEffect(() => {
        setShowCustomDatePicker(dateFilter === 'custom');
    }, [dateFilter]);

    const getStatusColor = (status: Payment['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        }
    };

    const getPaymentMethodColor = (method: string) => {
        switch (method) {
            case 'UPI':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Credit Card':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'Debit Card':
                return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
            case 'Net Banking':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const exportToCSV = () => {
        const headers = ['Customer Name', 'Email', 'Amount', 'Payment Method', 'Status', 'Transaction ID', 'Date', 'Plan'];
        const csvData = filteredPayments.map(payment => [
            payment.customerName,
            payment.customerEmail,
            `₹${payment.amount.toLocaleString('en-IN')}`,
            payment.paymentMethod,
            payment.status.charAt(0).toUpperCase() + payment.status.slice(1),
            payment.transactionId,
            new Date(payment.date).toLocaleDateString(),
            payment.planName
        ]);

        const csvContent = [headers, ...csvData]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `payment-history-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        // For now, we'll show an alert. In production, you'd use a PDF library like jsPDF or react-pdf
        alert('PDF export functionality would be implemented here using a PDF library like jsPDF');
    };

    return (
        <div className="space-y-6">
            {/* Header with Title and Export Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Payment History
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        View and manage customer payment records
                    </p>
                </div>

                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <FileSpreadsheet size={16} />
                        Export CSV
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={exportToPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <FileText size={16} />
                        Export PDF
                    </motion.button>
                </div>
            </div>

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
                                    placeholder="Search by name, email, transaction ID..."
                                    value={searchQuery}
                                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                                    className="bg-transparent font-semibold text-xs text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch">
                    {/* Status Filter */}
                    <div className="group relative main-dropdown flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full min-w-[140px]">
                            <div className="flex flex-col justify-center w-full">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Status Filter</span>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Filter size={14} className="text-green-500" />
                                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                                            {statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                                        </span>
                                    </div>
                                    <ChevronDown size={12} className="text-gray-400" />
                                </div>
                            </div>
                            <div className="absolute inset-0 z-10" />
                            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-50">
                                {[
                                    { value: 'all', label: 'All Status' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'failed', label: 'Failed' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => dispatch(setStatusFilter(option.value))}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Filter */}
                    <div className="group relative main-dropdown flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full min-w-[160px]">
                            <div className="flex flex-col justify-center w-full">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Payment Method</span>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Filter size={14} className="text-blue-500" />
                                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                                            {paymentMethodFilter === 'all' ? 'All Methods' : paymentMethodFilter}
                                        </span>
                                    </div>
                                    <ChevronDown size={12} className="text-gray-400" />
                                </div>
                            </div>
                            <div className="absolute inset-0 z-10" />
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-50">
                                {[
                                    { value: 'all', label: 'All Methods' },
                                    { value: 'UPI', label: 'UPI' },
                                    { value: 'Credit Card', label: 'Credit Card' },
                                    { value: 'Debit Card', label: 'Debit Card' },
                                    { value: 'Net Banking', label: 'Net Banking' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => dispatch(setPaymentMethodFilter(option.value))}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div className="group relative main-dropdown flex items-center p-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <div className="relative flex items-center gap-2 px-3 py-1 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full min-w-[160px]">
                            <div className="flex flex-col justify-center w-full">
                                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider leading-none mb-0.5">Date Filter</span>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-purple-500" />
                                        <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                                            {dateFilter === 'currentMonth' ? 'Current Month' :
                                             dateFilter === 'past3Months' ? 'Past 3 Months' :
                                             'Custom Range'}
                                        </span>
                                    </div>
                                    <ChevronDown size={12} className="text-gray-400" />
                                </div>
                            </div>
                            <div className="absolute inset-0 z-10" />
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-50">
                                {[
                                    { value: 'currentMonth', label: 'Current Month' },
                                    { value: 'past3Months', label: 'Past 3 Months' },
                                    { value: 'custom', label: 'Custom Range' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            dispatch(setDateFilter(option.value as DateFilter));
                                            if (option.value !== 'custom') {
                                                setShowCustomDatePicker(false);
                                            } else {
                                                setShowCustomDatePicker(true);
                                            }
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Date Range Picker */}
            <AnimatePresence>
                {showCustomDatePicker && dateFilter === 'custom' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white dark:bg-gray-900/80 backdrop-blur-xl p-4 rounded-xl border border-gray-200 dark:border-gray-800"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={customDateRange.start}
                                    onChange={(e) => dispatch(setCustomDateRange({ ...customDateRange, start: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={customDateRange.end}
                                    onChange={(e) => dispatch(setCustomDateRange({ ...customDateRange, end: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <button
                                onClick={() => setShowCustomDatePicker(false)}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payments Table */}
            <div className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Payment Method
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Plan
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredPayments.map((payment, index) => (
                                <motion.tr
                                    key={payment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {payment.customerName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {payment.customerEmail}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                                            ₹{payment.amount.toLocaleString('en-IN')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(payment.paymentMethod)}`}>
                                            {payment.paymentMethod}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 dark:text-white font-mono">
                                            {payment.transactionId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 dark:text-white">
                                            {new Date(payment.date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 dark:text-white">
                                            {payment.planName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                        >
                                            <Eye size={16} />
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayments.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dark:text-gray-400">
                            No payments found for the selected filters.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistoryTable;