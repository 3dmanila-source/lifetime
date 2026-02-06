"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelationshipCard, Relationship } from "@/components/relationships/RelationshipCard";
import { AddRelationshipModal } from "@/components/relationships/AddRelationshipModal";

export default function RelationshipsPage() {
    // Mock Data
    const [relationships, setRelationships] = useState<Relationship[]>([
        {
            id: "1",
            name: "Priya",
            type: "Partner",
            healthScore: 92,
            hoursLogged: 12,
            hoursGoal: 15,
            lastContact: "2 hours ago"
        },
        {
            id: "2",
            name: "Mom & Dad",
            type: "Family",
            healthScore: 65,
            hoursLogged: 2,
            hoursGoal: 5,
            lastContact: "3 days ago"
        },
        {
            id: "3",
            name: "Rahul",
            type: "Friend",
            healthScore: 30, // Low score demo
            hoursLogged: 0,
            hoursGoal: 4,
            lastContact: "2 weeks ago"
        }
    ]);

    const handleAdd = (newRel: Relationship) => {
        setRelationships([newRel, ...relationships]);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1D1D1F]">Relationships</h1>
                    <p className="text-[#86868B]">Track the connections that matter most.</p>
                </div>
                <AddRelationshipModal onAdd={handleAdd} />
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relationships.map((rel) => (
                    <RelationshipCard key={rel.id} data={rel} />
                ))}

                {/* Empty State / Add New Card Placeholder */}
                <button className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors h-full min-h-[200px]">
                    <Plus className="h-8 w-8 mb-2" />
                    <span className="font-medium">Add New</span>
                </button>
            </div>
        </div>
    );
}
