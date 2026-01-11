import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Skeleton */}
            <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 hidden md:block">
                <div className="flex items-center gap-2 mb-8">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col">
                {/* Header Skeleton */}
                <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
                    <Skeleton className="h-8 w-48" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>

                {/* Page Content Skeleton */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Skeleton className="h-32 w-full rounded-xl" />
                        <Skeleton className="h-32 w-full rounded-xl" />
                        <Skeleton className="h-32 w-full rounded-xl" />
                    </div>
                    <Skeleton className="h-96 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}
