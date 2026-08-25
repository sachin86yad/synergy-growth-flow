import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Link } from "@tanstack/react-router";
import { Mail, MessageSquare, Phone, RotateCcw, Sparkle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { BRAND } from "@/config/site";
import { CONTACT_DETAILS } from "@/config/knowledge";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "nexweb-assistant-conversation";

const GREETING =
  `Hi! I'm the ${BRAND.name} assistant. Ask me about our services, pricing or timelines — ` +
  `and if you're ready to start, I'll share how to reach the team.`;

const SUGGESTIONS = [
  "What services do you offer?",
  "How much does a website cost?",
  "I want to buy a chatbot",
  "How long does a project take?",
];

type StoredMessage = { id: string; role: "user" | "assistant"; text: string };

function toStored(messages: ReturnType<typeof useChat>["messages"]): StoredMessage[] {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      id: message.id,
      role: message.role as "user" | "assistant",
      text: message.parts
        .map((part) => (part.type === "text" ? part.text : ""))
        .join("")
        .trim(),
    }))
    .filter((message) => message.text.length > 0);
}

function readStored(): StoredMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredMessage[];
    return Array.isArray(parsed) ? parsed.slice(-40) : [];
  } catch {
    return [];
  }
}

/** Floating AI assistant, grounded in the NexWeb Solutions knowledge base. */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState<StoredMessage[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setInitialMessages(readStored());
    setHydrated(true);
  }, []);

  const { messages, sendMessage, status, setMessages, stop } = useChat({
    id: "nexweb-assistant",
    messages: initialMessages.map((message) => ({
      id: message.id,
      role: message.role,
      parts: [{ type: "text" as const, text: message.text }],
    })),
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (chatError) =>
      setError(chatError.message || "Something went wrong. Please try again."),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!hydrated) return;
    const stored = toStored(messages);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored.slice(-40)));
    } catch {
      /* storage unavailable — conversation stays in memory */
    }
  }, [messages, hydrated]);

  useEffect(() => {
    if (open && !busy) textareaRef.current?.focus();
  }, [open, busy, messages.length]);

  const send = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || busy) return;
      setError(null);
      setInput("");
      void sendMessage({ text: value });
    },
    [busy, sendMessage],
  );

  const reset = useCallback(() => {
    stop();
    setMessages([]);
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [setMessages, stop]);

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close the AI assistant" : "Chat with the AI assistant"}
        className={cn(
          "fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full",
          "bg-accent text-accent-foreground shadow-[var(--shadow-accent)]",
          "transition-transform duration-200 hover:scale-105 active:scale-95",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          open && "rotate-90",
        )}
      >
        {open ? (
          <X className="size-6" aria-hidden />
        ) : (
          <MessageSquare className="size-6" aria-hidden />
        )}
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/40"
          />
        )}
      </button>

      {/* Panel */}
      {open && (
        <section
          aria-label={`${BRAND.name} AI assistant`}
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden border border-border bg-background",
            "shadow-[var(--shadow-elevated)]",
            "inset-x-3 bottom-22 max-h-[76vh] rounded-2xl",
            "sm:inset-x-auto sm:right-4 sm:bottom-22 sm:h-[600px] sm:max-h-[76vh] sm:w-[400px]",
          )}
        >
          <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Sparkle className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{BRAND.name} Assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                Online — services, pricing &amp; next steps
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              aria-label="Start a new conversation"
              className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-card-hover hover:text-foreground"
            >
              <RotateCcw className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the assistant"
              className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-card-hover hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <Conversation className="flex-1">
            <ConversationContent className="gap-3 px-3 py-4">
              <Message from="assistant">
                <MessageContent>
                  <MessageResponse>{GREETING}</MessageResponse>
                </MessageContent>
              </Message>

              {messages.map((message) => {
                const text = message.parts
                  .map((part) => (part.type === "text" ? part.text : ""))
                  .join("");
                if (!text) return null;
                return (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      <MessageResponse>{text}</MessageResponse>
                    </MessageContent>
                  </Message>
                );
              })}

              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer>Thinking…</Shimmer>
                  </MessageContent>
                </Message>
              )}

              {error && (
                <p
                  role="alert"
                  className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
                >
                  {error}
                </p>
              )}

              {messages.length === 0 && (
                <ul className="mt-1 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => send(suggestion)}
                        className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border bg-surface px-3 py-3">
            <PromptInput
              onSubmit={(_message, event) => {
                event.preventDefault();
                send(input);
              }}
            >
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.currentTarget.value)}
                placeholder="Ask about services, pricing or timelines…"
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit
                  status={status}
                  disabled={!input.trim() && !busy}
                  onStop={stop}
                />
              </PromptInputFooter>
            </PromptInput>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <a
                href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 hover:text-accent"
              >
                <Phone className="size-3.5" aria-hidden />
                {CONTACT_DETAILS.phone}
              </a>
              <a
                href={`mailto:${CONTACT_DETAILS.email}`}
                className="inline-flex items-center gap-1.5 hover:text-accent"
              >
                <Mail className="size-3.5" aria-hidden />
                {CONTACT_DETAILS.email}
              </a>
              <Link to="/contact" className="font-semibold text-accent hover:underline">
                Contact form
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
