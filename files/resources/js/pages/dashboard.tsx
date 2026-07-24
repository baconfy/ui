import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import AppLayout from '@/layouts/app-layout';

export default function DashboardPage() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-1 items-center justify-center">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Dashboard</h1>
            </div>
        </>
    );
}

DashboardPage.layout = (page: ReactNode) => <AppLayout breadcrumbs={[{ title: 'Home' }]}>{page}</AppLayout>;
