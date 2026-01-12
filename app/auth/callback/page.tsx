'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '../../lib/supabase'

export default function AuthCallbackPage() {
  const supabase = getSupabase()
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push('/auth')
        return
      }

      const user = session.user

      const passwordSet = user.user_metadata?.password_set === true
      const provider = user.app_metadata?.provider

      // 🚨 FORCE set-password for magic link + invite
      if (provider === 'email' && !passwordSet) {
        router.push('/set-password')
        return
      }

      router.push('/dashboard')
    }

    handleAuth()
  }, [router, supabase])

  return <p>Signing you in…</p>
}

