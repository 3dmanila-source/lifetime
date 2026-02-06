"use client";

import { useState } from "react";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MoodSelector } from "@/components/journal/MoodSelector";
import { useRouter } from "next/navigation";

export default function NewEntryPage() {
    const router = useRouter();
    const [mood, setMood] = useState("Good");

    // Prompts logic
    const prompts = [
        "What are you grateful for today?",
        "What is one thing you learned?",
        "How did you make progress on your life goals?",
        "What was the highlight of your day?"
    ];
    const [activePrompt, setActivePrompt] = useState(prompts[0]);

    const handleSave = () => {
        // Mock save
        alert("Entry saved to your Life Journal.");
        router.push("/dashboard/journal");
    };

    const shufflePrompt = () => {
        const random = prompts[Math.floor(Math.random() * prompts.length)];
        setActivePrompt(random);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <header className="flex items-center justify-between sticky top-0 bg-[#F5F5F7] py-4 z-10 backdrop-blur-sm bg-opacity-90">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/journal">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <span className="text-sm font-semibold text-gray-500">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                <Button onClick={handleSave} className="rounded-full bg-[#1D1D1F] hover:bg-black text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                </Button>
            </header>

            {/* Mood Section */}
            <section className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 space-y-4">
                <Label className="uppercase text-xs tracking-wide text-gray-400">How are you feeling?</Label>
                <MoodSelector selectedMood={mood} onSelect={setMood} />
            </section>

            {/* Writing Section */}
            <section className="space-y-6">

                {/* Prompt Card */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-100 to-blue-100 rounded-3xl opacity-50 blur group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative bg-white rounded-3xl p-8 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Reflection Prompt
                            </h3>
                            <Button variant="ghost" size="sm" onClick={shufflePrompt} className="text-xs text-gray-400 hover:text-indigo-600">
                                Shuffle
                            </Button>
                        </div>
                        <p className="text-xl font-medium text-[#1D1D1F] mb-6">"{activePrompt}"</p>
                        <textarea
                            className="w-full min-h-[120px] p-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-indigo-100 resize-none text-gray-700 leading-relaxed"
                            placeholder="Start writing..."
                        />
                    </div>
                </div>

                {/* Free Write */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                    <Label className="uppercase text-xs tracking-wide text-gray-400 mb-4 block">Free Write</Label>
                    <textarea
                        className="w-full min-h-[300px] bg-transparent border-0 focus:ring-0 p-0 text-lg leading-relaxed text-[#1D1D1F] placeholder:text-gray-300 resize-none"
                        placeholder="What else is on your mind? Capture it here..."
                    />
                </div>

            </section>
        </div>
    );
}
