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
            notifications?: NotificationPage;
            unreadCount?: number;
            [key: string]: unknown;
        };
    }
}
