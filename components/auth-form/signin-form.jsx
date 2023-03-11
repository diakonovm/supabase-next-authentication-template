'use client'

import { useSupabase } from '@/components/supabase-provider'
import { SignInEmailPasswordSchema } from '@/validations/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FORMS } from './index'

export default function SigninForm({ setForm }) {
  const [loading, setLoading] = useState(false)
  const { supabase } = useSupabase()
  const router = useRouter()

  const handleSetForm = (form) => setForm(form)

  const handleSignIn = async (values) => {
    setLoading(true)

    supabase.auth
      .signInWithPassword(values)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="w-full max-w-lg bg-white border border-zinc-200 rounded-lg shadow-md">
      <div className="py-5 px-8 border-b border-zinc-200">
        <p className="text-center leading-[28px] font-semibold">Login</p>
      </div>
      <div className="p-6">
        <button
          type="button"
          onClick={() => handleSetForm(FORMS.SIGN_UP_FORM)}
          className="mb-5 text-sm underline text-zinc-500"
        >
          Don&apos;t have an account?
        </button>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignInEmailPasswordSchema}
          onSubmit={(values) => {
            handleSignIn(values)
          }}
        >
          <Form>
            <fieldset className="space-y-5">
              <div>
                <Field
                  name="email"
                  type="email"
                  className="block w-full py-3 px-3 text-base border border-zinc-400 rounded-lg"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-xs font-light text-red-500" />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  className="block w-full py-3 px-3 text-base border border-zinc-400 rounded-lg"
                  placeholder="password"
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-xs font-light text-red-500" />
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 mt-5 rounded-lg font-semibold text-white bg-[#FF385C] focus:outline-none"
            >
              login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
