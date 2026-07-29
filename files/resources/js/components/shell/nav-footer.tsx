import { Link, usePage } from '@inertiajs/react';
import { ChevronsUpDown, LogOut, Moon, Settings, Sun } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Panel } from '@/components/ui/panel';
import { useAppearance } from '@/hooks/use-appearance';
import { useInitials } from '@/hooks/use-initials';
import { useIsMobile } from '@/hooks/use-mobile';
import { toUrl } from '@/lib/utils';
import { logout } from '@/routes';
import type { NavItem } from '@/types/navigation';

const separator = 'mx-0 my-2';

interface NavFooterProps {
    items: NavItem[];
}

export function NavFooter({ items }: NavFooterProps) {
    const { auth } = usePage().props;
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const getInitials = useInitials();
    const isMobile = useIsMobile();

    if (!auth.user) {
        return null;
    }

    const dark = resolvedAppearance === 'dark';
    const themeLabel = dark ? 'Light theme' : 'Dark theme';

    return (
        <div className="shrink-0 pt-4">
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-0.5 py-1 text-left transition-colors @max-[10rem]:justify-center hover:[&>svg]:text-primary-strong" data-test="sidebar-menu-button">
                            <Avatar className="size-10 shrink-0">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback className="text-base font-black">{getInitials(auth.user.name)}</AvatarFallback>
                            </Avatar>

                            <div className="grid min-w-0 flex-1 leading-tight @max-[10rem]:hidden">
                                <span className="truncate font-bold">{auth.user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">{auth.user.email}</span>
                            </div>

                            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground @max-[10rem]:hidden" />
                        </button>
                    }
                />

                <DropdownMenuContent className="w-full rounded-(--panel-radius) border-0 bg-transparent p-0 shadow-xl ring-0 md:min-w-80" align="end" side={isMobile ? 'bottom' : 'right'}>
                    <Panel className="w-full [--panel-gap:0px] [--panel-padding:--spacing(4)]">
                        <div className="flex flex-col items-center gap-4 pb-2 text-center">
                            <Avatar className="size-14">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback className="text-xl font-black">{getInitials(auth.user.name)}</AvatarFallback>
                            </Avatar>

                            <div className="grid min-w-0 gap-0.5">
                                <span className="truncate leading-none font-bold">{auth.user.name}</span>
                                <span className="truncate text-xs leading-none text-muted-foreground/75">{auth.user.email}</span>
                            </div>
                        </div>

                        <DropdownMenuSeparator className={separator} />

                        <DropdownMenuItem render={<Link href="/settings/profile" />}>
                            <Settings />
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => updateAppearance(dark ? 'light' : 'dark')}>
                            {dark ? <Sun /> : <Moon />}
                            {themeLabel}
                        </DropdownMenuItem>

                        {items.length > 0 && <DropdownMenuSeparator className={separator} />}

                        {items.map((item) => (
                            <DropdownMenuItem key={item.title} render={item.external ? <a href={toUrl(item.href)} target="_blank" rel="noopener noreferrer" /> : <Link href={item.href} />}>
                                {item.icon && <item.icon />}
                                {item.title}
                            </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator className={separator} />

                        <DropdownMenuItem variant="destructive" nativeButton render={<Link href={logout()} as="button" />}>
                            <LogOut />
                            Sign out
                        </DropdownMenuItem>
                    </Panel>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
