import { createFileRoute } from "@tanstack/react-router";

import {
  createEnquiry,
  enquirySchema,
  isAuthorizedAdminRequest,
  listEnquiries,
} from "@/lib/enquiries.server";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      // POST /api/contact — create an enquiry.
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ success: false, error: "Invalid JSON body." }, 400);
        }

        const parsed = enquirySchema.safeParse(payload);
        if (!parsed.success) {
          return json(
            { success: false, error: "Validation failed.", fields: parsed.error.flatten().fieldErrors },
            422,
          );
        }

        try {
          const result = await createEnquiry(parsed.data);
          return json({ success: true, id: result.id }, 201);
        } catch {
          return json({ success: false, error: "Could not save the enquiry." }, 500);
        }
      },

      // GET /api/contact — admin only. Placeholder bearer-token guard; see README.
      GET: async ({ request }) => {
        if (!isAuthorizedAdminRequest(request)) {
          return json({ success: false, error: "Unauthorized." }, 401);
        }

        try {
          return json({ success: true, data: await listEnquiries() });
        } catch {
          return json({ success: false, error: "Could not load enquiries." }, 500);
        }
      },
    },
  },
});