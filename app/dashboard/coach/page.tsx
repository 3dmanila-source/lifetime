"use client";

import { useChat } from '@ai-sdk/react';
import { Send, Sparkles, User, Bot, AlertCircle, TrendingUp, Heart, Mic, MicOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useEffect, useRef, useState } from 'react';

export default function CoachPage() {
    const { messages, isLoading, append, error } = useChat();
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { isListening, transcript, startRecording, stopRecording, resetTranscript, error: voiceError } = useVoiceInput();

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Voice Input Integration (v1.6)
    useEffect(() => {
        if (transcript) {
            setInputValue((prev) => {
                const needsSpace = prev.length > 0 && !prev.endsWith(' ');
                return prev + (needsSpace ? ' ' : '') + transcript;
            });
            resetTranscript();
        }
    }, [transcript, resetTranscript]);

    // Proactive Greeting (v1.5)
    useEffect(() => {
        if (messages.length === 0 && !isLoading && !error) {
            // "Ghost" trigger - unseen by user, but prompts AI to start
            append({
                role: 'user',
                content: "I'm ready. Please review my life data and ask me a meaningful question to start our session."
            });
        }
    }, [messages.length, isLoading, error, append]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() && !isListening) return;

        if (isListening) stopRecording();

        const text = inputValue;
        setInputValue(''); // Clear input immediately

        await append({
            role: 'user',
            content: text,
        });
    };

    const handleMicClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isListening) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleSuggestionClick = (text: string) => {
        append({
            role: 'user',
            content: text,
        });
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col min-h-[500px]">
            <header className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-[#1D1D1F] dark:text-white">AI Life Coach</h1>
                    <p className="text-xs text-gray-500">Powered by your Life Data</p>
                </div>
            </header>

            {/* Chat Area - Simplified scrolling */}
            <div className="flex-1 space-y-6 pb-4">
                {error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                        <p className="font-semibold">Error connecting to coach:</p>
                        <p>{error.message}</p>
                        <p className="mt-2 text-xs">If on Vercel, check environment variables.</p>
                    </div>
                )}
                {voiceError && (
                    <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs mb-2">
                        Mic Error: {voiceError} (Try Chrome/Safari)
                    </div>
                )}


                {/* Loading State or Empty State */}
                {messages.length === 0 && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400 space-y-4">
                        <Bot className="h-12 w-12 opacity-20 animate-pulse" />
                        <p>Connecting to your Life Bank...</p>
                    </div>
                )}

                {messages.map((m: any) => (
                    <div key={m.id} className={cn("flex gap-4", m.role === 'user' ? "flex-row-reverse" : "")}>
                        <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                            m.role === 'user' ? "bg-gray-200" : "bg-black"
                        )}>
                            {m.role === 'user' ? <User className="h-4 w-4 text-gray-600" /> : <Sparkles className="h-4 w-4 text-white" />}
                        </div>
                        <div className={cn(
                            "rounded-2xl px-5 py-3 max-w-[80%] text-sm leading-relaxed",
                            m.role === 'user'
                                ? "bg-[#0071e3] text-white"
                                : "bg-white border border-gray-100 shadow-sm text-[#1D1D1F]"
                        )}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center shrink-0">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed to bottom with high Z-Index */}
            <form onSubmit={handleSend} className="stick bottom-4 left-0 right-0 p-4 bg-[#F5F5F7]/80 backdrop-blur-sm z-[100]">
                <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <input
                            className={cn(
                                "w-full flex h-14 rounded-full border-2 focus:border-blue-500 bg-white px-6 pr-12 text-sm shadow-xl outline-none transition-all placeholder:text-gray-400",
                                isListening ? "border-red-400 ring-2 ring-red-100" : "border-blue-500/20"
                            )}
                            value={inputValue}
                            placeholder={isListening ? "Listening..." : "Reply to your coach..."}
                            onChange={(e) => setInputValue(e.target.value)}
                            style={{ fontSize: '16px' }} // Prevent iOS zoom
                        />
                        <Button
                            type="button"
                            onClick={handleMicClick}
                            className={cn(
                                "absolute right-2 top-2 h-10 w-10 rounded-full transition-all active:scale-95",
                                isListening ? "bg-red-500 hover:bg-red-600 animate-pulse text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                            )}
                        >
                            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        size="icon"
                        className="h-14 w-14 rounded-full bg-[#1D1D1F] hover:bg-black transition-transform active:scale-95 shrink-0 shadow-lg"
                        disabled={isLoading || (!inputValue.trim() && !isListening)}
                    >
                        <Send className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </form>
            <div className="text-center pb-24">
                <p className="text-[10px] text-gray-400">v1.6 - Voice-to-Text Enabled</p>
            </div>
        </div>
    );
}
