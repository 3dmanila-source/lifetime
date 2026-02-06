import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // MOCK CONTEXT INJECTION
    const userContext = {
        name: "Sridhar",
        age: 29.6,
        lifeExpectancy: 80,
        remainingTime: "50.4 Years",
        relationships: [
            { name: "Priya", type: "Partner", health: "92% (Excellent)" },
            { name: "Rahul", type: "Friend", health: "30% (Needs Attention)" }
        ],
        recentJournalMood: "Good"
    };

    const systemPrompt = `
    You are the "Lifetime Coach", a stoic, mortality-aware AI assistant.
    Your goal is to help the user, ${userContext.name}, live a meaningful life by reminding them of the scarcity of time.

    USER CONTEXT:
    - Age: ${userContext.age} / ${userContext.lifeExpectancy} Years
    - Time Left: ${userContext.remainingTime}
    - Relationship Status: Partner (Priya) is doing well, but Friend (Rahul) needs attention.
    - Recent Mood: ${userContext.recentJournalMood}

    GUIDELINES:
    1. Be concise, direct, and empathetic but firm.
    2. Use Stoic philosophy (Seneca, Marcus Aurelius) where appropriate.
    3. If they ask about relationships, refer to their specific data.
    4. Always ground advice in the reality that time is finite.
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
        // MOCK FALLBACK (If API Key is missing or quota exceeded)
        const mockResponse = `(System: Gemini API Key missing or invalid)\n\nSridhar, I cannot reach the cloud right now, but the truth remains: You have 50.4 years left. Focus on what you can control. \n\nPlease add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file to unlock my full potential.`;

        return new Response(mockResponse, { status: 200 });
    }
}
