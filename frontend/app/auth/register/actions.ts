'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { SESSION_COOKIE } from '@/src/lib/api/server'
import { RegisterActionResult, registerSchema, RegisterValues } from '@/src/lib/auth/register-schema'
import { UserRole } from '@/src/lib/interfaces/UserRole'

export async function registerAction(values: RegisterValues): Promise<RegisterActionResult> {
    const parsed = registerSchema.safeParse(values)
    if (!parsed.success) {
        const fieldErrors: Partial<Record<keyof RegisterValues, string>> = {}
        for (const issue of parsed.error.issues) {
            const key = issue.path[0] as keyof RegisterValues | undefined
            if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
        }
        return { ok: false, fieldErrors }
    }

    const apiUrl = process.env.API_URL
    if (!apiUrl) return { ok: false, formError: 'Server misconfigured: API_URL missing' }
    const body = {
        role: parsed.data.isOrg ? UserRole.JobPoster: UserRole.JobSeeker,
        name: parsed.data.firstName + ' ' + parsed.data.lastName,
        email: parsed.data.email,
        password: parsed.data.password,
        companyName: parsed.data.isOrg ? parsed.data.orgName: null
        
    }
    let res: Response
    try {
        res = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            cache: 'no-store',
        })
    } catch {
        return { ok: false, formError: 'Could not reach the server. Try again.' }
    }

    if (res.status === 422) return { ok: false, formError: 'Something went wrong' }
    if (!res.ok) return { ok: false, formError: 'Something went wrong. Try again.' }
    const data = (await res.json()) as { accessToken: string }

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    })

    revalidatePath('/', 'layout')
    redirect('/')
}