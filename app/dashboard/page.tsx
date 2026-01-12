'use client'

import { useEffect, useState } from 'react'
import { getSupabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import LogoutButton from '../components/LogoutButton'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = getSupabase()

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
         router.push('/auth')
         return(null)
      }
      if (
          user &&
          user.app_metadata?.provider === 'email' &&
          user.user_metadata?.password_set !== true
      ) {
          router.push('/set-password')
          return null
      }

      setUser(data.user)
    })
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.email}</p>}
      <LogoutButton />
    </div>
  )
}

