"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LifeProgressProps {
    age: number;      // Current age in years (float)
    expectancy: number; // Target age
}

export const LifeProgress = ({ age, expectancy }: LifeProgressProps) => {
    const percentage = Math.min(100, Math.max(0, (age / expectancy) * 100));

    return (
        <div className="w-full bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 p-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide">The Journey</h3>
                <span className="text-2xl font-bold text-[#1D1D1F]">{percentage.toFixed(1)}% <span className="text-sm font-normal text-gray-500">Completed</span></span>
            </div>

            <div className="relative h-6 w-full bg-[#F5F5F7] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={cn(
                        "h-full rounded-full transition-all",
                        percentage > 90 ? "bg-red-500" : "bg-[#1D1D1F]"
                    )}
                />
            </div>

            <div className="flex justify-between mt-3 text-xs font-medium text-[#86868B]">
                <span>Born</span>
                <span>Mid-Life</span>
                <span>{expectancy} Years</span>
            </div>
        </div>
    );
};
