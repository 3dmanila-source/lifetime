"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        // TODO: Handle authentication logic here

        setTimeout(() => {
            setIsLoading(false)
            // Navigate to next step
            router.push("/setup/life");
        }, 1000)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] p-4 text-[#1D1D1F]">

            <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-white/50">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Create your Life Bank</h1>
                    <p className="text-[#86868B]">
                        Start by securing your account. You'll set your life expectancy next.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" required className="bg-gray-50/50" />
                        <p className="text-xs text-[#86868B]">Used to calculate your remaining time. Encrypted.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required className="bg-gray-50/50" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required className="bg-gray-50/50" />
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                        <Checkbox id="terms" required className="mt-1" />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="terms" className="text-sm font-normal text-[#86868B] cursor-pointer">
                                I accept the <Link href="/terms" className="underline hover:text-[#1D1D1F]">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-[#1D1D1F]">Privacy Policy</Link>.
                            </Label>
                        </div>
                    </div>

                    <Button className="w-full h-12 text-base bg-[#0071e3] hover:bg-[#0077ED] shadow-sm text-white" disabled={isLoading}>
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Continue to Life Expectancy
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-[#86868B]">Already have an account? </span>
                    <Link href="/login" className="font-medium text-[#0071e3] hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>

            <p className="mt-8 text-xs text-[#86868B] max-w-sm text-center">
                Your data is encrypted and never sold. We prioritize your privacy above all.
            </p>
        </div>
    )
}
