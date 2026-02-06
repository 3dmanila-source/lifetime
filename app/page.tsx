import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Hero />
      <Features />

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100 text-center">
        <p className="text-sm text-[#86868B]">
          © {new Date().getFullYear()} Lifetime. Make every second count.
        </p>
      </footer>
    </main>
  );
}
