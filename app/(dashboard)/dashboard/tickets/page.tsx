"use client";

import React, { useState } from "react";
import { MessageSquare, Paperclip, X, User, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DateRangeFilter } from "@/components/ui/date-range-filter";

interface Ticket {
    id: string;
    title: string;
    priority: string;
    user: string;
    status: string;
    date: string;
    description: string;
    type: string;
    attachments: boolean;
    createdDate?: string;
}

const Tickets: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [closeTicketReason, setCloseTicketReason] = useState("");
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [tickets, setTickets] = useState<Ticket[]>([
        { id: "TCK-9921", title: "API Integration Error", priority: "High", user: "John Doe (Manager)", status: "Open", date: "2 hours ago", description: "Getting 500 errors on the payment endpoint repeatedly.", type: "Manager", attachments: true, createdDate: "2024-10-24" },
        { id: "TCK-9922", title: "Settlement Delay Check", priority: "Medium", user: "Alice Smith (Admin)", status: "In Progress", date: "5 hours ago", description: "Settlement for ID SET-2024-001 hasn't reflected yet.", type: "Admin", attachments: false, createdDate: "2024-10-24" },
        { id: "TCK-9920", title: "Login Failure for Staff", priority: "Critical", user: "Tech Team (Customer)", status: "Open", date: "1 day ago", description: "Staff members unable to login from new IP range.", type: "Customer", attachments: true, createdDate: "2024-10-23" },
        { id: "TCK-9919", title: "Merchant Onboarding Issue", priority: "Medium", user: "Sarah Wilson (Merchant)", status: "Open", date: "3 hours ago", description: "New merchant unable to complete registration process.", type: "Merchant", attachments: false, createdDate: "2024-10-24" },
        { id: "TCK-9918", title: "Webhook Delivery Failure", priority: "High", user: "Dev Team (Admin)", status: "In Progress", date: "6 hours ago", description: "Payment webhooks not being delivered to merchant endpoint.", type: "Admin", attachments: true, createdDate: "2024-10-24" },
        { id: "TCK-9917", title: "Transaction Timeout", priority: "Critical", user: "Bob Johnson (Customer)", status: "Open", date: "8 hours ago", description: "Payment transactions timing out during peak hours.", type: "Customer", attachments: false, createdDate: "2024-10-24" },
        { id: "TCK-9916", title: "Dashboard Loading Slow", priority: "Low", user: "Mike Chen (Manager)", status: "Open", date: "1 day ago", description: "Dashboard taking too long to load analytics data.", type: "Manager", attachments: true, createdDate: "2024-10-23" },
        { id: "TCK-9915", title: "Refund Request Processing", priority: "Medium", user: "Lisa Park (Merchant)", status: "Closed", date: "2 days ago", description: "Refund request taking longer than usual to process.", type: "Merchant", attachments: false, createdDate: "2024-10-22" },
        { id: "TCK-9914", title: "API Rate Limiting", priority: "High", user: "Tom Brown (Admin)", status: "Closed", date: "3 days ago", description: "API calls being rate limited unexpectedly.", type: "Admin", attachments: true, createdDate: "2024-10-21" },
    ]);

    // Filter tickets based on active tab and search query
    const filteredTickets = tickets.filter(ticket => {
        // First filter by tab (active vs closed)
        const statusMatch = activeTab === 'active'
            ? ticket.status !== 'Closed'
            : ticket.status === 'Closed';

        // Then filter by search query if provided
        const searchMatch = !searchQuery ||
            ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.status.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDate = (!startDate || (ticket.createdDate && ticket.createdDate >= startDate)) &&
            (!endDate || (ticket.createdDate && ticket.createdDate <= endDate));

        // Note: Logic allows search filtering OR date filtering. Usually AND.
        // The original code returned (statusMatch && searchMatch)
        // I'll make it (statusMatch && searchMatch && matchesDate)
        return statusMatch && searchMatch && matchesDate;
    });

    const handleTicketClick = (ticket: Ticket) => {
        setSelectedTicket(ticket);
    };

    const handleCloseTicketClick = () => {
        setShowCloseModal(true);
        setCloseTicketReason("");
    };

    const confirmCloseTicket = () => {
        if (!closeTicketReason) return alert("Please provide a reason.");
        alert("Ticket Closed: " + closeTicketReason);
        setShowCloseModal(false);
        // Logic to update ticket status
    };

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage and resolve user issues.</p>
                </div>
                <DateRangeFilter startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 shrink-0">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 text-xs font-medium transition-colors border-b-2 ${activeTab === 'active' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                >
                    Active Tickets ({tickets.filter(t => t.status !== 'Closed').length})
                </button>
                <button
                    onClick={() => setActiveTab('closed')}
                    className={`px-4 py-2 text-xs font-medium transition-colors border-b-2 ${activeTab === 'closed' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                >
                    Closed Tickets ({tickets.filter(t => t.status === 'Closed').length})
                </button>
            </div>

            {/* Tickets Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
                {/* List Column */}
                <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl border border-white/60 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col shadow-lg shadow-slate-200/50 dark:shadow-none dark:bg-gray-900/80">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search tickets by title, ID, user, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 pl-10 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Found {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} matching "{searchQuery}"
                            </div>
                        )}
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {filteredTickets.length > 0 ? (
                            filteredTickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    onClick={() => handleTicketClick(ticket)}
                                    className={`p-3 rounded-xl border transition-all cursor-pointer group ${selectedTicket?.id === ticket.id ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-mono text-gray-400 font-bold">{ticket.id}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${ticket.priority === 'Critical' ? 'bg-red-100 text-red-600' :
                                            ticket.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                            }`}>{ticket.priority}</span>
                                    </div>
                                    <h3 className={`font-bold text-sm mb-1 ${selectedTicket?.id === ticket.id ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>{ticket.title}</h3>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center text-xs text-gray-500 gap-1.5">
                                            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                                                {ticket.user.charAt(0)}
                                            </div>
                                            <span className="truncate max-w-[100px]">{ticket.user}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400">{ticket.date}</span>
                                    </div>
                                </div>
                            ))
                        ) : searchQuery ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No tickets found</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">Try adjusting your search terms</p>
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="mt-3 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                >
                                    Clear search
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                                    <MessageSquare className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">No tickets available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none flex flex-col overflow-hidden relative dark:bg-gray-900/80">
                    {selectedTicket ? (
                        <>
                            {/* Detailed Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedTicket.title}</h2>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-mono rounded border border-gray-200">{selectedTicket.id}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1"><User size={14} /> {selectedTicket.user} <span className="text-gray-300 dark:text-gray-600">|</span> <span className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 rounded">{selectedTicket.type}</span></span>
                                        <span>Created: {selectedTicket.date}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        Assign
                                    </button>
                                    <button onClick={handleCloseTicketClick} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-shadow">
                                        Resolve
                                    </button>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 p-8 overflow-y-auto">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-2">Description</h3>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                                            {selectedTicket.description}
                                        </p>
                                    </div>

                                    {selectedTicket.attachments && (
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-2">Attachments</h3>
                                            <div className="flex gap-3">
                                                <div className="w-32 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                                    <Paperclip size={20} />
                                                    <span className="text-xs ml-1">Error.png</span>
                                                </div>
                                                <div className="w-32 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                                    <Paperclip size={20} />
                                                    <span className="text-xs ml-1">Log.txt</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">Discussion</h3>
                                        {/* Mock Chat Interface */}
                                        <div className="space-y-4">
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                                                    SA
                                                </div>
                                                <div>
                                                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg rounded-tl-none">
                                                        <p className="text-sm text-gray-800 dark:text-gray-200">Hi, we are looking into this issue. Can you provide the exact timestamp?</p>
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 mt-1">Super Admin • 1 hour ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reply Box */}
                            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                                <div className="relative">
                                    <textarea placeholder="Type your reply..." className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none h-14 min-h-[56px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"></textarea>
                                    <button className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        <Paperclip size={16} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <MessageSquare size={40} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Ticket Selected</h3>
                            <p className="text-gray-500 max-w-sm">Select a ticket from the sidebar to view details, reply to customers, or manage status.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Close Ticket Modal */}
            <AnimatePresence>
                {showCloseModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle className="text-green-500" size={20} /> Resolve Ticket
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">Please provide a reason or resolution summary for closing this ticket.</p>
                            <textarea
                                value={closeTicketReason}
                                onChange={(e) => setCloseTicketReason(e.target.value)}
                                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500/20 outline-none resize-none mb-4"
                                placeholder="Resolution summary..."
                            ></textarea>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setShowCloseModal(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button onClick={confirmCloseTicket} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-lg shadow-green-500/30">Confirm Close</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tickets;
