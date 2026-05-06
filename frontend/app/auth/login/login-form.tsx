'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { TextInput } from '@/src/components/form-inputs/text-input'
import { loginSchema, type LoginValues } from '@/src/lib/auth/login-schema'
import { loginAction } from './actions'

export function LoginForm() {
    const [pending, startTransition] = useTransition()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
        mode: 'onBlur',
    })

    const onSubmit = handleSubmit((values) => {
        startTransition(async () => {
            const result = await loginAction(values)
            if (result.ok) return
            if (result.fieldErrors) {
                for (const [field, message] of Object.entries(result.fieldErrors)) {
                    setError(field as keyof LoginValues, { message })
                }
            }
            if (result.formError) {
                setError('root', { message: result.formError })
            }
        })
    })

    const busy = pending || isSubmitting

    return (
        <form onSubmit={onSubmit} noValidate className="login-form justify-between">
            <TextInput
                label="Email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email')}
            />
            <TextInput
                label="Password"
                type="password"
                autoComplete="current-password"
                trailingAction={<Link href="/auth/forgot">Forgot?</Link>}
                error={errors.password?.message}
                {...register('password')}
            />
            {errors.root && <p className="login-form__error" role="alert">{errors.root.message}</p>}
            <button type="submit" className="btn btn-primary mt-3" disabled={busy}>
                {busy ? 'Signing in…' : 'Sign in'}
            </button>
        </form>
    )
}
