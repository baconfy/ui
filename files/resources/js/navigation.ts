import { Activity, BookOpen, CircleHelp, Layers, LayoutGrid, Rocket } from 'lucide-react';
import { dashboard } from '@/routes';
import type { NavGroup, NavItem } from '@/types/navigation';

export const navigation: NavGroup[] = [
    {
        label: 'Menu',
        items: [
            { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
            { title: 'Projects', href: '/projects', icon: Layers },
            { title: 'Deployments', href: '/deployments', icon: Rocket },
            { title: 'Activity', href: '/activity', icon: Activity },
        ],
    },
];

export const navigationFooter: NavItem[] = [
    { title: 'Documentation', href: 'https://laravel.com/docs', icon: BookOpen, external: true },
    { title: 'Support', href: 'https://laravel.com/docs/starter-kits', icon: CircleHelp, external: true },
];
