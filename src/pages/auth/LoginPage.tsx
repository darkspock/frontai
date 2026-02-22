import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';
import { AuthShell } from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { getDefaultRouteForRole } from '@/lib/navigation';
import { mockApi } from '@/lib/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PageState = 'default' | 'sending' | 'sent';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [pageState, setPageState] = useState<PageState>('default');

  if (user) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  const validate = (): boolean => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Enter a valid email');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPageState('sending');
    try {
      await mockApi.post('/auth/magic-link', { email });
      setPageState('sent');
    } catch {
      setError('Something went wrong. Please try again.');
      setPageState('default');
    }
  };

  const handleContinueDemo = () => {
    login('mock-token');
    navigate('/');
  };

  if (pageState === 'sent') {
    return (
      <AuthShell>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-green-50 p-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold">Check your email</h2>
          <p className="text-sm text-muted-foreground">
            We sent a login link to <span className="font-medium">{email}</span>
          </p>
          <Button onClick={handleContinueDemo} className="w-full mt-4">
            Continue (demo)
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="text-sm text-muted-foreground">Enter your email to receive a magic link</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className={error ? 'text-destructive' : undefined}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              className={error ? 'border-destructive' : undefined}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={pageState === 'sending'}>
            {pageState === 'sending' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-muted border-t-current mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send magic link
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link to="/auth/register" className="text-primary font-medium hover:underline">
            Register your company
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
