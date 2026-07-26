import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

import AuthLayout from '@/layouts/auth-layout';

export default function ResetPasswordPage({ token, email, passwordRules }: { token: string; email: string; passwordRules: string }) {
    return (
        <>
            <Head title="Reset Password" />
        </>
    );
}

ResetPasswordPage.layout = (page: ReactNode) => <AuthLayout children={page} />;
