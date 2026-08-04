import { format, formatDistanceToNowStrict, isToday, isYesterday } from 'date-fns';

/**
 * `12 minutes ago`, `2 hours ago`, `3 days ago`.
 *
 * Strict, not the default `formatDistanceToNow`, which hedges with "about 1
 * hour ago" — the qualifier costs six characters in a dense row and buys
 * nothing at this precision.
 */
export function relativeTime(iso: string): string {
    return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
}

/**
 * `Today` / `Yesterday` / `12 March`, for grouping a list by day.
 *
 * `isToday` and `isYesterday` compare calendar days rather than elapsed hours,
 * so 11pm and 1am read as a day apart even though two hours separate them.
 */
export function dayLabel(iso: string): string {
    const date = new Date(iso);

    if (isToday(date)) {
        return 'Today';
    }

    if (isYesterday(date)) {
        return 'Yesterday';
    }

    return format(date, 'd MMMM');
}
