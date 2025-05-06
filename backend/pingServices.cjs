const axios = require('axios');
const cron = require('node-cron');
const Database = require('better-sqlite3');

const db = new Database('statusstack.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service TEXT NOT NULL,
        url TEXT NOT NULL
    );
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS pings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service TEXT NOT NULL,
        url TEXT NOT NULL,
        status TEXT NOT NULL,
        err TEXT,
        responseTime INTEGER,
        timestamp TEXT NOT NULL
    );
`).run();

function insertPingToDB(pingResult) {
    db.prepare(`
        INSERT INTO pings (
            service,
            url,
            status,
            err,
            responseTime, 
            timestamp
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        pingResult['service'], 
        pingResult['url'],
        pingResult['status'], 
        pingResult['err'],
        pingResult['responseTime'], 
        pingResult['timestamp']
    );
}

async function pingUrl(url, timeoutMs = 10000) {
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
            err: ''
        };
    } catch (err) {
        return {
            status: 'down',
            timestamp: timestamp,
            err: err.name === 'TimeoutError' ? 'Timeout': err.code || err.message,
        };
    }
}

async function pingApps() {
    const pingResult = {
        service: 'YouTube', // name
        url: 'https://youtube.com', // url of service
        status: '',
        err: '',
        responseTime: '',
        timestamp: '',
    };

    const ping = await pingUrl(pingResult['url']);

    pingResult['status'] = ping['status'];
    pingResult['err'] = ping['err'];
    pingResult['timestamp'] = ping['timestamp'];
    pingResult['responseTime'] = ping['responseTime'];

    insertPingToDB(pingResult);
    console.log(pingResult); // 200
}

cron.schedule(
    '*/10 * * * * *', // cron expression: second, minute, hour, day of month, month, day of week
    pingApps, // function to call
    { // options
        scheduled: true, // will start automatically
        timezone: 'America/New_York' 
    }
);

