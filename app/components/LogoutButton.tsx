'use client'

import { useRouter } from 'next/navigation'
import { getSupabase } from '../lib/supabase'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = getSupabase()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 hover:underline"
    >
      Log out
    </button>
  )
}

