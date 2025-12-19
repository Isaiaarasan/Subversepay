import React from "react";
import { Search, Filter, Download, Users } from "lucide-react";

interface Customer {
    id: number;
    name: string;
    email: string;
    merchant: string;
    joined: string;
}

const Customers: React.FC = () => {
    const customers: Customer[] = [
        { id: 1, name: "Alice Brown", email: "alice@gmail.com", merchant: "SpeedNet ISP", joined: "Oct 24, 2024" },
        { id: 2, name: "Bob White", email: "bob@yahoo.com", merchant: "FitZone Gyms", joined: "Oct 22, 2024" },
        { id: 3, name: "Charlie Green", email: "charlie@outlook.com", merchant: "CableNet Sols", joined: "Oct 20, 2024" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers List</h1>
                    <p className="text-gray-500">End-users subscribed to merchants.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 text-gray-700">
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Associated Merchant</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {customers.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">
                                            {item.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-gray-900">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{item.merchant}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.joined}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;