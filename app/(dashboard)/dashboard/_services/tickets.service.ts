import { createClient } from '@/lib/supabase/client';
import { UserRole } from './auth.service';

export interface Ticket {
  id: string;
  title: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  user: string;
  status: 'Open' | 'In Progress' | 'Closed';
  date: string;
  description: string;
  type: string;
  attachments: boolean;
  createdDate?: string;
  created_by?: string;
  assigned_to?: string;
}

export interface TicketFilters {
  searchQuery?: string;
  status?: 'active' | 'closed';
  startDate?: string;
  endDate?: string;
  priority?: Ticket['priority'];
  type?: string;
}

class TicketsService {
  private supabase = createClient();

  async getTickets(filters: TicketFilters = {}, userRole?: UserRole): Promise<Ticket[]> {
    try {
      // Build query
      let query = this.supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.searchQuery) {
        query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%,user.ilike.%${filters.searchQuery}%`);
      }

      if (filters.status === 'active') {
        query = query.neq('status', 'Closed');
      } else if (filters.status === 'closed') {
        query = query.eq('status', 'Closed');
      }

      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate);
      }

      if (filters.endDate) {
        query = query.lte('created_at', filters.endDate);
      }

      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }

      if (filters.type) {
        query = query.eq('type', filters.type);
      }

      // Role-based filtering
      if (userRole === 'member') {
        query = query.eq('type', 'Customer');
      } else if (userRole === 'team-lead') {
        query = query.or('type.eq.Manager,type.eq.Customer');
      }
      // admin and super-admin can see all tickets

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tickets:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching tickets:', error);
      // Return mock data as fallback
      return this.getMockTickets();
    }
  }

  async getTicketById(id: string): Promise<Ticket | null> {
    try {
      const { data, error } = await this.supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching ticket:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return null;
    }
  }

  async createTicket(ticket: Omit<Ticket, 'id' | 'createdDate'>): Promise<Ticket> {
    try {
      const { data, error } = await this.supabase
        .from('tickets')
        .insert([{
          ...ticket,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating ticket:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  }

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
    try {
      const { data, error } = await this.supabase
        .from('tickets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating ticket:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  }

  async closeTicket(id: string, reason?: string): Promise<void> {
    try {
      await this.updateTicket(id, {
        status: 'Closed',
        description: reason ? `${reason}\n\n--- Closed ---` : undefined,
      });
    } catch (error) {
      console.error('Error closing ticket:', error);
      throw error;
    }
  }

  async assignTicket(id: string, assignedTo: string): Promise<void> {
    try {
      await this.updateTicket(id, { assigned_to: assignedTo });
    } catch (error) {
      console.error('Error assigning ticket:', error);
      throw error;
    }
  }

  private getMockTickets(): Ticket[] {
    return [
      {
        id: 'TCK-9921',
        title: 'API Integration Error',
        priority: 'High',
        user: 'John Doe (Manager)',
        status: 'Open',
        date: '2 hours ago',
        description: 'Getting 500 errors on the payment endpoint repeatedly.',
        type: 'Manager',
        attachments: true,
        createdDate: '2024-10-24',
      },
      {
        id: 'TCK-9922',
        title: 'Settlement Delay Check',
        priority: 'Medium',
        user: 'Alice Smith (Admin)',
        status: 'In Progress',
        date: '5 hours ago',
        description: 'Settlement for ID SET-2024-001 hasn\'t reflected yet.',
        type: 'Admin',
        attachments: false,
        createdDate: '2024-10-24',
      },
      {
        id: 'TCK-9920',
        title: 'Login Failure for Staff',
        priority: 'Critical',
        user: 'Tech Team (Customer)',
        status: 'Open',
        date: '1 day ago',
        description: 'Staff members unable to login from new IP range.',
        type: 'Customer',
        attachments: true,
        createdDate: '2024-10-23',
      },
      {
        id: 'TCK-9919',
        title: 'Merchant Onboarding Issue',
        priority: 'Medium',
        user: 'Sarah Wilson (Merchant)',
        status: 'Open',
        date: '3 hours ago',
        description: 'New merchant unable to complete registration process.',
        type: 'Merchant',
        attachments: false,
        createdDate: '2024-10-24',
      },
      {
        id: 'TCK-9918',
        title: 'Webhook Delivery Failure',
        priority: 'High',
        user: 'Dev Team (Admin)',
        status: 'In Progress',
        date: '6 hours ago',
        description: 'Payment webhooks not being delivered to merchant endpoint.',
        type: 'Admin',
        attachments: true,
        createdDate: '2024-10-24',
      },
      {
        id: 'TCK-9917',
        title: 'Transaction Timeout',
        priority: 'Critical',
        user: 'Bob Johnson (Customer)',
        status: 'Open',
        date: '8 hours ago',
        description: 'Payment transactions timing out during peak hours.',
        type: 'Customer',
        attachments: false,
        createdDate: '2024-10-24',
      },
      {
        id: 'TCK-9916',
        title: 'Dashboard Loading Slow',
        priority: 'Low',
        user: 'Mike Chen (Manager)',
        status: 'Open',
        date: '1 day ago',
        description: 'Dashboard taking too long to load analytics data.',
        type: 'Manager',
        attachments: true,
        createdDate: '2024-10-23',
      },
      {
        id: 'TCK-9915',
        title: 'Refund Request Processing',
        priority: 'Medium',
        user: 'Lisa Park (Merchant)',
        status: 'Closed',
        date: '2 days ago',
        description: 'Refund request taking longer than usual to process.',
        type: 'Merchant',
        attachments: false,
        createdDate: '2024-10-22',
      },
      {
        id: 'TCK-9914',
        title: 'API Rate Limiting',
        priority: 'High',
        user: 'Tom Brown (Admin)',
        status: 'Closed',
        date: '3 days ago',
        description: 'API calls being rate limited unexpectedly.',
        type: 'Admin',
        attachments: true,
        createdDate: '2024-10-21',
      },
    ];
  }

  getTicketStats(tickets: Ticket[]) {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'Open').length,
      inProgress: tickets.filter(t => t.status === 'In Progress').length,
      closed: tickets.filter(t => t.status === 'Closed').length,
      critical: tickets.filter(t => t.priority === 'Critical').length,
      high: tickets.filter(t => t.priority === 'High').length,
      medium: tickets.filter(t => t.priority === 'Medium').length,
      low: tickets.filter(t => t.priority === 'Low').length,
    };
  }
}

// Create singleton instance
export const ticketsService = new TicketsService();