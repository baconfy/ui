import { ForgotPasswordForm } from '@/components/domain/auth/forgot-password-form';
import { Link } from '@/components/ui/link';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';

export default function ForgotPasswordPage({ status }: { status?: string }) {
    return (
        <>
            <ForgotPasswordForm status={status} />

            <div className="mt-4 text-center text-sm text-muted-foreground">
                <Link href={login()}>Back to login</Link>
            </div>
        </>
    );
}

ForgotPasswordPage.layout = [AuthLayout, { title: 'Forgot Password', description: 'No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.' }];
