"use client";

import React from "react";
import { motion } from "framer-motion";

const TicketOverlayGraph: React.FC = () => {
    const data = [
        { day: 'Mon', open: 12, resolved: 8 },
        { day: 'Tue', open: 15, resolved: 11 },
        { day: 'Wed', open: 9, resolved: 13 },
        { day: 'Thu', open: 18, resolved: 15 },
        { day: 'Fri', open: 14, resolved: 12 },
        { day: 'Sat', open: 6, resolved: 5 },
        { day: 'Sun', open: 4, resolved: 3 },
    ];

    const maxValue = Math.max(...data.flatMap(d => [d.open, d.resolved])) * 1.2;

    return (
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                Ticket Resolution (This Week)
            </h3>

            <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map(y => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#f3f4f6" strokeWidth="0.5" />
                    ))}

                    {/* Area for resolved tickets */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 350 + 25;
                        const resolvedHeight = (d.resolved / maxValue) * 180;
                        const openHeight = (d.open / maxValue) * 180;
                        const yResolved = 200 - resolvedHeight;
                        const yOpen = 200 - openHeight;

                        return (
                            <g key={i}>
                                {/* Resolved area */}
                                <motion.polygon
                                    points={`25,200 ${x},${yResolved} ${x + 50},${yResolved} 375,200`}
                                    fill="#10B981"
                                    fillOpacity="0.3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                />

                                {/* Open area */}
                                <motion.polygon
                                    points={`25,200 ${x},${yOpen} ${x + 50},${yOpen} 375,200`}
                                    fill="#F59E0B"
                                    fillOpacity="0.3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                                />

                                {/* Resolved line */}
                                <motion.line
                                    x1={x - 25}
                                    y1={yResolved}
                                    x2={x + 25}
                                    y2={yResolved}
                                    stroke="#10B981"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                                />

                                {/* Open line */}
                                <motion.line
                                    x1={x - 25}
                                    y1={yOpen}
                                    x2={x + 25}
                                    y2={yOpen}
                                    stroke="#F59E0B"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-2 px-6">
                    {data.map((d, i) => (
                        <span key={i} className="text-xs text-gray-400 font-mono">{d.day}</span>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600">Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-600">Open</span>
                </div>
            </div>
        </div>
    );
};

export default TicketOverlayGraph;