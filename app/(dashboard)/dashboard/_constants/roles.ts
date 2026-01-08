export const ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  TEAM_LEAD: 'team-lead',
  MEMBER: 'member',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<Role, number> = {
  [ROLES.MEMBER]: 1,
  [ROLES.TEAM_LEAD]: 2,
  [ROLES.ADMIN]: 3,
  [ROLES.SUPER_ADMIN]: 4,
} as const;

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.TEAM_LEAD]: 'Team Lead',
  [ROLES.MEMBER]: 'Member',
} as const;

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  [ROLES.SUPER_ADMIN]: 'Complete platform oversight and management',
  [ROLES.ADMIN]: 'System administration and approvals',
  [ROLES.TEAM_LEAD]: 'Team coordination and merchant management',
  [ROLES.MEMBER]: 'Basic dashboard access and support',
} as const;