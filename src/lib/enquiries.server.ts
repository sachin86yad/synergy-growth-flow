import { z } from "zod";

import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/config/site";

/** Strips control characters and collapses whitespace so stored data stays clean. */
const sanitize = (value: string) =>
  value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const text = (min: number, max: number) =>
  z
    .string()
    .transform(sanitize)
    .refine((value) => value.length >= min && value.length <= max, {
      message: `Must be between ${min} and ${max} characters`,
    });

export const enquirySchema = z.object({
  name: text(2, 120),
  businessName: z.string().transform(sanitize).pipe(z.string().max(160)).optional(),
  email: z
    .string()
    .transform((value) => sanitize(value).toLowerCase())
    .pipe(z.string().email("Enter a valid email address").max(200)),
  phone: z
    .string()
    .transform(sanitize)
    .pipe(z.string().max(30))
    .optional()
    .refine((value) => !value || /^[+()\d\s-]{6,30}$/.test(value), {
      message: "Enter a valid phone number",
    }),
  service: z.enum(SERVICE_OPTIONS as [string, ...string[]]),
  budget: z.enum(BUDGET_OPTIONS as [string, ...string[]]),
  projectDetails: text(10, 4000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Optional n8n hand-off. Never blocks or fails the enquiry. */
async function notifyN8n(payload: Record<string, unknown>) {
  const webhookUrl = process.env["N8N_WEBHOOK_URL"];
  if (!webhookUrl) return;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
  } catch (error) {
    console.error("n8n webhook failed (enquiry still saved)", error);
  }
}

/** Persists an enquiry, then fires the optional automation hook. */
export async function createEnquiry(input: EnquiryInput) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("contact_submissions")
    .insert({
      name: input.name,
      business_name: input.businessName || null,
      email: input.email,
      phone: input.phone || null,
      service: input.service,
      budget: input.budget,
      project_details: input.projectDetails,
    })
    .select("id, created_at")
    .single();

  if (error) {
    // Log internally, never leak database detail to the browser.
    console.error("createEnquiry failed", error);
    throw new Error("We could not save your enquiry. Please try again in a moment.");
  }

  await notifyN8n({
    event: "contact_submission.created",
    id: data.id,
    created_at: data.created_at,
    ...input,
  });

  return { id: data.id };
}

/** Placeholder admin guard for enquiry reads. Replace with real auth before production. */
export function isAuthorizedAdminRequest(request: Request) {
  const expected = process.env["ADMIN_API_TOKEN"];
  if (!expected) return false;
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return Boolean(provided) && provided === expected;
}

export async function listEnquiries(limit = 50) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("contact_submissions")
    .select("id, name, business_name, email, phone, service, budget, status, created_at")
    .order("created_at", { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 200));

  if (error) {
    console.error("listEnquiries failed", error);
    throw new Error("Unable to load enquiries.");
  }

  return data;
}