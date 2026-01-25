"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/lib/store/hooks';
import { addManager, Manager } from '@/lib/store/slices/managersSlice';

interface AddManagerFormProps {
    onClose: () => void;
}

const AddManagerForm: React.FC<AddManagerFormProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        personalDetails: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            dateOfBirth: '',
            pan: '',
            aadhaar: '',
        },
        bankingDetails: {
            bankName: '',
            accountNumber: '',
            ifscCode: '',
            accountHolderName: '',
            branch: '',
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Generate a new ID (in real app, this would come from backend)
        const newId = Date.now();
        
        const newManager: Manager = {
            id: newId,
            name: `${formData.personalDetails.firstName} ${formData.personalDetails.lastName}`,
            email: formData.personalDetails.email,
            phone: formData.personalDetails.phone,
            role: 'Manager', // Default role, can be made editable
            status: 'Active',
            joinedDate: new Date().toISOString().split('T')[0],
            personalDetails: formData.personalDetails,
            bankingDetails: formData.bankingDetails,
            customers: [],
            collections: [],
        };

        dispatch(addManager(newManager));
        onClose();
    };

    return (
        <div className="flex flex-col h-full max-h-[90vh]">
            {/* Fixed Header */}
            <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Manager</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details Section */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">First Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.personalDetails.firstName}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, firstName: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Last Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.personalDetails.lastName}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, lastName: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Email *</label>
                            <input
                                type="email"
                                required
                                value={formData.personalDetails.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, email: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Phone *</label>
                            <input
                                type="tel"
                                required
                                value={formData.personalDetails.phone}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, phone: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Date of Birth</label>
                            <input
                                type="date"
                                value={formData.personalDetails.dateOfBirth}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, dateOfBirth: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">PAN</label>
                            <input
                                type="text"
                                value={formData.personalDetails.pan}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, pan: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Aadhaar</label>
                            <input
                                type="text"
                                value={formData.personalDetails.aadhaar}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, aadhaar: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Address</label>
                            <input
                                type="text"
                                value={formData.personalDetails.address}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, address: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">City</label>
                            <input
                                type="text"
                                value={formData.personalDetails.city}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, city: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">State</label>
                            <input
                                type="text"
                                value={formData.personalDetails.state}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, state: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Pincode</label>
                            <input
                                type="text"
                                value={formData.personalDetails.pincode}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personalDetails: { ...formData.personalDetails, pincode: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Banking Details Section */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Banking Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Bank Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.bankingDetails.bankName}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    bankingDetails: { ...formData.bankingDetails, bankName: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Account Number *</label>
                            <input
                                type="text"
                                required
                                value={formData.bankingDetails.accountNumber}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    bankingDetails: { ...formData.bankingDetails, accountNumber: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">IFSC Code *</label>
                            <input
                                type="text"
                                required
                                value={formData.bankingDetails.ifscCode}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    bankingDetails: { ...formData.bankingDetails, ifscCode: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Account Holder Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.bankingDetails.accountHolderName}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    bankingDetails: { ...formData.bankingDetails, accountHolderName: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Branch</label>
                            <input
                                type="text"
                                value={formData.bankingDetails.branch}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    bankingDetails: { ...formData.bankingDetails, branch: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-600 dark:to-blue-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default AddManagerForm;
