'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from './lib/supabase' // adjust path if needed

export default function HomePage() {
  const router = useRouter()
  const supabase = getSupabase()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error checking session:', error)
      }

      // If there is a session, redirect to dashboard
      if (data?.session) {
        router.replace('/dashboard')
      }

      setChecking(false)
    }

    checkAuth()
  }, [router, supabase])

  if (checking) {
    return <p style={{ textAlign: 'center', marginTop: '4rem' }}>Checking authentication...</p>
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Welcome to CardLedger</h1>
      <p>Please <a href="/auth" style={{ color: '#0070f3' }}>login or sign up</a> to continue.</p>
    </div>
  )
}

