import db from '@/lib/db/db';

// creates services table
db.prepare(`
    CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service TEXT NOT NULL,
        url TEXT NOT NULL
    );
`).run();

// creates pings table
db.prepare(`
    CREATE TABLE IF NOT EXISTS pings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_id INTEGER NOT NULL,
        status TEXT NOT NULL,
        err TEXT,
        responseTime INTEGER,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (service_id) REFERENCES services(id) on DELETE CASCADE
    );
`).run();

// creates view for getting quick-peek analytics for a service
db.prepare(`
    CREATE VIEW IF NOT EXISTS SERVICE_STATUSES AS 
        -- gets the latest pings to see if a service is currently up
        WITH latest_pings AS (
            SELECT
                p.service_id,
                p.status,
                p.timestamp,
                ROW_NUMBER() OVER (PARTITION BY p.service_id ORDER BY p.timestamp desc) as rn
            FROM pings p
        ),
        -- gets timestamp of last downtime
        last_down as (
            SELECT
                service_id,
                max(timestamp) as timestamp
            from pings
            where status = 'down'
            group by service_id
        ),
        -- gets timestamp of last uptime
        last_up as (
            SELECT
                service_id,
                max(timestamp) as timestamp
            from pings
            where status = 'up'
            group by service_id
        ),
        -- gets earliest timestamp of service being up since it was last down
        earliest_up_since_down as (
            SELECT
                p.service_id,
                min(p.timestamp) as timestamp
            from pings p
            left join last_down ld on p.service_id = ld.service_id
            where 
                p.status = 'up'
                and p.timestamp > ld.timestamp
        ),
        -- gets earliest timestamp of service being down since it was last up
        earliest_down_since_up as (
            SELECT
                p.service_id,
                min(p.timestamp) as timestamp
            from pings p
            left join last_up lu on p.service_id = lu.service_id
            where 
                p.status = 'down'
                and p.timestamp > lu.timestamp
        )
        select
            s.id,
            s.service,
            s.url,
            s.created_at,
            case when lp.status = 'up' then 1 else 0 end as is_up,
            ld.timestamp as last_down,
            lu.timestamp as last_up,
            eu.timestamp as earliest_up,
            ed.timestamp as earliest_down
        from services s
        left join latest_pings lp on s.id = lp.service_id and lp.rn = 1
        left join last_down ld on s.id = ld.service_id
        left join last_up lu on s.id = lu.service_id
        left join earliest_up_since_down eu on s.id = eu.service_id
        left join earliest_down_since_up ed on s.id = ed.service_id;
`).run();