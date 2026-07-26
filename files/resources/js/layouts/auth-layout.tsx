import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Brand } from '@/components/ui/brand';

export default function AuthLayout({ title = '', description = '', children }: { title?: string; description?: string; children: ReactNode }) {
    return (
        <>
            <Head title={title} />

            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex items-center justify-center p-6 md:p-10">
                    <div className="flex w-full max-w-sm flex-col gap-12">
                        <div className="flex flex-col items-center justify-center gap-4 text-center">
                            <Brand className="size-24" />

                            <div>
                                <h1 className="text-3xl leading-8 font-bold">{title}</h1>
                                <p className="leading-6 text-muted-foreground">{description}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">{children}</div>
                    </div>
                </div>

                <div className="hidden p-3 lg:block">
                    <img src="/auth.webp" alt="" className="size-full rounded-2xl bg-muted object-cover" />
                </div>
            </div>
        </>
    );
}
