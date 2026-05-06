import { getSessionUser } from '@/src/lib/auth/session'

export default async function SettingsPage() {
    const user = await getSessionUser()

    return (
        <section>
            <h1>Settings</h1>
            <p>Welcome back, {user?.email}.</p>
        </section>
    )
}
