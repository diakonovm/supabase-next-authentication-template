import { createClient } from '@/utils/supabase-server'
import { SignUpEmailPasswordSchema } from '@/validations/auth'

export async function POST(req) {
  const { email, password } = await req.json()

  // TODO: Set an authorization role/level

  try {
    await SignUpEmailPasswordSchema.validate({ email, password })
  } catch (err) {
    return new Response(JSON.stringify({ error: '[Error - Validation]' }), {
      status: 400
    })
  }

  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })

  if (error) {
    return new Response(JSON.stringify(error), { status: 400 })
  }

  // Perform additional user initialization tasks

  return new Response(JSON.stringify(data))
}
