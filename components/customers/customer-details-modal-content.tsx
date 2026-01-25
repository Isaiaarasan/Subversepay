"use client";

import React, { useState } from 'react';
import {
    X, User, CreditCard, Package, Bell, RefreshCw, Plus, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { Customer } from '@/lib/store/slices/customersSlice';

interface CustomerDetailsModalContentProps {
    customer: Customer;
    onClose: () => void;
}

const CustomerDetailsModalContent: React.FC<CustomerDetailsModalContentProps> = ({ customer, onClose }) => {
    const [activeTab, setActiveTab] = useState('Personal Details');
    const [showAttachPlanForm, setShowAttachPlanForm] = useState(false);
    const [showRecordPaymentForm, setShowRecordPaymentForm] = useState(false);
    const [localCustomer, setLocalCustomer] = useState(customer);

    const handleSendReminder = () => {
        if (window.confirm(`Send payment reminder to ${customer.name}?`)) {
            // TODO: Implement send reminder logic
            alert(`Payment reminder sent to ${customer.email}`);
        }
    };

    const handleTriggerRetry = () => {
        if (window.confirm(`Trigger payment retry for ${customer.name}?`)) {
            // TODO: Implement trigger retry logic
            alert(`Payment retry triggered for ${customer.name}`);
        }
    };

    const tabs = [
        { id: 'Personal Details', icon: User, label: 'Personal Details' },
        { id: 'Plan Details', icon: Package, label: 'Plan Details' },
        { id: 'Payment Details', icon: CreditCard, label: 'Payment Details' },
    ];

    return (
        <div className="p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {customer.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{customer.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${customer.planStatus === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            {customer.planStatus} Plan
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {customer.isAutopay && (
                        <button
                            onClick={handleTriggerRetry}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold rounded-lg border border-purple-100 dark:border-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                            title="Trigger Payment Retry"
                        >
                            <RefreshCw size={16} /> Retry
                        </button>
                    )}
                    <button
                        onClick={handleSendReminder}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        title="Send Payment Reminder"
                    >
                        <Bell size={16} /> Reminder
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X size={24} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 mb-6 gap-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-500'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="space-y-6 min-h-[400px]">
                {/* PERSONAL DETAILS TAB */}
                {activeTab === 'Personal Details' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <User size={16} /> Personal Information
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Name</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Email</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Phone</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Merchant</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.merchant}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Joined Date</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.joined}</p>
                                </div>
                                {customer.personalDetails?.address && (
                                    <>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Address</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.personalDetails.address}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">City</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.personalDetails.city}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">State</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.personalDetails.state}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Pincode</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.personalDetails.pincode}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* PLAN DETAILS TAB */}
                {activeTab === 'Plan Details' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Package size={16} /> Plan Information
                                </div>
                                <button
                                    onClick={() => setShowAttachPlanForm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                >
                                    <Plus size={16} /> Attach Plan
                                </button>
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-12">
                                {customer.planDetails ? (
                                    <>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Plan Name</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.planDetails.planName || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Plan Amount</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.planDetails.planAmount || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Billing Cycle</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.planDetails.billingCycle || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Plan Status</label>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border ${customer.planStatus === 'Active'
                                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                                                : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
                                                }`}>
                                                {customer.planStatus}
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Start Date</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.planDetails.startDate || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">End Date</label>
                                            <p className="font-medium text-gray-900 dark:text-white">{customer.planDetails.endDate || 'N/A'}</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
                                        No plan attached. Click "Attach Plan" to add a plan.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* PAYMENT DETAILS TAB */}
                {activeTab === 'Payment Details' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CreditCard size={16} /> Payment Information
                                </div>
                                <button
                                    onClick={() => setShowRecordPaymentForm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                >
                                    <Plus size={16} /> Record Payment
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Current Payment Method */}
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 block">Current Payment Method</label>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <CreditCard size={20} className="text-blue-600 dark:text-blue-400" />
                                        <span className="font-medium text-gray-900 dark:text-white">{customer.paymentMethod || 'Not Set'}</span>
                                        {customer.isAutopay && (
                                            <span className="ml-auto px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold rounded border border-green-100 dark:border-green-900/30">
                                                Autopay Enabled
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Payment History */}
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-4 block">Payment History</label>
                                    {customer.paymentHistory && customer.paymentHistory.length > 0 ? (
                                        <div className="space-y-3">
                                            {customer.paymentHistory.map((payment) => (
                                                <div
                                                    key={payment.id}
                                                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        {payment.status === 'Paid' && <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />}
                                                        {payment.status === 'Pending' && <Clock size={20} className="text-yellow-600 dark:text-yellow-400" />}
                                                        {payment.status === 'Failed' && <XCircle size={20} className="text-red-600 dark:text-red-400" />}
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">{payment.amount}</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">{payment.date} • {payment.paymentMethod}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                                                        payment.status === 'Paid'
                                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                                                            : payment.status === 'Pending'
                                                            ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/30'
                                                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900/30'
                                                    }`}>
                                                        {payment.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            No payment history available.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Attach Plan Form Modal */}
            {showAttachPlanForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-3xl px-4">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Attach Plan</h3>
                                <button
                                    onClick={() => setShowAttachPlanForm(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Plan Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="Enter plan name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Plan Amount</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="Enter amount"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Billing Cycle</label>
                                    <select className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                                        <option>Monthly</option>
                                        <option>Quarterly</option>
                                        <option>Yearly</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end mt-6">
                                <button
                                    onClick={() => setShowAttachPlanForm(false)}
                                    className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // TODO: Implement attach plan logic
                                        alert('Plan attached successfully');
                                        setShowAttachPlanForm(false);
                                    }}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                >
                                    Attach Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Record Payment Form Modal */}
            {showRecordPaymentForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-3xl px-4">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Record Payment</h3>
                                <button
                                    onClick={() => setShowRecordPaymentForm(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Amount</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="Enter amount"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Payment Method</label>
                                    <select className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                                        <option>UPI</option>
                                        <option>Card</option>
                                        <option>Net Banking</option>
                                        <option>Wallet</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Status</label>
                                    <select className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                                        <option>Paid</option>
                                        <option>Pending</option>
                                        <option>Failed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end mt-6">
                                <button
                                    onClick={() => setShowRecordPaymentForm(false)}
                                    className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // TODO: Implement record payment logic
                                        alert('Payment recorded successfully');
                                        setShowRecordPaymentForm(false);
                                    }}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                >
                                    Record Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerDetailsModalContent;
