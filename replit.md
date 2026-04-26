# Fabrevol Sales Centre

## Overview
A B2B sales lead discovery and management tool for Fabrevol, a specialty chemicals supplier offering PVC stabilizers, epoxy resins, TDI, MDI, and Resil products (silicones, antifoams, spray adjuvants, water repellents - excluding textile division). The app helps sales teams discover manufacturers across 15 industries and 5 regions in India, with the goal of building a pipeline towards Rs 10 Cr annual revenue. Note: Fabrevol is NOT an official distributor of Mobelchem but can supply their products - the Mobelchem brand name should never appear in the app UI, pitches, or outreach messages.

## Architecture
- **Frontend:** React + Vite + TypeScript, TailwindCSS, shadcn/ui components
- **Backend:** Express.js API
- **Database:** PostgreSQL (Drizzle ORM)
- **Routing:** wouter (frontend), Express (backend)
- **State:** TanStack React Query

## Brand Colors
- Dark Petrol Blue: `#153e4d` (sidebar, headings)
- Bright Sky Blue: `#0ea5e9` (accents, buttons, CTA)
- Background: `#f8fafc` (Slate 50)
- Fonts: Inter (body), Outfit (headings/display)

## Pages
1. **Sales Centre** (`/`) - Lead discovery with industry/region/product filters. Leads display automatically on page load (no button press needed). Soft delete leads with reason (Not relevant, Duplicate, Wrong industry, Company inactive, Already a customer, or custom). AI Discover generates new leads and skips previously deleted companies.
2. **My Targets** (`/targets`) - CRM-style list of qualified leads with CSV export, remove from targets (soft), or dismiss with reason
3. **CRM Pipeline** (`/crm`) - Full CRM with kanban board/table views, deal stages, pipeline value tracking, contact enrichment (name, designation, email, phone, mobile), activity notes timeline, Rs 10 Cr revenue progress, and manual lead creation
4. **My Suppliers** (`/suppliers`) - Supplier management with 3 seeded suppliers (Resil Chem, Mobelchem, Lanya Chem). Add/edit/delete suppliers with fields: name, description, website, contact (name, email, phone, designation), notes, product catalog (multi-select). Mobelchem visible internally only.
5. **Outreach** (`/roadmap`) - Email and LinkedIn outreach templates

## API Routes
- `GET /api/leads` - List all leads
- `POST /api/leads` - Create a lead
- `PATCH /api/leads/:id` - Update a lead (status, isFavorite, etc.)
- `DELETE /api/leads/:id` - Delete a lead
- `GET /api/products` - List all custom products
- `POST /api/products/analyze-text` - AI-analyze a product by name, create product entry
- `POST /api/products/analyze-pdf` - Upload PDF TDS, AI-extract product info, create product entry
- `DELETE /api/products/:id` - Delete a custom product

## Key Files
- `shared/schema.ts` - Drizzle table definitions & Zod schemas (leads + products tables)
- `shared/routes.ts` - API contract with Zod validation
- `server/routes.ts` - Express route handlers (imports seed data, product AI analysis)
- `server/seed-data.ts` - 140 verified companies with industry-specific pitches
- `server/storage.ts` - Database storage layer (DatabaseStorage) with leads + products CRUD
- `server/db.ts` - Database connection
- `client/src/pages/Finder.tsx` - Main sales centre page with Product Intelligence panel
- `client/src/pages/Targets.tsx` - My targets CRM page
- `client/src/pages/CRM.tsx` - CRM Pipeline page (kanban board, table view, deal management)
- `client/src/pages/Roadmap.tsx` - Next steps page
- `client/src/components/Sidebar.tsx` - Navigation sidebar
- `client/src/components/LeadCard.tsx` - Reusable lead card component
- `client/src/hooks/use-leads.ts` - React Query hooks for leads CRUD
- `client/src/hooks/use-products.ts` - React Query hooks for products CRUD (analyze by name/PDF, list, delete)

## Industries (15)
Rubber & Latex, Pharma, Personal Care & Cosmetics, PVC & Plastics, Paints & Coatings, Construction Chemicals, Agriculture & Agrochemicals, Paper & Pulp, Water Treatment, Leather, Wire & Cable, Footwear, Food Processing, Adhesives & Sealants, Medical Devices

## Regions (5)
Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Telangana

## Database
- 140 seeded leads across 15 industries and 5 regions
- Each lead includes: company, industry, region, city, person, role, phone, website, linkedin, tags, pitch (product-specific sales pitch matching products to company needs), intelligence (procurement insights), status, isFavorite
- CRM fields: dealStage (new/contacted/meeting/proposal/negotiation/won/lost), dealValue (in lakhs), directEmail, mobile, nextFollowUp, nextAction, activities (JSONB array of {id, type, content, timestamp})
- Product-industry mapping (26 products total): Ca-Zn stabilizers for PVC/Wire&Cable, Simethicone for Pharma/Personal Care/Medical/Food, antifoams for Paper/Water Treatment/Food, spray adjuvants for Agriculture, epoxy resins for Paints/Adhesives/Construction, silicone release agents for Rubber/Leather/Footwear/Medical, silane coupling agents for Rubber/Paints/Adhesives/Construction/Wire&Cable/PVC, silicone fluids for Rubber/Pharma/Personal Care/Medical/Food/Paper, silicone intermediates for Personal Care/Paints/Rubber, epoxy hardeners for Paints/Adhesives/Construction, solvents for Paints/Construction/Adhesives/Personal Care, polymer additives for PVC/Rubber/Wire&Cable/Footwear, PVC heat stabilizers for PVC/Wire&Cable, light stabilizers for PVC/Paints/Rubber, UV absorbers for PVC/Paints/Personal Care, antioxidants for PVC/Rubber/Wire&Cable/Adhesives, acetylacetone for PVC/Paints/Rubber, paper chemicals for Paper&Pulp, MQ silicone resin for Personal Care/Paints/Adhesives, pharma intermediates for Pharma, silicone surfactants for Paints/Leather/Adhesives/Agriculture
- Supplier product data sourced from actual websites: Resil (resilsilicones.com) 8 silicone products, Mobelchem (mobelchem.com) 6 products (silanes, epoxy, hardeners, polymer additives, silicone intermediates, solvents), Lanya Chem (lanyachemindia.com) 10 products (silanes, PVC additives, silicone oils, acetylacetone, paper chemicals, pharma intermediates)

## User Preferences
- User supplies PVC stabilizers, epoxy resins, TDI, MDI (can supply Mobelchem products but is NOT their official distributor - never mention Mobelchem in the app) and is a Resil distributor
- Revenue target: Rs 10 Cr in 1 year
- Design: Dark Petrol Blue sidebar (#153e4d), Sky Blue accents (#0ea5e9)
