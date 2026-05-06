import NavHeader from '@/src/components/NavHeader'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavHeader />
            {children}
        </>
    )
}
