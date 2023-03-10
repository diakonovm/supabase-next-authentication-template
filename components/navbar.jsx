'use client'

import { useSupabase } from '@/components/supabase-provider'

export default function Navbar({ className }) {
  const { session, supabase } = useSupabase()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <nav className={`w-full py-6 px-6 lg:px-0 bg-white border-b border-zinc-200 ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div>Next-Supabase-Authentication-Template</div>
        {session && (
          <div>
            <button onClick={handleSignOut} type="button">
              sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
