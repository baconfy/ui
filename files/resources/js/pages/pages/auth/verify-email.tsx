import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmailPage({ status }: { status?: string }) {
    return (
        <>
            <Head title="Log in" />
        </>
    );
}

VerifyEmailPage.layout = (page: ReactNode) => <AuthLayout children={page} />;
