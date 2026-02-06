"use client"

import * as React from "react"
import { Check } from "lucide-react" // Importing icon instead of radix-ui primitive to avoid dependency issues for now
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <div className="flex items-center">
        <input
            type="checkbox"
            className={cn(
                "peer h-4 w-4 shrink-0 rounded-sm border border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 accent-black",
                className
            )}
            ref={ref}
            {...props}
        />
    </div>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
