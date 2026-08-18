import { Bot, Send, User } from "lucide-react";
import { useEffect, useState } from "react";

import { BRAND } from "@/config/site";
import { Cta } from "./Cta";

const script = [
  { from: "ai", text: `Hi! I'm the ${BRAND.name} assistant. How can I help today?` },
  { from: "visitor", text: "What services do you provide?" },
  {
    from: "ai",
    text: "We help businesses with websites, AI automation, n8n workflows, SEO and Google Ads.",
  },
  { from: "visitor", text: "I need a website for my business." },
  {
    from: "ai",
    text: "Great. I can help you get started. What type of business do you run?",
  },
] as const;

/** Front-end demonstration of the chatbot experience — replays a scripted conversation. */
export function ChatbotDemo() {
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (shown >= script.length) return;
    const timer = window.setTimeout(() => setShown((value) => value + 1), 1400);
    return () => window.clearTimeout(timer);
  }, [shown]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-elevated)]">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
        <span className="grid size-9 place-items-center rounded-md bg-accent text-accent-foreground">
          <Bot className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{BRAND.name} Assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span aria-hidden className="flow-dot size-1.5 rounded-full bg-success" />
            Online — replies instantly
          </p>
        </div>
      </div>

      <div
        className="space-y-3 px-4 py-5"
        aria-live="polite"
        aria-label="Example chatbot conversation"
      >
        {script.slice(0, shown).map((message, index) => (
          <div
            key={index}
            className={
              message.from === "ai"
                ? "flex max-w-[88%] items-start gap-2.5"
                : "ml-auto flex max-w-[88%] flex-row-reverse items-start gap-2.5"
            }
          >
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-border bg-card text-muted-foreground">
              {message.from === "ai" ? (
                <Bot className="size-3.5" aria-hidden />
              ) : (
                <User className="size-3.5" aria-hidden />
              )}
            </span>
            <p
              className={
                message.from === "ai"
                  ? "rounded-lg rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-sm"
                  : "rounded-lg rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm text-accent-foreground"
              }
            >
              <span className="sr-only">
                {message.from === "ai" ? "Assistant: " : "Visitor: "}
              </span>
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <p className="flex-1 truncate rounded-md border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
          Ask about pricing, timelines or automation…
        </p>
        <span
          aria-hidden
          className="grid size-10 place-items-center rounded-md bg-accent text-accent-foreground"
        >
          <Send className="size-4" />
        </span>
      </div>

      <div className="border-t border-border px-4 py-4">
        <Cta to="/contact" className="w-full">
          Build My AI-Powered Website
        </Cta>
        <p className="mt-2.5 text-center text-xs text-muted-foreground">
          Demo conversation — your production chatbot is trained on your own services.
        </p>
      </div>
    </div>
  );
}