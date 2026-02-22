import type { ReactNode } from 'react';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-md">
          <h1 className="text-4xl font-bold mb-4">Desk Support Monkey</h1>
          <p className="text-lg opacity-90">
            IT Service Desk & Asset Inventory for modern teams
          </p>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}
