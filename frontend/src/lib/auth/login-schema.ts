import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginValues = z.infer<typeof loginSchema>

export type LoginActionResult =
    | { ok: true }
    | { ok: false; formError?: string; fieldErrors?: Partial<Record<keyof LoginValues, string>> }
