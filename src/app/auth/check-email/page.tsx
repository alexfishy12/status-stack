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

      <div 
        className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-3 items-center justify-center max-w-sm w-full mx-auto">
        {/* Header */}
        <div className="heading3 border-b border-gray-300 pb-3 w-full text-center">
            Confirmation e-mail sent!
        </div>

        {/* Form content */}
        <div className="flex flex-col gap-3 text-center">
          To finalize the creation of your account, please click the confirmation link sent to you in the confirmation e-mail before logging in.
        </div>

        {/* Modal Footer */}
        <div className="w-full border-t border-gray-300 pt-3 flex flex-col items-center">
          {/* <div className="subheading3">Don't have an account?</div> */}
          <Link href='/auth/login' className="text-blue-500 underline1 subheading3">Back to login</Link>
        </div>
      </div>
    </div>
  )
}