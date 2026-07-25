import { Head, Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

export default function WelcomePage() {
  return (
    <>
      <Head title="Welcome" />

      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 text-foreground">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Welcome to Baconfy</h1>
        <Link href={dashboard()} className={cn(buttonVariants())}>
          Dashboard
        </Link>
      </div>
    </>
  );
}
