import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function WelcomePage() {
    return (
        <>
            <Head title="Welcome" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
                <h1 className="text-4xl font-bold">Welcome</h1>
                <Link href={dashboard()}>Dashboard</Link>
            </div>
        </>
    );
}
