"use client";

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { DateRangeFilter } from '@/components/ui/date-range-filter';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FiltersProps {
  // Search
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;

  // Dropdown filters
  filters?: Array<{
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }>;

  // Date range
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;

  // Actions
  onClear?: () => void;
  showClearButton?: boolean;

  className?: string;
}

export function Filters({
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
  showClearButton = true,
  className = '',
}: FiltersProps) {
  const hasActiveFilters = Boolean(
    searchQuery ||
    filters.some(f => f.value !== 'all' && f.value !== '') ||
    (startDate && startDate.trim()) ||
    (endDate && endDate.trim())
  );

  const handleClear = () => {
    onSearchChange?.('');
    filters.forEach(f => f.onChange('all'));
    if (onStartDateChange) onStartDateChange('');
    if (onEndDateChange) onEndDateChange('');
    onClear?.();
  };

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900/80 backdrop-blur-xl p-1 rounded-xl border border-transparent dark:border-gray-800 ${className}`}>
      {/* Search Input */}
      {onSearchChange && (
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
        {(onStartDateChange && onEndDateChange) && (
          <DateRangeFilter
            startDate={startDate || ''}
            endDate={endDate || ''}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
          />
        )}

        {/* Custom Filters */}
        {filters.map((filter) => (
          <div key={filter.key} className="relative group main-dropdown">
            <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-xs font-medium shadow-sm w-full">
              <Filter size={14} />
              <span>{filter.label}: {filter.value === 'all' ? 'All' : filter.value}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-20">
              {filter.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => filter.onChange(option.value)}
                  className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    filter.value === option.value
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-gray-400 dark:text-gray-500">({option.count})</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Clear Filters Button */}
        {showClearButton && hasActiveFilters && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-xs font-medium shadow-sm"
          >
            <X size={14} />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}

// Specialized filter components for different pages

export function MerchantFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
}) {
  const statusOptions: FilterOption[] = [
    { value: 'all', label: 'All Merchants' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  return (
    <Filters
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search merchants, sectors..."
      filters={[
        {
          key: 'status',
          label: 'Status',
          value: statusFilter,
          options: statusOptions,
          onChange: onStatusFilterChange,
        },
      ]}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
    />
  );
}

export function TicketFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'active' | 'closed';
  onStatusFilterChange: (status: 'active' | 'closed') => void;
  priorityFilter?: string;
  onPriorityFilterChange?: (priority: string) => void;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
}) {
  const statusOptions: FilterOption[] = [
    { value: 'active', label: 'Active Tickets' },
    { value: 'closed', label: 'Closed Tickets' },
  ];

  const priorityOptions: FilterOption[] = [
    { value: 'all', label: 'All Priorities' },
    { value: 'Critical', label: 'Critical' },
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];

  const filters = [
    {
      key: 'status',
      label: 'Status',
      value: statusFilter,
      options: statusOptions,
      onChange: onStatusFilterChange,
    },
  ];

  if (onPriorityFilterChange) {
    filters.push({
      key: 'priority',
      label: 'Priority',
      value: priorityFilter || 'all',
      options: priorityOptions,
      onChange: onPriorityFilterChange,
    });
  }

  return (
    <Filters
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search tickets by title, ID, user..."
      filters={filters}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
    />
  );
}