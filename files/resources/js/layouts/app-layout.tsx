import { router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { AppHeader } from '@/components/shell/app-header';
import { AppSidebar } from '@/components/shell/app-sidebar';
import { Panel } from '@/components/ui/panel';
import { useLayoutPreferences } from '@/hooks/use-layout-preferences';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types/shell';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/**
 * O shell é o único lugar que conhece `variant`, `collapsible` e `state`.
 * Ele resolve as três dimensões em custom properties; os painéis abaixo só
 * consomem, e o conteúdo da navegação reage à largura por container query.
 */
const shell = cn(
    'group/shell flex h-dvh gap-shell-gap overflow-hidden p-shell',
    // A moldura dos painéis vem por variável, com os defaults no `:root` para
    // alcançar também os que são portalizados. Aqui ficam só os overrides.
    'data-[side=right]:flex-row-reverse',
    // `sidebar` cola os painéis nas bordas; `floating`/`inset` flutuam.
    'data-[variant=sidebar]:gap-0 data-[variant=sidebar]:p-0',
    'data-[variant=sidebar]:[--panel-card-radius:0px] data-[variant=sidebar]:[--panel-frame-padding:0px] data-[variant=sidebar]:[--panel-radius:0px]',
    // Colapsado até sumir: sem folga, e sem borda — `width: 0` não encolhe
    // bordas, sobraria uma listra de 2px na beirada da tela.
    'md:data-[collapsible=offcanvas]:data-[state=collapsed]:gap-0',
    'md:data-[collapsible=offcanvas]:data-[state=collapsed]:[--panel-border:0px] md:data-[collapsible=offcanvas]:data-[state=collapsed]:[--panel-frame-padding:0px]',
);

const sidebarPanel = cn(
    '@container w-panel shrink-0 overflow-hidden transition-[width,translate] duration-200 motion-reduce:transition-none',
    // Colapso: só no desktop.
    'md:group-data-[state=collapsed]/shell:w-panel-collapsed',
    'md:group-data-[collapsible=offcanvas]/shell:group-data-[state=collapsed]/shell:w-0',
    // Drawer: abaixo do breakpoint o painel sai do fluxo e flutua. O estado
    // aberto é a base e o fechado é que ganha especificidade, senão `side` e
    // `drawer` empatariam em (0,2,0) e a ordem do output decidiria.
    'max-md:fixed max-md:inset-y-shell max-md:z-50 max-md:start-shell max-md:translate-x-0',
    'max-md:group-data-[side=right]/shell:start-auto max-md:group-data-[side=right]/shell:end-shell',
    'max-md:group-data-[drawer=closed]/shell:-translate-x-[calc(100%+var(--spacing-shell))]',
    'max-md:group-data-[drawer=closed]/shell:group-data-[side=right]/shell:translate-x-[calc(100%+var(--spacing-shell))]',
);

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    headerActions?: ReactNode;
}

export default function AppLayout({ children, breadcrumbs = [], headerActions }: AppLayoutProps) {
    const { variant, collapsible, side } = useLayoutPreferences();
    const isMobile = useIsMobile();
    const { props } = usePage();

    // Estado inicial vem do cookie lido no servidor — não do call-site, que
    // não tem como saber. Daqui em diante quem manda é o cliente.
    const [expanded, setExpanded] = useState(props.sidebarOpen);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // O layout é persistente (`Page.layout = ...`) e não desmonta ao navegar —
    // sem isto o drawer continuaria aberto sobre a página nova.
    useEffect(() => router.on('navigate', () => setDrawerOpen(false)), []);

    const collapsed = collapsible !== 'none' && !expanded;

    function toggle() {
        if (isMobile) {
            setDrawerOpen((open) => !open);

            return;
        }

        const next = !expanded;

        setExpanded(next);
        document.cookie = `sidebar_state=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    }

    return (
        <div className={shell} data-variant={variant} data-collapsible={collapsible} data-side={side} data-state={collapsed ? 'collapsed' : 'expanded'} data-drawer={drawerOpen ? 'open' : 'closed'}>
            {drawerOpen && <button type="button" aria-label="Fechar navegação" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-40 bg-black/50 md:hidden" />}

            <Panel id="app-navigation" className={sidebarPanel}>
                <AppSidebar collapsed={collapsed} onToggle={toggle} />
            </Panel>

            {/* Sem moldura: a página decide se quer um `<Panel>`, vários, ou nenhum. */}
            <div className="flex min-w-0 flex-1 flex-col">
                <AppHeader breadcrumbs={breadcrumbs} actions={headerActions} onToggle={toggle} />

                <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
