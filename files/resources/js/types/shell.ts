export interface BreadcrumbItem {
    title: string;
    href?: string;
}

export interface LayoutPreferences {
    variant: 'sidebar' | 'floating' | 'inset';
    collapsible: 'offcanvas' | 'icon' | 'none';
    side: 'left' | 'right';
}
