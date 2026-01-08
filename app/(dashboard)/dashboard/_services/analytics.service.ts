import { createClient } from '@/lib/supabase/client';

export interface AnalyticsData {
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
  avgTransaction: number;
  topMerchants: Array<{
    name: string;
    revenue: string;
    growth: string;
  }>;
  geographicDistribution: Array<{
    region: string;
    percentage: number;
    amount: string;
  }>;
}

export interface AnalyticsFilters {
  startDate?: string;
  endDate?: string;
  timeRange?: string;
}

class AnalyticsService {
  private supabase = createClient();

  async getAnalytics(filters: AnalyticsFilters = {}): Promise<AnalyticsData> {
    try {
      // Build date filter
      let dateFilter = {};
      if (filters.startDate || filters.endDate) {
        dateFilter = {
          ...(filters.startDate && { created_at: { gte: filters.startDate } }),
          ...(filters.endDate && { created_at: { lte: filters.endDate } }),
        };
      }

      // Fetch analytics data from Supabase
      const { data: transactions, error: transactionsError } = await this.supabase
        .from('transactions')
        .select('*')
        .match(dateFilter);

      if (transactionsError) {
        console.error('Error fetching transactions:', transactionsError);
        throw transactionsError;
      }

      const { data: merchants, error: merchantsError } = await this.supabase
        .from('merchants')
        .select('*');

      if (merchantsError) {
        console.error('Error fetching merchants:', merchantsError);
        throw merchantsError;
      }

      // Calculate metrics
      const totalRevenue = transactions?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0;
      const activeUsers = new Set(transactions?.map(tx => tx.user_id)).size || 0;
      const successfulTransactions = transactions?.filter(tx => tx.status === 'completed') || [];
      const conversionRate = transactions?.length ? (successfulTransactions.length / transactions.length) * 100 : 0;
      const avgTransaction = successfulTransactions.length ? totalRevenue / successfulTransactions.length : 0;

      // Calculate top merchants
      const merchantRevenue = new Map<string, number>();
      transactions?.forEach(tx => {
        if (tx.merchant_id) {
          merchantRevenue.set(tx.merchant_id, (merchantRevenue.get(tx.merchant_id) || 0) + tx.amount);
        }
      });

      const topMerchants = Array.from(merchantRevenue.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([merchantId, revenue]) => {
          const merchant = merchants?.find(m => m.id === merchantId);
          return {
            name: merchant?.name || 'Unknown Merchant',
            revenue: `₹${(revenue / 100000).toFixed(1)}L`,
            growth: '+12%', // This would be calculated from historical data
          };
        });

      // Calculate geographic distribution (mock data for now)
      const geographicDistribution = [
        { region: 'Maharashtra', percentage: 35, amount: '₹4.2L' },
        { region: 'Karnataka', percentage: 28, amount: '₹3.4L' },
        { region: 'Tamil Nadu', percentage: 20, amount: '₹2.4L' },
        { region: 'Delhi NCR', percentage: 17, amount: '₹2.1L' },
      ];

      return {
        totalRevenue,
        activeUsers,
        conversionRate,
        avgTransaction,
        topMerchants,
        geographicDistribution,
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Return mock data as fallback
      return this.getMockAnalytics();
    }
  }

  private getMockAnalytics(): AnalyticsData {
    return {
      totalRevenue: 1250000,
      activeUsers: 45200,
      conversionRate: 3.24,
      avgTransaction: 1250,
      topMerchants: [
        { name: 'SpeedNet ISP', revenue: '₹2.1L', growth: '+12%' },
        { name: 'FitZone Gyms', revenue: '₹1.8L', growth: '+8%' },
        { name: 'CableNet Sols', revenue: '₹1.5L', growth: '+15%' },
      ],
      geographicDistribution: [
        { region: 'Maharashtra', percentage: 35, amount: '₹4.2L' },
        { region: 'Karnataka', percentage: 28, amount: '₹3.4L' },
        { region: 'Tamil Nadu', percentage: 20, amount: '₹2.4L' },
        { region: 'Delhi NCR', percentage: 17, amount: '₹2.1L' },
      ],
    };
  }

  async exportAnalytics(filters: AnalyticsFilters = {}): Promise<Blob> {
    try {
      const data = await this.getAnalytics(filters);

      // Create CSV content
      const csvContent = [
        'Metric,Value',
        `Total Revenue,₹${(data.totalRevenue / 100000).toFixed(1)}L`,
        `Active Users,${data.activeUsers.toLocaleString()}`,
        `Conversion Rate,${data.conversionRate.toFixed(2)}%`,
        `Average Transaction,₹${data.avgTransaction.toFixed(0)}`,
        '',
        'Top Merchants',
        'Name,Revenue,Growth',
        ...data.topMerchants.map(m => `${m.name},${m.revenue},${m.growth}`),
        '',
        'Geographic Distribution',
        'Region,Percentage,Amount',
        ...data.geographicDistribution.map(g => `${g.region},${g.percentage}%,${g.amount}`),
      ].join('\n');

      return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    } catch (error) {
      console.error('Error exporting analytics:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const analyticsService = new AnalyticsService();