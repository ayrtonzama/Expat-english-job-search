'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoBrand } from './Logo'
import './nav-header.scss'

const NAV_LINKS = [
    { href: "/find-work", label: "Find work" },
    { href: "/employer", label: "For employers" },
    { href: "/about-us", label: "About" },
    { href: "/contact", label: "Contact" },
]

export default function NavHeader() {
    const pathname = usePathname()
    return (
        <header className="nav-header">
            <Link href="/" className="nav-header__brand">
                <LogoBrand />
            </Link>
            <nav className="nav-header__nav" aria-label="Primary">
                {NAV_LINKS.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-header__link${active ? ' nav-header__link--active' : ''}`}
                            aria-current={active ? 'page' : undefined}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            <div className="nav-header__spacer" />
            <div className="nav-header__actions">
                <Link href="/auth/login" className="nav-header__signin">Login</Link>
                <Link href="/auth/register" className="nav-header__cta">
                    Sign in
                    <span className="nav-header__cta-arrow" aria-hidden>→</span>
                </Link>
            </div>
        </header>
    )
}
