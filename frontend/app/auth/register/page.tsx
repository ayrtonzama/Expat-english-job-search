import Link from "next/link";
import './register-page.scss'
import { RegisterFormCompany } from "./RegisterFormCompany";
export default function RegsiterPage(){
    return (
        <div className="flex">
            <div className=" m-auto max-h-full min-h-full justify-center">
                <div className="p-10">
                    <header className="register-hero">
                        <p className="register-hero__eyebrow">Start your</p>
                        <h1 className="register-hero__title">
                            <em className="register-hero__title-accent">relocation</em>
                        </h1>
                        <p className="login-hero__meta">
                            <span>Already have an account</span>
                            <Link href="/auth/register" className="login-hero__link"> Sign in</Link>
                        </p>
                    </header>
                 <RegisterFormCompany/>
                </div>
            </div>
            
        </div>
    )
}