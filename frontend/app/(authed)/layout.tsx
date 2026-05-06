import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSessionUser } from '@/src/lib/auth/session'
import { LogoBrand } from '@/src/components/Logo'
import { LogoutButton } from '@/src/components/LogoutButton'
import './authed-layout.scss'

const SIDEBAR_LINKS = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/saved-jobs', label: 'Saved Jobs' },
    { href: '/applications', label: 'Applications' },
    { href: '/messages', label: 'Messages' },
    { href: '/settings', label: 'Settings' },
]

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
    const user = await getSessionUser()
    if (!user) redirect('/auth/login')

    return (
        <div className="authed-shell">
            <aside className="authed-sidebar">
                <Link href="/dashboard" className="authed-sidebar__brand">
                    <LogoBrand />
                </Link>
                <nav className="authed-sidebar__nav" aria-label="Primary">
                    {SIDEBAR_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="authed-sidebar__link">
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="authed-sidebar__footer">
                    <span className="authed-sidebar__user" title={user.email}>{user.email}</span>
                    <LogoutButton />
                </div>
            </aside>
            <main className="authed-main">{children}</main>
        </div>
    )
}
