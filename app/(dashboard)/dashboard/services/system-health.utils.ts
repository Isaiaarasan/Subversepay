import { LatencyData, TimeRange } from "./system-health.service";

/**
 * Calculate latency data based on time range
 */
export function calculateLatencyData(timeRange: TimeRange): LatencyData {
    const ranges = {
        "Current Day": {
            labels: ["6:00", "12:00", "18:00"],
            data: [120, 135, 128, 142, 138, 145, 140, 132, 148, 143, 139, 146],
        },
        Week: {
            labels: ["Mon", "Wed", "Fri"],
            data: [125, 132, 128, 135, 140, 138, 142],
        },
        Month: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [130, 135, 132, 138],
        },
    };

    return ranges[timeRange];
}

/**
 * Calculate maximum latency for chart scaling
 */
export function calculateMaxLatency(data: number[]): number {
    return Math.max(...data) * 1.1;
}

/**
 * Generate SVG path for line chart
 */
export function calculateChartPath(
    data: number[],
    maxLatency: number,
    width: number,
    height: number
): string {
    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / maxLatency) * height;
        return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
}

/**
 * Generate SVG path for area fill
 */
export function calculateAreaPath(
    data: number[],
    maxLatency: number,
    width: number,
    height: number
): string {
    const linePath = calculateChartPath(data, maxLatency, width, height);
    return `${linePath} L ${width},${height} L 0,${height} Z`;
}
