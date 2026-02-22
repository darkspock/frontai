import { Inbox, HardDrive, Clock, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className={`rounded-full p-3 ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const stats: StatCardProps[] = [
  { title: 'Open Requests', value: '12', icon: Inbox, color: 'bg-blue-50 text-blue-600' },
  { title: 'Assets', value: '156', icon: HardDrive, color: 'bg-green-50 text-green-600' },
  { title: 'Avg Resolution', value: '4.2h', icon: Clock, color: 'bg-amber-50 text-amber-600' },
  { title: 'SLA Breaches', value: '3', icon: AlertTriangle, color: 'bg-destructive/15 text-destructive' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              Request Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
              Chart coming soon
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PieChart className="h-5 w-5 text-muted-foreground" />
              Assets by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
              Chart coming soon
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
