"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/lib/store/hooks';
import { addCustomer, Customer } from '@/lib/store/slices/customersSlice';

interface AddCustomerFormProps {
    onClose: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        merchant: '',
        planStatus: 'Active' as 'Active' | 'Expired',
        paymentMethod: '',
        isAutopay: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newCustomer: Customer = {
            id: Date.now(), // Temporary ID generation
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            merchant: formData.merchant,
            joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            planStatus: formData.planStatus,
            paymentMethod: formData.paymentMethod,
            isAutopay: formData.isAutopay,
        };

        dispatch(addCustomer(newCustomer));
        alert('Customer added successfully!');
        onClose();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Customer</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter customer name"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter email address"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Merchant *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.merchant}
                            onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter merchant name"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Plan Status *
                        </label>
                        <select
                            required
                            value={formData.planStatus}
                            onChange={(e) => setFormData({ ...formData, planStatus: e.target.value as 'Active' | 'Expired' })}
                            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                            Payment Method
                        </label>
                        <select
                            value={formData.paymentMethod}
                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="">Select payment method</option>
                            <option value="UPI">UPI</option>
                            <option value="Card">Card</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="Wallet">Wallet</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isAutopay}
                            onChange={(e) => setFormData({ ...formData, isAutopay: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Autopay</span>
                    </label>
                </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
                <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                    Add Customer
                </button>
            </div>
        </div>
    );
};

export default AddCustomerForm;
