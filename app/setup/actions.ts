'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface OnboardingData {
    dob: string
    lifeExpectancy: number
    interests: string[]
    lifeGoal: string
}

export async function saveOnboardingData(data: OnboardingData) {
    const supabase = await createClient()

    try {
        const { error } = await supabase.auth.updateUser({
            data: {
                dob: data.dob,
                life_expectancy: data.lifeExpectancy,
                interests: data.interests,
                life_goal: data.lifeGoal,
                onboarding_completed: true
            }
        })

        if (error) {
            console.error('Error updating profile:', error)
            return { error: error.message }
        }

        revalidatePath('/', 'layout')
        return { success: true }
    } catch (e) {
        return { error: 'Failed to save onboarding data' }
    }
}

export async function resetOnboardingData() {
    const supabase = await createClient()

    try {
        const { error } = await supabase.auth.updateUser({
            data: {
                dob: null,
                life_expectancy: null,
                interests: null,
                life_goal: null,
                onboarding_completed: null
            }
        })

        if (error) {
            console.error('Error resetting profile:', error)
            return { error: error.message }
        }

        revalidatePath('/', 'layout')
        return { success: true }
    } catch (e) {
        return { error: 'Failed to reset data' }
    }
}
