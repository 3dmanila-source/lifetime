import { Countdown } from "@/components/dashboard/Countdown";
import { LifeProgress } from "@/components/dashboard/LifeProgress";
import { TimeAllocation } from "@/components/dashboard/TimeAllocation";
import { MotivationalWidget } from "@/components/dashboard/MotivationalWidget";

export default function DashboardPage() {
    // Demonstration Data (Mock)
    // In a real app, this would be fetched from the database/session
    const user = {
        name: "Sridhar",
        dob: new Date("1996-06-15"), // Example DOB
        expectancy: 80,
        currentAge: 29.6 // Approximation for progress bar
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-[#1D1D1F]">Good Afternoon, {user.name}</h1>
                <p className="text-[#86868B]">Here is your life at a glance.</p>
            </header>

            {/* Hero Section: The Real-Time Engine */}
            <section>
                <Countdown dob={user.dob} expectancy={user.expectancy} />
            </section>

            {/* Progress Section */}
            {/* Progress Section */}
            <section className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 flex flex-col gap-8">
                    <LifeProgress age={user.currentAge} expectancy={user.expectancy} />

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
