import type { UserRole } from '@/types/auth';

const roleDefaults: Record<UserRole, string> = {
  super_admin: '/dashboard',
  admin: '/dashboard',
  technician: '/requests',
  employee: '/my/equipment',
};

export function getDefaultRouteForRole(role: UserRole): string {
  return roleDefaults[role];
}
