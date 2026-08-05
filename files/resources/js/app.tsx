import { createInertiaApp } from '@inertiajs/react';
import { configureEcho } from '@laravel/echo-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

// Spelled out rather than relying on the helper's defaults: it only fills these
// in when the variables exist at module-evaluation time, and a dev server that
// started before they were written has none of them.
configureEcho({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 80),
    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 443),
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

const appName = import.meta.env.VITE_APP_NAME || 'Starter Kit';
const defaultTitle = 'Starter Kit';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : defaultTitle),
    strictMode: true,
    defaults: {
        visitOptions: (href, options) => ({
            preserveScroll: options?.preserveScroll ?? 'errors',
            ...options,
        }),
    },
    withApp(app, { ssr, page }) {
        return <TooltipProvider delay={0}>{app}</TooltipProvider>;
    },
    progress: {
        color: '#FCC425FF',
    },
});

initializeTheme();
