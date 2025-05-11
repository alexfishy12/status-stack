'use client';
import { TrendingUp, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';

import { createClient } from '@/utils/supabase/client';

import type { User } from '@supabase/supabase-js';

type HeaderProps = {
    user: User | null;
}

export default function Header({user}: HeaderProps) {
    const router = useRouter();
    const supabase = createClient();

    const handleLogOut = async () => {
        await supabase.auth.signOut();
        router.push('/'); // navigate without full reload
        router.refresh(); // refresh server component auth state
    }

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
                <Link href="/pricing">Pricing</Link>
                <Link href="/dashboard">Dashboard</Link>
            </div>

            {/* Login */}
            { user ? (
                <div className="flex items-center gap-4">
                    <span>{user.email}</span>
                    <button onClick={handleLogOut} className="bg-black rounded-lg px-3 py-2 font-bold text-white cursor-pointer">Logout</button>
                </div>
            ) : (
                <Button href="/auth/login" className="bg-black rounded-lg px-3 py-2 font-bold text-white">Login</Button>
            )
            }
        </div>
    );
}