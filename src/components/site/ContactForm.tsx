import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/config/site";
import { submitEnquiry } from "@/lib/contact.functions";

const field =
  "min-h-11 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-accent md:text-sm";
const labelClass = "block text-sm font-medium";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const send = useServerFn(submitEnquiry);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  // Until React has hydrated, a click would trigger a native form navigation.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("loading");
    setMessage("");

    try {
      await send({
        data: {
          name: String(values.get("name") ?? ""),
          businessName: String(values.get("businessName") ?? ""),
          email: String(values.get("email") ?? ""),
          phone: String(values.get("phone") ?? ""),
          service: String(values.get("service") ?? ""),
          budget: String(values.get("budget") ?? ""),
          projectDetails: String(values.get("projectDetails") ?? ""),
        },
      });
      form.reset();
      setStatus("success");
      setMessage("Enquiry received. We'll reply within one business day.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message.length < 160
          ? error.message
          : "Something went wrong. Please check your details and try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="rounded-xl border border-border bg-surface p-5 sm:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name <span aria-hidden className="text-accent">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={`${field} mt-2`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="businessName">
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            autoComplete="organization"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span aria-hidden className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="service">
            Service Needed <span aria-hidden className="text-accent">*</span>
          </label>
          <select id="service" name="service" required defaultValue="" className={`${field} mt-2`}>
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="budget">
            Budget Range <span aria-hidden className="text-accent">*</span>
          </label>
          <select id="budget" name="budget" required defaultValue="" className={`${field} mt-2`}>
            <option value="" disabled>
              Select a range
            </option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="projectDetails">
            Project Details <span aria-hidden className="text-accent">*</span>
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            required
            minLength={10}
            rows={5}
            placeholder="What are you trying to build, automate or grow?"
            className={`${field} mt-2 resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading" || !ready}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {status === "loading" ? "Sending…" : "Send Project Enquiry"}
      </button>

      <p aria-live="polite" role="status" className="mt-4 text-sm">
        {status === "success" && (
          <span className="flex items-center gap-2 text-success">
            <CheckCircle2 className="size-4 shrink-0" aria-hidden />
            {message}
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-2 text-destructive">
            <TriangleAlert className="size-4 shrink-0" aria-hidden />
            {message}
          </span>
        )}
        {status === "idle" && (
          <span className="text-muted-foreground">
            Your details are stored securely and only used to reply to this enquiry.
          </span>
        )}
      </p>
    </form>
  );
}