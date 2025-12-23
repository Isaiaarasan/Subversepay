"use client";

import React, { useState } from 'react';
import {
    X, Building, CreditCard, FileText, Users, Code, History, MessageSquare, Settings, Lock, Key, CheckCircle, Eye
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
    managers?: {
        name: string;
        role: string;
        email: string;
        status: string;
    }[];
    los?: {
        name: string;
        role: string;
        email: string;
        status: string;
    }[];
    documents?: {
        name: string;
        status: string;
        url?: string;
        type?: 'image' | 'pdf';
    }[];
}

interface MerchantDetailsModalContentProps {
    merchant: Merchant;
    onClose: () => void;
}

const MerchantDetailsModalContent: React.FC<MerchantDetailsModalContentProps> = ({ merchant, onClose }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedDoc, setSelectedDoc] = useState<{ name: string, status: string, url?: string, type?: 'image' | 'pdf' } | null>(null);
    const [localDocuments, setLocalDocuments] = useState(merchant.documents || []);



    // Password Reset Flow State
    const [passwordResetStep, setPasswordResetStep] = useState<'idle' | 'otp' | 'reset'>('idle');
    const [otpInput, setOtpInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');

    const handleVerifyDocument = (docName: string, newStatus: string) => {
        setLocalDocuments(prev => prev.map(d => d.name === docName ? { ...d, status: newStatus } : d));
        // Close the preview overlay to return to the list
        setSelectedDoc(null);
    };

    const handleVerifyOtp = () => {
        // Mock OTP verification - treat any 6 digit code as valid
        if (otpInput.length >= 4) {
            setPasswordResetStep('reset');
            setOtpInput(''); // Clear for security
        } else {
            alert('Please enter a valid OTP code');
        }
    };

    const handleResetPassword = () => {
        if (newPasswordInput.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        // Mock password update
        alert('Password has been successfully updated');
        setPasswordResetStep('idle');
        setNewPasswordInput('');
    };

    const tabs = [
        { id: 'Overview', icon: Building, label: 'Overview' },
        { id: 'Team', icon: Users, label: 'Team' },
        { id: 'Documents', icon: FileText, label: 'Documents' },
        // { id: 'Developers', icon: Code, label: 'Developers' },
        { id: 'Customers', icon: Users, label: 'Customers' },
        { id: 'Audit', icon: History, label: 'Audit Logs' },
        { id: 'Tickets', icon: MessageSquare, label: 'Tickets' },
        { id: 'Settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="p-6 relative">
            {/* Document Preview Overlay */}
            {selectedDoc && (
                <div className="absolute inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col animate-in fade-in duration-200">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                            <FileText size={20} className="text-blue-500" />
                            {selectedDoc.name}
                        </h3>
                        <button
                            onClick={() => setSelectedDoc(null)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X size={24} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto p-8 bg-gray-50 dark:bg-gray-950/50 flex items-center justify-center">
                        {selectedDoc.type === 'image' && selectedDoc.url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={selectedDoc.url} alt={selectedDoc.name} className="max-w-full max-h-full rounded shadow-lg border border-gray-200 dark:border-gray-800" />
                        ) : selectedDoc.type === 'pdf' && selectedDoc.url ? (
                            <iframe src={selectedDoc.url} className="w-full h-full rounded shadow-lg border border-gray-200 dark:border-gray-800 bg-white" title={selectedDoc.name}></iframe>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400">
                                <FileText size={64} className="mb-4 opacity-50" />
                                <p>Preview not available for this file type.</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Current Status:</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${selectedDoc.status === 'Verified' || selectedDoc.status === 'Approved'
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/30'
                                : selectedDoc.status === 'Rejected'
                                    ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/30'
                                    : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/30'
                                }`}>
                                {selectedDoc.status}
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleVerifyDocument(selectedDoc.name, 'Rejected')}
                                className="px-4 py-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold rounded-lg border border-red-100 dark:border-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2"
                            >
                                <X size={16} /> Reject
                            </button>
                            <button
                                onClick={() => handleVerifyDocument(selectedDoc.name, 'Verified')}
                                className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle size={16} /> Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                    <div className="space-y-6">
                        {/* Managers Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Users size={16} /> Managers
                            </div>
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
                                    {merchant.managers?.length ? merchant.managers.map((manager, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{manager.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{manager.role}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{manager.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${manager.status === 'Active' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                                                    {manager.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No managers listed.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* LOS Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="bg-gray-50/50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Users size={16} /> LOS (Loan Origination Staff)
                            </div>
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
                                    {merchant.los?.length ? merchant.los.map((member, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{member.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{member.role}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{member.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${member.status === 'Active' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                                                    {member.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No LOS staff listed.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {/* 
             
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
                )} */}

                {/* DOCUMENTS TAB */}
                {activeTab === 'Documents' && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Document Name</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {localDocuments.length ? localDocuments.map((doc, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                            {doc.type === 'image' ? <Eye size={16} className="text-blue-500" /> : <FileText size={16} className="text-blue-500" />}
                                            {doc.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${doc.status === 'Verified' || doc.status === 'Approved'
                                                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/30'
                                                : doc.status === 'Rejected'
                                                    ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/30'
                                                    : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/30'
                                                }`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedDoc(doc)}
                                                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center justify-end gap-1 ml-auto"
                                            >
                                                <Eye size={14} /> View
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No documents available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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

                            {passwordResetStep === 'idle' ? (
                                <>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Actions regarding the merchant account existence.</p>
                                    <div className="flex gap-4">
                                        <button className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/40">Deactivate Account</button>
                                        <button
                                            onClick={() => setPasswordResetStep('otp')}
                                            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                </>
                            ) : passwordResetStep === 'otp' ? (
                                <div className="max-w-md animate-in fade-in slide-in-from-top-2 duration-200">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Verify Identity</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">An OTP has been sent to the merchant's email. Please enter it below to proceed with password reset.</p>
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            placeholder="Enter OTP Code"
                                            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={otpInput}
                                            onChange={(e) => setOtpInput(e.target.value)}
                                        />
                                        <button
                                            onClick={handleVerifyOtp}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm"
                                        >
                                            Verify
                                        </button>
                                    </div>
                                    <button onClick={() => setPasswordResetStep('idle')} className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline">Cancel</button>
                                </div>
                            ) : (
                                <div className="max-w-md animate-in fade-in slide-in-from-top-2 duration-200">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Set New Password</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Identity verified. Please enter the new password below.</p>
                                    <div className="space-y-3 mb-4">
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newPasswordInput}
                                            onChange={(e) => setNewPasswordInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleResetPassword}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm"
                                        >
                                            Update Password
                                        </button>
                                        <button onClick={() => setPasswordResetStep('idle')} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium rounded-lg text-sm">Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MerchantDetailsModalContent;
