import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F5F5F7',
}

export const metadata: Metadata = {
  title: "Lifetime | Mortality-Aware Operating System",
  description: "Stop drifting. Start living.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lifetime",
  },
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
