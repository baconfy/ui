import type { ReactNode } from 'react';

import { LoginForm } from '@/components/domain/auth/login-form';
import { Link } from '@/components/ui/link';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';

export default function LoginPage({ status, canResetPassword = true, canRegister = true }: { status?: string; canResetPassword?: boolean; canRegister?: boolean }) {
    return (
        <>
            <LoginForm status={status} />

            <div className="flex flex-col gap-2 font-bold text-muted-foreground">
                {canResetPassword && (
                    <p>
                        Forgot your password? <Link href={request()}>Recover it</Link>
                    </p>
                )}

                {canRegister && (
                    <p>
                        Don't have an account? <Link href={register()}>Create one</Link>
                    </p>
                )}
            </div>
        </>
    );
}

LoginPage.layout = (page: ReactNode) => <AuthLayout title="Log In" description="Enter your email and password below to log in." children={page} />;
