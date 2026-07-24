import { useSyncExternalStore } from 'react';

/**
 * The exact complement of Tailwind's `md:` variant.
 *
 * Tailwind's `md` breakpoint is `--breakpoint-md: 48rem`, and the sidebar's
 * desktop branch is gated on `md:block` / `md:flex`. This hook decides which
 * branch React renders, so the two have to flip at the same width or the
 * sidebar vanishes in the gap between them.
 *
 * The unit must be `rem`, not `px`: media queries resolve relative units
 * against the browser's INITIAL font-size, so `48rem` here and `48rem` in the
 * Tailwind variant always resolve to the same width — including when the user
 * raises their default font-size, where a hardcoded `768px` would drift out of
 * step with a `md:` that has moved to 960px.
 *
 * Phrased as `min-width` and negated, rather than as `max-width: 47.999rem`, so
 * that no rounding gap or overlap between the two conditions is possible by
 * construction.
 */
const DESKTOP_QUERY = '(min-width: 48rem)';

function subscribe(onStoreChange: () => void) {
    const mql = window.matchMedia(DESKTOP_QUERY);

    mql.addEventListener('change', onStoreChange);

    return () => mql.removeEventListener('change', onStoreChange);
}

function getSnapshot() {
    return !window.matchMedia(DESKTOP_QUERY).matches;
}

/**
 * The server has no viewport, so it renders the desktop branch. The client
 * returns this same value while hydrating, keeping the markup identical, and
 * React then switches to `getSnapshot` and corrects on real viewports.
 */
function getServerSnapshot() {
    return false;
}

export function useIsMobile() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
