import { getSessionUser } from '@/src/lib/auth/session'

export default async function DashboardPage() {
    const user = await getSessionUser()

    return (
        <section>
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.email}.</p>
        </section>
    )
}
