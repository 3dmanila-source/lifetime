'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import { signupWithEmail, loginWithEmail } from '@/app/auth/actions'

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
                } else if (result.success) {
                    setSuccessMessage('Check your email to confirm your account!')
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

                {mode === 'signup' && (
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500 ml-1">Date of Birth</label>
                        <Input
                            name="dob"
                            type="date"
                            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            required
                        />
                    </div>
                )}
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
