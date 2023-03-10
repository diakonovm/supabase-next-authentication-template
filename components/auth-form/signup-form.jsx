'use client'

import { SignUpEmailPasswordSchema } from '@/validations/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FORMS } from './index'

async function signUpWithEmailPassword(payload) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return res
}

export default function SignupForm({ setForm }) {
  const [loading, setLoading] = useState(false)

  const handleSetForm = (form) => setForm(form)

  const handleSignUpWithEmailPassword = async (values) => {
    setLoading(true)
    const res = await signUpWithEmailPassword(values)
    const body = await res.json()
    setLoading(false)

    if (!res.ok) {
      console.warn('error', body)
      return
    }
  }

  return (
    <div className="w-full max-w-lg bg-white border border-zinc-200 rounded-lg shadow-md">
      <div className="py-5 px-8 border-b border-zinc-200">
        <p className="text-center leading-[28px] font-semibold">Sign up</p>
      </div>
      <div className="p-6">
        <button
          type="button"
          onClick={() => handleSetForm(FORMS.SIGN_IN_FORM)}
          className="mb-5 text-sm underline text-zinc-500"
        >
          Already have an account?
        </button>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignUpEmailPasswordSchema}
          onSubmit={(values) => {
            handleSignUpWithEmailPassword(values)
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
              sign up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
