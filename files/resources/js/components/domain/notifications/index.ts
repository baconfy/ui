import type { ComponentType } from 'react';

import { SimpleNotification } from '@/components/domain/notifications/simple-notification';
import type { NotificationProps } from '@/types/shell';

/**
 * Every notification type the panel knows how to draw, keyed by the `type` your
 * `toDatabase()` writes into the notification's `data`.
 *
 * ---
 * ## Adding a type
 *
 * 1. Copy `simple-notification.tsx` in this folder and rewrite the markup. It
 *    receives the whole notification, so `data`, `read_at` and `created_at` are
 *    all available.
 * 2. Add one line to the map below.
 * 3. Have your Laravel notification write the matching slug:
 *    `'type' => 'invitation'` inside the array returned by `toDatabase()`.
 *
 * That is the whole mechanism. Nothing in `components/shell` needs to change —
 * the panel looks the row up here and renders whatever it finds.
 *
 * A `type` that is not registered falls back to `SimpleNotification` rather than
 * disappearing: every notification has a title, so a plain row is always better
 * than a blank space.
 */
export const notificationTypes: Record<string, ComponentType<NotificationProps>> = {
    simple: SimpleNotification,
};

export function resolveNotification(type: string | undefined): ComponentType<NotificationProps> {
    return notificationTypes[type ?? ''] ?? SimpleNotification;
}
