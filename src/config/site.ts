import {
  Bot,
  Globe,
  LineChart,
  Megaphone,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for brand + content.
 * Rename the business by editing BRAND.name only — every surface reads from here.
 */
export const BRAND = {
  name: "XYZ SERVICES",
  tagline: "Web Development • AI • Automation • Growth",
  description:
    "We help businesses build a strong online presence, generate more leads, and automate repetitive business processes using websites, AI, automation, SEO and paid advertising.",
  email: "hello@xyzservices.example",
  phone: "+91 00000 00000",
  location: "India — working with clients remotely",
  year: 2026,
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    description:
      "Fast, responsive and conversion-focused websites designed to turn visitors into customers.",
    icon: Globe,
    details: [
      "Component-driven front end with a real design system",
      "Core Web Vitals budget applied before launch",
      "Structured content, semantic HTML and clean URLs",
      "Landing pages built for a single conversion goal",
    ],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    description:
      "Intelligent website chatbots that answer questions, capture leads and help customers 24/7.",
    icon: Bot,
    details: [
      "Answers grounded in your own services and pricing logic",
      "Qualifies the visitor before handing over to sales",
      "Captures name, contact and intent into your database",
      "Escalation path to a human when confidence is low",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description:
      "AI-powered systems that reduce repetitive work and streamline business operations.",
    icon: LineChart,
    details: [
      "Lead scoring and routing rules",
      "Document, quote and reply drafting",
      "Summaries and reporting on a schedule",
      "Human approval steps where they matter",
    ],
  },
  {
    slug: "n8n-workflow-automation",
    title: "n8n Workflow Automation",
    description:
      "Connect your tools, automate processes and move data between systems without manual work.",
    icon: Workflow,
    details: [
      "Website, CRM, email, sheets and messaging connected",
      "Retries and error alerts so nothing silently fails",
      "Self-hosted or cloud n8n, documented and handed over",
      "Webhook-first design that survives tool changes",
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    description:
      "Technical and content-focused SEO strategies designed to improve visibility and qualified organic traffic.",
    icon: Search,
    details: [
      "Technical audit: crawlability, speed, indexation",
      "Search intent mapped to pages, not keyword stuffing",
      "Structured data and internal linking",
      "Local SEO for service-area businesses",
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    description:
      "Conversion-focused Google Ads campaigns designed to generate measurable business enquiries.",
    icon: Megaphone,
    details: [
      "Search campaigns built around buying intent",
      "Dedicated landing pages, not the homepage",
      "Conversion tracking wired before spend starts",
      "Weekly negative keyword and bid hygiene",
    ],
  },
];

export const TRUST_POINTS = [
  {
    title: "Built for modern businesses",
    body: "Current tooling, clean architecture and code you can hand to any developer.",
  },
  {
    title: "Conversion-focused",
    body: "Every page has one job: move the right visitor to the next step.",
  },
  {
    title: "Automation-first",
    body: "If a task repeats, we design it out of your day instead of documenting it.",
  },
  {
    title: "Mobile-first",
    body: "Designed at 320px before desktop, because that is where your traffic is.",
  },
  {
    title: "Performance-focused",
    body: "Fast loads, small bundles and Core Web Vitals treated as a requirement.",
  },
];

export const GROWTH_CHAIN = [
  { label: "Traffic", note: "Ads, SEO, referrals" },
  { label: "Website", note: "Clear offer, fast pages" },
  { label: "AI Chatbot", note: "Answers and qualifies" },
  { label: "Lead Capture", note: "Stored in your database" },
  { label: "n8n Automation", note: "Routing and enrichment" },
  { label: "CRM", note: "Single source of truth" },
  { label: "Follow-up", note: "Email, WhatsApp, calls" },
  { label: "Customer", note: "Measured, not guessed" },
];

export const AUTOMATION_USE_CASES = [
  "Lead qualification",
  "Automated follow-ups",
  "CRM updates",
  "Email automation",
  "Customer support",
  "Data synchronization",
  "Notifications",
  "Reporting",
  "AI decision making",
];

export const AUTOMATION_FLOW = [
  "New lead",
  "AI analyses lead",
  "n8n workflow",
  "CRM updated",
  "Sales notification",
  "Automated follow-up",
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    body: "We map your offer, customers, current funnel and the manual work eating your week.",
  },
  {
    step: "02",
    title: "Strategize",
    body: "Scope, page structure, automation map and success metrics agreed before any build starts.",
  },
  {
    step: "03",
    title: "Build",
    body: "Design system, pages, integrations, chatbot and workflows built in reviewable stages.",
  },
  {
    step: "04",
    title: "Launch",
    body: "QA across devices, tracking verified, automations tested end to end, then go live.",
  },
  {
    step: "05",
    title: "Optimize",
    body: "Measure, improve conversion, expand automation and scale what already works.",
  },
];

export const PROJECTS = [
  {
    slug: "dental-clinic",
    label: "Concept Project",
    category: "Healthcare",
    title: "Dental Clinic",
    summary: "Website with an AI appointment chatbot that books and reschedules visits.",
    problem:
      "Clinics lose enquiries after hours and front-desk staff spend the day answering the same questions.",
    approach: [
      "Treatment pages built around patient search intent",
      "AI chatbot handles hours, pricing ranges and appointment requests",
      "Requests land in the database and notify the clinic instantly",
    ],
    stack: ["Website", "AI Chatbot", "Lead Capture", "SEO"],
  },
  {
    slug: "real-estate",
    label: "Concept Project",
    category: "Real Estate",
    title: "Real Estate",
    summary: "Lead generation website with AI lead qualification and n8n routing.",
    problem:
      "Agents chase unqualified leads and lose the serious buyers to slower follow-up.",
    approach: [
      "Listing and locality pages designed for paid traffic",
      "AI qualifies budget, timeline and location before handover",
      "n8n routes each lead to the right agent and logs it in the CRM",
    ],
    stack: ["Landing Pages", "AI Qualification", "n8n", "Google Ads"],
  },
  {
    slug: "restaurant",
    label: "Concept Project",
    category: "Hospitality",
    title: "Restaurant",
    summary: "Website with an enquiry system and automated follow-up for bookings and events.",
    problem:
      "Party and catering enquiries arrive across channels and get answered hours later.",
    approach: [
      "Menu, gallery and event enquiry flow in one clear path",
      "Enquiries stored, tagged and acknowledged automatically",
      "Follow-up sequence nudges undecided enquiries",
    ],
    stack: ["Website", "Enquiry System", "Automation", "Local SEO"],
  },
];

export const FAQS = [
  {
    q: "How much does a website cost?",
    a: "It depends on scope. A focused landing page is a very different project from a multi-page site with an AI chatbot and CRM automation. Share what you need and you will get a written estimate with the assumptions spelled out — typical engagements start around ₹25,000 and scale with complexity.",
  },
  {
    q: "How long does a website take?",
    a: "A landing page is usually 1–2 weeks. A full business website is typically 3–5 weeks. Automation and chatbot work runs in parallel once content and integrations are available.",
  },
  {
    q: "Can you integrate AI into my existing website?",
    a: "Yes. A chatbot or automation layer can be added to most existing sites without rebuilding them, as long as we can add a script and reach your data through an API.",
  },
  {
    q: "What can n8n automate?",
    a: "Anything that moves data or triggers an action: new enquiry to CRM, lead scoring, email and WhatsApp follow-up, invoice and document generation, spreadsheet syncing, internal notifications and scheduled reports.",
  },
  {
    q: "Can you connect my CRM?",
    a: "If it has an API or webhook support — HubSpot, Zoho, Pipedrive, Freshsales, Google Sheets and most others — it can be connected. If it has no API, we design an export-based fallback.",
  },
  {
    q: "Do you provide SEO after launch?",
    a: "Yes. Launch covers technical SEO foundations. Ongoing work covers content, internal linking, performance and search visibility on a monthly basis.",
  },
  {
    q: "Do you manage Google Ads?",
    a: "Yes — campaign structure, landing pages, conversion tracking and ongoing optimisation. Ad spend is paid directly to Google and reported transparently.",
  },
  {
    q: "Can you build custom AI chatbots?",
    a: "Yes. Chatbots can be grounded in your own services, documents and pricing rules, and can hand over to a human whenever the conversation needs it.",
  },
  {
    q: "Do you provide maintenance?",
    a: "Yes. Optional care plans cover updates, monitoring, backups, small changes and workflow fixes.",
  },
  {
    q: "How do I get started?",
    a: "Send a project enquiry or book a free consultation. We will discuss goals, scope and constraints, then send a written approach and estimate.",
  },
];

export const SERVICE_OPTIONS = [
  "Website Development",
  "AI Chatbot",
  "AI Automation",
  "n8n Automation",
  "SEO",
  "Google Ads",
  "Multiple Services",
  "Not Sure",
];

export const BUDGET_OPTIONS = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000+",
  "Not Sure",
];