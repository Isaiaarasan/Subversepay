# Global UI Components & Architecture Guide

## Overview

This document describes the global, reusable UI components and architectural patterns used throughout the Subverse Pay dashboard. All components follow clean architecture principles with separation of concerns.

---

## Architecture Principles

### 1. **No Logic in Pages**
Pages should ONLY orchestrate data fetching and rendering. All business logic belongs in services.

```typescript
// ❌ BAD - Logic in page
export default function Page() {
  const data = merchants.filter(m => m.status === 'active');
  const total = data.reduce((sum, m) => sum + m.revenue, 0);
  // ...
}

// ✅ GOOD - Logic in service
export default async function Page() {
  const data = await getMerchantMetrics(); // Service handles logic
  return <MetricsGrid metrics={data} />;
}
```

### 2. **Service Layer Pattern**
All business logic, data fetching, and calculations happen in service files.

```typescript
// services/analytics.service.ts
"use server";

export async function getAnalyticsMetrics() {
  // Fetch from database
  // Transform data
  // Calculate metrics
  return metrics;
}
```

### 3. **Reusable Components**
Components are generic and accept data via props. No hardcoded values.

---

## Global Components

### 1. MetricCard

**Purpose**: Display key metrics with consistent styling across all pages.

**Location**: `components/ui/metric-card.tsx`

**Usage**:
```typescript
import { MetricCard } from "@/components/ui/metric-card";
import { Users } from "lucide-react";

<MetricCard
  title="Total Merchants"
  value="45"
  subtitle="Platform partners"
  trend="up"
  trendValue="+3 this week"
  icon={Users}
  variant="default" // or "compact" | "detailed"
/>
```

**Props**:
- `title`: string - Metric title
- `value`: string | number - Main value to display
- `subtitle?`: string - Additional context
- `trend?`: "up" | "down" | "neutral" - Trend direction
- `trendValue?`: string - Trend percentage/value
- `icon?`: LucideIcon - Icon component
- `variant?`: "default" | "compact" | "detailed"
- `className?`: string - Additional classes
- `onClick?`: () => void - Click handler

**Used In**:
- Overview Dashboard
- Analytics Dashboard
- System Health
- All feature pages

---

### 2. MetricsGrid

**Purpose**: Responsive grid layout for metric cards.

**Location**: `components/ui/metrics-grid.tsx`

**Usage**:
```typescript
import { MetricsGrid } from "@/components/ui/metrics-grid";

<MetricsGrid
  metrics={[
    { title: "Revenue", value: "₹12.5L", trend: "up", trendValue: "+15%" },
    { title: "Users", value: "45.2K", trend: "up", trendValue: "+8%" }
  ]}
  columns={4} // 2 | 3 | 4
/>
```

**Props**:
- `metrics`: MetricCardProps[] - Array of metric configurations
- `columns?`: 2 | 3 | 4 - Number of columns (default: 4)
- `className?`: string - Additional classes

---

### 3. DataTable

**Purpose**: Reusable table component with consistent styling, loading states, and empty states.

**Location**: `components/ui/data-table.tsx`

**Usage**:
```typescript
import { DataTable, Column } from "@/components/ui/data-table";

const columns: Column<Merchant>[] = [
  { key: "name", header: "Name" },
  { 
    key: "status", 
    header: "Status",
    render: (merchant) => <Badge>{merchant.status}</Badge>
  }
];

<DataTable
  columns={columns}
  data={merchants}
  keyExtractor={(merchant) => merchant.id}
  onRowClick={(merchant) => handleClick(merchant)}
  loading={isLoading}
  emptyMessage="No merchants found"
/>
```

**Props**:
- `columns`: Column<T>[] - Column definitions
- `data`: T[] - Array of data items
- `keyExtractor`: (item, index) => string | number - Unique key function
- `onRowClick?`: (item, index) => void - Row click handler
- `emptyMessage?`: string - Message when no data
- `className?`: string - Additional classes
- `loading?`: boolean - Show loading state
- `loadingRows?`: number - Number of skeleton rows

**Column Interface**:
```typescript
interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}
```

**Used In**:
- Merchants page
- Approvals page
- Tickets page
- System Health (error logs)
- Settlements page

---

### 4. PageHeader

**Purpose**: Consistent page header with title, description, icon, and actions.

**Location**: `components/ui/page-header.tsx`

**Usage**:
```typescript
import { PageHeader } from "@/components/ui/page-header";
import { BarChart3 } from "lucide-react";

<PageHeader
  title="Analytics Dashboard"
  description="Comprehensive insights into platform performance"
  icon={BarChart3}
  variant="gradient" // or "default"
  actions={
    <>
      <Button>Download Report</Button>
      <TimeRangeSelector />
    </>
  }
/>
```

**Props**:
- `title`: string - Page title
- `description?`: string - Page description
- `icon?`: LucideIcon - Icon component
- `actions?`: React.ReactNode - Action buttons/components
- `variant?`: "default" | "gradient"
- `className?`: string - Additional classes

**Used In**:
- All dashboard pages
- All feature pages

---

## Service Layer

### Service File Structure

```
app/(dashboard)/dashboard/services/
├── auth.service.ts              # Authentication logic
├── overview.service.ts          # Overview page data
├── analytics-data.service.ts    # Analytics data
├── system-health.service.ts     # System health monitoring
├── approvals.service.ts         # Approvals workflow
├── settlements.service.ts       # Settlements data
├── tickets.service.ts           # Ticket management
└── organizations.service.ts     # Organization data
```

### Service Pattern

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Service description
 * Handles all business logic for [feature]
 */

export interface DataType {
  // Type definitions
}

/**
 * Fetch data from database
 */
export async function getData(): Promise<DataType> {
  const supabase = await createClient();
  
  // Fetch from database
  const { data, error } = await supabase
    .from('table')
    .select('*');
  
  if (error) throw error;
  
  // Transform data
  // Calculate metrics
  // Apply business logic
  
  return transformedData;
}

/**
 * Calculate metrics
 */
export function calculateMetrics(data: DataType) {
  // Pure calculation logic
  return metrics;
}
```

---

## Page Pattern

### Server Component (Default)

```typescript
import { PageHeader, MetricsGrid } from "@/components/ui";
import { getMetrics } from "./services/data.service";

/**
 * Page Component
 * Orchestrates data fetching and rendering
 * NO business logic
 */
export default async function Page() {
  // Fetch data via services
  const metrics = await getMetrics();
  
  // Render with reusable components
  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" />
      <MetricsGrid metrics={Object.values(metrics)} />
    </div>
  );
}
```

### Client Component (When Needed)

```typescript
"use client";

import { useState } from "react";

/**
 * Client component for interactivity
 * Extracted from page for client-side features
 */
export function InteractiveWidget() {
  const [state, setState] = useState();
  
  return (
    <div onClick={() => setState(...)}>
      {/* Interactive content */}
    </div>
  );
}
```

---

## Common Patterns

### 1. Metrics Display

```typescript
// Service
export async function getMetrics() {
  return {
    revenue: {
      title: "Total Revenue",
      value: "₹12.5L",
      trend: "up",
      trendValue: "+15.3%"
    },
    // ...
  };
}

// Page
const metrics = await getMetrics();
<MetricsGrid metrics={Object.values(metrics)} columns={4} />
```

### 2. Data Tables

```typescript
// Service
export async function getMerchants() {
  const supabase = await createClient();
  const { data } = await supabase.from('merchants').select('*');
  return data;
}

// Page
const merchants = await getMerchants();

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status', render: (m) => <Badge>{m.status}</Badge> }
];

<DataTable columns={columns} data={merchants} keyExtractor={m => m.id} />
```

### 3. Charts

```typescript
// Keep chart components separate
import ComparisonGraph from "@/components/charts/comparison-graph";
import PaymentPieChart from "@/components/charts/payment-pie-chart";

<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div className="lg:col-span-2">
    <ComparisonGraph />
  </div>
  <div className="lg:col-span-1">
    <PaymentPieChart />
  </div>
</div>
```

---

## Styling Conventions

### Consistent Card Styling

```typescript
className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/60 dark:border-gray-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300"
```

### Grid Layouts

```typescript
// 4 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"

// 3 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// 2 columns
className="grid grid-cols-1 lg:grid-cols-2 gap-4"
```

### Text Styles

```typescript
// Page Title
className="text-2xl font-bold text-gray-900 dark:text-white"

// Description
className="text-gray-500 dark:text-gray-400 text-sm"

// Metric Value
className="text-2xl font-bold text-gray-900 dark:text-white"

// Metric Label
className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide"
```

---

## Migration Checklist

When refactoring a page:

- [ ] Move all business logic to service files
- [ ] Replace custom metric cards with `<MetricCard>`
- [ ] Use `<MetricsGrid>` for metric layouts
- [ ] Replace custom tables with `<DataTable>`
- [ ] Add `<PageHeader>` for consistent headers
- [ ] Extract client interactivity to separate components
- [ ] Remove inline data filtering/calculations
- [ ] Use service functions for all data operations
- [ ] Add proper TypeScript types
- [ ] Test loading and empty states

---

## Benefits

1. **Consistency**: All pages look and behave the same
2. **Maintainability**: Changes to components affect all pages
3. **Reusability**: Write once, use everywhere
4. **Testability**: Services can be tested independently
5. **Performance**: Server components by default
6. **Type Safety**: Full TypeScript coverage
7. **Clean Code**: Separation of concerns

---

## Examples

See these pages for reference implementations:
- `app/(dashboard)/dashboard/page.tsx` - Overview with MetricsGrid
- `app/(dashboard)/dashboard/features/analytics/page.tsx` - Analytics with charts
- `app/(dashboard)/dashboard/features/system-health/page.tsx` - DataTable usage

---

## Questions?

For questions or suggestions, refer to the component source files or create an issue.
