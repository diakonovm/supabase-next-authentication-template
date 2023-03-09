'use client'

import { useSupabase } from '@/components/supabase-provider'
import Link from 'next/link'

export default function Navbar() {
  const { session, supabase } = useSupabase()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <nav className="w-full py-4 px-6 lg:px-0 border-b border-black">
      <div className="container flex items-center justify-between mx-auto">
        <div>Supabase-Authentication-Template</div>
        {session ? (
          <div>
            <button onClick={handleSignOut} type="button">
              sign out
            </button>
          </div>
        ) : (
          <Link href="/login">login</Link>
        )}
      </div>
    </nav>
  )
}
