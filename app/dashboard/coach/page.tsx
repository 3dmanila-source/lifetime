"use client";

import { useChat } from '@ai-sdk/react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

export default function CoachPage() {
    const { messages, input = '', handleInputChange, handleSubmit, isLoading } = useChat() as any;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
            <header className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-[#1D1D1F]">AI Life Coach</h1>
                    <p className="text-xs text-gray-500">Powered by your Life Data</p>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-4 pb-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4">
                        <Bot className="h-12 w-12 opacity-20" />
                        <p>I know about your 50.4 years left and your relationships.<br />What's on your mind, Sridhar?</p>
                        <div className="grid grid-cols-2 gap-2 max-w-md w-full">
                            <Button variant="outline" className="text-xs h-auto py-3 whitespace-normal" onClick={() => {
                                const event = { preventDefault: () => { }, target: { value: "How am I doing with my relationships?" } } as any;
                                // Basic simulation of click-to-send would require managing input state manually or using append from useChat.
                                // For MVP, just visual suggestion.
                            }}>
                                "How is my relationship with Rahul?"
                            </Button>
                            <Button variant="outline" className="text-xs h-auto py-3 whitespace-normal">
                                "I feel stuck in my career."
                            </Button>
                        </div>
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

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="relative mt-4">
                <Input
                    className="pr-12 py-6 rounded-full border-gray-200 focus:border-black focus:ring-black shadow-sm"
                    value={input}
                    placeholder="Ask your coach anything..."
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1 h-10 w-10 rounded-full bg-[#1D1D1F] hover:bg-black transition-transform active:scale-95"
                    disabled={isLoading || !input.trim()}
                >
                    <Send className="h-4 w-4 text-white" />
                </Button>
            </form>
        </div>
    );
}
