import { Head } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPasswordPage() {
    return (
        <>
            <Head title="Confirm password" />
        </>
    );
}

ConfirmPasswordPage.layout = [AuthLayout, { title: 'Confirm Password', description: 'This is a secure area of the application. Please confirm your password before continuing.' }];
