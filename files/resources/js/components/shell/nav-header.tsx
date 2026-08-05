import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { NavAction } from '@/components/shell/nav-action';
import { Brand, BrandIcon } from '@/components/ui/brand';

interface NavHeaderProps {
    expanded: boolean;
    onToggle: () => void;
}

/**
 * The wordmark, and the control that collapses the panel.
 *
 * Collapsed, the wordmark goes and the toggle takes the row on its own — the
 * one thing you can still do from a 6rem column is widen it again. That is why
 * the toggle is plainly visible here rather than revealed on hover: at this
 * width it is the only control, and a control you have to find is not one.
 */
export function NavHeader({ expanded, onToggle }: NavHeaderProps) {
    const label = expanded ? 'Collapse navigation' : 'Expand navigation';

    return (
        <div className="flex shrink-0 items-center gap-2 px-1.5 @max-[10rem]:justify-center">
            {/* The whole lockup goes when the panel narrows, not just the word.
                At 6rem there are 48px of usable width and the mark plus the
                toggle want 56 — and the toggle is the one that has to stay,
                because widening the panel is the only thing left to do here. */}
            <div className="flex items-center gap-2 @max-[10rem]:hidden">
                <BrandIcon />
                <Brand className="text-xl" />
            </div>

            <NavAction
                label={label}
                side="right"
                render={
                    <button type="button" onClick={onToggle} aria-expanded={expanded} aria-controls="app-navigation" className="shrink-0 clickable text-muted-foreground transition-colors hover:text-primary @min-[10rem]:ml-auto">
                        {expanded ? <PanelLeftClose className="size-6" /> : <PanelLeftOpen className="size-6" />}
                        <span className="sr-only">{label}</span>
                    </button>
                }
            />
        </div>
    );
}
