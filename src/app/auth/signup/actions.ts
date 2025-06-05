'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const plan = formData.get('plan') as string;
  // if plan is pro, go to payment screen
  if (plan == 'Pro') {
    console.log("Plan is pro for new user");
    return;
  }

  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  const { data: signupData, error  } = await supabase.auth.signUp(data);
  
  console.log('Signup result:', signupData, error);

  if (error) {
    console.error('Supabase signup error:', error);
    redirect('/error')
  }

  revalidatePath('/', 'layout');
  redirect('/auth/check-email'); // <-- Create this page to instruct user to confirm email
}