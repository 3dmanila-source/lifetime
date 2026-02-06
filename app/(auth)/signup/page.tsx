"use client";

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton"
import { PhoneAuthForm } from "@/components/auth/PhoneAuthForm"

export default function SignupPage() {
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
                        Start your journey. No passwords to remember.
                    </p>
                </div>

                <div className="space-y-6">
                    <GoogleAuthButton text="Sign up with Google" />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400">Or continue with phone</span>
                        </div>
                    </div>

                    <PhoneAuthForm />
                </div>

                <div className="mt-8 text-center text-sm">
                    <span className="text-[#86868B]">Already have an account? </span>
                    <Link href="/login" className="font-medium text-[#0071e3] hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>

            <p className="mt-8 text-xs text-[#86868B] max-w-sm text-center">
                By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    )
}
