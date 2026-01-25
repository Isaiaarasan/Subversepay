import React from "react";
import { CUSTOMER_TABLE_COLUMNS } from "@/lib/constants/columns";

interface Customer {
    id: number;
    name: string;
    email: string;
    merchant: string;
    joined: string;
}

interface CustomersTableProps {
    customers?: Customer[];
}

const CustomersTable: React.FC<CustomersTableProps> = ({ customers = [] }) => {
    const defaultCustomers: Customer[] = [
        { id: 1, name: "Alice Brown", email: "alice@gmail.com", merchant: "SpeedNet ISP", joined: "Oct 24, 2024" },
        { id: 2, name: "Bob White", email: "bob@yahoo.com", merchant: "FitZone Gyms", joined: "Oct 22, 2024" },
        { id: 3, name: "Charlie Green", email: "charlie@outlook.com", merchant: "CableNet Sols", joined: "Oct 20, 2024" },
    ];

    const displayCustomers = customers.length > 0 ? customers : defaultCustomers;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                        {CUSTOMER_TABLE_COLUMNS.map((col) => (
                            <th key={col} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {displayCustomers.map((item) => (
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
    );
};

export default CustomersTable;