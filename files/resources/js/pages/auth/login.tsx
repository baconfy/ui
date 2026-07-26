import { LoginForm } from '@/components/domain/auth/login-form';
import { VerifyPasskey } from '@/components/domain/auth/verify-passkey';
import { Link } from '@/components/ui/link';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';

export default function LoginPage({ status, showResetPassword = true, showRegister = true, showPasskey = true }: { status?: string; showResetPassword?: boolean; showRegister?: boolean; showPasskey?: boolean }) {
    return (
        <>
            {showPasskey && <VerifyPasskey />}

            <LoginForm status={status} />

            <div className="flex flex-col gap-2 font-bold text-muted-foreground">
                {showResetPassword && (
                    <p>
                        Forgot your password? <Link href={request()}>Recover it</Link>
                    </p>
                )}

                {showRegister && (
                    <p>
                        Don't have an account? <Link href={register()}>Create one</Link>
                    </p>
                )}
            </div>
        </>
    );
}

LoginPage.layout = [AuthLayout, { title: 'Log In', description: 'Enter your email and password below to log in.' }];
