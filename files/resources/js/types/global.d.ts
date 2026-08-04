import type { Auth } from '@/types/auth';
import type { NotificationPage } from '@/types/shell';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            /** Shared with authenticated requests only — guest pages never carry it. */
            notifications?: NotificationPage;
            /** Unread total from the server — not a count of what happens to be loaded. */
            unreadCount?: number;
            [key: string]: unknown;
        };
    }
}
