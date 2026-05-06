'use client'

import { useTransition } from 'react'
import { logoutAction } from '@/app/(public)/auth/logout/actions'

export function LogoutButton() {
    const [pending, startTransition] = useTransition()
    return (
        <button
            type="button"
            className="nav-header__signin"
            disabled={pending}
            onClick={() => startTransition(() => logoutAction())}
        >
            {pending ? 'Signing out…' : 'Logout'}
        </button>
    )
}
