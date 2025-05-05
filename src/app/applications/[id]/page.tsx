//import Image from "next/image";
import { TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      {/* App logo */}
      <div className="flex gap-5 items-center">
        <TrendingUp className="w-15 h-15"></TrendingUp>
        <div className="heading1">StatusStack</div>
      </div>
      {/* Sub heading */}
      <div className="subheading1 text-gray-500">An uptime analytics dashboard for all of your apps</div>
      
      {/* Applications list */}
      <div className="heading2 border-b-2 border-gray-500 w-full mb-5">Application Name</div>
      
      {/* Card for application */}
      <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
        {/* Card header */}
        <div className="heading3">YouTube to MP3</div>
        {/* URL of app */}
        <div className="text-[0.75rem] font-light text-gray-500">http://youtube-to-mp3.home</div>
        {/* Status bubble */}
        <div className="flex gap-1 items-center">
          <div className="bg-green-400 rounded-full h-[10px] w-[10px]"></div>
          <div className="subheading3 text-gray-500">Online</div>
        </div>
        <div className="text-[0.75rem] font-light text-gray-500">Uptime: 3d 2h 5m</div>
        <div className="text-[0.75rem] font-light text-gray-500">Up since: 2025-05-01</div>
      </div>
    </div>
  );
}
