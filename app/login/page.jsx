'use client'

import SignInForm from '@/components/auth-form/signin-form'
import SignUpForm from '@/components/auth-form/signup-form'
import { useSupabase } from '@/components/supabase-provider'

export default function Page() {
  const { session } = useSupabase()

  return (
    <div className="min-h-screen h-screen">
      {session ? (
        <>active session</>
      ) : (
        <div className="h-full flex items-center justify-center">
          <SignUpForm />
          <SignInForm />
        </div>
      )}
    </div>
  )
}
