import { createClient } from '@/utils/supabase-server'

export default function Page() {
  const { supabase } = createClient()

  return <div className="flex flex-col h-full bg-white">account page</div>
}
