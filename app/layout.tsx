import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lifetime | Mortality-Aware Operating System",
  description: "Stop drifting. Start living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "bg-[#F5F5F7] text-[#1D1D1F] antialiased")}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
