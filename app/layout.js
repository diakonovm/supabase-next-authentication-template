import 'server-only'
import SupabaseListener from '@/components/supabase-listener'
import SupabaseProvider from '@/components/supabase-provider'
import { createClient } from '@/utils/supabase-server'
import './globals.css'

export const revalidate = 0

export const metadata = {
  title: 'Supabase-authentication-template'
}

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
      <body className="min-h-screen bg-white">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
