"use client";

import React from "react";
import { DateRangeFilter } from "@/components/ui/date-range-filter";

export function DateRangeFilterWrapper() {
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    return (
        <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
        />
    );
}