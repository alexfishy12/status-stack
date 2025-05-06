import { intervalToDuration, parseISO, format } from 'date-fns';

export function formatUptimeDate(dateStr?: string | null): string | null {
    if (!dateStr) return null;
    return format(new Date(dateStr), "MMM d',' yyyy 'at' h:mm:ss aa")
}

export function formatDurationSince(dateStr?: string | null): string | null {
    if (!dateStr) return null;

    const start = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
    const end = new Date();

    const duration = intervalToDuration({start, end});

    const {days, hours, minutes, seconds} = duration;

    const parts = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    if (seconds || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join(' ');
}

