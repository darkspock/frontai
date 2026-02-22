export type UserRole = 'super_admin' | 'admin' | 'technician' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  company_id: string;
  is_active: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

export interface MagicLinkRequest {
  email: string;
}

export interface RegisterCompanyRequest {
  name: string;
  admin_email: string;
  email_domains: string[];
}
