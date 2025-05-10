//import Image from "next/image";
import { TrendingUp } from 'lucide-react';

export default function Home() {
 
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
      
     
    </div>
  );
}
