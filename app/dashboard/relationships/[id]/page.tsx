"use client";

import { use, useState } from "react";
import { ArrowLeft, Clock, Calendar, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock Data for a specific relationship
const relationshipData = {
    id: "1",
    name: "Priya",
    type: "Partner",
    healthScore: 92,
    goalHours: 15,
    currentHours: 12,
    history: [
        { date: "Mon", score: 88 },
        { date: "Tue", score: 89 },
        { date: "Wed", score: 85 }, // Dip
        { date: "Thu", score: 90 },
        { date: "Fri", score: 92 },
        { date: "Sat", score: 92 },
        { date: "Sun", score: 92 },
    ],
    logs: [
        { id: 1, date: "Today, 10:00 AM", duration: "2 hrs", activity: "Coffee Date", notes: "Talked about vacation plans." },
        { id: 2, date: "Yesterday, 8:00 PM", duration: "1.5 hrs", activity: "Dinner", notes: "Cooked together." },
        { id: 3, date: "Wednesday, 9:00 AM", duration: "15 mins", activity: "Call", notes: "Quick check-in." },
    ]
};

export default function RelationshipDetail({ params }: { params: Promise<{ id: string }> }) {
    // In a real app, we would fetch data based on resolvedParams.id
    // const { id } = use(params); 

    // State for logging
    const [duration, setDuration] = useState("");
    const [activity, setActivity] = useState("");
    const [notes, setNotes] = useState("");

    const handleLog = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would push new log to DB
        alert("Time logged! (Simulation)");
        setDuration("");
        setActivity("");
        setNotes("");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/relationships">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-[#1D1D1F]">{relationshipData.name}</h1>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium uppercase tracking-wide mt-1">
                        {relationshipData.type}
                    </span>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                    <div className="text-4xl font-bold text-green-500">{relationshipData.healthScore}%</div>
                    <div className="text-xs text-gray-400 uppercase">Health Score</div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column: Stats & Time Logging */}
                <div className="md:col-span-2 space-y-8">

                    {/* Health Trend Chart */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide">Health Trend (7 Days)</h3>
                        </div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={relationshipData.history}>
                                    <XAxis dataKey="date" stroke="#E5E5E5" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#22c55e"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#22c55e" }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Time Logger */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                        <h3 className="text-lg font-bold text-[#1D1D1F] mb-6 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gray-400" />
                            Log Interaction
                        </h3>
                        <form onSubmit={handleLog} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (mins)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        placeholder="30"
                                        value={duration}
                                        onChange={e => setDuration(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="activity">Activity</Label>
                                    <Input
                                        id="activity"
                                        placeholder="Call, Dinner, etc."
                                        value={activity}
                                        onChange={e => setActivity(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Input
                                    id="notes"
                                    placeholder="What did you talk about?"
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-[#1D1D1F] hover:bg-black text-white rounded-xl h-11">
                                <Send className="h-4 w-4 mr-2" />
                                Log Time
                            </Button>
                        </form>
                    </div>

                </div>

                {/* Right Column: Interaction History & Stats */}
                <div className="space-y-8">
                    {/* Quick Stats */}
                    <div className="bg-[#F5F5F7] rounded-3xl p-6 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#86868B]">Weekly Goal</span>
                            <span className="font-bold">{relationshipData.goalHours} hrs</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#86868B]">Logged</span>
                            <span className="font-bold">{relationshipData.currentHours} hrs</span>
                        </div>
                        <Progress value={(relationshipData.currentHours / relationshipData.goalHours) * 100} className="h-2" />
                    </div>

                    {/* History List */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 h-fit">
                        <h3 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide mb-4">Recent History</h3>
                        <div className="space-y-6">
                            {relationshipData.logs.map((log) => (
                                <div key={log.id} className="relative pl-6 border-l border-gray-100 last:border-0 pb-0">
                                    <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-gray-200 border-2 border-white"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-[#86868B] font-medium">{log.date}</span>
                                        <span className="text-sm font-bold text-[#1D1D1F] mt-1">{log.activity}</span>
                                        <span className="text-xs text-gray-500 mt-0.5">{log.duration} • {log.notes}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
