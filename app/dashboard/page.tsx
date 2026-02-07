import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Countdown } from "@/components/dashboard/Countdown";
import { LifeProgress } from "@/components/dashboard/LifeProgress";
import { TimeAllocation } from "@/components/dashboard/TimeAllocation";
import { MotivationalWidget } from "@/components/dashboard/MotivationalWidget";
import { differenceInWeeks } from "date-fns";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Default values if setup isn't complete (though middleware/setup flow should catch this)
    const name = user.user_metadata?.full_name || "Traveler";
    const dobString = user.user_metadata?.dob || "2000-01-01";
    const expectancy = Number(user.user_metadata?.lifeExpectancy) || 80;

    const dob = new Date(dobString);
    const now = new Date();

    // Calculate current age with decimal for progress precision
    const ageInMilliseconds = now.getTime() - dob.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-[#1D1D1F]">Good Afternoon, {name}</h1>
                <p className="text-[#86868B]">Here is the balance of your journey.</p>
            </header>

            {/* Hero Section: The Real-Time Engine */}
            <section>
                <Countdown dob={dob} expectancy={expectancy} />
            </section>

            {/* Progress Section */}
            <section className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 flex flex-col gap-8">
                    <LifeProgress age={ageInYears} expectancy={expectancy} />

                    {/* Motivational Widget */}
                    <MotivationalWidget />
                </div>

                <div className="md:col-span-1 h-full">
                    <TimeAllocation />
                </div>
            </section>
        </div>
    );
}
