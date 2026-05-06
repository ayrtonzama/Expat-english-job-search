'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Item = { href: string; label: string }

export function NavLinks({ items }: { items: Item[] }) {
    const pathname = usePathname()
    return (
        <nav className="nav-header__nav" aria-label="Primary">
            {items.map((item) => {
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
    )
}
