'use client'

import { SignUpEmailPasswordSchema } from '@/validations/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'

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

export default function LoginForm() {
  const [loading, setLoading] = useState(false)

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
    <div className="p-4 border border-black">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignUpEmailPasswordSchema}
        onSubmit={(values) => {
          handleSignUpWithEmailPassword(values)
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
            sign up
          </button>
          {loading ? 'loading' : 'not loading'}
        </Form>
      </Formik>
    </div>
  )
}
