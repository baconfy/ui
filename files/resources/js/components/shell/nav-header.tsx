import { usePage } from '@inertiajs/react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { NavAction } from '@/components/shell/nav-action';
import { Brand } from '@/components/ui/brand';

interface NavHeaderProps {
    expanded: boolean;
    onToggle: () => void;
}

export function NavHeader({ expanded, onToggle }: NavHeaderProps) {
    const { name } = usePage().props;
    const label = expanded ? 'Recolher navegação' : 'Expandir navegação';

    return (
        // Colapsado, marca e toggle dividem o mesmo espaço e trocam no hover;
        // expandido, ficam lado a lado com o toggle empurrado para a direita.
        <div className="group/brand flex shrink-0 items-center gap-2 px-1.5 @max-[10rem]:relative @max-[10rem]:justify-center">
            <Brand className="size-8 text-primary transition-opacity @max-[10rem]:group-hover/brand:opacity-0 @max-[10rem]:group-has-[:focus-visible]/brand:opacity-0" />

            {/* Por container query e não por `expanded`: no drawer mobile o painel
                é largo mesmo com a sidebar marcada como colapsada. */}
            <span className="font-title text-xl font-black tracking-tight @max-[10rem]:hidden">{name}</span>

            <NavAction
                label={label}
                side="right"
                render={
                    // Continua sendo `<button>` — sem isso perde teclado e leitor
                    // de tela —, mas sem a caixa: o ícone é o alvo, e cresce para
                    // 24px porque não há mais superfície de 32px em volta dele.
                    //
                    // Colapsado ele fica sobreposto à marca com `opacity-0`, o que
                    // o mantém clicável e focável: o alvo do clique é o mesmo
                    // quadrado da marca, e quem chega por teclado o vê pelo
                    // `focus-visible`.
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-expanded={expanded}
                        aria-controls="app-navigation"
                        // `focus-visible` e não `focus-within`: com foco comum, um
                        // clique deixava o toggle preso visível até o foco sair.
                        // A marca usa `group-has-[:focus-visible]`, o mesmo
                        // gatilho, senão um esconde sem o outro aparecer.
                        className="clickable shrink-0 text-muted-foreground transition-[color,opacity] hover:text-primary-strong @min-[10rem]:ml-auto @max-[10rem]:absolute @max-[10rem]:opacity-0 @max-[10rem]:group-hover/brand:opacity-100 @max-[10rem]:focus-visible:opacity-100"
                    >
                        {expanded ? <PanelLeftClose className="size-6" /> : <PanelLeftOpen className="size-6" />}
                        <span className="sr-only">{label}</span>
                    </button>
                }
            />
        </div>
    );
}
