'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signInWithGoogle() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    })

    if (data.url) {
        redirect(data.url)
    }
}

export async function signInWithPhone(formData: FormData) {
    const phone = formData.get('phone') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithOtp({
        phone,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function verifyOtp(phone: string, token: string) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signupWithEmail(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const dob = formData.get('dob') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
            data: {
                dob: dob, // Save DOB to user metadata
            }
        },
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function loginWithEmail(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
