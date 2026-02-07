'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import { signupWithEmail, loginWithEmail } from '@/app/auth/actions'
import { COUNTRIES } from '@/lib/constants/countries'

interface EmailAuthFormProps {
    mode: 'login' | 'signup'
}

export default function EmailAuthForm({ mode }: EmailAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccessMessage(null)

        const formData = new FormData(event.currentTarget)

        try {
            if (mode === 'signup') {
                const result = await signupWithEmail(formData)
                if (result.error) {
                    setError(result.error)
                } else {
                    // Force a redirect or show success message
                    // In many Supabase setups, signup might auto-login in dev.
                    // We'll show the message, but also try to redirect if we detect a session?
                    // For now, let's just make the message very clear.
                    setSuccessMessage('Account created! Please check your email to confirm.')

                    // Optional: If you want to auto-redirect in dev environments where email confirmation is off:
                    // window.location.href = '/setup/life' 
                }
            } else {
                const result = await loginWithEmail(formData)
                if (result?.error) {
                    setError(result.error)
                }
            }
        } catch (e) {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="space-y-4">
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        required
                    />
                </div>

                {mode === 'signup' && (
                    <div className="relative">
                        <Input
                            name="full_name"
                            type="text"
                            placeholder="Full Name"
                            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            required
                        />
                    </div>
                )}

                {mode === 'signup' && (
                    <div className="relative">
                        <select
                            name="country"
                            required
                            className="w-full h-12 pl-3 pr-10 bg-gray-50 border border-gray-200 rounded-md focus:bg-white transition-colors text-sm"
                            defaultValue=""
                        >
                            <option value="" disabled>Select your country</option>
                            {COUNTRIES.map(c => (
                                <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        required
                        minLength={6}
                    />
                </div>

                {/* DOB field removed for onboarding flow */}
            </div>

            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-100">
                    {successMessage}
                </div>
            )}

            <Button
                type="submit"
                className="w-full h-12 bg-gray-900 hover:bg-black text-white rounded-xl transition-all shadow-sm active:scale-[0.98]"
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <span className="flex items-center gap-2">
                        {mode === 'signup' ? 'Create Account' : 'Sign In'}
                        <ArrowRight className="h-4 w-4 opacity-50" />
                    </span>
                )}
            </Button>
        </form>
    )
}
