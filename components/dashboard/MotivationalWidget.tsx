"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
    { text: "You act like mortals in all that you fear, and like immortals in all that you desire.", author: "Seneca" },
    { text: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
    { text: "He who fears death will never do anything worthy of a man who is alive.", author: "Seneca" },
    { text: "Think of yourself as dead. You have lived your life. Now take what's left and live it properly.", author: "Marcus Aurelius" },
    { text: "You could leave life right now. Let that determine what you do and say and think.", author: "Marcus Aurelius" },
    { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { text: "Don't explain your philosophy. Embodiment it.", author: "Epictetus" }
];

export const MotivationalWidget = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Pick a quote based on the current hour to be 'context aware' (or just random for now)
        // For MVP: Randomize on mount
        setIndex(Math.floor(Math.random() * quotes.length));
    }, []);

    const quote = quotes[index];

    return (
        <div className="bg-[#1D1D1F] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg min-h-[240px] relative overflow-hidden group">

            {/* Subtle Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <Quote className="h-8 w-8 text-white/20 mb-4" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-xl md:text-2xl font-medium leading-relaxed italic font-serif opacity-90">
                        "{quote.text}"
                    </p>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-end mt-6">
                <div className="h-1 w-12 bg-white/20 rounded-full"></div>
                <div className="text-right text-sm text-gray-400 font-medium tracking-wide">
                    — {quote.author}
                </div>
            </div>
        </div>
    );
};
