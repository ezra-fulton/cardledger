'use client'
export const dynamic = 'force-dynamic'

import { getSupabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthForm from './AuthForm'

export default function AuthPage() {
  const supabase = getSupabase()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (!error) router.push('/dashboard')
  }

  return (<AuthForm />)

}

