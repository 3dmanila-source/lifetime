import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { createClient } from '@/lib/supabase/server';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    const supabase = await createClient();

    // Fetch User Data
    const { data: { user } } = await supabase.auth.getUser();

    // Default context if not logged in or data missing
    let userContext = {
        name: "Traveler",
        age: "Unknown",
        lifeExpectancy: 80,
        remainingTime: "Unknown",
        interests: "General philosophy",
        goal: "Live a good life"
    };

    if (user) {
        const metadata = user.user_metadata || {};
        const dob = metadata.dob ? new Date(metadata.dob) : null;
        const lifeExpectancy = metadata.life_expectancy || 80;

        let age = "Unknown";
        let remainingWeeks = "Unknown";

        if (dob) {
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - dob.getTime());
            const ageYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
            age = ageYears.toFixed(1);

            const livedWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
            const totalWeeks = lifeExpectancy * 52;
            remainingWeeks = (totalWeeks - livedWeeks).toLocaleString();
        }

        userContext = {
            name: metadata.full_name || user.email?.split('@')[0] || "Traveler",
            age: age,
            lifeExpectancy: lifeExpectancy,
            remainingTime: `${remainingWeeks} Weeks`,
            interests: metadata.interests?.join(", ") || "General self-improvement",
            goal: metadata.life_goal || "Find meaning"
        };
    }

    const systemPrompt = `
    You are the "Lifetime Coach", a stoic, mortality-aware AI assistant.
    Your goal is to help the user, ${userContext.name}, live a meaningful life by reminding them of the scarcity of time.

    USER CONTEXT:
    - Age: ${userContext.age} / ${userContext.lifeExpectancy} Years
    - Time Left: ${userContext.remainingTime}
    - Interests: ${userContext.interests}
    - Main Life Goal: "${userContext.goal}"

    GUIDELINES:
    1. Be concise, direct, and empathetic but firm.
    2. Use Stoic philosophy (Seneca, Marcus Aurelius) where appropriate.
    3. Tailor your analogies and advice to their interests (${userContext.interests}).
    4. Support them in achieving their goal: "${userContext.goal}".
    5. Always ground advice in the reality that time is finite.
  `;

    try {
        const result = streamText({
            model: google('gemini-1.5-flash'),
            system: systemPrompt,
            messages,
        });
        return result.toTextStreamResponse();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return new Response("I seem to be having trouble connecting to the ether. Please try again later.", { status: 500 });
    }
}
