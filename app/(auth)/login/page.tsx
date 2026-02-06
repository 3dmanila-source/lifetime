"use client";

import Link from "next/link"
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton"
import { PhoneAuthForm } from "@/components/auth/PhoneAuthForm"
import EmailAuthForm from "@/components/auth/EmailAuthForm"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-black/5 text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
                <p className="text-gray-500 mb-8">Continue your journey.</p>

                <div className="space-y-6">
                    <GoogleAuthButton text="Sign in with Google" />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400">Or continue with phone</span>
                        </div>
                    </div>

                    <PhoneAuthForm />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400">Or with email</span>
                        </div>
                    </div>

                    <EmailAuthForm mode="login" />
                </div>

                <div className="mt-8 text-sm text-gray-400">
                    No account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
