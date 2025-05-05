import { TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className="flex gap-5 py-3 px-5 border-t-2 border-t-gray-300 items-center justify-between h-15 text-gray-300">
            {/* App Logo */}
            <Link href="/" className="flex gap-2 items-center">
                <TrendingUp className="w-5 h-5"></TrendingUp>
                <div className="heading3">StatusStack</div>
            </Link>

            <div className="flex gap-2 text-[0.75rem] text-gray-400 underline">
                <Link href="/feedback">Leave Feedback</Link>
            </div>

            {/* Navigation */}
            <div className="flex gap-2 text-[0.75rem] text-gray-400 underline">
                <Link href="/">Github</Link>
                <Link href="/overview">X</Link>
            </div>
        </div>
    );
}