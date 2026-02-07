"use client";

import { useEffect, useState } from "react";
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInYears, addYears, format } from "date-fns";
import { motion } from "framer-motion";

interface CountdownProps {
    dob: Date; // Date of Birth
    expectancy: number; // Age expectancy in years
}

export const Countdown = ({ dob, expectancy }: CountdownProps) => {
    // Calculate death date
    const deathDate = addYears(dob, expectancy);

    const [timeLeft, setTimeLeft] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0
    });

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const totalSeconds = differenceInSeconds(deathDate, now);

            // This is a simplified breakdown. 
            // Real apps might handle leap years/months more granularly for display.
            const years = differenceInYears(deathDate, now);
            const days = differenceInDays(deathDate, now) % 365;
            const hours = differenceInHours(deathDate, now) % 24;
            const minutes = differenceInMinutes(deathDate, now) % 60;
            const seconds = totalSeconds % 60;

            setTimeLeft({ years, days, hours, minutes, seconds, totalSeconds });
        };

        tick(); // Initial call
        const interval = setInterval(tick, 1000); // Update every second

        return () => clearInterval(interval);
    }, [dob, expectancy]);

    return (
        <div className="w-full bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 p-8 md:p-12 text-center">
            <h2 className="text-sm font-semibold text-[#86868B] uppercase tracking-widest mb-8">Balance Life Time</h2>

            <div className="grid grid-cols-2 md:flex md:justify-center items-end gap-x-4 gap-y-8 md:gap-12">
                <TimeBlock value={timeLeft.years} label="Years" />
                <Separator />
                <TimeBlock value={timeLeft.days} label="Days" />
                <Separator />
                <TimeBlock value={timeLeft.hours} label="Hours" />
                <Separator />
                <TimeBlock value={timeLeft.minutes} label="Minutes" />
                <Separator />
                <TimeBlock value={timeLeft.seconds} label="Seconds" highlight />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <span>DOB: {format(dob, "PPP")}</span>
                <span>Target: {expectancy} Years</span>
            </div>
        </div>
    );
};

const TimeBlock = ({ value, label, highlight = false }: any) => (
    <div className="flex flex-col items-center min-w-[80px]">
        <motion.span
            key={value}
            initial={{ y: 5, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-4xl md:text-6xl font-bold tabular-nums tracking-tighter ${highlight ? 'text-red-500' : 'text-[#1D1D1F]'}`}
        >
            {value.toString().padStart(2, '0')}
        </motion.span>
        <span className="text-xs md:text-sm font-medium text-[#86868B] uppercase mt-2">{label}</span>
    </div>
);

const Separator = () => (
    <div className="hidden md:block text-4xl text-gray-200 mb-8">:</div>
);
