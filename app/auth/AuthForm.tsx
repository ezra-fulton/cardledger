'use client'

import { useState } from 'react'
import { getSupabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const supabase = getSupabase()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
    const redirectTo = 
      typeof window !== 'undefined'? `${window.location.origin}/dashboard`: process.env.NEXT_PUBLIC_SITE_URL + '/dashboard'

    try {
      if (isLogin) {
        // Login with email + password
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        setLoading(false)

        if (error) setError(error.message)
        else router.push('/dashboard')
      } else {
        // Sign up with email + password, send magic link
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectTo }
        })
        setLoading(false)

        if (error) setError(error.message)
        else setMessage(
          `Check your email! A verification link was sent to ${email}.`
        )
      }
    } catch (err: any) {
      setLoading(false)
      setError(err.message)
    }
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '4rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <button
        onClick={() => {
          setIsLogin(!isLogin)
          setError(null)
          setMessage(null)
        }}
        style={{
          marginTop: '1rem',
          color: '#0070f3',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Switch to {isLogin ? 'Sign Up' : 'Login'}
      </button>
    </div>
  )
}

