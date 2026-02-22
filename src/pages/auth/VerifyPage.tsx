import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { AuthShell } from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(true);
      return;
    }

    const timer = setTimeout(() => {
      login('mock-token');
      navigate('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [token, login, navigate]);

  if (error) {
    return (
      <AuthShell>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-destructive/15 p-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-semibold">Invalid link</h2>
          <p className="text-sm text-muted-foreground">
            This verification link is invalid or has expired.
          </p>
          <Link to="/auth/login">
            <Button variant="outline">Back to login</Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-muted border-t-primary" />
        <h2 className="text-2xl font-semibold">Verifying...</h2>
        <p className="text-sm text-muted-foreground">Please wait while we verify your login link.</p>
      </div>
    </AuthShell>
  );
}
