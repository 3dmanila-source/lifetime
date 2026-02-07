import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import {
    LayoutDashboard,
    Heart,
    Brain,
    BookOpen,
    Settings,
    LogOut
} from "lucide-react";

import MobileNav from "@/components/layout/MobileNav";

// ... existing imports

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#F5F5F7]">
            {/* Sidebar Navigation */}
            <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 bg-white border-r border-gray-200 px-4 py-8 z-50">
                <div className="mb-10 px-4">
                    <h1 className="text-xl font-bold tracking-tight">Lifetime.</h1>
                    <p className="text-xs text-gray-500 mt-1">Mortality OS v1.0</p>
                </div>

                <nav className="flex-1 space-y-1">
                    <DashboardLink href="/dashboard" icon={<LayoutDashboard size={20} />} label="Life Bank" />
                    <DashboardLink href="/dashboard/relationships" icon={<Heart size={20} />} label="Relationships" />

                    <DashboardLink href="/dashboard/journal" icon={<BookOpen size={20} />} label="Journal" />
                </nav>

                <div className="border-t border-gray-100 pt-4 space-y-1">
                    <DashboardLink href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" />
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 gap-3 px-4">
                        <LogOut size={20} />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <MobileNav />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
                {children}
            </main>
        </div>
    );
}

function DashboardLink({ href, icon, label, active = false }: any) {
    return (
        <Button
            asChild
            variant={active ? "secondary" : "ghost"}
            className={`w-full justify-start gap-3 px-4 h-12 text-sm font-medium ${active ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-black'}`}
        >
            <NextLink href={href}>
                {icon}
                {label}
            </NextLink>
        </Button>
    )
}
