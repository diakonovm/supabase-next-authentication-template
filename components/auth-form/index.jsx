'use client'

import { useState } from 'react'
import SignInForm from './signin-form'
import SignUpForm from './signup-form'

export const FORMS = {
  SIGN_IN_FORM: 'signin-form',
  SIGN_UP_FORM: 'signup-form'
}

export default function AuthForm() {
  const [form, setForm] = useState(() => FORMS.SIGN_IN_FORM)

  switch (form) {
    case FORMS.SIGN_IN_FORM:
      return <SignInForm setForm={setForm} />
    case FORMS.SIGN_UP_FORM:
      return <SignUpForm setForm={setForm} />
    default:
      return <SignInForm setForm={setForm} />
  }
}
