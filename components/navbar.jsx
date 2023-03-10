'use client'

import { useSupabase } from '@/components/supabase-provider'
import Link from 'next/link'

export default function Navbar({ className }) {
  const { session, supabase } = useSupabase()
  const user = session?.user

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <nav className={`w-full py-6 px-6 lg:px-0 bg-white border-b border-zinc-200 ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">Next-Supabase-Authentication-Template</Link>
        {session && <Link href="/account" className="w-12 h-12 bg-zinc-200 rounded-full"></Link>}
      </div>
    </nav>
  )
}
