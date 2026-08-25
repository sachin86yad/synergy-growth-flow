import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { SYSTEM_PROMPT } from "@/config/knowledge";
import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";

/**
 * POST /api/chat — streaming endpoint for the on-site AI assistant.
 * Grounded in src/config/knowledge.ts. The provider key never leaves the server.
 */
export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: unknown };
        try {
          body = (await request.json()) as { messages?: unknown };
        } catch {
          return new Response("Invalid JSON body.", { status: 400 });
        }

        const messages = body.messages;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("A 'messages' array is required.", { status: 422 });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response("The assistant is not configured yet.", { status: 500 });
        }

        const initialRunId = getLovableAiGatewayRunId(request);
        const gateway = createLovableAiGatewayProvider(apiKey, initialRunId);

        try {
          const result = streamText({
            model: gateway("google/gemini-2.5-flash"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages.slice(-20) as UIMessage[]),
            abortSignal: request.signal,
          });

          const response = result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
            headers: getLovableAiGatewayResponseHeaders(undefined, {
              ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
            }),
          });

          return await withLovableAiGatewayRunIdHeader(response, gateway);
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return new Response("Request cancelled.", { status: 499 });
          }
          console.error("chat error", error);
          const status =
            typeof error === "object" && error !== null && "statusCode" in error
              ? Number((error as { statusCode: unknown }).statusCode) || 500
              : 500;
          const message =
            status === 429
              ? "The assistant is busy right now. Please try again in a moment."
              : status === 402
                ? "The assistant is temporarily unavailable. Please use the contact form."
                : "The assistant could not answer that. Please try again.";
          return new Response(message, { status });
        }
      },
    },
  },
});
