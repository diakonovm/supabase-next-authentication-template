import Navbar from '@/components/navbar'
import { createClient } from '@/utils/supabase-server'

export default async function Home() {
  const supabase = createClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()
  const user = session?.user

  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto">
          {session ? (
            <div>
              <code>{JSON.stringify(user)}</code>
            </div>
          ) : (
            'sign in'
          )}
        </div>
      </main>
    </>
  )
}
