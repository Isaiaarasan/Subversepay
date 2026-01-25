"use client";

import React, { useState } from "react";
import { Calendar, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function BillingSettings() {
    const [billingDate, setBillingDate] = useState("1");
    const [autopayEnabled, setAutopayEnabled] = useState(false);
    const [isCheckingCustomers, setIsCheckingCustomers] = useState(false);

    // Mock function to check if any customers are using autopay
    const checkCustomersUsingAutopay = async () => {
        setIsCheckingCustomers(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsCheckingCustomers(false);
        // Mock result - in real implementation, this would check the database
        return false; // No customers using autopay
    };

    const handleAutopayToggle = async (enabled: boolean) => {
        if (!enabled) {
            // User wants to disable autopay
            const hasCustomersUsingAutopay = await checkCustomersUsingAutopay();
            if (hasCustomersUsingAutopay) {
                alert("Cannot disable autopay. Some customers in your organization are currently using autopay.");
                return;
            }
        }
        setAutopayEnabled(enabled);
    };

    const handleSaveBillingSettings = () => {
        // Save billing settings logic would go here
        console.log("Saving billing settings:", { billingDate, autopayEnabled });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Billing Settings
                </h3>
            </div>

            <div className="space-y-6">
                {/* Billing Date */}
                <div className="space-y-2">
                    <Label htmlFor="billing-date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Billing Date
                    </Label>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <Input
                            id="billing-date"
                            type="number"
                            min="1"
                            max="31"
                            value={billingDate}
                            onChange={(e) => setBillingDate(e.target.value)}
                            placeholder="1-31"
                            className="w-24"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">of each month</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enter the day of the month when billing should occur (1-31)
                    </p>
                </div>

                {/* Autopay Settings */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Autopay Enabled
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Automatically process payments on the billing date
                            </p>
                        </div>
                        <Switch
                            checked={autopayEnabled}
                            onCheckedChange={handleAutopayToggle}
                            disabled={isCheckingCustomers}
                        />
                    </div>

                    {autopayEnabled && (
                        <Alert>
                            <AlertDescription>
                                Autopay is enabled. Payments will be processed automatically on the billing date.
                                You can disable this if no customers in your organization are using autopay.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!autopayEnabled && (
                        <Alert>
                            <AlertDescription>
                                Autopay is disabled. You can enable it to automatically process payments on the billing date.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        onClick={handleSaveBillingSettings}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Save Billing Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}