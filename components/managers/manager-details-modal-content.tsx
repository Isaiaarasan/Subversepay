"use client";

import React, { useState } from 'react';
import {
    X, User, CreditCard, Users, DollarSign, Power, Ban, Edit2, Save, X as XIcon
} from 'lucide-react';
import { Manager, updateManager } from '@/lib/store/slices/managersSlice';
import { useAppDispatch } from '@/lib/store/hooks';

interface ManagerDetailsModalContentProps {
    manager: Manager;
    onClose: () => void;
}

const ManagerDetailsModalContent: React.FC<ManagerDetailsModalContentProps> = ({ manager, onClose }) => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState('Personal Details');
    const [isEditingBanking, setIsEditingBanking] = useState(false);
    const [localManager, setLocalManager] = useState(manager);
    const [bankingFormData, setBankingFormData] = useState(manager.bankingDetails || {
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        accountHolderName: '',
        branch: '',
    });

    const handleStatusToggle = () => {
        const newStatus: 'Active' | 'Inactive' = localManager.status === 'Active' ? 'Inactive' : 'Active';
        const updatedManager: Manager = { ...localManager, status: newStatus };
        setLocalManager(updatedManager);
        dispatch(updateManager(updatedManager));
    };

    const handleBankingSave = () => {
        const updatedManager: Manager = { ...localManager, bankingDetails: bankingFormData };
        setLocalManager(updatedManager);
        dispatch(updateManager(updatedManager));
        setIsEditingBanking(false);
    };

    const handleBankingCancel = () => {
        setBankingFormData(manager.bankingDetails || {
            bankName: '',
            accountNumber: '',
            ifscCode: '',
            accountHolderName: '',
            branch: '',
        });
        setIsEditingBanking(false);
    };

    const tabs = [
        { id: 'Personal Details', icon: User, label: 'Personal Details' },
        { id: 'Banking Details', icon: CreditCard, label: 'Banking Details' },
        { id: 'Customer Details', icon: Users, label: 'Customer Details' },
        { id: 'Collection Details', icon: DollarSign, label: 'Collection Details' },
    ];

    return (
        <div className="p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {manager.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{manager.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${manager.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            {manager.status} Manager
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
                {/* PERSONAL DETAILS TAB */}
                {activeTab === 'Personal Details' && (
                    <div className="space-y-6">
                        {/* Account Status Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Power size={16} /> Account Status
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${localManager.status === 'Active'
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30'
                                        : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30'
                                        }`}>
                                        {localManager.status}
                                    </span>
                                    {localManager.status === 'Active' ? (
                                        <button
                                            onClick={handleStatusToggle}
                                            className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold rounded-lg border border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
                                        >
                                            <Ban size={16} /> Deactivate
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleStatusToggle}
                                            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-lg border border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                                        >
                                            <Power size={16} /> Activate
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <User size={16} /> Personal Information
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">First Name</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.firstName || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Last Name</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.lastName || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Email</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.email || manager.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Phone</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.phone || manager.phone}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Date of Birth</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.dateOfBirth || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">PAN</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.pan || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Aadhaar</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.aadhaar || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Address</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.address || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">City</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.city || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">State</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.state || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Pincode</label>
                                    <p className="font-medium text-gray-900 dark:text-white">{localManager.personalDetails?.pincode || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* BANKING DETAILS TAB */}
                {activeTab === 'Banking Details' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CreditCard size={16} /> Banking Details
                                </div>
                                {!isEditingBanking ? (
                                    <button
                                        onClick={() => setIsEditingBanking(true)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                    >
                                        <Edit2 size={14} /> Edit
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleBankingCancel}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <XIcon size={14} /> Cancel
                                        </button>
                                        <button
                                            onClick={handleBankingSave}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-lg border border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
                                        >
                                            <Save size={14} /> Save
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 block">Bank Name</label>
                                    {isEditingBanking ? (
                                        <input
                                            type="text"
                                            value={bankingFormData.bankName}
                                            onChange={(e) => setBankingFormData({ ...bankingFormData, bankName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="font-medium text-gray-900 dark:text-white">{bankingFormData.bankName || 'N/A'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 block">Account Number</label>
                                    {isEditingBanking ? (
                                        <input
                                            type="text"
                                            value={bankingFormData.accountNumber}
                                            onChange={(e) => setBankingFormData({ ...bankingFormData, accountNumber: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="font-mono font-medium text-gray-900 dark:text-white">{bankingFormData.accountNumber || 'N/A'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 block">IFSC Code</label>
                                    {isEditingBanking ? (
                                        <input
                                            type="text"
                                            value={bankingFormData.ifscCode}
                                            onChange={(e) => setBankingFormData({ ...bankingFormData, ifscCode: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="font-mono font-medium text-gray-900 dark:text-white">{bankingFormData.ifscCode || 'N/A'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 block">Account Holder Name</label>
                                    {isEditingBanking ? (
                                        <input
                                            type="text"
                                            value={bankingFormData.accountHolderName}
                                            onChange={(e) => setBankingFormData({ ...bankingFormData, accountHolderName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="font-medium text-gray-900 dark:text-white">{bankingFormData.accountHolderName || 'N/A'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 block">Branch</label>
                                    {isEditingBanking ? (
                                        <input
                                            type="text"
                                            value={bankingFormData.branch || ''}
                                            onChange={(e) => setBankingFormData({ ...bankingFormData, branch: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="font-medium text-gray-900 dark:text-white">{bankingFormData.branch || 'N/A'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CUSTOMER DETAILS TAB */}
                {activeTab === 'Customer Details' && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Users size={16} /> Customer Details
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Customer Name</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Email</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Phone</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Joined Date</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {localManager.customers && localManager.customers.length > 0 ? (
                                    localManager.customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{customer.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{customer.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{customer.phone}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{customer.joinedDate}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${customer.status === 'Active' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No customers assigned to this manager.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* COLLECTION DETAILS TAB */}
                {activeTab === 'Collection Details' && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <DollarSign size={16} /> Collection Details
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Collection ID</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Payment Method</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {localManager.collections && localManager.collections.length > 0 ? (
                                    localManager.collections.map((collection) => (
                                        <tr key={collection.id}>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">#{collection.id}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">{collection.amount}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{collection.customer}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{collection.date}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{collection.paymentMethod}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${collection.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'}`}>
                                                    {collection.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No collection records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerDetailsModalContent;
