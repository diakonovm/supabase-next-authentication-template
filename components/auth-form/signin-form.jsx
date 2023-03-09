'use client'

import { useSupabase } from '@/components/supabase-provider'
import { SignInEmailPasswordSchema } from '@/validations/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
  const { supabase } = useSupabase()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (values) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword(values)
    router.push('/')
    setLoading(false)
  }

  return (
    <div className="p-4 border border-black">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInEmailPasswordSchema}
        onSubmit={(values) => {
          handleSignIn(values)
        }}
      >
        <Form>
          <fieldset className="space-y-3">
            <div>
              <Field name="email" type="email" className="block p-3 border border-black" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div>
              <Field name="password" type="password" className="block p-3 border border-black" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
          </fieldset>

          <button type="submit" className="mt-4 p-3 bg-green-500">
            sign in
          </button>
          {loading ? 'loading' : 'not loading'}
        </Form>
      </Formik>
    </div>
  )
}
