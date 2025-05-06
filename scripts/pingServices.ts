const axios = require('axios');
const cron = require('node-cron');
import db from '@/lib/db/db';

interface Service {
    id: number;
    service: string;
    url: string;
};

let services: Service[] = [];
let lastCheckedServiceId = 0; // epoch millis

function refreshServicesIfNeeded() {
    const newest = (db.prepare('SELECT MAX(ID) as maxId from services').get() as { maxId: number | null })?.maxId || 0;

    if (newest > lastCheckedServiceId) {
        services = db.prepare('SELECT id, service, url FROM services').all() as { id: number; service: string; url: string }[];
        lastCheckedServiceId = newest;
        console.log(`Refreshed services list. New count: ${services.length}`);
    }
}

async function pingUrl(url: string, timeoutMs = 10000) {
    const start = Date.now();
    const timestamp = new Date(start).toLocaleString();
    try {
        const res = await fetch(url, {
            method: 'HEAD',
            signal: AbortSignal.timeout(timeoutMs),
        });

        return {
            status: 'up',
            timestamp: timestamp,
            responseTime: Date.now() - start,
        };
    } catch (err) {
        return {
            status: 'down',
            timestamp: timestamp,
            err: err instanceof Error ? (err.name === 'TimeoutError' ? 'Timeout' : err.message) : 'Unknown error',
        };
    }
}

async function pingApps() {
    refreshServicesIfNeeded();

    for (const svc of services) {
        const ping = await pingUrl(svc.url);
        db.prepare(`
            INSERT INTO pings (
                service_id,
                status,
                err,
                responseTime, 
                timestamp
            )
            VALUES (?, ?, ?, ?, ?)
        `).run(
            svc.id,
            ping.status,
            ping.err || null,
            ping.responseTime || null,
            ping.timestamp
        );
        console.log(`[${ping.timestamp}] Pinged ${svc.url} (${ping.status})`);
    }
}

cron.schedule(
    '*/10 * * * * *', // cron expression: second, minute, hour, day of month, month, day of week
    pingApps, // function to call
    { // options
        scheduled: true, // will start automatically
        timezone: 'America/New_York' 
    }
);

