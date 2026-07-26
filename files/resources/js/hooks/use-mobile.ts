import { useSyncExternalStore } from 'react';

const DESKTOP_QUERY = '(min-width: 48rem)';

function subscribe(onStoreChange: () => void) {
    const mql = window.matchMedia(DESKTOP_QUERY);

    mql.addEventListener('change', onStoreChange);

    return () => mql.removeEventListener('change', onStoreChange);
}

function getSnapshot() {
    return !window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot() {
    return false;
}

export function useIsMobile() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
