"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Smile, Frown, Meh, Sun, CloudRain } from "lucide-react";

interface MoodSelectorProps {
    selectedMood: string;
    onSelect: (mood: string) => void;
}

const moods = [
    { id: "Great", icon: Sun, color: "text-orange-500", bg: "bg-orange-50" },
    { id: "Good", icon: Smile, color: "text-green-500", bg: "bg-green-50" },
    { id: "Okay", icon: Meh, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "Bad", icon: Frown, color: "text-gray-500", bg: "bg-gray-50" },
    { id: "Awful", icon: CloudRain, color: "text-purple-500", bg: "bg-purple-50" },
];

export const MoodSelector = ({ selectedMood, onSelect }: MoodSelectorProps) => {
    return (
        <div className="flex gap-2 justify-between md:justify-start">
            {moods.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.id;
                return (
                    <button
                        key={mood.id}
                        type="button"
                        onClick={() => onSelect(mood.id)}
                        className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border-2",
                            isSelected
                                ? `border-${mood.color.split('-')[1]}-500 ${mood.bg}`
                                : "border-transparent hover:bg-gray-50"
                        )}
                    >
                        <Icon className={cn("h-6 w-6", isSelected ? mood.color : "text-gray-400")} />
                        <span className={cn("text-xs font-medium", isSelected ? "text-black" : "text-gray-400")}>{mood.id}</span>
                    </button>
                );
            })}
        </div>
    );
};
