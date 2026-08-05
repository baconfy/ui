export interface BreadcrumbItem {
    title: string;
    href?: string;
}

export interface LayoutPreferences {
    variant: 'sidebar' | 'floating' | 'inset';
    collapsible: 'offcanvas' | 'icon' | 'none';
    side: 'left' | 'right';
}

export type NotificationTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface Notification {
    id: string;
    data: {
        type: string;
        /** The short label on the first line, beside the time. Keep it to a few words. */
        title: string;
        /** The detail below it. Optional — a title that says everything needs no second line. */
        description?: string;
        icon?: string;
        tone?: NotificationTone;
        url?: string;
    };
    read_at: string | null;
    created_at: string;
}

/**
 * What every notification row component receives. Renderers live in
 * `components/domain/notifications` and are wired up in that folder's `index.ts`.
 */
export interface NotificationProps {
    notification: Notification;
}

/**
 * The shape `Inertia::scroll()` normalises a paginator into. `InfiniteScroll`
 * appends to `data` and reads the cursor from the page object's `scrollProps`.
 */
export interface NotificationPage {
    data: Notification[];
    links: { first: string | null; last: string | null; prev: string | null; next: string | null };
    meta: { path: string; per_page: number; next_cursor: string | null; prev_cursor: string | null };
}
