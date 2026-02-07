import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LifeEstimation from '@/components/onboarding/LifeEstimation'

export default async function SetupLifePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // specific check for metadata existence
    if (user.user_metadata?.dob) {
        redirect('/dashboard')
    }

    return <LifeEstimation user={user} />
}
