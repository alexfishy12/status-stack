'use server';

import db from '@/lib/db/db';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';

export async function createService(data: { name: string; url: string; }) {
    try {
        // get authenticated user's ID
        const supabase = createClient();
        const { data: { user } } = await (await supabase).auth.getUser();

        if (!user) {
            console.log('Error: No user is logged in');
            return {success: false, error: 'No user is logged in.'};
        }
        const userId = user?.id;
        console.log('User ID is logged in: ', userId);
        
        console.log('Checking if service url exists: ', data.url);

        // see if url exists already as a service
        const existing = db.prepare(`
            SELECT id from services where url = ?
        `).get(data.url) as {id: string;};

        let serviceId;

        if (existing) {
            // get existing url service id
            console.log('Url exists: ', data.url);
            serviceId = existing.id;

            // check if user id is already mapped to that service
            const existing_for_user = db.prepare(`
                SELECT id from user_services where user_id = ? and service_id = ?    
            `).get(userId, serviceId) as {id: string};

            if (existing_for_user) {
                return {success: false, error: 'Service already exists for user.'};
            }
        } else {
            // insert new service and get its service id
            console.log('Url does not exist. Adding to services: ', data.url);
            const insert = db.prepare(
                `INSERT INTO services (url) VALUES (?)`
            ).run(data.url);
            serviceId = insert.lastInsertRowid;
        }

        // insert into db
        console.log('Creating user service: ', data);

        // insert user_service to map existing service to user
        db.prepare(`
            INSERT INTO user_services (user_id, service_id, service_name) VALUES (?, ?, ?)
        `).run(userId, serviceId, data.name);

        return {success: true};

    } catch (err) {
        console.error('DB error: ', err);
        return {success: false, error: err instanceof Error ? err.message : 'Unknown error'};
    }
}