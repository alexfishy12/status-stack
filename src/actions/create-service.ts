'use server';

import db from '@/lib/db';

export async function createService(data: { name: string; url: string; }) {
    try {
        // insert into db
        console.log('Creating service: ', data);
        db.prepare(`INSERT INTO services (service, url) VALUES (?, ?)`)
            .run(data.name, data.url);
        return {success: true};

    } catch (err) {
        console.error('DB error: ', err);
        return {success: false, error: err instanceof Error ? err.message : 'Unknown error'};
    }
}