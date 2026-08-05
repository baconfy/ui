import { Bell, CalendarClock, FileText, MessageSquare, ShieldAlert, TriangleAlert, UserPlus } from 'lucide-react';
import type { ComponentType } from 'react';

import { NotificationBody, NotificationDescription, NotificationHeader, NotificationIcon, NotificationMarker, NotificationRow, NotificationTime, NotificationTitle } from '@/components/ui/notification';
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
                <NotificationHeader>
                    <NotificationTitle>{notification.data.title}</NotificationTitle>
                    <NotificationMarker />
                </NotificationHeader>

                {notification.data.description && <NotificationDescription>{notification.data.description}</NotificationDescription>}

                <NotificationTime />
            </NotificationBody>
        </NotificationRow>
    );
}
