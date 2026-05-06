import Link from "next/link";
import { LoginForm } from "./login-form";
import "./login-page.scss";

export default function LoginPage() {
    return (
        <div className="flex">
            <div className=" m-auto max-h-full min-h-full justify-center">
                <div className="p-10">
                    <header className="login-hero">
                        <p className="login-hero__eyebrow">Welcome back</p>
                        <h1 className="login-hero__title">
                            Sign in to <em className="login-hero__title-accent">your future.</em>
                        </h1>
                        <p className="login-hero__meta">
                            <span>New here?</span>
                            <Link href="/auth/register" className="login-hero__link">Create an account</Link>
                        </p>
                    </header>
                    <LoginForm />
                </div>
            </div>
            
        </div>
    )
}
