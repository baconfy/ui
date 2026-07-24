import { createInertiaApp } from '@inertiajs/react';
import { configureEcho } from '@laravel/echo-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

configureEcho({ broadcaster: 'reverb' });

const appName = import.meta.env.VITE_APP_NAME || 'Baconfy';
const defaultTitle = 'Baconfy';

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
    return (
      <TooltipProvider delayDuration={0}>
        {app}
      </TooltipProvider>
    );
  },
  progress:
});

initializeTheme();
