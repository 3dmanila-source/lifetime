'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { saveOnboardingData } from '@/app/setup/actions'
import { DateWheelPicker } from '@/components/ui/date-wheel-picker'
import { Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import * as Slider from '@radix-ui/react-slider'
import {
    Select as SelectComponent,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { COUNTRIES } from '@/lib/constants/countries'

const INTERESTS = [
    "Health & Fitness", "Business", "Philosophy", "Relationships",
    "Career Growth", "Mindfulness", "Finance", "Travel",
    "Art & Creativity", "Technology", "Spirituality", "Leadership"
]

import { User } from '@supabase/supabase-js'

interface LifeEstimationProps {
    user: User
}

export default function LifeEstimation({ user }: LifeEstimationProps) {
    const router = useRouter()
    const [step, setStep] = useState<'dob' | 'life-span' | 'interests'>('dob')
    const [isLoading, setIsLoading] = useState(false)

    // Data State
    const [dob, setDob] = useState('')

    // Country Context (Handle Fallback for Google Auth)
    const [countryCode, setCountryCode] = useState(user.user_metadata?.country || '')
    const [fullName, setFullName] = useState(user.user_metadata?.full_name || '')
    const [phone, setPhone] = useState(user.user_metadata?.phone || '')

    const countryData = COUNTRIES.find(c => c.code === countryCode)
    const countryName = countryData?.name || "Global Average"
    const defaultExpectancy = countryData ? Math.round(countryData.lifeExpectancy) : 80

    const [lifeExpectancy, setLifeExpectancy] = useState(defaultExpectancy)
    const [selectedInterests, setSelectedInterests] = useState<string[]>([])
    const [lifeGoal, setLifeGoal] = useState('')


    // Computed Stats
    const [weeksLived, setWeeksLived] = useState(0)
    const [totalWeeks, setTotalWeeks] = useState(4160) // 80 years * 52 weeks

    useEffect(() => {
        if (dob) {
            const birthDate = new Date(dob)
            const now = new Date()
            const diffTime = Math.abs(now.getTime() - birthDate.getTime())
            const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))
            setWeeksLived(diffWeeks)
        }
    }, [dob])

    useEffect(() => {
        setTotalWeeks(lifeExpectancy * 52)
    }, [lifeExpectancy])

    // Effect to update expectancy if country changes (fallback mode)
    useEffect(() => {
        if (countryData) {
            setLifeExpectancy(Math.round(countryData.lifeExpectancy))
        }
    }, [countryCode])

    const handleCountryChange = (code: string) => {
        setCountryCode(code)
    }

    const handleContinue = async () => {
        if (step === 'dob') {
            if (!dob || !fullName || !phone) return // Block if name/dob/phone missing

            // Simulate calculation
            setIsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 800))

            // Calculate weeks
            const birthDate = new Date(dob)
            const now = new Date()
            const diffTime = Math.abs(now.getTime() - birthDate.getTime())
            const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))

            setWeeksLived(diffWeeks)
            setTotalWeeks(lifeExpectancy * 52)

            setIsLoading(false)
            setStep('life-span')
        } else if (step === 'life-span') {
            if (!countryCode) return // Block if country missing
            setStep('interests')
        } else if (step === 'interests') {
            await handleFinalSubmit()
        }
    }

    const handleFinalSubmit = async () => {
        setIsLoading(true)
        try {
            const { saveOnboardingData } = await import('@/app/setup/actions')
            await saveOnboardingData({
                dob,
                lifeExpectancy,
                interests: selectedInterests,
                lifeGoal,
                full_name: fullName !== user.user_metadata?.full_name ? fullName : undefined,
                country: countryCode !== user.user_metadata?.country ? countryCode : undefined,
                phone: phone !== user.user_metadata?.phone ? phone : undefined
            })
            router.push('/dashboard') // Direct to dashboard per requirement
        } catch (error) {
            console.error('Failed to save:', error)
            setIsLoading(false)
        }
    }

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        )
    }

    const renderStep = () => {
        switch (step) {
            case 'dob':
                return (
                    <motion.div
                        key="dob"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-semibold tracking-tight mb-2">
                            Hello, {fullName || "Traveler"}
                        </h2>
                        {!user.user_metadata?.full_name && (
                            <div className="max-w-xs mx-auto mb-4">
                                <Label className="block text-left mb-2 text-sm text-[#86868B]">What should we call you?</Label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full h-12 px-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-black/5 transition-all text-center text-lg"
                                />
                            </div>
                        )}

                        {!user.user_metadata?.phone && (
                            <div className="max-w-xs mx-auto mb-8">
                                <Label className="block text-left mb-2 text-sm text-[#86868B]">Your Phone Number?</Label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+1 234 567 8900"
                                    className="w-full h-12 px-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-black/5 transition-all text-center text-lg"
                                />
                            </div>
                        )}

                        <h2 className="text-3xl font-semibold tracking-tight mb-2">
                            When did your journey begin?
                        </h2>
                        <p className="text-xl text-[#86868B] mb-12 font-medium">
                            To understand where you're going, we need to know where you started.
                        </p>
                        <div className="flex justify-center mb-16">
                            <DateWheelPicker
                                value={dob ? (() => {
                                    const [y, m, d] = dob.split('-').map(Number);
                                    return new Date(y, m - 1, d);
                                })() : new Date(1995, 5, 15)}
                                onChange={(date) => {
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    setDob(`${year}-${month}-${day}`);
                                }}
                                minYear={1940}
                                maxYear={new Date().getFullYear()}
                                size="lg"
                            />
                        </div>
                    </motion.div>
                )
            case 'life-span':
                return (
                    <motion.div
                        key="life-span"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center w-full"
                    >
                        <h2 className="text-3xl font-semibold tracking-tight mb-4">
                            Your Life Context
                        </h2>

                        <div className="max-w-xs mx-auto mb-8">
                            {!user.user_metadata?.country ? (
                                <>
                                    <Label className="block text-left mb-2 text-sm text-[#86868B]">Where do you live?</Label>
                                    <SelectComponent
                                        onValueChange={(val) => handleCountryChange(val)}
                                        defaultValue={countryCode}
                                    >
                                        <SelectTrigger className="w-full bg-[#F5F5F7] border-0 h-12 rounded-xl">
                                            <SelectValue placeholder="Select your country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {COUNTRIES.map(c => (
                                                <SelectItem key={c.code} value={c.code}>
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </SelectComponent>
                                </>
                            ) : (
                                <div className="p-4 bg-[#F5F5F7] rounded-xl text-left border border-gray-100">
                                    <Label className="block mb-1 text-xs text-[#86868B] uppercase tracking-wide font-semibold">Location</Label>
                                    <div className="text-lg font-semibold text-[#1D1D1F] flex items-center gap-2">
                                        {countryData?.code && (
                                            <span className="text-2xl">
                                                {countryData.code.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))}
                                            </span>
                                        )}
                                        {countryName}
                                    </div>
                                </div>
                            )}

                            {countryCode && (
                                <p className="text-xs text-[#86868B] mt-2 text-left px-1">
                                    Avg. Expectancy: <span className="text-black font-semibold">{Math.round(countryData?.lifeExpectancy || 80)} years</span>
                                </p>
                            )}
                        </div>

                        <h2 className="text-2xl font-semibold tracking-tight mb-2">
                            Your Time
                        </h2>
                        <p className="text-[#86868B] mb-8 text-lg">
                            You have lived <span className="text-black font-semibold">{weeksLived.toLocaleString()}</span> weeks.
                        </p>

                        <div className="flex justify-center mb-8">
                            <div className="p-6 bg-[#F5F5F7] rounded-3xl relative w-full h-64 overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 flex items-end">
                                    <motion.div
                                        initial={{ height: "0%" }}
                                        animate={{ height: `${Math.min((weeksLived / totalWeeks) * 100, 100)}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="w-full bg-gradient-to-t from-gray-900 to-gray-600 opacity-20"
                                    />
                                </div>
                                <div className="z-10 text-center">
                                    <h3 className="text-6xl font-bold mb-2">
                                        {Math.round((weeksLived / totalWeeks) * 100)}%
                                    </h3>
                                    <span className="text-sm uppercase tracking-widest text-[#86868B]">Lived</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12 px-4">
                            <div className="flex justify-between text-sm font-medium mb-4 text-[#86868B]">
                                <span>Optimistic Estimate</span>
                                <span className="text-black">{lifeExpectancy} Years</span>
                            </div>
                            <Slider.Root
                                className="relative flex items-center select-none touch-none w-full h-5"
                                value={[lifeExpectancy]}
                                max={120}
                                min={50}
                                step={1}
                                onValueChange={(val) => setLifeExpectancy(val[0])}
                            >
                                <Slider.Track className="bg-[#E5E5E5] relative grow rounded-full h-[3px]">
                                    <Slider.Range className="absolute bg-black rounded-full h-full" />
                                </Slider.Track>
                                <Slider.Thumb
                                    className="block w-6 h-6 bg-white border-2 border-black/10 shadow-[0_2px_10px_rgba(0,0,0,0.1)] rounded-full hover:bg-gray-50 focus:outline-none focus:scale-110 transition-transform"
                                    aria-label="Life Expectancy"
                                />
                            </Slider.Root>
                        </div>
                    </motion.div>
                )
            case 'interests':
                return (
                    <motion.div
                        key="interests"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center w-full"
                    >
                        <h2 className="text-3xl font-semibold tracking-tight mb-2">
                            What drives you?
                        </h2>
                        <p className="text-[#86868B] mb-8">
                            Help your AI Coach understand your focus areas.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                            {INTERESTS.map(interest => (
                                <button
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    className={`p-3 rounded-xl text-sm font-medium transition-all border ${selectedInterests.includes(interest)
                                        ? 'bg-black text-white border-black shadow-lg transform scale-[1.02]'
                                        : 'bg-white text-[#1D1D1F] border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>

                        <div className="mb-10 text-left">
                            <label className="block text-xs uppercase tracking-wider font-semibold text-[#86868B] mb-3 ml-1">
                                Main Life Goal (Optional)
                            </label>
                            <textarea
                                value={lifeGoal}
                                onChange={(e) => setLifeGoal(e.target.value)}
                                placeholder="E.g. become financially independent, write a book..."
                                className="w-full p-4 bg-[#F5F5F7] rounded-2xl border-2 border-transparent focus:border-[#0071e3] focus:bg-white transition-all outline-none resize-none h-24 text-[15px]"
                            />
                        </div>
                    </motion.div>
                )
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] p-6 text-[#1D1D1F]">
            <motion.div
                layout
                className="w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-white/60 relative overflow-hidden"
            >
                <div className="mb-8 flex justify-center gap-2">
                    {['dob', 'life-span', 'interests'].map((s, i) => (
                        <div
                            key={s}
                            className={`h-1.5 rounded-full transition-all duration-500 ${['dob', 'life-span', 'interests'].indexOf(step) >= i
                                ? 'w-8 bg-black'
                                : 'w-2 bg-gray-200'
                                }`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>

                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={handleContinue}
                        disabled={step === 'dob' && !dob || isLoading}
                        className="h-14 px-10 text-lg rounded-full bg-black hover:bg-gray-800 text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-xl"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                {step === 'interests' ? 'Enter Life Bank' : 'Continue'}
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        )}
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
