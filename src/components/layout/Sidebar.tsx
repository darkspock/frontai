import { Link, useLocation } from 'react-router-dom';
import {
  Monitor,
  MessageSquare,
  LayoutDashboard,
  Inbox,
  HardDrive,
  Users,
  Building2,
  Settings,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types/auth';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  icon: LucideIcon;
  route: string;
  roles: UserRole[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'My Activity',
    items: [
      { label: 'My Equipment', icon: Monitor, route: '/my/equipment', roles: ['employee'] },
      { label: 'My Requests', icon: MessageSquare, route: '/my/requests', roles: ['employee'] },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard', roles: ['admin', 'super_admin'] },
      { label: 'Requests', icon: Inbox, route: '/requests', roles: ['technician', 'admin', 'super_admin'] },
      { label: 'Assets', icon: HardDrive, route: '/assets', roles: ['technician', 'admin', 'super_admin'] },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Users', icon: Users, route: '/users', roles: ['admin', 'super_admin'] },
      { label: 'Departments', icon: Building2, route: '/departments', roles: ['admin', 'super_admin'] },
      { label: 'Settings', icon: Settings, route: '/settings', roles: ['admin', 'super_admin'] },
    ],
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const filteredSections = navigation
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => user && item.roles.includes(user.role)),
    }))
    .filter((section) => section.items.length > 0);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-6 border-b">
        <Link to="/" className="text-lg font-bold" onClick={onClose}>
          DSMonkey
        </Link>
        <button onClick={onClose} className="md:hidden p-1 rounded-md hover:bg-accent">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {filteredSections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.route;
                return (
                  <Link
                    key={item.route}
                    to={item.route}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:border-r bg-background">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-background shadow-lg z-50">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
