import 'server-only'
import { cache } from 'react'
import { apiFetch } from '../api/server'

export type SessionUser = {
    id: string
    email: string
    name: string
    role: string
    companyName?: string
}

type MeResponse = { sub: string; email: string; role: string }

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
    let res: Response
    try {
        res = await apiFetch('/auth/me')
    } catch {
        return null
    }
    if (!res.ok) return null

    const payload = (await res.json()) as MeResponse
    return {
        id: payload.sub,
        email: payload.email,
        name: payload.email,
        role: payload.role,
    }
})
