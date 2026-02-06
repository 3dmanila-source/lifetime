"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";

interface AddRelationshipModalProps {
    onAdd: (relationship: any) => void;
}

export const AddRelationshipModal = ({ onAdd }: AddRelationshipModalProps) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [type, setType] = useState("Friend");
    const [hoursGoal, setHoursGoal] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const newRelationship = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            type,
            healthScore: 100, // Starts fresh
            hoursLogged: 0,
            hoursGoal: parseInt(hoursGoal) || 2,
            lastContact: "Just added"
        };

        onAdd(newRelationship);
        setIsLoading(false);
        setOpen(false);

        // Reset form
        setName("");
        setHoursGoal("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-[#1D1D1F] text-white hover:bg-black gap-2">
                    <Plus className="h-4 w-4" />
                    Add Relationship
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Connection</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Grandma, Sarah, Partner"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="type">Relationship Type</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Partner">Partner</SelectItem>
                                <SelectItem value="Family">Family</SelectItem>
                                <SelectItem value="Friend">Friend</SelectItem>
                                <SelectItem value="Networking">Networking</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="hours">Weekly Commitment Goal (Hours)</Label>
                        <Input
                            id="hours"
                            type="number"
                            placeholder="e.g. 5"
                            min="1"
                            value={hoursGoal}
                            onChange={(e) => setHoursGoal(e.target.value)}
                            required
                        />
                        <p className="text-xs text-gray-400">
                            How many hours per week do you want to invest in this relationship?
                        </p>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Connection
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
