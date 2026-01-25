import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="flex h-screen bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-3xl overflow-hidden">
            {/* Sidebar Skeleton */}
            <div className="w-64 border-r border-gray-200/50 dark:border-gray-800/50 p-6 hidden md:flex flex-col gap-8 bg-white/40 dark:bg-black/20 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-blue-600/20 animate-pulse" />
                    <Skeleton className="h-6 w-32 bg-gray-200/60 dark:bg-gray-800/60" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-xl bg-gray-200/50 dark:bg-gray-800/50" />
                    ))}
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col relative">
                {/* Header Skeleton */}
                <div className="h-20 border-b border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between px-8 bg-white/20 dark:bg-black/10 backdrop-blur-md">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-48 bg-gray-200/60 dark:bg-gray-800/60" />
                        <Skeleton className="h-4 w-32 bg-gray-200/40 dark:bg-gray-800/40" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-full bg-gray-200/60 dark:bg-gray-800/60" />
                        <Skeleton className="h-10 w-10 rounded-full bg-gray-200/60 dark:bg-gray-800/60" />
                    </div>
                </div>

                {/* Page Content Skeleton */}
                <div className="p-8 space-y-8 overflow-y-auto">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-32 rounded-2xl bg-white/40 dark:bg-gray-900/40 border border-white/50 dark:border-gray-800/50 p-5 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <Skeleton className="h-4 w-24 bg-gray-200/60 dark:bg-gray-800/60" />
                                    <Skeleton className="h-8 w-8 rounded-lg bg-gray-200/60 dark:bg-gray-800/60" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-32 bg-gray-200/60 dark:bg-gray-800/60" />
                                    <Skeleton className="h-3 w-16 bg-gray-200/60 dark:bg-gray-800/60" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chart Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 h-96 rounded-2xl bg-white/40 dark:bg-gray-900/40 border border-white/50 dark:border-gray-800/50 p-6 flex flex-col gap-4">
                            <Skeleton className="h-6 w-48 bg-gray-200/60 dark:bg-gray-800/60" />
                            <div className="flex-1 flex items-end gap-4 px-4 pb-4">
                                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                    <Skeleton key={i} className="flex-1 rounded-t-lg bg-gray-200/40 dark:bg-gray-800/40" style={{ height: `${Math.random() * 60 + 20}%` }} />
                                ))}
                            </div>
                        </div>
                        <div className="h-96 rounded-2xl bg-white/40 dark:bg-gray-900/40 border border-white/50 dark:border-gray-800/50 p-6 flex flex-col gap-4">
                            <Skeleton className="h-6 w-32 bg-gray-200/60 dark:bg-gray-800/60" />
                            <div className="flex-1 flex items-center justify-center">
                                <Skeleton className="h-48 w-48 rounded-full border-8 border-gray-200/30 dark:border-gray-800/30" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Central Loader (Overlay) */}
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-800/50 flex flex-col items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full" />
                            <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin relative z-10" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase">Loading</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
