import { InputHTMLAttributes, ReactNode, Ref, useId } from 'react'
import './text-input.scss'

type TextInputProps = {
    label: string
    trailingAction?: ReactNode
    error?: string
    ref?: Ref<HTMLInputElement>
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

export function TextInput({ label, trailingAction, error, ref, ...inputProps }: TextInputProps) {
    const id = useId()
    const errorId = error ? `${id}-error` : undefined
    return (
        <div className={`text-input${error ? ' text-input--error' : ''}`}>
            <div className="text-input__row">
                <label className="text-input__label" htmlFor={id}>{label}</label>
                {trailingAction && <span className="text-input__action">{trailingAction}</span>}
            </div>
            <input
                id={id}
                ref={ref}
                className="text-input__field"
                aria-invalid={error ? true : undefined}
                aria-describedby={errorId}
                {...inputProps}
            />
            {error && <p id={errorId} className="text-input__error" role="alert">{error}</p>}
        </div>
    )
}
