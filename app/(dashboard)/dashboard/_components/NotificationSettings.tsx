"use client";

import React, { useState } from "react";
import { Bell, MessageSquare, Mail, Phone, CreditCard } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function NotificationSettings() {
    const [notifications, setNotifications] = useState({
        autopayEnabled: false,
        whatsappEnabled: false,
        smsEnabled: false,
        emailEnabled: false,
    });

    const handleNotificationToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSaveNotificationSettings = () => {
        // Save notification settings logic would go here
        console.log("Saving notification settings:", notifications);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notification Settings
                </h3>
            </div>

            <div className="space-y-6">
                {/* Autopay Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Autopay Notifications
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Receive notifications about autopay processing
                            </p>
                        </div>
                    </div>
                    <Checkbox
                        checked={notifications.autopayEnabled}
                        onCheckedChange={() => handleNotificationToggle('autopayEnabled')}
                    />
                </div>

                {/* WhatsApp Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <MessageSquare className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                WhatsApp Notifications
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Send payment reminders via WhatsApp
                            </p>
                        </div>
                    </div>
                    <Checkbox
                        checked={notifications.whatsappEnabled}
                        onCheckedChange={() => handleNotificationToggle('whatsappEnabled')}
                    />
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Phone className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                SMS Notifications
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Send payment reminders via SMS
                            </p>
                        </div>
                    </div>
                    <Checkbox
                        checked={notifications.smsEnabled}
                        onCheckedChange={() => handleNotificationToggle('smsEnabled')}
                    />
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <Mail className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Notifications
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Send payment reminders via email
                            </p>
                        </div>
                    </div>
                    <Checkbox
                        checked={notifications.emailEnabled}
                        onCheckedChange={() => handleNotificationToggle('emailEnabled')}
                    />
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        onClick={handleSaveNotificationSettings}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        Save Notification Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}