"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function saveJournalEntry(content: string, mood?: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    // 1. AI Analysis
    let aiAnalysis = "";
    try {
        const { text } = await generateText({
            model: google("gemini-1.5-pro-latest"),
            prompt: `
            You are an empathetic, world-class life coach. 
            Analyze this journal entry from your client. 
            The client is feeling: ${mood || "Neutral"}.
            Journal Entry: "${content}"
            
            Provide a brief, supportive, and actionable response (max 3 sentences). 
            Focus on validation and one key insight or question for reflection.
            `,
        });
        aiAnalysis = text;
    } catch (error) {
        console.error("AI Analysis Failed:", error);
        aiAnalysis = "Unable to generate analysis at this time, but your thoughts are safe.";
    }

    // 2. Save to DB
    const { error } = await supabase
        .from("journal_entries")
        .insert({
            user_id: user.id,
            content,
            mood,
            ai_analysis: aiAnalysis,
        });

    if (error) {
        throw new Error("Failed to save entry: " + error.message);
    }

    revalidatePath("/dashboard/journal");
    return { success: true, analysis: aiAnalysis };
}
