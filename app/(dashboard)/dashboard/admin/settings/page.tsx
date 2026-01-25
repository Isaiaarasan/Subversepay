import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { BillingSettings } from "../../_components/BillingSettings";
import { NotificationSettings } from "../../_components/NotificationSettings";
import { TemplateManagement } from "../../_components/TemplateManagement";

export default async function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <PageHeader
                    title="Settings"
                    description="Manage your billing preferences, notifications, and message templates."
                    icon={SettingsIcon}
                />
            </div>

            {/* Billing Settings */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <BillingSettings />
            </div>

            {/* Notification Settings */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <NotificationSettings />
            </div>

            {/* Template Management */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-none">
                <TemplateManagement />
            </div>
        </div>
    );
}