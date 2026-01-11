# Quick Reference Guide - Global Components

## 🚀 Quick Start

### Import Components
```typescript
// Single import for multiple components
import { MetricCard, MetricsGrid, PageHeader, DataTable } from "@/components/ui";

// Or individual imports
import { MetricCard } from "@/components/ui/metric-card";
import { DataTable } from "@/components/ui/data-table";
```

---

## 📊 MetricCard

### Basic Usage
```typescript
<MetricCard
  title="Total Revenue"
  value="₹12.5L"
  subtitle=" "
  trend="up"
  trendValue="+15.3%"
/>
```

### With Icon
```typescript
import { Users } from "lucide-react";

<MetricCard
  title="Total Users"
  value="45.2K"
  icon={Users}
  trend="up"
  trendValue="+8%"
/>
```

### Clickable
```typescript
<MetricCard
  title="View Details"
  value="123"
  onClick={() => router.push('/details')}
/>
```

### Variants
```typescript
<MetricCard variant="compact" {...props} />
<MetricCard variant="default" {...props} />
<MetricCard variant="detailed" {...props} />
```

---

## 📐 MetricsGrid

### 4 Columns (Default)
```typescript
<MetricsGrid
  metrics={[
    { title: "Metric 1", value: "100" },
    { title: "Metric 2", value: "200" },
    { title: "Metric 3", value: "300" },
    { title: "Metric 4", value: "400" },
  ]}
  columns={4}
/>
```

### 3 Columns
```typescript
<MetricsGrid metrics={metricsArray} columns={3} />
```

### From Service Data
```typescript
const metrics = await getMetrics();
<MetricsGrid metrics={Object.values(metrics)} columns={4} />
```

---

## 📋 DataTable

### Basic Table
```typescript
const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

<DataTable
  columns={columns}
  data={users}
  keyExtractor={(user) => user.id}
/>
```

### With Custom Renderers
```typescript
const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'User',
    render: (user) => (
      <div className="flex items-center gap-2">
        <Avatar src={user.avatar} />
        <span>{user.name}</span>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (user) => (
      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
        {user.status}
      </Badge>
    ),
  },
];
```

### With Row Click
```typescript
<DataTable
  columns={columns}
  data={merchants}
  keyExtractor={(m) => m.id}
  onRowClick={(merchant) => {
    router.push(`/merchants/${merchant.id}`);
  }}
/>
```

### With Loading State
```typescript
<DataTable
  columns={columns}
  data={data}
  keyExtractor={(item) => item.id}
  loading={isLoading}
  loadingRows={5}
/>
```

### With Empty State
```typescript
<DataTable
  columns={columns}
  data={[]}
  keyExtractor={(item) => item.id}
  emptyMessage="No data available. Add your first item to get started."
/>
```

---

## 📄 PageHeader

### Basic Header
```typescript
<PageHeader
  title="Dashboard"
  description="Overview of your platform"
/>
```

### With Icon
```typescript
import { BarChart3 } from "lucide-react";

<PageHeader
  title="Analytics"
  description="Comprehensive insights"
  icon={BarChart3}
/>
```

### With Actions
```typescript
<PageHeader
  title="Merchants"
  description="Manage all merchants"
  icon={Store}
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button>Add Merchant</Button>
    </>
  }
/>
```

### Gradient Variant
```typescript
<PageHeader
  title="Overview"
  description="Platform statistics"
  variant="gradient"
  actions={<TimeRangeSelector />}
/>
```

---

## 🔧 Service Pattern

### Create Service File
```typescript
// services/feature.service.ts
"use server";

import { createClient } from "@/lib/supabase/server";

export interface FeatureData {
  id: string;
  name: string;
  value: number;
}

export async function getFeatureData(): Promise<FeatureData[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('features')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data;
}

export async function getFeatureMetrics() {
  const data = await getFeatureData();
  
  return {
    total: {
      title: "Total Items",
      value: data.length.toString(),
      trend: "up",
      trendValue: "+12%",
    },
    // ... more metrics
  };
}
```

### Use in Page
```typescript
import { getFeatureMetrics } from "./services/feature.service";

export default async function Page() {
  const metrics = await getFeatureMetrics();
  
  return (
    <div className="space-y-8">
      <PageHeader title="Feature" />
      <MetricsGrid metrics={Object.values(metrics)} />
    </div>
  );
}
```

---

## 🎨 Common Patterns

### Full Page Layout
```typescript
export default async function Page() {
  const metrics = await getMetrics();
  const data = await getData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Page Title"
        description="Page description"
        icon={Icon}
        actions={<Actions />}
      />

      {/* Metrics */}
      <MetricsGrid metrics={Object.values(metrics)} columns={4} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartComponent />
        </div>
        <div className="lg:col-span-1">
          <SidebarWidget />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
}
```

### Client Component Extraction
```typescript
// For interactive elements
function InteractiveFilter() {
  "use client";
  const [value, setValue] = useState("");
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## 🎯 Best Practices

### ✅ DO
- Use services for all data fetching
- Use global components for consistency
- Extract client components when needed
- Add proper TypeScript types
- Handle loading and empty states

### ❌ DON'T
- Put business logic in pages
- Create custom metric cards
- Hardcode data in components
- Mix server and client logic
- Forget error handling

---

## 📦 Component Props Reference

### MetricCard
```typescript
interface MetricCardProps {
  title: string;                    // Required
  value: string | number;           // Required
  subtitle?: string;                // Optional
  trend?: "up" | "down" | "neutral"; // Optional
  trendValue?: string;              // Optional
  icon?: LucideIcon;                // Optional
  variant?: "default" | "compact";  // Optional
  className?: string;               // Optional
  onClick?: () => void;             // Optional
}
```

### DataTable
```typescript
interface DataTableProps<T> {
  columns: Column<T>[];             // Required
  data: T[];                        // Required
  keyExtractor: (item: T) => string; // Required
  onRowClick?: (item: T) => void;   // Optional
  emptyMessage?: string;            // Optional
  loading?: boolean;                // Optional
  loadingRows?: number;             // Optional
  className?: string;               // Optional
}
```

### PageHeader
```typescript
interface PageHeaderProps {
  title: string;                    // Required
  description?: string;             // Optional
  icon?: LucideIcon;                // Optional
  actions?: React.ReactNode;        // Optional
  variant?: "default" | "gradient"; // Optional
  className?: string;               // Optional
}
```

---

## 🔗 Related Files

- **Components**: `components/ui/`
- **Services**: `app/(dashboard)/dashboard/services/`
- **Documentation**: `ARCHITECTURE.md`
- **Examples**: `app/(dashboard)/dashboard/features/*/page.tsx`

---

## 💡 Tips

1. **Always use services** for data operations
2. **Reuse components** instead of creating new ones
3. **Extract client logic** to separate components
4. **Type everything** with TypeScript
5. **Test edge cases** (empty, loading, error states)

---

## 🆘 Troubleshooting

### Component not found
```typescript
// Make sure you're importing from the right path
import { MetricCard } from "@/components/ui/metric-card";
// or
import { MetricCard } from "@/components/ui";
```

### Type errors
```typescript
// Define proper types for your data
interface MyData {
  id: string;
  name: string;
}

const columns: Column<MyData>[] = [
  { key: 'name', header: 'Name' }
];
```

### Service not working
```typescript
// Make sure service file has "use server"
"use server";

export async function getData() {
  // ...
}
```

---

For more details, see `ARCHITECTURE.md`
