import 'server-only'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'session'

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const apiUrl = process.env.API_URL
    if (!apiUrl) throw new Error('API_URL is not set')

    const token = (await cookies()).get(SESSION_COOKIE)?.value

    return fetch(`${apiUrl}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...init.headers,
        },
        cache: 'no-store',
    })
}
