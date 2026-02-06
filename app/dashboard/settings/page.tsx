"use client";

import { User, Bell, Shield, LogOut, Download, Trash2, Moon, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-[#1D1D1F]">Settings</h1>
                <p className="text-[#86868B]">Manage your preferences and data.</p>
            </div>

            {/* Profile */}
            <section className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                </h2>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input defaultValue="Sridhar" />
                    </div>
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input defaultValue="sridhar@example.com" disabled className="bg-gray-50 text-gray-500" />
                    </div>
                </div>
                <Button className="rounded-full bg-[#1D1D1F] hover:bg-black text-white">Save Changes</Button>
            </section>

            {/* Appearance */}
            <section className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Appearance
                </h2>
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-gray-500">Adjust the interface to reduce eye strain.</p>
                    </div>
                    <Button variant="outline" className="rounded-xl" onClick={() => alert("Dark mode coming in v2!")}>
                        <Moon className="h-4 w-4 mr-2" />
                        System Default
                    </Button>
                </div>
            </section>

            {/* Notifications */}
            <section className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                </h2>
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-base">Daily Reminders</Label>
                        <p className="text-sm text-gray-500">Receive gentle nudges to log your day.</p>
                    </div>
                    <div
                        className={cn(
                            "w-12 h-7 rounded-full p-1 transition-colors cursor-pointer",
                            notifications ? "bg-green-500" : "bg-gray-200"
                        )}
                        onClick={() => setNotifications(!notifications)}
                    >
                        <div className={cn(
                            "w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
                            notifications ? "translate-x-5" : "translate-x-0"
                        )} />
                    </div>
                </div>
            </section>

            {/* Data Management */}
            <section className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Data & Privacy
                </h2>
                <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-gray-200">
                        <Download className="h-4 w-4 mr-2" />
                        Export All Data (JSON)
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                    </Button>
                </div>
            </section>

            <div className="pt-4 flex justify-center">
                <Button variant="ghost" className="text-gray-400 hover:text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                </Button>
            </div>
        </div>
    );
}
