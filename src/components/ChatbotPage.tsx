"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { generateBotResponse } from "@/lib/chatbot";
import { COMICS } from "@/data/comics";
import { SparkleIcon } from "./SparkleIcon";
import { Send, Copy, ThumbsUp, ThumbsDown, Share2, RefreshCw, Plus, Mic } from "lucide-react";

function formatBotMessage(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-bold text-foreground">{line.slice(2, -2)}</p>;
    }
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return line.trim() === "" ? <br key={i} /> : <p key={i}>{rendered}</p>;
  });
}

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const streamRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const userMsg: Message = { id: Date.now() + "u", role: "user", content: text };
    const botId = Date.now() + "b";
    const fullResponse = generateBotResponse(text, COMICS);

    setMessages((prev) => [...prev, userMsg, { id: botId, role: "bot", content: "" }]);
    setStreaming(true);
    setStreamingId(botId);

    let index = 0;
    const tick = () => {
      if (index < fullResponse.length) {
        const chunk = fullResponse.slice(0, index + 1);
        setMessages((prev) => prev.map((m) => m.id === botId ? { ...m, content: chunk } : m));
        index++;
        const delay = fullResponse[index - 1] === " " ? 20 : fullResponse[index - 1] === "\n" ? 60 : Math.random() * 18 + 12;
        streamRef.current = setTimeout(tick, delay);
      } else {
        setStreaming(false);
        setStreamingId(null);
      }
    };
    streamRef.current = setTimeout(tick, 300);
  }, [input, streaming]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-4" style={{ minHeight: "calc(100vh - 10rem)" }}>
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="text-primary">
            <SparkleIcon size={48} />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">Welcome to ComBot!</h2>
          <div className="w-full max-w-2xl">
            <div className="relative border-2 border-primary rounded-2xl overflow-hidden bg-card shadow-lg shadow-primary/10">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question"
                rows={3}
                className="w-full px-5 pt-4 pb-12 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none text-base"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || streaming}
                className="absolute right-4 bottom-4 w-9 h-9 rounded-full bg-foreground disabled:bg-muted-foreground text-background flex items-center justify-center hover:scale-110 active:scale-95 transition-transform disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "user" ? (
                  <div className="max-w-[75%] bg-primary text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed font-medium shadow-md shadow-primary/20">
                    {msg.content}
                  </div>
                ) : (
                  <div className="max-w-[85%]">
                    <div className="text-sm leading-relaxed text-foreground space-y-1">
                      {msg.id === streamingId && streaming ? (
                        <>
                          {formatBotMessage(msg.content)}
                          <span className="inline-block w-2 h-4 bg-primary animate-pulse rounded-sm ml-0.5 align-middle" />
                        </>
                      ) : (
                        formatBotMessage(msg.content)
                      )}
                    </div>
                    {msg.role === "bot" && !streaming && (
                      <div className="flex items-center gap-3 mt-2 text-muted-foreground">
                        {[Copy, ThumbsUp, ThumbsDown, Share2, RefreshCw].map((Icon, i) => (
                          <button key={i} className="hover:text-primary transition-colors cursor-pointer" onClick={() => {}}>
                            <Icon size={14} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="sticky bottom-0 pt-3 pb-2 bg-background">
            <div className="border border-border rounded-2xl bg-card flex items-end gap-2 px-3 py-2 shadow-lg shadow-primary/5 focus-within:border-primary transition-colors">
              <button className="p-1.5 rounded-full border border-border hover:border-primary hover:text-primary text-muted-foreground transition-colors flex-shrink-0 cursor-pointer">
                <Plus size={16} />
              </button>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanyakan apa saja"
                rows={1}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none text-sm py-1 max-h-32"
                style={{ minHeight: "28px" }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 128) + "px";
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || streaming}
                className="p-1.5 text-muted-foreground hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0 cursor-pointer"
              >
                <Mic size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}