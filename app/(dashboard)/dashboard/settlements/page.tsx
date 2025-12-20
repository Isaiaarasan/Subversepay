"use client";

import React from "react";
import { Download, Search, Filter } from "lucide-react";

interface Settlement {
    id: string;
    from: string;
    to: string;
    amount: string;
    status: string;
    date: string;
    bankLogo: string;
}

const Settlements: React.FC = () => {
    const settlements: Settlement[] = [
        { id: "SET-2024-001", from: "SubversePay", to: "SpeedNet ISP", amount: "₹45,200.00", status: "Completed", date: "Oct 24, 2024", bankLogo: "HDFC" },
        { id: "SET-2024-002", from: "SubversePay", to: "CableNet Sols", amount: "₹12,450.00", status: "Processing", date: "Oct 24, 2024", bankLogo: "ICICI" },
        { id: "SET-2024-003", from: "SubversePay", to: "FitZone Gyms", amount: "₹8,900.00", status: "Failed", date: "Oct 23, 2024", bankLogo: "SBI" },
        { id: "SET-2024-004", from: "SubversePay", to: "TechStart Hub", amount: "₹1,25,000.00", status: "Completed", date: "Oct 23, 2024", bankLogo: "AXIS" },
        { id: "SET-2024-005", from: "SubversePay", to: "Coffee House", amount: "₹3,400.00", status: "Completed", date: "Oct 22, 2024", bankLogo: "PNB" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settlements</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage and track merchant payouts.</p>
                </div>

                <div className="flex gap-2">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search ID..."
                            className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-shadow">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-white/60 dark:border-gray-800 overflow-hidden dark:bg-gray-900/80">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Txn ID</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">From</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">To</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Bank</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {settlements.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors text-xs">
                                <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400 font-bold">{item.id}</td>
                                <td className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{item.from}</td>
                                <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-200">{item.to}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700 dark:text-gray-300">
                                            {item.bankLogo}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-bold text-gray-800 dark:text-gray-200">{item.amount}</td>
                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{item.date}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${item.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900/30' :
                                        item.status === 'Processing' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/30' :
                                            'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-900/30'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Settlements;