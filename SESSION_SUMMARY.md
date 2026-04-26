# Fabrevol Sales Centre - Build Session Summary

**Date:** February 19, 2026
**Status:** Published and live

---

## Key Inputs Given

### Business Context
- **Company:** Fabrevol, a specialty chemicals supplier based in India
- **Products supplied:** PVC stabilizers (Ca-Zn), epoxy resins, TDI, MDI, and Resil products (silicones, antifoams, spray adjuvants, water repellents - excluding textile division)
- **Relationship with Mobelchem:** Can supply their products but is NOT their official distributor - Mobelchem brand name must never appear in the app
- **Resil:** Fabrevol is an authorized Resil distributor
- **Revenue target:** Rs 10 Cr annual revenue in 1 year

### Target Market
- **Industries (15):** Rubber & Latex, Pharma, Personal Care & Cosmetics, PVC & Plastics, Paints & Coatings, Construction Chemicals, Agriculture & Agrochemicals, Paper & Pulp, Water Treatment, Leather, Wire & Cable, Footwear, Food Processing, Adhesives & Sealants, Medical Devices
- **Regions (5):** Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Telangana

### Credentials & Branding
- **Login:** Username `Fabrevol@sales`, Password `Raj@2801` (stored as secrets)
- **Logo:** Custom Fabrevol logo image (uploaded by user)
- **Brand colors:** Dark Petrol Blue `#153e4d` (sidebar, headings), Sky Blue `#0ea5e9` (accents, buttons)
- **Fonts:** Inter (body), Outfit (headings/display)

---

## Key Features Built

### 1. Authentication System
- Session-based login with PostgreSQL session store (connect-pg-simple)
- Branded login page with Fabrevol logo in white rounded container on dark gradient background
- All API routes protected behind authentication middleware
- Logout functionality in sidebar (desktop and mobile)
- Credentials stored securely as Replit secrets (AUTH_USERNAME, AUTH_PASSWORD, SESSION_SECRET)

### 2. Sales Centre (Lead Discovery) - `/`
- Industry and region filter controls
- "Mine Data" button to discover leads from seeded database
- AI-powered lead generation using OpenAI (gpt-4.1-mini) to discover new real companies
- Lead cards displaying company, person, role, pitch, intelligence, and tags
- Add to targets / favorite functionality

### 3. My Targets - `/targets`
- CRM-style list view of qualified leads
- CSV export capability
- Lead status management

### 4. CRM Pipeline - `/crm`
- Kanban board view with deal stages (New, Contacted, Meeting, Proposal, Negotiation, Won, Lost)
- Table view alternative
- Deal value tracking (in lakhs)
- Contact enrichment fields (direct email, mobile)
- Activity notes timeline (JSONB)
- Rs 10 Cr revenue progress tracking
- Next follow-up and next action scheduling

### 5. Outreach (renamed from "Next Steps") - `/roadmap`
- Pre-written email templates for cold outreach (PVC, Pharma, Paints, Agriculture, Rubber, Generic)
- Follow-up email templates (3-day, value-add, post-meeting)
- Meeting request and plant visit request templates
- LinkedIn connection and introduction message templates
- All templates branded as "Fabrevol | Specialty Chemicals" (no Mobelchem)

### 6. Seed Data
- 140 verified Indian manufacturing companies across all 15 industries and 5 regions
- Each lead includes: company name, industry, region, city, contact person, role, phone, website, LinkedIn, tags, product-specific sales pitch, procurement intelligence

---

## Key Decisions Taken

1. **Mobelchem branding removed entirely** - All references to "Mobelchem" removed from UI, outreach templates, AI prompts, seed data, and existing database records. Products are referred to generically ("our Ca-Zn stabilizers", "our epoxy resins") or simply by product name without brand attribution.

2. **Logo contrast solution** - Logo displayed inside a white rounded container (`bg-white/95`) on both the login page and sidebar, providing contrast against the dark petrol blue background.

3. **Authentication approach** - Session-based auth with express-session and PostgreSQL store chosen over token-based auth, keeping it simple for a small team tool.

4. **Session secret hardcoded fallback removed** - Changed from `process.env.SESSION_SECRET || "fallback"` to `process.env.SESSION_SECRET!` to enforce proper secret configuration.

5. **AI model choice** - gpt-4.1-mini used for lead generation with structured JSON output and Zod validation for reliability.

6. **Navigation rename** - "Next Steps" page renamed to "Outreach" with Mail icon to better reflect its purpose as an outreach template hub.

7. **Database updates** - Existing database records cleaned of Mobelchem references (28 pitch records, 6 intelligence records updated) to match the new branding policy.

---

## How We Built the CRM Pipeline & Outreach

### CRM Pipeline (`/crm`) - Build Approach

The CRM was built to give Fabrevol a full deal-tracking system on top of the lead database, progressing leads from discovery through to revenue.

**Step 1: Schema extension** - The existing `leads` table in `shared/schema.ts` was extended with CRM-specific fields: `dealStage` (7 stages from "new" to "won"/"lost"), `dealValue` (in lakhs for Indian currency), `directEmail`, `mobile`, `nextFollowUp`, `nextAction`, and `activities` (a JSONB array storing timestamped notes, calls, emails, and meetings). This kept everything in a single table rather than splitting into separate CRM entities, keeping the architecture simple.

**Step 2: Deal stage definitions** - A `DEAL_STAGES` constant was created with 7 stages: New, Contacted, Meeting Scheduled, Proposal Sent, Negotiation, Won, and Lost. Each stage has a label, color indicator, and order for the kanban layout.

**Step 3: Kanban board view** - The primary CRM view is a horizontal kanban board. Each stage is a column showing deal cards with company name, contact, deal value (in lakhs/crores), and next action. Cards can be clicked to open a detail dialog. Leads are filtered into columns based on their `dealStage` field. Framer Motion (`AnimatePresence`) provides smooth transitions as deals move between stages.

**Step 4: Table view alternative** - A secondary tab provides a traditional table view using shadcn's Table components, showing all pipeline leads in rows with sortable columns for quick scanning.

**Step 5: Deal detail dialog** - Clicking a deal card opens a dialog where the user can:
- Update deal stage via a dropdown selector
- Set deal value (in lakhs)
- Add/edit direct email and mobile number (contact enrichment)
- Schedule next follow-up date and next action
- Add activity notes with type categorization (Note, Call, Email, Meeting) - stored as JSONB array with timestamps
- View full activity timeline for the deal

**Step 6: Revenue progress tracker** - A progress bar at the top tracks total pipeline value of "Won" deals against the Rs 10 Cr target. Values are displayed in lakhs/crores format with a `formatCurrency` helper.

**Step 7: API integration** - All CRM updates use the existing `PATCH /api/leads/:id` endpoint. The `useUpdateLead` hook from React Query handles mutations and cache invalidation, so changes reflect immediately across the kanban board.

### Outreach (`/roadmap`) - Build Approach

The Outreach page was built as a template library to help the sales team send consistent, professional messages without starting from scratch each time.

**Step 1: Template data structure** - Each template is defined with an `id`, `title`, `category` (cold/followup/meeting/linkedin), optional `industry` tag, optional `subject` line, and `body` text. Templates use `[placeholder]` syntax (e.g., `[Name]`, `[Company]`, `[Industry]`) that the user replaces before sending.

**Step 2: Industry-specific cold emails** - Six cold outreach templates were written, each tailored to a specific industry vertical:
- PVC Stabilizers (for PVC & Plastics companies)
- Pharma Grade Simethicone (for pharmaceutical manufacturers)
- Epoxy Resins & Defoamers (for paint/coating companies)
- Spray Adjuvants (for agrochemical companies)
- Silicone Release Agents (for rubber/latex manufacturers)
- General Introduction (for any industry)

Each template highlights the specific Fabrevol products relevant to that industry and their benefits.

**Step 3: Follow-up sequence** - Three follow-up templates were created to form a natural progression: a 3-day follow-up (brief reminder with product summary attached), a value-add follow-up (sharing industry insights/trends), and a post-meeting follow-up (summarizing discussed next steps).

**Step 4: Meeting templates** - Two templates for scheduling: a meeting request (proposing a 15-20 minute call with agenda) and a plant visit request (for on-site technical discussions).

**Step 5: LinkedIn templates** - Three LinkedIn-specific templates: a connection request (short, under character limit), an introduction message (after connection accepted), and a follow-up message (sharing a relevant success story).

**Step 6: Tab-based UI** - Templates are organized into tabs (Cold Outreach, Follow-ups, Meeting Requests, LinkedIn) using shadcn's Tabs component. Each template card shows the title, industry badge (if applicable), subject line preview, and a "Copy" button.

**Step 7: Copy-to-clipboard** - A one-click copy function lets users copy the full template body to their clipboard with a toast confirmation, ready to paste into their email client or LinkedIn.

**Step 8: Branding cleanup** - All templates were updated from "Fabrevol | Mobelchem & Resil Distributor" to "Fabrevol | Specialty Chemicals" and all Mobelchem references removed, positioning Fabrevol as an independent supplier.

---

## Outcomes Aimed For

1. **Build a qualified pipeline** of manufacturers across 15 industries in 5 Indian regions who could buy Fabrevol's specialty chemical products
2. **Reach Rs 10 Cr annual revenue** by systematically discovering, qualifying, and converting leads through the CRM pipeline
3. **Streamline outreach** with ready-to-use email and LinkedIn templates tailored to each industry
4. **AI-assisted discovery** to continuously find new potential customers beyond the initial 140 seeded companies
5. **Team access control** with password-protected login so only authorized sales personnel can access the platform
6. **Professional branding** that positions Fabrevol as an independent specialty chemicals supplier (not tied to any single principal brand)

---

## Technical Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TypeScript |
| Styling | TailwindCSS + shadcn/ui |
| Backend | Express.js |
| Database | PostgreSQL (Drizzle ORM) |
| Auth | express-session + connect-pg-simple |
| AI | OpenAI gpt-4.1-mini |
| Routing | wouter (frontend), Express (backend) |
| State | TanStack React Query |

---

## File Structure (Key Files)

```
shared/schema.ts          - Database schema & Zod types
server/routes.ts          - API endpoints & AI generation
server/seed-data.ts       - 140 seeded companies
server/index.ts           - Express server setup & auth middleware
server/storage.ts         - Database CRUD operations
client/src/App.tsx         - App shell with auth gate
client/src/pages/Login.tsx - Branded login page
client/src/pages/Finder.tsx - Sales Centre (lead discovery)
client/src/pages/Targets.tsx - My Targets
client/src/pages/CRM.tsx   - CRM Pipeline (kanban + table)
client/src/pages/Roadmap.tsx - Outreach templates
client/src/components/Sidebar.tsx - Navigation sidebar
client/src/components/LeadCard.tsx - Lead card component
```
