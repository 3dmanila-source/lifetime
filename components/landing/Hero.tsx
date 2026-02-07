"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 pt-20">

            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-[#F5F5F7] to-[#F5F5F7]"></div>

            <div className="max-w-4xl mx-auto text-center space-y-8">

                {/* Hook */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">LIFETIME</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
                        How much time do you <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] to-gray-500">really have left?</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#86868B] max-w-2xl mx-auto font-light leading-relaxed">
                        Stop drifting through days. Start living with intent.
                        <span className="block mt-2 font-medium text-[#1D1D1F]">Your life is finite. Optimize it.</span>
                    </p>
                </motion.div>

                {/* Demo Countdown (Static Visual for Landing) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="py-8"
                >
                    <div className="inline-flex flex-wrap justify-center gap-4 md:gap-8 p-8 bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-white/50 backdrop-blur-xl">
                        <TimeUnit value="15,432" label="Days" />
                        <div className="h-16 w-px bg-gray-100 hidden md:block"></div>
                        <TimeUnit value="370,368" label="Hours" />
                        <div className="h-16 w-px bg-gray-100 hidden md:block"></div>
                        <TimeUnit value="22,222,080" label="Minutes" />
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button asChild size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-[#1D1D1F] hover:bg-black transition-transform hover:scale-105">
                        <Link href="/signup">
                            Calculate My Time
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg" className="text-lg text-[#86868B] hover:text-[#1D1D1F]">
                        <Link href="/login">
                            I already know
                        </Link>
                    </Button>
                </motion.div>

            </div>
        </section>
    );
};

const TimeUnit = ({ value, label }: { value: string, label: string }) => (
    <div className="text-center min-w-[100px]">
        <div className="text-3xl md:text-4xl font-bold tabular-nums tracking-tight text-[#1D1D1F]">
            {value}
        </div>
        <div className="text-sm font-medium text-[#86868B] uppercase tracking-wide mt-1">
            {label}
        </div>
    </div>
);
