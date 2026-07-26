import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function AuthLayout({ title = '', description = '', children }: { title?: string; description?: string; children: ReactNode }) {
    return (
        <>
            <Head title={title} />

            <div className="mx-auto flex min-h-svh max-w-sm items-center justify-center">
                <div className="flex w-full flex-col gap-12 p-6 md:p-0">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold leading-8">{title}</h1>
                        <p className="text-muted-foreground leading-6">{description}</p>
                    </div>

                    <div className="flex flex-col gap-8">{children}</div>
                </div>
            </div>
        </>
    );
}
