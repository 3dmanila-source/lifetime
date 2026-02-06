"use client";

import { Heart, Clock, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // We need to create this or use a simple div
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data Interface
export interface Relationship {
    id: string;
    name: string;
    type: "Partner" | "Family" | "Friend";
    healthScore: number; // 0-100
    hoursLogged: number;
    hoursGoal: number;
    lastContact: string;
    image?: string; // Placeholder for avatar
}

interface RelationshipCardProps {
    data: Relationship;
}

export const RelationshipCard = ({ data }: RelationshipCardProps) => {
    // Determine color based on health score
    const healthColor = data.healthScore >= 80 ? "bg-green-500" : data.healthScore >= 50 ? "bg-yellow-500" : "bg-red-500";
    const textColor = data.healthScore >= 80 ? "text-green-600" : data.healthScore >= 50 ? "text-yellow-600" : "text-red-500";

    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-md transition-shadow group relative">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className={cn("h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg", healthColor)}>
                        {data.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1D1D1F] text-lg">{data.name}</h3>
                        <span className="text-xs font-medium text-[#86868B] uppercase tracking-wide">{data.type}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-black">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#86868B]">Health Score</span>
                        <span className={cn("font-bold", textColor)}>{data.healthScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#F5F5F7] rounded-full overflow-hidden">
                        <div
                            className={cn("h-full rounded-full", healthColor)}
                            style={{ width: `${data.healthScore}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-sm text-[#86868B]">
                        <Clock className="h-4 w-4" />
                        <span>{data.hoursLogged}/{data.hoursGoal} hrs</span>
                    </div>

                    <Button asChild size="sm" variant="outline" className="rounded-full text-xs">
                        <Link href={`/dashboard/relationships/${data.id}`}>
                            View
                            <ArrowUpRight className="ml-2 h-3 w-3" />
                        </Link>
                    </Button>
                </div>
            </div>

            {data.healthScore < 50 && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                    <span className="flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                </div>
            )}
        </div>
    );
};
