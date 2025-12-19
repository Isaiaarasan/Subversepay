import React from "react";
import { Search, Filter, Download, UserCheck } from "lucide-react";

interface Manager {
    id: number;
    name: string;
    email: string;
    role: string;
    lastActive: string;
}

const Managers: React.FC = () => {
    const managers: Manager[] = [
        { id: 1, name: "John Doe", email: "john@subverse.ai", role: "Ops Manager", lastActive: "2 mins ago" },
        { id: 2, name: "Jane Smith", email: "jane@subverse.ai", role: "Support Lead", lastActive: "1 hour ago" },
        { id: 3, name: "Mike Johnson", email: "mike@subverse.ai", role: "Finance Manager", lastActive: "1 day ago" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Managers List</h1>
                    <p className="text-gray-500">Platform operational staff.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md">
                        + Add Manager
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Last Active</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {managers.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {item.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-gray-900">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{item.role}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.lastActive}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Managers;