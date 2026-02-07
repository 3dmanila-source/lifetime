"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, Sparkles, Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MoodSelector } from "@/components/journal/MoodSelector";
import { useRouter } from "next/navigation";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { saveJournalEntry } from "../actions";
import { cn } from "@/lib/utils";

export default function NewEntryPage() {
    const router = useRouter();
    const [mood, setMood] = useState("Good");
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [aiFeedback, setAiFeedback] = useState<string | null>(null);

    // Voice Input Hook
    const { isListening, transcript, startRecording, stopRecording, resetTranscript, error: voiceError } = useVoiceInput();

    // Sync transcript to content area
    useEffect(() => {
        if (transcript) {
            setContent((prev) => {
                const needsSpace = prev.length > 0 && !prev.endsWith(' ');
                return prev + (needsSpace ? ' ' : '') + transcript;
            });
            resetTranscript();
        }
    }, [transcript, resetTranscript]);

    const handleSave = async () => {
        if (!content.trim()) return;

        setIsSaving(true);
        try {
            const result = await saveJournalEntry(content, mood);
            setAiFeedback(result.analysis);
            // Don't redirect immediately so they can see the feedback
        } catch (error) {
            console.error(error);
            alert("Failed to save entry. Please try again.");
            setIsSaving(false);
        }
    };

    const handleMicClick = () => {
        if (isListening) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <header className="flex items-center justify-between sticky top-0 bg-[#F5F5F7]/90 py-4 z-10 backdrop-blur-sm">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/journal">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <span className="text-sm font-semibold text-gray-500">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
                <Button
                    onClick={handleSave}
                    disabled={isSaving || !content.trim()}
                    className="rounded-full bg-[#1D1D1F] hover:bg-black text-white disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save
                </Button>
            </header>

            {/* AI Analysis Feedback (appears after save) */}
            {aiFeedback && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-indigo-600" />
                        <h3 className="font-semibold text-indigo-900">AI Coach Insight</h3>
                    </div>
                    <p className="text-indigo-800 leading-relaxed text-lg">
                        "{aiFeedback}"
                    </p>
                    <div className="mt-4 flex justify-end">
                        <Button variant="outline" onClick={() => router.push('/dashboard/journal')} className="rounded-full border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50">
                            Done
                        </Button>
                    </div>
                </div>
            )}

            {!aiFeedback && (
                <>
                    {/* Mood Section */}
                    <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-4">
                        <Label className="uppercase text-xs tracking-wide text-gray-400">How are you feeling?</Label>
                        <MoodSelector selectedMood={mood} onSelect={setMood} />
                    </section>

                    {/* Voice & Writing Section */}
                    <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[400px] relative">
                        <div className="flex justify-between items-center mb-4">
                            <Label className="uppercase text-xs tracking-wide text-gray-400">Journal Entry</Label>

                            {/* Voice Control */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleMicClick}
                                className={cn(
                                    "rounded-full transition-all gap-2 border-0",
                                    isListening ? "bg-red-50 text-red-600 ring-2 ring-red-100" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {isListening ? (
                                    <>
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                        Listening... <MicOff className="h-3 w-3 ml-1" />
                                    </>
                                ) : (
                                    <>
                                        <Mic className="h-3 w-3" />
                                        Tap to Speak
                                    </>
                                )}
                            </Button>
                        </div>

                        {voiceError && (
                            <p className="text-xs text-red-500 mb-2">Microphone Error: {voiceError}</p>
                        )}

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-full min-h-[300px] bg-transparent border-0 focus:ring-0 p-0 text-xl leading-relaxed text-[#1D1D1F] placeholder:text-gray-300 resize-none font-medium"
                            placeholder="Start speaking or writing..."
                        />
                    </section>
                </>
            )}
        </div>
    );
}
