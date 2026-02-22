import { Inbox, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface StateBlockProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

function StateBlock({ icon, title, description, action }: StateBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
      {icon && <div className="rounded-full bg-muted p-4 mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4 max-w-sm">{description}</p>
      )}
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <StateBlock
      icon={<Inbox className="h-8 w-8 text-muted-foreground" />}
      title={title}
      description={description}
      action={action}
    />
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again.',
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <StateBlock
      icon={<AlertTriangle className="h-8 w-8 text-destructive" />}
      title={title}
      description={description}
      action={
        onRetry ? (
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        ) : undefined
      }
    />
  );
}
