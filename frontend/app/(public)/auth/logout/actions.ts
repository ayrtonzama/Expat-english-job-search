'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { SESSION_COOKIE } from '@/src/lib/api/server'

export async function logoutAction() {
    ;(await cookies()).delete(SESSION_COOKIE)
    revalidatePath('/', 'layout')
    redirect('/')
}
