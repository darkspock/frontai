import { cn } from '@/lib/utils';

export function Loading({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-muted border-t-primary" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
