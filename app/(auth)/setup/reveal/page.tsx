"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function RevealPage() {
    const [step, setStep] = useState(0);

    // Demo data - in real app would come from context/url
    const yearsLeft = 45;
    const daysLeft = 16425;
    const hoursLeft = 394200;

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 1000); // Fade in text
        const timer2 = setTimeout(() => setStep(2), 2500); // Show numbers
        const timer3 = setTimeout(() => setStep(3), 4000); // Final state
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 overflow-hidden relative">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>

            <div className="z-10 text-center max-w-4xl w-full space-y-12">

                <AnimatePresence>
                    {step >= 0 && (
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="text-2xl md:text-3xl font-light text-gray-400"
                        >
                            You have approximately...
                        </motion.h1>
                    )}
                </AnimatePresence>

                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="text-7xl md:text-9xl font-bold tracking-tighter text-white tabular-nums leading-none">
                            {daysLeft.toLocaleString()}
                        </div>
                        <div className="text-xl md:text-2xl font-medium text-red-500 uppercase tracking-widest">
                            Days Remaining
                        </div>
                    </motion.div>
                )}

                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-2 gap-8 max-w-lg mx-auto pt-8 border-t border-white/10"
                    >
                        <div>
                            <div className="text-3xl font-bold text-gray-300 tabular-nums">{yearsLeft}</div>
                            <div className="text-xs text-gray-500 uppercase">Years</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-300 tabular-nums">{hoursLeft.toLocaleString()}</div>
                            <div className="text-xs text-gray-500 uppercase">Hours</div>
                        </div>
                    </motion.div>
                )}

                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="pt-12"
                    >
                        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto italic">
                            "Time is not refundable. How will you spend these days?"
                        </p>

                        <Button asChild size="lg" className="h-14 px-8 bg-white text-black hover:bg-gray-200 transition-all rounded-full text-lg">
                            <Link href="/dashboard">
                                Enter Life Bank
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
