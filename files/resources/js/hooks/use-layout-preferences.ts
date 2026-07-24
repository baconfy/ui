import { usePage } from '@inertiajs/react';
import type { LayoutPreferences } from '@/types/shell';

const defaults: LayoutPreferences = {
    variant: 'inset',
    collapsible: 'icon',
    side: 'left',
};

export function useLayoutPreferences(): LayoutPreferences {
    const { layout } = usePage<{ layout?: Partial<LayoutPreferences> }>().props;

    return { ...defaults, ...layout };
}
