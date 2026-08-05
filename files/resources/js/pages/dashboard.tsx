import { Head, usePage } from '@inertiajs/react';
import { PageHeader } from '@/components/shell/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Pattern } from '@/components/ui/pattern';
import AppLayout from '@/layouts/app-layout';

export default function DashboardPage() {
    const { auth } = usePage().props;

    const cards = [
        'md:col-span-6 md:col-start-1 md:row-span-4 md:row-start-1  **:data-[slot=panel-content]:bg-muted',
        'md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1 **:data-[slot=panel-content]:bg-primary [&_svg]:stroke-primary-foreground/25',
        'md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-3 **:data-[slot=panel-content]:bg-secondary [&_svg]:stroke-secondary-foreground/25',
        'md:col-span-3 md:col-start-10 md:row-span-2 md:row-start-1',
        'md:col-span-3 md:col-start-10 md:row-span-6 md:row-start-3',
        'md:col-span-4 md:col-start-1 md:row-span-4 md:row-start-5',
        'md:col-span-5 md:col-start-5 md:row-span-4 md:row-start-5'
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex min-h-full flex-col gap-6">
                <PageHeader title={`Welcome back, ${auth.user.name}`} description="Here is what is happening across your account today." />

                <div className="grid flex-1 auto-rows-40 grid-cols-1 gap-6 md:auto-rows-auto md:grid-cols-12 md:grid-rows-8">
                    {cards.map((klass) => (
                        <Card className={`${klass} **:data-[slot=panel-content]:p-0`}>
                            <CardContent className="relative flex size-full">
                                <Pattern />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

DashboardPage.layout = [AppLayout, { breadcrumbs: [{ title: 'Dashboard' }] }];
