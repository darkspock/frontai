import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { AuthShell } from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockApi } from '@/lib/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN_REGEX = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type PageState = 'default' | 'submitting' | 'success';

interface FormErrors {
  name?: string;
  admin_email?: string;
  email_domain?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [pageState, setPageState] = useState<PageState>('default');

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) next.name = 'Company name is required (min 2 characters)';
    if (!adminEmail.trim()) next.admin_email = 'Admin email is required';
    else if (!EMAIL_REGEX.test(adminEmail)) next.admin_email = 'Enter a valid email';
    if (!emailDomain.trim()) next.email_domain = 'At least one domain is required';
    else if (!DOMAIN_REGEX.test(emailDomain)) next.email_domain = 'Enter a valid domain (e.g. acme.com)';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPageState('submitting');
    try {
      await mockApi.post('/register', {
        name,
        admin_email: adminEmail,
        email_domains: [emailDomain],
      });
      setPageState('success');
    } catch {
      setErrors({ name: 'Something went wrong. Please try again.' });
      setPageState('default');
    }
  };

  if (pageState === 'success') {
    return (
      <AuthShell>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-green-50 p-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold">Company registered</h2>
          <p className="text-sm text-muted-foreground">
            Check your email to activate your account.
          </p>
          <Link to="/auth/login">
            <Button variant="outline" className="mt-2">
              Back to login
            </Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Register your company</h2>
          <p className="text-sm text-muted-foreground">Set up your IT service desk</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={errors.name ? 'text-destructive' : undefined}>
              Company name
            </Label>
            <Input
              id="name"
              placeholder="Acme Corp"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
              className={errors.name ? 'border-destructive' : undefined}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin_email" className={errors.admin_email ? 'text-destructive' : undefined}>
              Admin email
            </Label>
            <Input
              id="admin_email"
              type="email"
              placeholder="admin@acme.com"
              value={adminEmail}
              onChange={(e) => { setAdminEmail(e.target.value); setErrors((p) => ({ ...p, admin_email: undefined })); }}
              className={errors.admin_email ? 'border-destructive' : undefined}
            />
            {errors.admin_email && <p className="text-xs text-destructive">{errors.admin_email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email_domain" className={errors.email_domain ? 'text-destructive' : undefined}>
              Email domain
            </Label>
            <Input
              id="email_domain"
              placeholder="acme.com"
              value={emailDomain}
              onChange={(e) => { setEmailDomain(e.target.value); setErrors((p) => ({ ...p, email_domain: undefined })); }}
              className={errors.email_domain ? 'border-destructive' : undefined}
            />
            {errors.email_domain && <p className="text-xs text-destructive">{errors.email_domain}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={pageState === 'submitting'}>
            {pageState === 'submitting' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-muted border-t-current mr-2" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-primary font-medium hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
