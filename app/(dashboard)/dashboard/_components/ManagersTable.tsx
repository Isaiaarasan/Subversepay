import React from "react";
import { StatusBadge } from "./StatusBadge";
import { EmptyState } from "./EmptyState";
import { Users } from "lucide-react";

interface Manager {
    id: number;
    name: string;
    email: string;
    role: string;
    lastActive: string;
    status: string;
}

interface ManagersTableProps {
    managers?: Manager[];
}

const ManagersTable: React.FC<ManagersTableProps> = ({ managers = [] }) => {
    const defaultManagers: Manager[] = [
        { id: 1, name: "John Doe", email: "john@subverse.ai", role: "Ops Manager", lastActive: "2 mins ago", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@subverse.ai", role: "Support Lead", lastActive: "1 hour ago", status: "Active" },
        { id: 3, name: "Mike Johnson", email: "mike@subverse.ai", role: "Finance Manager", lastActive: "1 day ago", status: "Inactive" },
    ];

    const displayManagers = managers.length > 0 ? managers : defaultManagers;

    if (displayManagers.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <EmptyState
                    icon={Users}
                    title="No managers found"
                    description="There are no managers matching your search criteria."
                />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Last Active</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {displayManagers.map((item) => (
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
                            <td className="px-6 py-4">
                                <StatusBadge status={item.status} size="sm" />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{item.lastActive}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagersTable;