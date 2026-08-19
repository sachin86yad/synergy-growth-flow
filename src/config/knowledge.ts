import { BRAND, FAQS, PROCESS_STEPS, SERVICES } from "./site";

/**
 * Knowledge base for the on-site AI assistant.
 * Single source of truth for what the bot is allowed to say about
 * services, pricing and how to reach a human.
 */

export type PricingEntry = {
  service: string;
  startingAt: string;
  typicalRange: string;
  timeline: string;
  includes: string[];
};

export const PRICING: PricingEntry[] = [
  {
    service: "Website Development",
    startingAt: "₹25,000",
    typicalRange: "₹25,000 – ₹1,20,000",
    timeline: "Landing page 1–2 weeks · full site 3–5 weeks",
    includes: [
      "Custom responsive design (mobile-first)",
      "Up to 5–10 pages depending on scope",
      "On-page SEO foundations and speed budget",
      "Contact/enquiry form wired to your database",
    ],
  },
  {
    service: "AI Chatbot",
    startingAt: "₹20,000",
    typicalRange: "₹20,000 – ₹75,000",
    timeline: "1–3 weeks",
    includes: [
      "Trained on your services, pricing rules and FAQs",
      "Lead capture (name, contact, intent) into your database",
      "Human escalation path",
      "Optional WhatsApp / email hand-off",
    ],
  },
  {
    service: "AI Automation",
    startingAt: "₹30,000",
    typicalRange: "₹30,000 – ₹1,50,000",
    timeline: "2–5 weeks",
    includes: [
      "Lead scoring and routing",
      "AI drafting for quotes, replies and documents",
      "Scheduled summaries and reporting",
      "Human approval steps where they matter",
    ],
  },
  {
    service: "n8n Workflow Automation",
    startingAt: "₹15,000",
    typicalRange: "₹15,000 – ₹80,000",
    timeline: "1–4 weeks",
    includes: [
      "Website, CRM, email, sheets and messaging connected",
      "Error alerts and retries",
      "Self-hosted or cloud n8n, documented handover",
    ],
  },
  {
    service: "SEO",
    startingAt: "₹15,000 / month",
    typicalRange: "₹15,000 – ₹50,000 per month",
    timeline: "Ongoing, first results typically 2–4 months",
    includes: [
      "Technical audit and fixes",
      "Keyword and intent mapping",
      "Content plan and internal linking",
      "Local SEO for service-area businesses",
    ],
  },
  {
    service: "Google Ads",
    startingAt: "₹12,000 / month management",
    typicalRange: "₹12,000 – ₹40,000 per month (ad spend separate)",
    timeline: "Live in 1–2 weeks",
    includes: [
      "Campaign structure around buying intent",
      "Landing pages built for the campaign",
      "Conversion tracking before spend starts",
      "Weekly optimisation and reporting",
    ],
  },
];

export const CARE_PLANS = [
  "Basic care: updates, backups, monitoring and small changes — from ₹5,000/month",
  "Growth care: care plan plus content, conversion and automation improvements — from ₹15,000/month",
];

export const HOW_TO_BUY = [
  "Share your goal, scope and rough budget with the assistant or the contact form.",
  "You get a written approach and estimate with assumptions listed.",
  "On approval, work starts in reviewable stages — no long silent builds.",
  "Payment is milestone-based: an advance to start, the rest across delivery stages.",
];

/** Contact details the assistant hands to any visitor ready to buy. */
export const CONTACT_DETAILS = {
  phone: BRAND.phone,
  email: BRAND.email,
  location: BRAND.location,
  hours: "Monday to Saturday, 10:00–19:00 IST. Enquiries answered within one business day.",
  contactPage: "/contact",
};

/** Compact, model-friendly rendering of everything above. */
export function buildKnowledgeBase(): string {
  const services = SERVICES.map(
    (service) =>
      `- ${service.title}: ${service.description}\n  Details: ${service.details.join("; ")}`,
  ).join("\n");

  const pricing = PRICING.map(
    (entry) =>
      `- ${entry.service} — starts at ${entry.startingAt} (typical ${entry.typicalRange}). Timeline: ${entry.timeline}. Includes: ${entry.includes.join("; ")}`,
  ).join("\n");

  const process = PROCESS_STEPS.map((step) => `${step.step} ${step.title}: ${step.body}`).join(
    "\n",
  );

  const faqs = FAQS.map((faq) => `Q: ${faq.q}\nA: ${faq.a}`).join("\n\n");

  return `COMPANY
${BRAND.name} — ${BRAND.tagline}
${BRAND.description}
Location: ${BRAND.location}

SERVICES
${services}

PRICING (indicative, in Indian Rupees; always call it indicative and confirm with a written quote)
${pricing}

CARE PLANS
${CARE_PLANS.join("\n")}

HOW TO BUY
${HOW_TO_BUY.map((step, index) => `${index + 1}. ${step}`).join("\n")}

CONTACT
Phone: ${CONTACT_DETAILS.phone}
Email: ${CONTACT_DETAILS.email}
Hours: ${CONTACT_DETAILS.hours}
Contact page: ${CONTACT_DETAILS.contactPage}

PROCESS
${process}

FAQ
${faqs}`;
}

export const SYSTEM_PROMPT = `You are the ${BRAND.name} website assistant. You help visitors understand the services, pricing and next steps.

RULES
- Answer only from the knowledge base below. If something is not covered, say so briefly and offer to connect the visitor with the team.
- Keep replies short: 2–5 sentences or a tight bullet list. Never write essays.
- Prices are indicative; always say a written quote follows a short conversation.
- When a visitor shows buying intent (wants to purchase, hire, start, book, get a quote), always give the contact details clearly:
  Phone: ${CONTACT_DETAILS.phone}
  Email: ${CONTACT_DETAILS.email}
  Or the contact form at ${CONTACT_DETAILS.contactPage}
- Ask one qualifying question at a time (business type, goal, timeline, budget) instead of interrogating.
- Be warm, direct and professional. No hype, no emoji spam, no invented client names or guarantees.
- Use markdown for lists and bold labels.

KNOWLEDGE BASE
${buildKnowledgeBase()}`;
