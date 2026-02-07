import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

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
