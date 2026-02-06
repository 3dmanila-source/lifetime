import { Clock, Heart, Brain, PenTool } from "lucide-react";

export const Features = () => {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F]">More than a countdown.</h2>
                    <p className="text-xl text-[#86868B] mt-4">A complete operating system for a meaningful life.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Clock className="h-6 w-6 text-white" />}
                        color="bg-black"
                        title="Life Bank"
                        description="Visualize your remaining time in real-time. Turn abstract mortality into tangible urgency."
                    />
                    <FeatureCard
                        icon={<Heart className="h-6 w-6 text-white" />}
                        color="bg-red-500"
                        title="Relationship Tracker"
                        description="Track commitments to loved ones. Ensure your time spent matches your priorities."
                    />
                    <FeatureCard
                        icon={<Brain className="h-6 w-6 text-white" />}
                        color="bg-blue-500"
                        title="AI Life Coach"
                        description="Get personalized guidance on how to optimize your day based on your goals."
                    />
                    <FeatureCard
                        icon={<PenTool className="h-6 w-6 text-white" />}
                        color="bg-purple-500"
                        title="Life Journal"
                        description="Reflect on your days. Capture gratitude and moments that truly mattered."
                    />
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, color, title, description }: any) => (
    <div className="p-8 rounded-3xl bg-[#F5F5F7] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
        <div className={`h-12 w-12 rounded-2xl ${color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{title}</h3>
        <p className="text-[#86868B] leading-relaxed">
            {description}
        </p>
    </div>
);
