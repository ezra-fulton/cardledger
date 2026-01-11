'use client'

import { useState } from 'react'
import { getSupabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function SetPasswordPage() {
  const supabase = getSupabase()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSetPassword() {
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
      data: { password_set: true }
    })

    setLoading(false)

    if (!error) {
      router.push('/dashboard')
    } else {
      alert(error.message)
    }
  }

  return (
    <div>
      <h1>Set your password</h1>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSetPassword} disabled={loading}>
        Set password
      </button>
    </div>
  )
}

