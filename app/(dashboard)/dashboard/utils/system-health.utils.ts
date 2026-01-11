/**
 * Client-side system health utilities
 * No "use server" directive - these are client-side utilities
 * All calculations centralized here
 */

export interface LatencyDataPoint {
  value: number;
  label: string;
}

export interface LatencyDataset {
  data: number[];
  labels: string[];
  interval: string;
}

export type TimeRange = "Current Day" | "Week" | "Month";

/**
 * Generate mock data points for charts
 * All calculations centralized here
 */
export function generateData(
  points: number,
  base: number,
  variance: number
): number[] {
  return Array.from({ length: points }, () => base + Math.random() * variance - variance / 2);
}

/**
 * Calculate latency data for different time ranges
 * All chart calculations centralized here
 */
export function calculateLatencyData(timeRange: TimeRange): LatencyDataset {
  const dataMap: Record<TimeRange, LatencyDataset> = {
    "Current Day": {
      data: generateData(24, 45, 10),
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      interval: "Overview (Hourly)",
    },
    Week: {
      data: generateData(7, 50, 15),
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      interval: "Overview (Daily)",
    },
    Month: {
      data: generateData(30, 48, 20),
      labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
      interval: "Overview (Daily)",
    },
  };

  return dataMap[timeRange];
}

/**
 * Calculate max latency for chart scaling
 */
export function calculateMaxLatency(data: number[]): number {
  return Math.max(...data) * 1.2;
}

/**
 * Calculate SVG path points for line chart
 */
export function calculateChartPath(
  data: number[],
  maxValue: number,
  width: number = 100,
  height: number = 100
): string {
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (val / maxValue) * height;
    return `${x},${y}`;
  }).join(" L ");

  return `M ${points}`;
}

/**
 * Calculate area fill path for chart
 */
export function calculateAreaPath(
  data: number[],
  maxValue: number,
  width: number = 100,
  height: number = 100
): string {
  const points = calculateChartPath(data, maxValue, width, height);
  return `${points} L ${width},${height} L 0,${height} Z`;
}
