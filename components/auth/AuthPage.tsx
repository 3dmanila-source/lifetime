'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton'
import { PhoneAuthForm } from '@/components/auth/PhoneAuthForm'
import EmailAuthForm from '@/components/auth/EmailAuthForm'
import { AuthToggle } from '@/components/auth/AuthToggle'

interface AuthPageProps {
    initialMode?: 'login' | 'signup'
}

export default function AuthPage({ initialMode = 'login' }: AuthPageProps) {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode)

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] p-4 text-[#1D1D1F]">
            {/* Background elements for subtle depth */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-100/30 rounded-full blur-[120px]" />
            </div>

            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] border border-white/60 relative z-10"
            >
                <div className="mb-6 text-center">
                    <AuthToggle mode={mode} onToggle={setMode} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode === 'login' ? 'title-login' : 'title-signup'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            <h1 className="text-3xl font-semibold tracking-tight mb-2 text-[#1d1d1f]">
                                {mode === 'login' ? 'Welcome Back' : 'Create your Life Bank'}
                            </h1>
                            <p className="text-[#86868B] text-[15px] font-medium leading-relaxed">
                                {mode === 'login' ? 'Continue your journey to a better life.' : 'Start your journey to self-improvement.'}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="space-y-6">
                    <GoogleAuthButton text={mode === 'login' ? "Sign in with Google" : "Sign up with Google"} />

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-[10px] tracking-widest uppercase font-semibold">
                            <span className="bg-[#fcfcfd] px-3 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <PhoneAuthForm />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <EmailAuthForm mode={mode} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-8 text-center text-[14px]">
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                        <button
                            onClick={async () => {
                                if (confirm('Are you sure you want to reset all onboarding data?')) {
                                    const { resetOnboardingData } = await import('@/app/setup/actions')
                                    await resetOnboardingData()
                                    alert('Data reset!')
                                    window.location.reload()
                                }
                            }}
                            className="text-xs text-red-400 hover:text-red-500 hover:underline"
                        >
                            Trouble connecting? Reset Data
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

