'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, BrainCircuit, Book, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const TABS = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Coach', href: '/dashboard/coach', icon: BrainCircuit },
    { name: 'Journal', href: '/dashboard/journal', icon: Book },
    { name: 'Stats', href: '/dashboard/settings', icon: User },
]

export default function MobileNav() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 safe-area-bottom">
            <div className="flex justify-around items-center h-16 px-2">
                {TABS.map((tab) => {
                    const isActive = pathname === tab.href
                    const Icon = tab.icon

                    return (
                        <button
                            key={tab.name}
                            onClick={() => router.push(tab.href)}
                            className="relative flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -top-[1px] w-8 h-[3px] bg-black rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <Icon
                                className={cn(
                                    "w-6 h-6 mb-1 transition-all duration-300",
                                    isActive ? "text-black scale-110" : "text-gray-400 hover:text-gray-600"
                                )}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className={cn(
                                "text-[10px] tracking-wide transition-colors",
                                isActive ? "text-black font-semibold" : "text-gray-400"
                            )}>
                                {tab.name}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
