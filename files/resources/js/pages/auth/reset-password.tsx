import { ResetPasswordForm } from '@/components/domain/auth/reset-password-form';
import { Link } from '@/components/ui/link';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';

export default function ResetPasswordPage({ token, email, passwordRules }: { token: string; email: string; passwordRules: string }) {
    return (
        <>
            <ResetPasswordForm token={token} email={email} passwordRules={passwordRules} />

            <div className="flex flex-col gap-2 font-bold text-muted-foreground">
                <p>
                    Back to <Link href={login()}>login</Link>
                </p>
            </div>
        </>
    );
}

ResetPasswordPage.layout = [AuthLayout, { title: 'Reset Password', description: 'Enter your new password below to reset your password.' }];
