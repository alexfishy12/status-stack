import { login } from './actions';
import Link from 'next/link';
import Button from '@/components/ui/button';
import {TrendingUp} from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="p-10 w-full">
       {/* App logo */}
      <Link href="/" className="flex gap-2 items-center justify-center pb-5 text-gray-400">
        <TrendingUp className="w-10 h-10"></TrendingUp>
        <div className="heading2">StatusStack</div>
      </Link>

      <form action={login} 
        className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-3 items-center justify-center max-w-sm w-full mx-auto">
        {/* Header */}
        <div className="heading3 border-b border-gray-300 pb-3 w-full text-center">
          Log in
        </div>

        {/* Form content */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="email" className="subheading3">Email</label>
            <input id="email" name="email" type="email" className="rounded-lg border-2 p-1 border-gray-300" required />
          </div>
          <div className="flex flex-col pb-3">
            <label htmlFor="password" className="subheading3">Password</label>
            <input id="password" name="password" type="password" className="rounded-lg border-2 p-1 border-gray-300" required />
          </div>

          <Button type="submit" className="bg-black text-white">Log In</Button>
        </div>

        {/* Modal Footer */}
        <div className="w-full border-t border-gray-300 pt-3 flex flex-col items-center">
          <div className="subheading3">Don't have an account?</div>
          <Link href='/auth/signup' className="text-blue-500 underline1 subheading3">Sign Up</Link>
        </div>
      </form>
    </div>
  )
}