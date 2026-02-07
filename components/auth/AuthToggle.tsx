'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AuthToggleProps {
    mode: 'login' | 'signup'
    onToggle: (mode: 'login' | 'signup') => void
}

export function AuthToggle({ mode, onToggle }: AuthToggleProps) {
    return (
        <div className="relative flex w-full p-1 bg-gray-100 rounded-xl mb-6">
            <motion.div
                className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
                animate={{
                    x: mode === 'login' ? 0 : '100%'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
                onClick={() => onToggle('login')}
                className={cn(
                    "relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-200",
                    mode === 'login' ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                )}
            >
                Sign In
            </button>
            <button
                onClick={() => onToggle('signup')}
                className={cn(
                    "relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-200",
                    mode === 'signup' ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                )}
            >
                Sign Up
            </button>
        </div>
    )
}
