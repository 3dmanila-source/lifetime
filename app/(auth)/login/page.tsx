import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-black/5 text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
                <p className="text-gray-500 mb-8">Continue your journey.</p>

                <Button asChild className="w-full h-12 text-lg mb-4">
                    <Link href="/dashboard">Log In (Demo)</Link>
                </Button>

                <p className="text-sm text-gray-400">
                    No account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
