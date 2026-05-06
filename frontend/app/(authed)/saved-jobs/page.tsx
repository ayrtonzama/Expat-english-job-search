import { getSessionUser } from '@/src/lib/auth/session'

export default async function SavedJobsPage() {
    const user = await getSessionUser()

    return (
        <section>
            <h1>Saved jobs</h1>
            <p>Welcome back, {user?.email}.</p>
        </section>
    )
}
