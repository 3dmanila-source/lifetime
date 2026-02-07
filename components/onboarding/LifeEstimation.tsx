'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { saveDob } from '@/app/setup/actions'
import { Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LifeEstimation() {
    const router = useRouter()
    const [dob, setDob] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState<'input' | 'visualization'>('input')

    // Life stats
    const [weeksLived, setWeeksLived] = useState(0)
    const [totalWeeks] = useState(4000) // Average life based on 80 years

    // Calculate weeks lived when DOB changes
    useEffect(() => {
        if (dob) {
            const birthDate = new Date(dob)
            const now = new Date()
            const diffTime = Math.abs(now.getTime() - birthDate.getTime())
            const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))
            setWeeksLived(diffWeeks)
        }
    }, [dob])

    const handleContinue = async () => {
        if (!dob) return

        if (step === 'input') {
            setStep('visualization')
            return
        }

        setIsLoading(true)
        try {
            const result = await saveDob(dob)
            if (result.success) {
                router.push('/dashboard')
            } else {
                // simple alert for now, could be better error handling
                alert('Something went wrong. Please try again.')
            }
        } catch (error) {
            console.error('Failed to save DOB:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] p-6 text-[#1D1D1F]">
            <motion.div
                layout
                className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-white/60 relative overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {step === 'input' ? (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                                When did your journey begin?
                            </h1>
                            <p className="text-xl text-[#86868B] mb-12 font-medium">
                                To understand where you're going, we need to know where you started.
                            </p>

                            <div className="relative max-w-sm mx-auto mb-16 group">
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full text-center text-3xl p-6 bg-[#F5F5F7] rounded-3xl border-2 border-transparent focus:border-[#0071e3] focus:bg-white transition-all outline-none font-medium cursor-pointer"
                                />
                            </div>

                            <Button
                                onClick={handleContinue}
                                disabled={!dob}
                                className="h-16 px-10 text-xl rounded-full bg-black hover:bg-gray-800 text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <span className="flex items-center gap-3">
                                    Continue <ArrowRight className="w-5 h-5" />
                                </span>
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="visualization"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-semibold tracking-tight mb-4">
                                Your Life in Weeks
                            </h2>
                            <p className="text-[#86868B] mb-8 text-lg">
                                You have lived <span className="text-black font-semibold">{weeksLived.toLocaleString()}</span> weeks.
                                Assuming an average of 4,000 weeks.
                            </p>

                            <div className="flex justify-center mb-12">
                                <div className="p-6 bg-[#F5F5F7] rounded-3xl relative w-full h-64 overflow-hidden flex items-center justify-center">
                                    {/* Abstract visualization */}
                                    <div className="absolute inset-0 flex items-end">
                                        <motion.div
                                            initial={{ height: "0%" }}
                                            animate={{ height: `${Math.min((weeksLived / totalWeeks) * 100, 100)}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="w-full bg-gradient-to-t from-gray-900 to-gray-600 opacity-20"
                                        />
                                    </div>
                                    <h3 className="text-6xl font-bold z-10 sticky">
                                        {Math.round((weeksLived / totalWeeks) * 100)}%
                                    </h3>
                                </div>
                            </div>

                            <p className="text-sm text-[#86868B] mb-10 max-w-md mx-auto">
                                "We have two lives, and the second begins when we realize we only have one." — Confucius
                            </p>

                            <Button
                                onClick={handleContinue}
                                disabled={isLoading}
                                className="h-16 px-12 text-xl rounded-full bg-black hover:bg-gray-800 text-white transition-all transform hover:scale-105 shadow-xl"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    "Enter Your Life Bank"
                                )}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
