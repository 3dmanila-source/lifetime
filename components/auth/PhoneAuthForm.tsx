"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { signInWithPhone, verifyOtp } from "@/app/auth/actions"

export function PhoneAuthForm() {
    const [step, setStep] = useState<"phone" | "otp">("phone")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const formData = new FormData()
            formData.append("phone", phone)
            const res = await signInWithPhone(formData)

            if (res && res.error) {
                setError(res.error)
            } else {
                setStep("otp")
            }
        } catch (err) {
            setError("Failed to send OTP. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const res = await verifyOtp(phone, otp)
            // verifyOtp handles redirect on success
            if (res && res.error) {
                setError(res.error)
            }
        } catch (err) {
            setError("Failed to verify code. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            {step === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+1234567890"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="bg-gray-50/50"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-[#1D1D1F] hover:bg-black text-white"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Send Code
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="otp">Enter Verification Code</Label>
                        <Input
                            id="otp"
                            type="text"
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="bg-gray-50/50 text-center text-lg tracking-widest"
                            maxLength={6}
                        />
                        <p className="text-xs text-gray-400">Sent to {phone} <button type="button" onClick={() => setStep("phone")} className="text-blue-500 hover:underline">Change</button></p>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-[#0071e3] hover:bg-[#0077ED] text-white"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Verify & Sign In
                    </Button>
                </form>
            )}
        </div>
    )
}
