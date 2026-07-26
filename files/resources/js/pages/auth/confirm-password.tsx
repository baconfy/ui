import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPasswordPage() {
    return (
        <>
            <Head title="Confirm password" />
        </>
    );
}

ConfirmPasswordPage.layout = (page: ReactNode) => <AuthLayout children={page} />;
