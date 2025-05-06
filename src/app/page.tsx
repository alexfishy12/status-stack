//import Image from "next/image";
import { TrendingUp } from 'lucide-react';
import TrackNewApp from '@/components/modals/track-new-app';
import db from '@/lib/db';

export default function Home() {
  const services = db.prepare('SELECT id, service, url FROM services').all() as { id: number; service: string; url: string }[];

  return (
    <div className="flex flex-col items-center justify-center p-10 w-full">
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
          <a key={s.id} href="/applications/1" className="bg-white rounded-lg p-5 border-2 border-gray-200 w-full">
            {/* Card header */}
            <div className="heading3">{s.service}</div>
            {/* URL of app */}
            <div className="text-[0.75rem] font-light text-gray-500">{s.url}</div>
            {/* Status bubble */}
            <div className="flex gap-1 items-center">
              <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
              <div className="subheading3 text-gray-500">Online for 3d 2h 5m</div>
            </div>
            <div className="text-[0.75rem] font-light text-gray-500">Up since: May 1st, 2025</div>
          </a>
        ))}
        
        {/* Card for application */}
        <a href="/applications/1" className="bg-white rounded-lg p-5 border-2 border-gray-200">
          {/* Card header */}
          <div className="heading3">My Portfolio</div>
          {/* URL of app */}
          <div className="text-[0.75rem] font-light text-gray-500">https://alexjfisher.com</div>
          {/* Status bubble */}
          <div className="flex gap-1 items-center">
            <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
            <div className="subheading3 text-gray-500">Online for 1y 2mo 3d 2h 5m</div>
          </div>
          <div className="text-[0.75rem] font-light text-gray-500">Up since: Feb 3rd, 2024</div>
        </a>
        {/* Card for application */}
        <a href="/applications/1" className="bg-white rounded-lg p-5 border-2 border-gray-200">
          {/* Card header */}
          <div className="heading3">My Portfolio</div>
          {/* URL of app */}
          <div className="text-[0.75rem] font-light text-gray-500">https://alexjfisher.com</div>
          {/* Status bubble */}
          <div className="flex gap-1 items-center">
            <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
            <div className="subheading3 text-gray-500">Online for 1y 2mo 3d 2h 5m</div>
          </div>
          <div className="text-[0.75rem] font-light text-gray-500">Up since: Feb 3rd, 2024</div>
        </a>
        {/* Card for application */}
        <a href="/applications/1" className="bg-white rounded-lg p-5 border-2 border-gray-200">
          {/* Card header */}
          <div className="heading3">My Portfolio</div>
          {/* URL of app */}
          <div className="text-[0.75rem] font-light text-gray-500">https://alexjfisher.com</div>
          {/* Status bubble */}
          <div className="flex gap-1 items-center">
            <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
            <div className="subheading3 text-gray-500">Online for 1y 2mo 3d 2h 5m</div>
          </div>
          <div className="text-[0.75rem] font-light text-gray-500">Up since: Feb 3rd, 2024</div>
        </a>
        {/* Card for application */}
        <a href="/applications/1" className="bg-white rounded-lg p-5 border-2 border-gray-200">
          {/* Card header */}
          <div className="heading3">My Portfolio</div>
          {/* URL of app */}
          <div className="text-[0.75rem] font-light text-gray-500">https://alexjfisher.com</div>
          {/* Status bubble */}
          <div className="flex gap-1 items-center">
            <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
            <div className="subheading3 text-gray-500">Online for 1y 2mo 3d 2h 5m</div>
          </div>
          <div className="text-[0.75rem] font-light text-gray-500">Up since: Feb 3rd, 2024</div>
        </a>
        {/* Card for application */}
        <a href="/applications/1" className="bg-white rounded-lg p-5 border-2 border-gray-200">
          {/* Card header */}
          <div className="heading3">My Portfolio</div>
          {/* URL of app */}
          <div className="text-[0.75rem] font-light text-gray-500">https://alexjfisher.com</div>
          {/* Status bubble */}
          <div className="flex gap-1 items-center">
            <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
            <div className="subheading3 text-gray-500">Online for 1y 2mo 3d 2h 5m</div>
          </div>
          <div className="text-[0.75rem] font-light text-gray-500">Up since: Feb 3rd, 2024</div>
        </a>
        {/* Card for application */}
        <a href="/applications/1" className="bg-white rounded-lg p-5 border-2 border-gray-200">
          {/* Card header */}
          <div className="heading3">My Portfolio</div>
          {/* URL of app */}
          <div className="text-[0.75rem] font-light text-gray-500">https://alexjfisher.com</div>
          {/* Status bubble */}
          <div className="flex gap-1 items-center">
            <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
            <div className="subheading3 text-gray-500">Online for 1y 2mo 3d 2h 5m</div>
          </div>
          <div className="text-[0.75rem] font-light text-gray-500">Up since: Feb 3rd, 2024</div>
        </a>
      </div>
    </div>
  );
}
