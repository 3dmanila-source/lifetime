"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Info } from "lucide-react";

const data = [
    { name: "Sleep", value: 7, color: "#1D1D1F" },
    { name: "Work", value: 9, color: "#86868B" },
    { name: "Essentials", value: 4, color: "#D1D1D6" },
    { name: "Disposable", value: 4, color: "#0071e3" }, // Apple Blue for "Your Time"
];

export const TimeAllocation = () => {
    return (
        <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-sm font-semibold text-[#86868B] uppercase tracking-wide">Daily Allocation</h3>
                    <p className="text-2xl font-bold text-[#1D1D1F] mt-1">Where does it go?</p>
                </div>
                <Info className="text-gray-300 h-5 w-5 cursor-help" />
            </div>

            <div className="flex-1 min-h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#1D1D1F', fontWeight: 500 }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center mt-[-30px]">
                        <div className="text-3xl font-bold text-[#1D1D1F]">24</div>
                        <div className="text-xs text-[#86868B] uppercase">Hours</div>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="text-xs font-semibold text-blue-600 uppercase mb-1">Reality Check</div>
                <p className="text-sm text-blue-900 leading-relaxed">
                    You only have <span className="font-bold">4 hours</span> of truly disposable time today.
                    That's <span className="font-bold">16%</span> of your day. Use it wisely.
                </p>
            </div>
        </div>
    );
};
