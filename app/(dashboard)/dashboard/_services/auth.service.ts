import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { ROLES, ROLE_HIERARCHY, type Role } from '../_constants/roles';
import { NAVIGATION_ITEMS } from '../_constants/navigation';

export type UserRole = Role | null;

export interface AuthUser {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  isAuthenticated: boolean;
}

class AuthService {
  private supabase = createClient();
  private currentAuth: AuthUser = {
    user: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
  };

  private listeners: ((auth: AuthUser) => void)[] = [];

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();

      if (error) {
        console.error('Auth initialization error:', error);
        this.updateAuth({
          user: null,
          role: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      if (user) {
        const role = await this.getUserRole(user.id);
        this.updateAuth({
          user,
          role,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        this.updateAuth({
          user: null,
          role: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      this.updateAuth({
        user: null,
        role: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }

  private async getUserRole(userId: string): Promise<UserRole> {
    try {
      // Get user profile with role from database
      const { data: profile, error } = await this.supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error || !profile) {
        console.warn('Could not fetch user role:', error);
        return null;
      }

      // Validate role
      const validRoles = Object.values(ROLES);
      if (validRoles.includes(profile.role as Role)) {
        return profile.role as UserRole;
      }

      return null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }

  private updateAuth(auth: AuthUser) {
    this.currentAuth = auth;
    this.listeners.forEach(listener => listener(auth));
  }

  // Public methods
  getCurrentAuth(): AuthUser {
    return { ...this.currentAuth };
  }

  subscribe(listener: (auth: AuthUser) => void): () => void {
    this.listeners.push(listener);

    // Immediately call with current state
    listener(this.currentAuth);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }

    this.updateAuth({
      user: null,
      role: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }

  // Role-based access control helpers
  hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    if (!userRole || !requiredRole) return false;
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
  }

  canAccessRole(userRole: UserRole, targetRole: UserRole): boolean {
    return this.hasRole(userRole, targetRole);
  }

  canAccessFeature(userRole: UserRole, feature: string): boolean {
    // Use navigation constants for feature access rules
    const navItem = NAVIGATION_ITEMS.find(item => item.href === `/dashboard/${feature}`);
    return navItem ? navItem.roles.includes(userRole) : false;
  }
}

// Create singleton instance
export const authService = new AuthService();

// React hook for using auth
export function useAuth() {
  const [auth, setAuth] = React.useState<AuthUser>(authService.getCurrentAuth());

  React.useEffect(() => {
    const unsubscribe = authService.subscribe(setAuth);
    return unsubscribe;
  }, []);

  return auth;
}

// Utility functions for role checks
export function requireAuth(auth: AuthUser): asserts auth is AuthUser & { user: User; role: UserRole } {
  if (!auth.isAuthenticated || !auth.user || !auth.role) {
    throw new Error('Authentication required');
  }
}

export function requireRole(auth: AuthUser, requiredRole: UserRole): asserts auth is AuthUser & { user: User; role: UserRole } {
  requireAuth(auth);
  if (!authService.canAccessRole(auth.role, requiredRole)) {
    throw new Error(`Role ${requiredRole} required`);
  }
}