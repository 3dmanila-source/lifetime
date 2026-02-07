'use client'

import { useState } from 'react'
import { resetOnboardingData } from '@/app/setup/actions'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2 } from 'lucide-react'

export default function ResetPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleReset = async () => {
        setIsLoading(true)
        try {
            const result = await resetOnboardingData()
            if (result.success) {
                router.push('/setup/life')
            } else {
                alert('Failed to reset data')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7]">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Reset Onboarding</h1>
                <p className="text-gray-500 mb-8">
                    This will clear your Date of Birth, Life Expectancy, and Interests, allowing you to restart the setup flow.
                </p>
                <Button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium"
                >
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    Reset My Data
                </Button>
            </div>
        </div>
    )
}
