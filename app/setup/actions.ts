'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveDob(dob: string) {
    const supabase = await createClient()

    try {
        const { error } = await supabase.auth.updateUser({
            data: { dob }
        })

        if (error) {
            console.error('Error updating profile:', error)
            return { error: error.message }
        }

        revalidatePath('/', 'layout')
        return { success: true }
    } catch (e) {
        return { error: 'Failed to save date of birth' }
    }
}
