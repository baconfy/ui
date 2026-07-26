import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Brand } from '@/components/ui/brand';

export default function AuthLayout({ title = '', description = '', children }: { title?: string; description?: string; children: ReactNode }) {
    return (
        <>
            <Head title={title} />

            <div className="mx-auto flex min-h-svh max-w-sm items-center justify-center">
                <div className="flex w-full flex-col gap-12 p-6 md:p-0">
                    <div className="flex flex-col gap-4 text-center items-center justify-center">
                        <Brand className="size-24" />

                        <div>
                            <h1 className="text-3xl leading-8 font-bold">{title}</h1>
                            <p className="leading-6 text-muted-foreground">{description}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">{children}</div>
                </div>
            </div>
        </>
    );
}
