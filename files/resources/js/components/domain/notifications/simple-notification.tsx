import { Bell, CalendarClock, FileText, MessageSquare, ShieldAlert, TriangleAlert, UserPlus } from 'lucide-react';
import type { ComponentType } from 'react';

import { NotificationBody, NotificationDot, NotificationIcon, NotificationRow, NotificationTime, NotificationTitle } from '@/components/ui/notification';
import type { NotificationProps } from '@/types/shell';

const ICONS: Record<string, ComponentType> = { FileText, MessageSquare, ShieldAlert, TriangleAlert, UserPlus, CalendarClock };

export function SimpleNotification({ notification }: NotificationProps) {
    const Icon = ICONS[notification.data.icon ?? ''] ?? Bell;

    return (
        <NotificationRow notification={notification}>
            <NotificationIcon>
                <Icon />
            </NotificationIcon>

            <NotificationBody>
                <NotificationTime />
                <NotificationTitle>{notification.data.title}</NotificationTitle>
            </NotificationBody>

            <NotificationDot />
        </NotificationRow>
    );
}
