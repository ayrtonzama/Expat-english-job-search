'use server'

import { loginSchema, type LoginActionResult, type LoginValues } from '@/src/lib/auth/login-schema'

export async function loginAction(values: LoginValues): Promise<LoginActionResult> {
    const parsed = loginSchema.safeParse(values)
    if (!parsed.success) {
        const fieldErrors: Partial<Record<keyof LoginValues, string>> = {}
        for (const issue of parsed.error.issues) {
            const key = issue.path[0] as keyof LoginValues | undefined
            if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
        }
        return { ok: false, fieldErrors }
    }

    // TODO: real auth — verify credentials, create session, etc.
    if (parsed.data.email === 'blocked@example.com') {
        return { ok: false, formError: 'Invalid email or password' }
    }

    return { ok: true }
}
