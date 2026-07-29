import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function DashboardPage() {
    return (
        <>
            <Head title="Dashboard" />
        </>
    );
}

DashboardPage.layout = [AppLayout, { breadcrumbs: [{ title: 'Home' }] }];
