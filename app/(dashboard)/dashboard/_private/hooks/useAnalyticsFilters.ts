import { useState } from 'react';

export interface AnalyticsFilters {
  startDate: string;
  endDate: string;
  timeRange: string;
}

export function useAnalyticsFilters(initialTimeRange = 'Last 7 days') {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeRange, setTimeRange] = useState(initialTimeRange);

  const filters: AnalyticsFilters = {
    startDate,
    endDate,
    timeRange,
  };

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setTimeRange(initialTimeRange);
  };

  return {
    filters,
    startDate,
    endDate,
    timeRange,
    setStartDate,
    setEndDate,
    setTimeRange,
    resetFilters,
  };
}