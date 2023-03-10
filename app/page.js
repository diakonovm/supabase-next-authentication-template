import AuthForm from '@/components/auth-form'
import Navbar from '@/components/navbar'
import { createClient } from '@/utils/supabase-server'

export default async function Home() {
  const supabase = createClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()
  const user = session?.user

  return (
    <div className="flex flex-col h-full bg-white">
      <Navbar className="flex-shrink-0" />
      <main className="flex-1 flex items-center justify-center px-6">{!session && <AuthForm />}</main>
    </div>
  )
}
