import { TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <div className="flex gap-5 py-3 px-5 border-b-2 border-b-gray-300 items-center justify-between h-15">
            {/* App Logo */}
            <Link href="/" className="flex gap-2 items-center">
                <TrendingUp className="w-5 h-5"></TrendingUp>
                <div className="heading3">StatusStack</div>
            </Link>
            {/* Navigation */}
            <div className="flex gap-5 subheading1 text-gray-500 underline">
                <Link href="/">Home</Link>
                <Link href="/overview">Overview</Link>
            </div>

            {/* Login */}
            <button className="bg-black rounded-lg px-3 py-2 font-bold text-white cursor-pointer">Login</button>
        </div>
    );
}