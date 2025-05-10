//import Image from "next/image";
import { TrendingUp } from 'lucide-react';
import TrackNewApp from '@/components/modals/track-new-app';
import db from '@/lib/db/db';
import { formatUptimeDate, formatDurationSince } from '@/lib/util/formatDate';
import { createClient } from '@/utils/supabase/server';

interface Service {
  id: number; 
  service_name: string; 
  url: string; 
  responseTime: number;
  created_at: string; 
  is_up: boolean;
  ever_up: boolean;
  last_pinged: string;
  earliest_pinged: string;
  last_down: string; 
  last_up: string;
  earliest_up: string;
  earliest_down: string;
}

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const services = db.prepare(`
    SELECT
      id,
      service_name,
      url,
      responseTime,
      is_up,
      ever_up,
      last_pinged,
      earliest_pinged,
      last_down,
      last_up,
      earliest_up,
      earliest_down
    FROM vServiceStatuses
    where user_id = ?
  `).all(userId) as Service[];

  return (
    <div className="p-10 w-full">
      {/* App logo */}
      <div className="flex flex-col items-center justify-center mb-5 sm:mb-10 md:md-15 lg:md-20">
        <div className="flex gap-5 items-center">
          <TrendingUp className="w-15 h-15"></TrendingUp>
          <div className="heading1">StatusStack</div>
        </div>
        {/* Sub heading */}
        <div className="subheading1 text-gray-500">An uptime analytics dashboard for all of your apps</div>
      </div>
      
      {/* Applications list */}
      <div className="flex justify-between border-b-2 border-gray-500 w-full mb-5 pb-2">
        <div className="heading2">Applications</div>
        <TrackNewApp></TrackNewApp>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
        {services.map(s => (
          <a key={s.id} href={`/applications/${s.id}`} className="bg-white rounded-lg p-5 border-2 border-gray-200 w-full">
            {/* Card header */}
            <div className="heading3">{s.service_name}</div>
            {/* URL of app */}
            <div className="text-[0.75rem] font-light text-gray-500">{s.url}</div>
            {/* Status */}
            {s.is_up ? (
                <>
                  <div className="flex gap-1 items-center">
                    <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
                    <div className="text-[0.75rem] font-light text-gray-500">{s.responseTime}ms</div>
                    <div className="subheading3 text-gray-500">Online {s.earliest_up ? 'for ' + formatDurationSince(s.earliest_up) : ''}</div>
                  </div>
                  <div className="text-[0.75rem] font-light text-gray-500">
                    Up since: {formatUptimeDate(s.earliest_up) || 'Always'}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-1 items-center">
                    <div className="bg-red-400 rounded-full h-[10px] w-[10px]"></div>
                    <div className="subheading3 text-gray-500">Offline {s.earliest_down} {s.earliest_down ? 'for ' + formatDurationSince(s.earliest_down): ''}</div>
                  </div>
                  <div className="text-[0.75rem] font-light text-gray-500">
                    Down since: {formatUptimeDate(s.earliest_down) || 'Always'}
                  </div>
                </>
              )
            }
          </a>
        ))}
      </div>
    </div>
  );
}
