import { createClient } from '@/lib/supabase/client';
import { Alert, AlertType } from './alertsSlice';

class AlertsService {
  private supabase = createClient();

  async getAlerts(): Promise<Alert[]> {
    try {
      const { data, error } = await this.supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching alerts:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching alerts:', error);
      // Return mock data as fallback
      return this.getMockAlerts();
    }
  }

  async createAlert(alert: Omit<Alert, 'id'>): Promise<Alert> {
    try {
      const { data, error } = await this.supabase
        .from('alerts')
        .insert([alert])
        .select()
        .single();

      if (error) {
        console.error('Error creating alert:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating alert:', error);
      throw error;
    }
  }

  async dismissAlert(id: number): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('alerts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error dismissing alert:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error dismissing alert:', error);
      throw error;
    }
  }

  private getMockAlerts(): Alert[] {
    return [
      {
        id: 1,
        type: 'Critical',
        source: 'Payment Gateway',
        message: 'High failure rate detected (15%) in last hour for HDFC Netbanking.',
        time: '10 mins ago',
        category: 'Payment Failures',
      },
      {
        id: 2,
        type: 'High',
        source: 'SpeedNet ISP',
        message: 'Sudden 20% drop in active subscribers detected.',
        time: '45 mins ago',
        category: 'Subscriber Drop',
      },
      {
        id: 3,
        type: 'Medium',
        source: 'Support Desk',
        message: 'Unusual spike in support tickets from \'CableNet Sols\'.',
        time: '2 hours ago',
        category: 'Support Tickets',
      },
      {
        id: 4,
        type: 'Low',
        source: 'System',
        message: 'Routine database optimization completed with warnings.',
        time: '5 hours ago',
        category: 'Maintenance',
      },
      {
        id: 5,
        type: 'Info',
        source: 'Onboarding',
        message: 'New merchant \'Urban Fibernet\' documentation verified.',
        time: '1 day ago',
        category: 'Onboarding',
      },
    ];
  }

  getAlertStats(alerts: Alert[]) {
    return {
      total: alerts.length,
      critical: alerts.filter(a => a.type === 'Critical').length,
      high: alerts.filter(a => a.type === 'High').length,
      medium: alerts.filter(a => a.type === 'Medium').length,
      low: alerts.filter(a => a.type === 'Low').length,
      info: alerts.filter(a => a.type === 'Info').length,
    };
  }
}

// Create singleton instance
export const alertsService = new AlertsService();