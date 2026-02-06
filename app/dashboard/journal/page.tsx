"use client";

import { Plus, Search, Calendar as CalendarIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data
const entries = [
    {
        id: 1,
        date: "Today, 9:22 AM",
        preview: "Today I am grateful for the progress on my project. It feels good to...",
        mood: "Great",
        tags: ["Gratitude", "Work"]
    },
    {
        id: 2,
        date: "Yesterday",
        preview: "Reflecting on the conversation with dad. I realized that time is...",
        mood: "Good",
        tags: ["Family", "Reflection"]
    },
    {
        id: 3,
        date: "Feb 4, 2026",
        preview: "Felt a bit overwhelmed today. Too many tasks piling up.",
        mood: "Okay",
        tags: ["Anxiety"]
    }
];

export default function JournalPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1D1D1F]">Life Journal</h1>
                    <p className="text-[#86868B]">Capture your thoughts, preserve your journey.</p>
                </div>
                <Button asChild className="rounded-full bg-[#1D1D1F] text-white hover:bg-black gap-2">
                    <Link href="/dashboard/journal/new">
                        <Plus className="h-4 w-4" />
                        New Entry
                    </Link>
                </Button>
            </header>

            {/* Stats / Analytics Teaser */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#1D1D1F]">12</div>
                    <div className="text-xs text-gray-400 uppercase mt-1">Total Entries</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100">
                    <div className="text-3xl font-bold text-orange-500">4🔥</div>
                    <div className="text-xs text-gray-400 uppercase mt-1">Day Streak</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 md:col-span-2 flex items-center justify-between px-8">
                    <div>
                        <div className="text-lg font-bold text-[#1D1D1F]">Mood Trend</div>
                        <div className="text-xs text-gray-400 uppercase">Last 7 Days</div>
                    </div>
                    {/* Tiny visual representation of trend */}
                    <div className="flex gap-1 items-end h-8">
                        <div className="w-2 h-4 bg-gray-200 rounded-full"></div>
                        <div className="w-2 h-6 bg-green-200 rounded-full"></div>
                        <div className="w-2 h-5 bg-green-300 rounded-full"></div>
                        <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                        <div className="w-2 h-6 bg-green-400 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search your memories..." className="pl-10 rounded-xl bg-white border-transparent focus:bg-white transition-colors shadow-sm" />
                </div>
                <Button variant="outline" size="icon" className="rounded-xl bg-white border-transparent shadow-sm">
                    <Filter className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl bg-white border-transparent shadow-sm">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                </Button>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {entries.map((entry) => (
                    <div key={entry.id} className="group bg-white rounded-3xl p-6 md:p-8 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-semibold text-gray-400">{entry.date}</span>
                            <span className={cn(
                                "text-xs font-medium px-3 py-1 rounded-full",
                                entry.mood === "Great" ? "bg-orange-50 text-orange-600" :
                                    entry.mood === "Good" ? "bg-green-50 text-green-600" :
                                        "bg-blue-50 text-blue-600"
                            )}>
                                {entry.mood}
                            </span>
                        </div>
                        <p className="text-lg text-[#1D1D1F] line-clamp-2 leading-relaxed mb-4">
                            {entry.preview}
                        </p>
                        <div className="flex gap-2">
                            {entry.tags.map(tag => (
                                <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">#{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
