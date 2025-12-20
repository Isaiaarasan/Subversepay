"use client";

import React, { useState } from 'react';
import {
    X, Building, CreditCard, FileText, Users, Code, History, MessageSquare, Settings, Lock, Key
} from 'lucide-react';

interface Merchant {
    id: number;
    name: string;
    logo?: string;
    status: string;
    revenue: string;
    subscribers: number;
    growth: number;
    sector: string;
    email: string;
    phone: string;
    address: string;
    gst: string;
    bank: {
        name: string;
        acc: string;
        ifsc: string;
    };
}

interface MerchantDetailsModalContentProps {
    merchant: Merchant;
    onClose: () => void;
}

const MerchantDetailsModalContent: React.FC<MerchantDetailsModalContentProps> = ({ merchant, onClose }) => {
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = [
        { id: 'Overview', icon: Building, label: 'Overview' },
        { id: 'Team', icon: Users, label: 'Team' },
        { id: 'Developers', icon: Code, label: 'Developers' },
        { id: 'Customers', icon: Users, label: 'Customers' },
        { id: 'Audit', icon: History, label: 'Audit Logs' },
        { id: 'Tickets', icon: MessageSquare, label: 'Tickets' },
        { id: 'Settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {merchant.logo || merchant.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{merchant.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${merchant.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            {merchant.status} Merchant
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>
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
                {/* OVERVIEW TAB */}
                {activeTab === 'Overview' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Total Revenue</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{merchant.revenue}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Subscribers</p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{merchant.subscribers.toLocaleString()}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Growth</p>
                                <p className={`text-lg font-bold ${merchant.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {merchant.growth >= 0 ? '+' : ''}{merchant.growth}%
                                </p>
                            </div>
                        </div>

                        {/* Org Details */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Building size={16} /> Organization Details
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-12">
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Legal Name</label><p className="font-medium text-gray-900 dark:text-white">{merchant.name}</p></div>
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">GSTIN</label><p className="font-medium text-gray-900 dark:text-white">{merchant.gst}</p></div>
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Address</label><p className="font-medium text-gray-900 dark:text-white">{merchant.address}</p></div>
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Sector</label><p className="font-medium text-gray-900 dark:text-white">{merchant.sector}</p></div>
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Contact Email</label><p className="font-medium text-gray-900 dark:text-white">{merchant.email}</p></div>
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Phone</label><p className="font-medium text-gray-900 dark:text-white">{merchant.phone}</p></div>
                            </div>
                        </div>

                        {/* Banking Details */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <CreditCard size={16} /> Banking Details
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-12">
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Bank Name</label><p className="font-medium text-gray-900 dark:text-white">{merchant.bank.name}</p></div>
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Account Number</label><p className="font-mono font-medium text-gray-900 dark:text-white">{merchant.bank.acc}</p></div>
                                <div><label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">IFSC Code</label><p className="font-mono font-medium text-gray-900 dark:text-white">{merchant.bank.ifsc}</p></div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Docs</label>
                                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1 mt-1">
                                        <FileText size={14} /> View Cancelled Cheque
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TEAM TAB */}
                {activeTab === 'Team' && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Name</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Role</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Email</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Admin User</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Owner</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{merchant.email}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded text-xs font-bold">Active</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Support Staff</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Support</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">support@{merchant.name.toLowerCase().replace(/\s/g, '')}.com</td>
                                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded text-xs font-bold">Active</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* DEVELOPERS TAB */}
                {activeTab === 'Developers' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Key size={18} /> API Credentials</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Live Public Key</label>
                                    <div className="flex gap-2 mt-1">
                                        <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-sm font-mono flex-1 text-gray-600 dark:text-gray-300">pk_live_{merchant.id}x98234m2m34...</code>
                                        <button className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">Copy</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Live Secret Key</label>
                                    <div className="flex gap-2 mt-1">
                                        <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-sm font-mono flex-1 text-gray-600 dark:text-gray-300">sk_live_{merchant.id}x98234m2m34...****************</code>
                                        <button className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">Reveal</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Lock size={18} /> Webhooks</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">No webhooks configured.</p>
                            <button className="mt-4 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Configure Webhooks</button>
                        </div>
                    </div>
                )}

                {/* CUSTOMERS TAB */}
                {activeTab === 'Customers' && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Showing recent 5 customers of {merchant.subscribers.toLocaleString()} total.</p>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Email</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">Customer {i}</td>
                                        <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">customer{i}@gmail.com</td>
                                        <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400">Oct {20 + i}, 2024</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* AUDIT LOGS TAB */}
                {activeTab === 'Audit' && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Action</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">User</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                <tr>
                                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">Updated Bank Details</td>
                                    <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">Admin User</td>
                                    <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400">2 days ago</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">API Key Rolled</td>
                                    <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">System</td>
                                    <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400">5 days ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TICKETS TAB */}
                {activeTab === 'Tickets' && (
                    <div className="flex flex-col items-center justify-center h-64 text-center text-gray-400 dark:text-gray-500">
                        <MessageSquare size={48} className="mb-4 text-gray-200 dark:text-gray-700" />
                        <p>No active tickets for this merchant.</p>
                    </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'Settings' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-red-600 dark:text-red-400">Danger Zone</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Actions regarding the merchant account existence.</p>
                            <div className="flex gap-4">
                                <button className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/40">Deactivate Account</button>
                                <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">Reset Password</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MerchantDetailsModalContent;
