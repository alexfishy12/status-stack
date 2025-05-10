import { signup } from './actions';
import Link from 'next/link';
import Button from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="p-10 w-full">
      <form action={signup} 
        className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-3 items-center justify-center max-w-sm w-full mx-auto">
        {/* Header */}
        <div className="heading3 border-b border-gray-300 pb-3 w-full text-center">
          Create an account
        </div>

        {/* Form content */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="email" className="subheading3">Email</label>
            <input id="email" name="email" type="email" className="rounded-lg border-2 p-1 border-gray-300" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="subheading3">Password</label>
            <input id="password" name="password" type="password" className="rounded-lg border-2 p-1 border-gray-300" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="plan" className="subheading3">
              Choose a plan (<Link href="/pricing" className="text-blue-500">see pricing</Link>):
            </label>
            <select id="plan" name="plan" className="rounded-lg border-2 p-1 border-gray-300" required>
              <option>Free</option>
              <option>Pro ($6/month)</option>
            </select>
          </div>

          <Button type="submit" className="bg-black text-white">Sign up</Button>
        </div>

        {/* Modal Footer */}
        <div className="w-full border-t border-gray-300 pt-3 flex flex-col items-center">
          <div className="subheading3">Already have an account?</div>
          <Link href='/login' className="text-blue-500 underline1 subheading3">Log in</Link>
        </div>
      </form>
    </div>
  )
}