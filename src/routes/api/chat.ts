import { createFileRoute } from "@tanstack/react-router";

/**
 * POST /api/chat — chatbot foundation.
 * The on-site chatbot is currently a front-end demo. This endpoint is where an
 * LLM provider, knowledge base, n8n workflow or CRM lookup gets wired in.
 * All provider keys stay server-side (environment variables) — never in the client.
 */
export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { message?: unknown };
        try {
          body = (await request.json()) as { message?: unknown };
        } catch {
          return Response.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
        }

        const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
        if (!message) {
          return Response.json(
            { success: false, error: "A 'message' string is required." },
            { status: 422 },
          );
        }

        return Response.json({
          success: true,
          reply:
            "Thanks for your message. The live assistant is not connected yet — please send a project enquiry and we will reply personally.",
          provider: "placeholder",
        });
      },
    },
  },
});