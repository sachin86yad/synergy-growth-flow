# XYZ SERVICES — Digital Growth, Web Development & AI Automation Agency

Production-quality marketing site with a working enquiry pipeline: website → form →
validated API → PostgreSQL → optional n8n automation.

> The business name lives in one place: `src/config/site.ts` → `BRAND.name`.
> Change it there and every page, title, footer and chatbot label updates.

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 19, Tailwind CSS v4, Lucide React |
| Routing / SSR | TanStack Start + TanStack Router (file-based routes) |
| Server logic | TanStack server functions (`createServerFn`) and server routes (`src/routes/api/*`) |
| Validation | Zod schemas shared by the server function and the REST endpoint |
| Database | PostgreSQL (managed), with row level security |
| Build | Vite 7 |

### A note on the original Python/FastAPI request

This project runs on the hosting platform's React + TanStack Start runtime, which
executes JavaScript/TypeScript on the server — a separate Python/FastAPI process
cannot run alongside it. The architecture is preserved one-to-one:

```
React frontend  ->  REST API (src/routes/api/*)  ->  data layer (src/lib/enquiries.server.ts)  ->  PostgreSQL
                                                  ->  optional n8n webhook -> AI / CRM / email / WhatsApp
```

`src/lib/enquiries.server.ts` plays the role of models + schemas + service layer
(SQLAlchemy + Pydantic), and `database/schema.sql` is the portable DDL. If you later
move the backend to FastAPI, point the frontend at the new base URL and reuse
`database/schema.sql` unchanged.

## Project structure

```
src/
  config/site.ts              Brand, services, projects, FAQs — all editable copy
  components/site/            Navbar, Footer, Hero visual, FlowChain, ChatbotDemo, ContactForm, FAQ
  components/ui/              Design-system primitives
  lib/enquiries.server.ts     Validation, sanitisation, persistence, n8n hand-off, admin guard
  lib/contact.functions.ts    Server function called by the contact form
  routes/                     index, services, process, work, about, contact, privacy, terms
  routes/api/contact.ts       POST /api/contact (public), GET /api/contact (protected)
  routes/api/chat.ts          POST /api/chat (chatbot foundation)
  styles.css                  Design tokens: colors, spacing, type scale, motion
database/schema.sql           Portable PostgreSQL DDL
.env.example                  Server-side environment variables
```

## Running locally

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build
npm run lint
```

## Environment variables

Copy `.env.example` to `.env`. Database credentials are injected by the platform;
everything else is optional and read **only** on the server, inside handlers:

| Variable | Purpose |
| --- | --- |
| `N8N_WEBHOOK_URL` | Enquiry hand-off to n8n. Unset = feature off, enquiry still saved |
| `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` | Live chatbot provider |
| `SMTP_*`, `ADMIN_EMAIL` | Email notifications |
| `ADMIN_API_TOKEN` | Placeholder guard for `GET /api/contact` |
| `FRONTEND_URL` | Canonical origin / CORS allow-list |

No secret is ever imported into client code — client config uses `VITE_*` only.

## Database setup

The schema is already applied to the managed PostgreSQL database. To recreate it
elsewhere:

```bash
createdb xyz_services
psql -d xyz_services -f database/schema.sql
```

`contact_submissions` columns: `id`, `name`, `business_name`, `email`, `phone`,
`service`, `budget`, `project_details`, `status` (default `new`), `created_at`,
`updated_at`. Statuses: `new`, `contacted`, `qualified`, `proposal_sent`, `won`, `lost`.

Row level security allows **inserts only** from the browser. Nothing can read,
edit or delete enquiries client-side; reads happen through trusted server code.

## API endpoints

### `POST /api/contact`

```bash
curl -X POST http://localhost:8080/api/contact \
  -H 'content-type: application/json' \
  -d '{"name":"Asha","email":"asha@example.com","service":"Website Development",
       "budget":"₹25,000–₹50,000","projectDetails":"Need a 5 page site with a chatbot."}'
```

Responses: `201 {success,id}` · `400` invalid JSON · `422 {fields}` validation ·
`500` safe generic error. Stack traces and database messages are logged
server-side only.

### `GET /api/contact` (admin, placeholder auth)

Requires `Authorization: Bearer $ADMIN_API_TOKEN`, and returns `401` when the token
is missing or unset. **Before production, replace this with real authentication:**
add platform auth, store roles in a dedicated `user_roles` table (never on a
profile row), and check the role server-side with a security-definer function
instead of the shared token. The endpoint is deliberately unusable until then.

### `POST /api/chat`

Chatbot foundation. The on-site chatbot is a front-end demo; this endpoint is
where OpenAI/Claude, a knowledge base, n8n or a CRM lookup gets wired in. Keys stay
server-side.

## n8n integration

On a successful enquiry the server POSTs the sanitised payload to
`N8N_WEBHOOK_URL` (4s timeout, failures logged, never surfaced to the visitor —
the enquiry is always saved first). From n8n, fan out to CRM, email, WhatsApp or
Slack.

## Email integration

Notification sending is intentionally not enabled. Add a mailer inside
`createEnquiry` (after the insert, alongside the n8n call) using `SMTP_*` and
`ADMIN_EMAIL`, keeping failures non-fatal.

## Security

- All secrets in environment variables, read inside handlers; `.env.example` documents them.
- Every input validated and sanitised with Zod, plus database CHECK constraints.
- Parameterised queries only — no string-built SQL.
- Row level security: public insert, no public reads.
- Admin route gated; replace the placeholder token with real auth before launch.
- Same-origin API + CSRF middleware for server functions; never use `*` CORS in production — allow-list `FRONTEND_URL`.
- Safe error responses; internal details logged only.
- Rate limiting recommendation: cap `POST /api/contact` and `POST /api/chat` at
  roughly 5 requests/minute/IP at the edge or proxy, and add a honeypot or
  captcha if spam appears.

## SEO & accessibility

Per-route titles, descriptions and Open Graph tags; JSON-LD `ProfessionalService`
on the home page; semantic landmarks and a single `H1` per page; `robots.txt` and
`sitemap.xml`; skip link; keyboard-accessible nav, accordions and forms; visible
focus rings; 44px minimum touch targets; `prefers-reduced-motion` honoured.

## Deployment

`npm run build`, then publish through the hosting platform. Set the production
environment variables, verify `POST /api/contact` writes a row, and confirm the
admin route returns `401` without a token.

## Future improvements

Admin dashboard with real auth and lead statuses, live LLM chatbot with retrieval
over your own content, email notifications, analytics and conversion tracking,
blog/content hub for SEO, A/B tested landing pages.
