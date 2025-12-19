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
                    <h1 className="text-2xl font-bold text-gray-900">Settlements</h1>
                    <p className="text-gray-500">Manage and track merchant payouts.</p>
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search ID..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 text-gray-700">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-shadow">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-white/60 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Txn ID</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">From</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">To</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bank</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {settlements.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors text-xs">
                                <td className="px-4 py-3 font-mono text-blue-600 font-bold">{item.id}</td>
                                <td className="px-4 py-3 font-medium text-gray-500">{item.from}</td>
                                <td className="px-4 py-3 font-bold text-gray-900">{item.to}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[8px] font-bold text-gray-700">
                                            {item.bankLogo}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-bold text-gray-800">{item.amount}</td>
                                <td className="px-4 py-3 text-gray-500">{item.date}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        item.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
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