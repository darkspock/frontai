import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Construction className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">Coming soon</p>
      </div>
    </div>
  );
}
