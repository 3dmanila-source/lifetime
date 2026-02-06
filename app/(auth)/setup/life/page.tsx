"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LifeExpectancyPage() {
    const [expectancy, setExpectancy] = useState([80]);
    const [age, setAge] = useState(30); // Demo default

    // Quick calculation for visual feedback
    const yearsLeft = expectancy[0] - age;
    const daysLeft = yearsLeft * 365;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] p-4 text-[#1D1D1F]">
            <div className="w-full max-w-xl bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-white/50 text-center">

                <h1 className="text-3xl font-bold tracking-tight mb-4">Set Your Horizon</h1>
                <p className="text-[#86868B] mb-12 text-lg">
                    To make time tangible, we need a reference point.
                    <br />How long do you aspire to live?
                </p>

                <div className="mb-12">
                    <div className="text-6xl font-bold tabular-nums mb-4 text-[#1D1D1F]">
                        {expectancy[0]} <span className="text-2xl font-medium text-[#86868B]">Years</span>
                    </div>

                    <div className="px-4">
                        <Slider
                            value={expectancy}
                            onValueChange={setExpectancy}
                            min={50}
                            max={120}
                            step={1}
                            className="py-4"
                        />
                        <div className="flex justify-between text-xs font-medium text-[#86868B] mt-2">
                            <span>50</span>
                            <span>Global Avg (73)</span>
                            <span>120</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
                    <div className="text-sm font-semibold text-[#86868B] uppercase tracking-wide mb-1">Impact</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-black font-semibold">If you are {age} today:</span>
                        <span className="text-2xl font-bold text-red-500 tabular-nums">~{daysLeft.toLocaleString()}</span>
                        <span className="text-[#86868B]">days remain.</span>
                    </div>
                </div>

                <Button asChild size="lg" className="w-full h-14 text-lg bg-[#1D1D1F] text-white hover:bg-black transition-transform hover:scale-[1.02]">
                    <Link href="/setup/reveal">
                        Reveal My Countdown
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>

                <p className="mt-6 text-xs text-[#86868B]">
                    You can adjust this anytime in settings.
                </p>
            </div>
        </div>
    );
}
