import Link from 'next/link'
import { LogoBrand } from './Logo'
import { NavLinks } from './NavLinks'
import { LogoutButton } from './LogoutButton'
import { getSessionUser } from '@/src/lib/auth/session'
import './nav-header.scss'

const NAV_LINKS = [
    { href: '/find-work', label: 'Find work' },
    { href: '/employer', label: 'For employers' },
    { href: '/about-us', label: 'About' },
    { href: '/contact', label: 'Contact' },
]

export default async function NavHeader() {
    const user = await getSessionUser()

    return (
        <header className="nav-header">
            <Link href="/" className="nav-header__brand">
                <LogoBrand />
            </Link>
            <NavLinks items={NAV_LINKS} />
            <div className="nav-header__spacer" />
            <div className="nav-header__actions">
                {user ? (
                    <>
                        <span className="nav-header__user" title={user.email}>{user.email}</span>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link href="/auth/login" className="nav-header__signin">Login</Link>
                        <Link href="/auth/register" className="nav-header__cta">
                            Sign up
                            <span className="nav-header__cta-arrow" aria-hidden>→</span>
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}
