import AuthLayout from '@/layouts/auth-layout';
import { VerifyEmailForm } from '@/components/domain/auth/verify-email-form';
import { Link } from '@/components/ui/link';
import { logout } from '@/routes';

export default function VerifyEmailPage({ status }: { status?: string }) {
    return (
        <>
            {status === 'verification-link-sent' && <div className="mb-4 text-center text-sm font-medium text-green-600">A new verification link has been sent to the email address you provided during registration.</div>}

            <VerifyEmailForm />

            <div className="flex flex-col gap-2 font-bold text-muted-foreground">
                <Link href={logout()}>Log out</Link>
            </div>
        </>
    );
}

VerifyEmailPage.layout = [AuthLayout, { title: 'Verify Email', description: 'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn&apos;t receive the email, we will gladly send you another.' }];
