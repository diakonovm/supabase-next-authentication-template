import 'server-only'
import Navbar from '@/components/navbar'
import SupabaseListener from '@/components/supabase-listener'
import SupabaseProvider from '@/components/supabase-provider'
import { createClient } from '@/utils/supabase-server'
import './globals.css'

export const metadata = {
  title: 'supabase-next-authentication-template'
}

export const revalidate = 0

export default async function RootLayout({ children }) {
  const supabase = createClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      {/*
      <head /> will contain the components returned by the nearest parent
      head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
    */}
      <head />
      <body className="h-screen min-h-screen">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Navbar className="flex-shrink-0" />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
