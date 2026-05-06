'use client'

import { useTransition } from "react"
import { TextInput } from "@/src/components/form-inputs/text-input"
import { registerSchema, RegisterValues } from "@/src/lib/auth/register-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "@/src/components/buttons/buttons"
import { registerAction } from "./actions"

type Role = {
    value: boolean
    title: string
    subtitle: string
    icon: React.ReactNode
}

const ROLES: Role[] = [
    {
        value: false,
        title: "Job seeker",
        subtitle: "Looking for work abroad",
        icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
        ),
    },
    {
        value: true,
        title: "Employer / HR",
        subtitle: "Hiring international talent",
        icon: (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            </svg>
        ),
    },
]

export function RegisterFormCompany() {
    const [pending, startTransition] = useTransition()
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            isOrg: false,
            orgName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    })

    const isOrg = watch('isOrg')

    const onSubmit = handleSubmit((value) => {
        startTransition(async () => {
            const result = await registerAction(value)
            if (result.ok) return
            if (result.fieldErrors) {
                for (const [field, message] of Object.entries(result.fieldErrors)) {
                    setError(field as keyof RegisterValues, { message })
                }
            }
            if (result.formError) {
                setError('root', { message: result.formError })
            }
        })
    })

    const busy = pending || isSubmitting

    return (
        <form onSubmit={onSubmit} noValidate className="register-form">
            <fieldset className="role-picker">
                <legend className="role-picker__legend">I&rsquo;m signing up as</legend>
                <div className="role-picker__grid" role="radiogroup" aria-label="Account type">
                    {ROLES.map((role) => {
                        const selected = isOrg === role.value
                        return (
                            <label
                                key={String(role.value)}
                                className={`role-card${selected ? ' role-card--selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="isOrg"
                                    className="role-card__input"
                                    checked={selected}
                                    onChange={() => setValue('isOrg', role.value, { shouldValidate: true })}
                                />
                                <span className="role-card__icon" aria-hidden="true">{role.icon}</span>
                                <span className="role-card__dot" aria-hidden="true" />
                                <span className="role-card__title">{role.title}</span>
                                <span className="role-card__subtitle">{role.subtitle}</span>
                            </label>
                        )
                    })}
                </div>
            </fieldset>

            {isOrg && (
                <TextInput
                    label="Company name"
                    error={errors.orgName?.message}
                    {...register('orgName')}
                />
            )}

            <div className="flex gap-2">
                <TextInput
                    label="First Name"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                />
                <TextInput
                    label="Last Name"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                />
            </div>
            <div>
                <TextInput
                    label="Email address"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <TextInput
                    label="Password"
                    type="password"
                    error={errors.password?.message}
                    {...register('password')}
                />
            </div>
            {errors.root && <p className="register-form__error" role="alert">{errors.root.message}</p>}
            <button type="submit" className="btn btn-primary mt-3" disabled={busy}>
                {busy ? 'Creating ... ' : 'Create account'}
            </button>
        </form>
    )
}
