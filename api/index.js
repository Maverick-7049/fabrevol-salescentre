var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/seed-products.ts
var seed_products_exports = {};
__export(seed_products_exports, {
  seedProducts: () => seedProducts
});
var seedProducts;
var init_seed_products = __esm({
  "server/seed-products.ts"() {
    "use strict";
    seedProducts = [
      {
        name: "N220 Carbon Black",
        description: "N220 carbon black is a high surface area, medium structure carbon black from the KOHLENSTOFF range. It provides good extrudability in compounds along with high tensile strength and wear resistance.",
        applications: "Used in tire tread compounds for passenger and truck tires, conveyor belts, and rubber compounds requiring superior wear and tear resistance.",
        targetIndustries: ["Rubber & Latex", "Footwear", "Wire & Cable", "PVC & Plastics"],
        keywords: ["carbon black", "n220", "rubber filler", "tire compound", "conveyor belt", "wear resistance", "tensile strength", "kohlenstoff", "rubber reinforcement", "carbon"],
        source: "pdf",
        pdfName: "TDS_N220_v2.0.pdf"
      },
      {
        name: "Aquaphobe WR 22",
        description: "AQUAPHOBE WR 22 is a water-thinnable, solvent-free silane-siloxane emulsion from Resil Chemicals with excellent penetration properties. It provides superior water repellency for mineral substrates and is eco-friendly.",
        applications: "Used for hydrophobic impregnation and priming of construction materials including bricks, sandstone, fiber cement boards, aerated concrete, and mineral plasters. Serves as a water-repellent primer for emulsion paints.",
        targetIndustries: ["Construction Chemicals", "Paints & Coatings"],
        keywords: ["water repellent", "aquaphobe", "silane siloxane", "hydrophobic", "impregnation", "waterproofing", "construction", "primer", "resil", "wr 22"],
        source: "pdf",
        pdfName: "AQUAPHOBE_WR_22_TDS.pdf"
      },
      {
        name: "Resilwet 103",
        description: "RESILWET 103 is a polyether modified trisiloxane adjuvant (3-(Polyoxyethylene)propylheptamethyltrisiloxane) from Resil Chemicals. It is a highly effective non-ionic surfactant used as a spray adjuvant.",
        applications: "Used as a spray adjuvant in agricultural applications for improved wetting, spreading and penetration of agrochemical formulations on plant surfaces.",
        targetIndustries: ["Agriculture & Agrochemicals"],
        keywords: ["spray adjuvant", "resilwet", "trisiloxane", "surfactant", "wetter", "spreader", "agricultural adjuvant", "agrochemical", "resil", "silicone surfactant"],
        source: "pdf",
        pdfName: "RESILWET_103_SDS.pdf"
      },
      {
        name: "Resifluid-350 Silicone Fluid",
        description: "RESIFLUID-350 is a colorless polydimethylsiloxane (PDMS) fluid from Resil Chemicals with approximately 370 cst viscosity. It offers excellent thermal stability, low surface tension, high compressibility, and good dielectric properties.",
        applications: "Used as a release agent, antifoam, hydraulic fluid, surface-active material, lubricant, and as an additive in polishes and chemical specialties.",
        targetIndustries: ["Rubber & Latex", "Personal Care & Cosmetics", "Pharmaceuticals", "Paper & Pulp", "Food Processing", "Medical Devices"],
        keywords: ["silicone fluid", "resifluid", "pdms", "polydimethylsiloxane", "release agent", "antifoam", "lubricant", "silicone oil", "350 cst", "resil"],
        source: "pdf",
        pdfName: "TDS-RESILFLUID-350.pdf"
      },
      {
        name: "DMC Silicone Fluids (Dimethicone)",
        description: "DMC grade silicone fluids are clear, colorless polydimethylsiloxane fluids from Resil Chemicals available in viscosities from 0.65 to 60,000 cst. They are non-greasy, form protective breathable films, and have excellent water repellency.",
        applications: "Used for siliconization of glass, metals, plastics, and rubber. Key applications include pharmaceutical and cosmetic formulations (skin care, sun care, oral care), medical device lubrication (syringes, needles), and industrial lubrication.",
        targetIndustries: ["Personal Care & Cosmetics", "Pharmaceuticals", "Medical Devices", "Rubber & Latex", "PVC & Plastics"],
        keywords: ["dimethicone", "dmc", "silicone fluid", "pdms", "polydimethylsiloxane", "cosmetic grade", "pharmaceutical grade", "siliconization", "lubricant", "resil"],
        source: "pdf",
        pdfName: "DMC_FLUIDS_TDS.pdf"
      },
      {
        name: "Fumed Silica",
        description: "Fumed silica (pyrogenic silica) is an ultrafine, high-purity amorphous silicon dioxide produced by flame hydrolysis. It has extremely high surface area, low bulk density, and unique thixotropic properties.",
        applications: "Used as a thickening and anti-settling agent in paints, coatings, and adhesives. Also used as a reinforcing filler in silicone rubber, flow aid in powders, and anti-caking agent in various industrial applications.",
        targetIndustries: ["Paints & Coatings", "Adhesives & Sealants", "Rubber & Latex", "Pharmaceuticals", "Personal Care & Cosmetics", "Construction Chemicals"],
        keywords: ["fumed silica", "pyrogenic silica", "silicon dioxide", "sio2", "thickener", "rheology modifier", "anti-settling", "reinforcing filler", "aerosil", "thixotropic"],
        source: "text",
        pdfName: null
      },
      {
        name: "Silicone Oil",
        description: "Silicone oil (polydimethylsiloxane/PDMS) is a versatile clear synthetic fluid available in various viscosity grades. It offers excellent thermal stability, chemical inertness, low surface tension, and superior water repellency.",
        applications: "Used as a mold release agent in rubber and plastics, as a lubricant in medical devices and industrial equipment, as a base fluid in personal care products, and as a heat transfer medium in various processes.",
        targetIndustries: ["Rubber & Latex", "Medical Devices", "Personal Care & Cosmetics", "Pharmaceuticals", "PVC & Plastics", "Food Processing", "Paper & Pulp"],
        keywords: ["silicone oil", "pdms", "polydimethylsiloxane", "silicone fluid", "release agent", "mold release", "lubricant", "heat transfer", "dielectric fluid", "silicone"],
        source: "text",
        pdfName: null
      }
    ];
  }
});

// server/app.ts
import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

// server/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  DEAL_STAGES: () => DEAL_STAGES,
  activitySchema: () => activitySchema,
  insertLeadSchema: () => insertLeadSchema,
  insertProductSchema: () => insertProductSchema,
  insertSupplierSchema: () => insertSupplierSchema,
  leads: () => leads,
  products: () => products,
  suppliers: () => suppliers
});
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  industry: text("industry").notNull(),
  region: text("region").notNull(),
  city: text("city").notNull(),
  person: text("person").notNull(),
  role: text("role").notNull(),
  website: text("website"),
  linkedin: text("linkedin"),
  phone: text("phone"),
  source: text("source"),
  tags: text("tags").array(),
  pitch: text("pitch"),
  intelligence: text("intelligence"),
  status: text("status").default("New").notNull(),
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  dealStage: text("deal_stage").default("new"),
  dealValue: integer("deal_value").default(0),
  directEmail: text("direct_email"),
  mobile: text("mobile"),
  nextFollowUp: text("next_follow_up"),
  nextAction: text("next_action"),
  activities: jsonb("activities").default([]),
  deletedAt: timestamp("deleted_at"),
  deleteReason: text("delete_reason")
});
var activitySchema = z.object({
  id: z.string(),
  type: z.enum(["note", "call", "email", "meeting"]),
  content: z.string(),
  timestamp: z.string()
});
var insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  applications: text("applications"),
  targetIndustries: text("target_industries").array(),
  keywords: text("keywords").array(),
  source: text("source"),
  pdfName: text("pdf_name"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});
var suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  website: text("website"),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  contactDesignation: text("contact_designation"),
  notes: text("notes"),
  pdfName: text("pdf_name"),
  products: text("products").array(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true
});
var DEAL_STAGES = [
  { id: "new", label: "New", color: "bg-slate-500" },
  { id: "contacted", label: "Contacted", color: "bg-blue-500" },
  { id: "meeting", label: "Meeting Set", color: "bg-purple-500" },
  { id: "proposal", label: "Proposal Sent", color: "bg-amber-500" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { id: "won", label: "Won", color: "bg-emerald-500" },
  { id: "lost", label: "Lost", color: "bg-red-500" }
];

// server/db.ts
var { Pool } = pg;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq, desc, isNull, isNotNull } from "drizzle-orm";
var DatabaseStorage = class {
  async getLeads() {
    return await db.select().from(leads).where(isNull(leads.deletedAt)).orderBy(desc(leads.createdAt));
  }
  async getAllLeadsIncludingDeleted() {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }
  async getDeletedLeads() {
    return await db.select().from(leads).where(isNotNull(leads.deletedAt)).orderBy(desc(leads.deletedAt));
  }
  async createLead(insertLead) {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }
  async updateLead(id, updates) {
    const [updated] = await db.update(leads).set(updates).where(eq(leads.id, id)).returning();
    return updated;
  }
  async softDeleteLead(id, reason) {
    await db.update(leads).set({ deletedAt: /* @__PURE__ */ new Date(), deleteReason: reason }).where(eq(leads.id, id));
  }
  async restoreLead(id) {
    const [restored] = await db.update(leads).set({ deletedAt: null, deleteReason: null }).where(eq(leads.id, id)).returning();
    return restored;
  }
  async getProducts() {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }
  async createProduct(insertProduct) {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  async deleteProduct(id) {
    await db.delete(products).where(eq(products.id, id));
  }
  async getSuppliers() {
    return await db.select().from(suppliers).orderBy(desc(suppliers.createdAt));
  }
  async createSupplier(insertSupplier) {
    const [supplier] = await db.insert(suppliers).values(insertSupplier).returning();
    return supplier;
  }
  async updateSupplier(id, updates) {
    const [updated] = await db.update(suppliers).set(updates).where(eq(suppliers.id, id)).returning();
    return updated;
  }
  async deleteSupplier(id) {
    await db.delete(suppliers).where(eq(suppliers.id, id));
  }
};
var storage = new DatabaseStorage();

// shared/routes.ts
import { z as z2 } from "zod";
var errorSchemas = {
  validation: z2.object({
    message: z2.string(),
    field: z2.string().optional()
  }),
  notFound: z2.object({
    message: z2.string()
  }),
  internal: z2.object({
    message: z2.string()
  })
};
var api = {
  leads: {
    list: {
      method: "GET",
      path: "/api/leads",
      responses: {
        200: z2.array(z2.custom())
      }
    },
    create: {
      method: "POST",
      path: "/api/leads",
      input: insertLeadSchema,
      responses: {
        201: z2.custom(),
        400: errorSchemas.validation
      }
    },
    delete: {
      method: "DELETE",
      path: "/api/leads/:id",
      responses: {
        204: z2.void(),
        404: errorSchemas.notFound
      }
    },
    update: {
      method: "PATCH",
      path: "/api/leads/:id",
      input: insertLeadSchema.partial(),
      responses: {
        200: z2.custom(),
        404: errorSchemas.notFound
      }
    }
  }
};

// server/routes.ts
import { z as z3 } from "zod";

// server/seed-data.ts
var seedLeads = [
  // ===================== RUBBER & LATEX =====================
  {
    company: "Cupid Limited",
    industry: "rubber_latex",
    region: "Maharashtra",
    city: "Nashik (Sinnar MIDC)",
    person: "Omprakash Garg",
    role: "CMD / Purchase Head",
    website: "https://www.cupidlimited.com",
    linkedin: "https://www.linkedin.com/company/cupid-limited",
    phone: "+91 2551 230 XXX",
    source: "BSE Listed",
    tags: ["Female Condoms", "Lubricants", "Export"],
    pitch: "Pitch our pharma-grade Silicone Oil (350 cst) for their latex dipping process \u2014 essential for lubricating 480M+ male and 52M+ female condoms annually. Fabrevol's FDA/CE-compliant silicone fluids ensure regulatory compliance across their 55+ export markets. Lead with a free trial batch and offer full regulatory documentation for WHO/UNFPA pre-qualification support.",
    intelligence: "Factory in Sinnar. WHO/UNFPA pre-qualified for both male & female condoms. Exports to 55+ countries. Huge volume buyer of silicone fluids.",
    status: "New"
  },
  {
    company: "TTK Protective Devices (Skore)",
    industry: "rubber_latex",
    region: "Maharashtra",
    city: "Aurangabad (Chikalthana)",
    person: "Plant Purchase Mgr",
    role: "Procurement",
    website: "https://www.ttkhealthcare.com",
    linkedin: "https://www.linkedin.com/company/ttk-healthcare-limited",
    phone: "+91 240 248 XXXX",
    source: "Manufacturing Dir",
    tags: ["Skore", "Latex", "Healthcare"],
    pitch: "Pitch our bulk Dimethicone for their condom lubrication process, critical for maintaining Skore's premium brand quality across 1.5B+ units annually. Our consistent-viscosity Dimethicone reduces batch rejection rates and meets strict healthcare-grade specifications. Offer a quality comparison study against their current supplier with free test samples.",
    intelligence: "Key manufacturing unit for Skore brand. TTK Healthcare is Chennai-listed but Aurangabad plant is the production hub.",
    status: "New"
  },
  {
    company: "Raymond Consumer Care (KamaSutra)",
    industry: "rubber_latex",
    region: "Maharashtra",
    city: "Aurangabad (Waluj)",
    person: "Sourcing Head (Latex)",
    role: "Sourcing",
    website: "https://raymond.in",
    linkedin: "https://www.linkedin.com/company/raymond-consumer-care",
    phone: "+91 240 255 XXXX",
    source: "Public Data",
    tags: ["KamaSutra", "Premium", "Deodorants"],
    pitch: "Pitch our high-viscosity, non-sticky Dimethicone for KamaSutra premium condom lubrication, plus sprayable Cyclomethicone for their deodorant lines. As a premium brand, they need silicone fluids that deliver superior sensory feel without compromising latex integrity. Propose a technical seminar on silicone formulation optimization for their R&D team.",
    intelligence: "Acquired Ansell's stake. The Aurangabad plant is the hub for KamaSutra production.",
    status: "New"
  },
  {
    company: "Convex Latex Pvt Ltd",
    industry: "rubber_latex",
    region: "Maharashtra",
    city: "Pune (Hinjawadi)",
    person: "Director Operations",
    role: "Director",
    website: "https://convexgroups.com",
    linkedin: "https://www.linkedin.com/company/convex-latex",
    phone: "+91 20 2293 XXXX",
    source: "Company Website",
    tags: ["OEM", "Export", "FDA Certified"],
    pitch: "Pitch our cost-competitive Silicone Oil (350 cst) and lubricants for their 350M pieces/year OEM condom production. As an FDA/CE-certified OEM supplier to global brands, they need reliable supply with consistent quality documentation. Lead with a competitive pricing proposal and offer flexible MOQ for trial orders.",
    intelligence: "State-of-the-art digital technology plant. ISO 9001:2000, ISO 13485:2003, CE certified by DNV Norway. Strong in-house R&D.",
    status: "New"
  },
  {
    company: "Indus Medicare Pvt Ltd",
    industry: "rubber_latex",
    region: "Maharashtra",
    city: "Pune (Bhosari)",
    person: "Director / Ops",
    role: "Owner",
    website: "https://www.indusmedicare.com",
    linkedin: "",
    phone: "+91 20 2712 XXXX",
    source: "Indiamart",
    tags: ["OEM", "Export", "Contract Mfg"],
    pitch: "Pitch our cost-competitive Silicone Oil (350 cst) for their contract manufacturing operations, targeting their Africa and Middle East export lines. Lower-cost silicone fluids directly improve their OEM margins on high-volume export orders. Offer a pilot batch with competitive landed-cost comparison against their current supplier.",
    intelligence: "Focuses heavily on exports to Africa/Middle East. Accessible smaller player for initial pilot orders.",
    status: "New"
  },
  {
    company: "Kokoku Intech India Pvt Ltd",
    industry: "rubber_latex",
    region: "Rajasthan",
    city: "Behror (Alwar)",
    person: "Plant Manager",
    role: "Operations",
    website: "",
    linkedin: "",
    phone: "+91 1494 XXX XXX",
    source: "Indiamart",
    tags: ["Synthetic Rubber", "Japanese Tech", "Automotive"],
    pitch: "Pitch our silicone release agents and processing aids for their synthetic rubber latex compounding lines used in automotive applications. Japanese-tech operations demand consistent quality \u2014 our release agents reduce mold buildup and improve cycle times. Lead with free technical samples and a processing efficiency case study.",
    intelligence: "Behror RIICO Industrial Area. Japanese technology. Produces synthetic latex compounds for automotive and industrial applications.",
    status: "New"
  },
  {
    company: "Thermo Industries",
    industry: "rubber_latex",
    region: "Madhya Pradesh",
    city: "Dewas",
    person: "Managing Director",
    role: "Director",
    website: "https://www.glovesmanufacturer.com",
    linkedin: "",
    phone: "+91 7272 XXX XXX",
    source: "Company Website",
    tags: ["Latex Gloves", "Surgical", "Polymer Coated"],
    pitch: "Pitch our silicone release agents for glove dipping molds and inner-coating lubricants for their surgical and examination glove lines. They supply to Ranbaxy and Cipla, so pharma-grade compliance is essential \u2014 our GMP-documented release agents meet those standards. Offer a free trial batch with full documentation and a cost-saving comparison vs. imported release agents.",
    intelligence: "Dewas, MP. Manufactures latex surgical gloves, examination gloves, polymer-coated gloves. Supplies to major pharma companies.",
    status: "New"
  },
  // ===================== PHARMACEUTICALS =====================
  {
    company: "Cipla Ltd",
    industry: "pharma",
    region: "Maharashtra",
    city: "Mumbai (Vikhroli)",
    person: "Head of Procurement",
    role: "VP Procurement",
    website: "https://www.cipla.com",
    linkedin: "https://www.linkedin.com/company/cipla",
    phone: "+91 22 2508 XXXX",
    source: "Public Listed",
    tags: ["API", "Formulations", "US-FDA", "Respiratory"],
    pitch: "Pitch our pharma-grade Simethicone (US-DMF filed) for their antacid and GI formulations, plus antifoams for API manufacturing processes. Cipla's strict US-FDA regulatory requirements make our complete documentation and audit-ready DMF a key differentiator. Offer a regulatory documentation package upfront and propose a vendor qualification audit at our facility.",
    intelligence: "One of India's largest pharma companies since 1935. Multiple manufacturing plants across Maharashtra. High requirement for defoamers and excipients.",
    status: "New"
  },
  {
    company: "Glenmark Pharmaceuticals",
    industry: "pharma",
    region: "Maharashtra",
    city: "Mumbai (Andheri East)",
    person: "Category Procurement Lead",
    role: "Procurement",
    website: "https://www.glenmarkpharma.com",
    linkedin: "https://www.linkedin.com/company/glenmark-pharmaceuticals",
    phone: "+91 22 4018 XXXX",
    source: "Public Listed",
    tags: ["Respiratory", "Dermatology", "Oncology"],
    pitch: "Pitch our pharma-grade Dimethicone for their dermatology topical formulations and Simethicone for GI products across 80+ export markets. Regulatory compliance documentation for multiple geographies is our key advantage over single-market suppliers. Lead with a complete regulatory dossier package covering US, EU, and emerging markets.",
    intelligence: "HQ at Glenmark House, Chakala, Andheri East. Strong in respiratory and dermatology segments. Active R&D center in Pune.",
    status: "New"
  },
  {
    company: "Lupin Ltd",
    industry: "pharma",
    region: "Maharashtra",
    city: "Mumbai (Santacruz East)",
    person: "VP Supply Chain",
    role: "Supply Chain",
    website: "https://www.lupin.com",
    linkedin: "https://www.linkedin.com/company/lupin",
    phone: "+91 22 6640 XXXX",
    source: "Public Listed",
    tags: ["Cardiovascular", "Diabetes", "Respiratory"],
    pitch: "Pitch our Simethicone as a defoamer excipient for their tablet and liquid oral formulations across cardiovascular and respiratory therapeutic areas. With 1000+ products serving 100+ countries, they need an excipient supplier with multi-market regulatory filings. Offer a US-DMF documentation package and propose consolidating their silicone excipient sourcing.",
    intelligence: "Serves 100+ countries. Major facilities in Mumbai and Pune. Strong in cardiovascular, diabetes, and respiratory drugs.",
    status: "New"
  },
  {
    company: "Serum Institute of India",
    industry: "pharma",
    region: "Maharashtra",
    city: "Pune (Hadapsar)",
    person: "Head of Raw Materials",
    role: "Procurement",
    website: "https://www.seruminstitute.com",
    linkedin: "https://www.linkedin.com/company/serum-institute-of-india",
    phone: "+91 20 2699 XXXX",
    source: "Public Data",
    tags: ["Vaccines", "Biologics", "Global"],
    pitch: "Pitch our process-grade antifoams for bioreactor fermentation and downstream vaccine processing at their massive Pune facility. Foam control is critical in biological manufacturing \u2014 our antifoams are validated for pharma bioprocessing with no cell toxicity concerns. Propose a technical evaluation with free samples and biocompatibility data sheets.",
    intelligence: "Massive scale. Plot No. 77, Parvati Industrial Estate. Handles polio, COVID-19, measles vaccines. Entry is difficult but volumes are extraordinary.",
    status: "New"
  },
  {
    company: "Emcure Pharmaceuticals",
    industry: "pharma",
    region: "Maharashtra",
    city: "Pune (Bhosari)",
    person: "Procurement Director",
    role: "Director",
    website: "https://www.emcure.com",
    linkedin: "https://www.linkedin.com/company/emcure-pharmaceuticals",
    phone: "+91 20 6603 XXXX",
    source: "Public Listed",
    tags: ["Biopharma", "HIV", "Oncology"],
    pitch: "Pitch our Simethicone for GI formulations and antifoams for their biopharma API manufacturing processes across HIV and oncology product lines. As a recently public company expanding into 70+ countries, they need excipient suppliers with scalable capacity and global regulatory filings. Lead with a capability presentation highlighting our US-DMF and multi-market compliance.",
    intelligence: "Emcure House, T-184, MIDC, Bhosari. Strong in HIV & oncology. Recently went public. Growing rapidly.",
    status: "New"
  },
  {
    company: "Alkem Laboratories",
    industry: "pharma",
    region: "Maharashtra",
    city: "Mumbai (Lower Parel)",
    person: "Senior Buyer (Excipients)",
    role: "Procurement",
    website: "https://www.alkemlabs.com",
    linkedin: "https://www.linkedin.com/company/alkem-laboratories-ltd",
    phone: "+91 22 3982 XXXX",
    source: "Public Listed",
    tags: ["Branded Generics", "Nutraceuticals"],
    pitch: "Pitch our Simethicone for their branded generic antacid and GI formulations, plus process antifoams for tablet coating operations. Their branded generics business across 40+ countries demands consistent quality with competitive pricing. Offer a cost-reduction proposal showing savings vs. imported Simethicone grades.",
    intelligence: "Alkem House, Senapati Bapat Marg, Lower Parel. Strong in branded generics and nutraceuticals.",
    status: "New"
  },
  {
    company: "Cadila Healthcare (Zydus)",
    industry: "pharma",
    region: "Gujarat",
    city: "Ahmedabad (Satellite)",
    person: "VP Procurement",
    role: "VP Procurement",
    website: "https://www.zyduslife.com",
    linkedin: "https://www.linkedin.com/company/zydus-group",
    phone: "+91 79 2686 XXXX",
    source: "Public Listed",
    tags: ["Biologics", "Vaccines", "Generics"],
    pitch: "Pitch our Simethicone for their antacid formulations and process antifoams for their biotech manufacturing lines including biosimilar production. As Gujarat's largest pharma company with WHO-prequalified facilities, they require excipients meeting the highest pharmacopoeial standards. Lead with a US-DMF documentation package and offer a facility audit invitation.",
    intelligence: "Zydus Tower, Satellite Cross Roads. Multiple plants in Ahmedabad, Ankleshwar. World's first plasmid DNA COVID-19 vaccine (ZyCoV-D).",
    status: "New"
  },
  {
    company: "Torrent Pharmaceuticals",
    industry: "pharma",
    region: "Gujarat",
    city: "Ahmedabad (Ashram Road)",
    person: "Head of Sourcing",
    role: "Sourcing",
    website: "https://www.torrentpharma.com",
    linkedin: "https://www.linkedin.com/company/torrent-pharmaceuticals",
    phone: "+91 79 2658 XXXX",
    source: "Public Listed",
    tags: ["Cardiovascular", "CNS", "Gastrointestinal"],
    pitch: "Pitch our Simethicone for their gastrointestinal drug formulations and defoamer excipients for tablet manufacturing at their Indrad and Baddi plants. As a top-10 Indian pharma company, consolidated excipient sourcing from a reliable domestic supplier offers cost and supply chain advantages. Propose a vendor qualification meeting with samples and full pharmacopoeial documentation.",
    intelligence: "Torrent House, Off Ashram Road. Strong in cardiovascular and CNS segments. Plants in Indrad and Baddi.",
    status: "New"
  },
  {
    company: "Intas Pharmaceuticals",
    industry: "pharma",
    region: "Gujarat",
    city: "Ahmedabad (Bodakdev)",
    person: "Procurement Manager",
    role: "Procurement",
    website: "https://www.intaspharma.com",
    linkedin: "https://www.linkedin.com/company/intas-pharmaceuticals",
    phone: "+91 79 3982 XXXX",
    source: "Company Website",
    tags: ["Biosimilars", "Oncology", "Specialty"],
    pitch: "Pitch our process antifoams for their biosimilar manufacturing and Simethicone excipients for oral formulations. As India's 3rd largest pharma company by prescriptions, they need bulk excipient suppliers with consistent quality and scalable capacity. Offer competitive pricing for annual contracts with guaranteed supply continuity.",
    intelligence: "Premier House, Bodakdev. Strong in biosimilars. Multiple manufacturing units in Gujarat.",
    status: "New"
  },
  {
    company: "Dr. Reddy's Laboratories",
    industry: "pharma",
    region: "Telangana",
    city: "Hyderabad (Banjara Hills)",
    person: "Head of Procurement (Excipients)",
    role: "VP Procurement",
    website: "https://www.drreddys.com",
    linkedin: "https://www.linkedin.com/company/dr-reddys-laboratories",
    phone: "+91 40 4900 XXXX",
    source: "Public Listed",
    tags: ["API", "Generics", "Biosimilars", "Global"],
    pitch: "Pitch our US-DMF filed Simethicone for their oral formulations and process antifoams for API synthesis at their Hyderabad manufacturing units. With $2.99B revenue serving 500M+ patients across 100+ countries, they need FDA-compliant excipient grades with complete regulatory support. Lead with our DMF documentation package and propose a long-term supply agreement.",
    intelligence: "8-2-337, Road No.3, Banjara Hills. Major API manufacturer. Exports to 100+ countries. Volume buyer of pharmaceutical-grade silicones.",
    status: "New"
  },
  {
    company: "Divi's Laboratories",
    industry: "pharma",
    region: "Telangana",
    city: "Hyderabad (Gachibowli)",
    person: "Procurement Head (Chemicals)",
    role: "Procurement",
    website: "https://www.divislabs.com",
    linkedin: "https://www.linkedin.com/company/divis-laboratories",
    phone: "+91 40 2348 XXXX",
    source: "Public Listed",
    tags: ["API", "Nutraceuticals", "Custom Synthesis"],
    pitch: "Pitch our process antifoams for their API synthesis reactors and specialty intermediates for custom synthesis operations. Divi's WHO & GMP-certified facilities demand the highest quality \u2014 our antifoams are validated for pharmaceutical reactor processes with no product contamination risk. Propose a technical evaluation at their facility with free process-grade samples.",
    intelligence: "Divi Towers, Gachibowli. 31 years experience. Exports to 95+ countries. WHO & GMP certified. Very quality-conscious procurement.",
    status: "New"
  },
  {
    company: "Aurobindo Pharma",
    industry: "pharma",
    region: "Telangana",
    city: "Hyderabad (Ameerpet)",
    person: "Senior Manager Procurement",
    role: "Procurement",
    website: "https://www.aurobindo.com",
    linkedin: "https://www.linkedin.com/company/aurobindo-pharma",
    phone: "+91 40 6672 XXXX",
    source: "Public Listed",
    tags: ["API", "Generics", "Formulations", "US Market"],
    pitch: "Pitch our US-DMF filed Simethicone for their oral dosage formulations and process antifoams for their multi-facility API manufacturing operations. Their WHO, GMP, and ISO-certified facilities require excipients with complete traceability and regulatory documentation. Offer a consolidated supply proposal across their Hyderabad manufacturing units with competitive volume pricing.",
    intelligence: "Galaxy, Ameerpet. Major presence in US generics market. Multiple manufacturing units around Hyderabad.",
    status: "New"
  },
  {
    company: "Hetero Drugs",
    industry: "pharma",
    region: "Telangana",
    city: "Hyderabad",
    person: "Procurement Director",
    role: "Director",
    website: "https://www.heterodrugs.com",
    linkedin: "https://www.linkedin.com/company/hetero",
    phone: "+91 40 2370 XXXX",
    source: "Company Website",
    tags: ["Anti-retroviral", "Biosimilars", "API"],
    pitch: "Pitch our process antifoams for their massive API manufacturing reactors and Simethicone for oral ARV formulations. As the world's largest ARV producer operating in 140+ countries, they need consistent-quality process chemicals with WHO-prequalification documentation. Lead with a free trial batch for reactor antifoam evaluation and a regulatory compliance dossier.",
    intelligence: "Operations in 140+ countries. Specialized in anti-retroviral drugs. Massive manufacturing scale in Hyderabad area.",
    status: "New"
  },
  {
    company: "Granules India",
    industry: "pharma",
    region: "Telangana",
    city: "Hyderabad",
    person: "VP Supply Chain",
    role: "Supply Chain",
    website: "https://granulesindia.com",
    linkedin: "https://www.linkedin.com/company/granules-india",
    phone: "+91 40 7961 XXXX",
    source: "Public Listed",
    tags: ["Paracetamol", "API", "Vertically Integrated"],
    pitch: "Pitch our process antifoams for their paracetamol API synthesis reactors and excipients for their finished dosage manufacturing lines. Their vertically integrated operations mean a single supplier relationship covers both API and formulation stages \u2014 offering procurement efficiency. Propose a site visit to demonstrate antifoam performance in their specific reactor conditions.",
    intelligence: "Specialist in paracetamol API. Multiple plants in Telangana. Vertically integrated operations.",
    status: "New"
  },
  // ===================== PERSONAL CARE & COSMETICS =====================
  {
    company: "Encube Ethicals",
    industry: "pcd_personal_care",
    region: "Maharashtra",
    city: "Mumbai (Andheri)",
    person: "Procurement Lead",
    role: "Sourcing",
    website: "https://www.encubeethicals.com",
    linkedin: "https://www.linkedin.com/company/encube-ethicals",
    phone: "+91 22 6264 XXXX",
    source: "Contract Mfg",
    tags: ["Topicals", "Contract Mfg", "Global Brands"],
    pitch: "Pitch our bulk Cyclopentasiloxane (D5) and Dimethicone blends for their topical contract manufacturing for L'Oreal, J&J, and other global brands. As India's largest topical contract manufacturer, they need cosmetic-grade silicones with full REACH/EU compliance documentation. Lead with a regulatory compliance package and offer competitive pricing on annual volume contracts.",
    intelligence: "Largest topical contract manufacturer in India. Volume buyer. Quality is paramount, price sensitivity moderate.",
    status: "New"
  },
  {
    company: "VVF (India) Ltd",
    industry: "pcd_personal_care",
    region: "Maharashtra",
    city: "Mumbai (Sion)",
    person: "Category Manager (Chemicals)",
    role: "Procurement",
    website: "https://www.vvfltd.com",
    linkedin: "https://www.linkedin.com/company/vvf-limited",
    phone: "+91 22 6740 XXXX",
    source: "ChemExcil",
    tags: ["Oleochemicals", "Soaps", "Shampoo"],
    pitch: "Pitch our amino-functional silicone softeners and Dimethicone for their hair care conditioner and shampoo formulations manufactured for major FMCG brands. They are backward-integrated for oleochemicals but source specialty silicones externally \u2014 representing a clear supply opportunity. Offer formulation support and free samples for their R&D team to test in existing conditioner bases.",
    intelligence: "Backward integrated but buys specialty silicones externally. Large volumes in personal care ingredients.",
    status: "New"
  },
  {
    company: "Galaxy Surfactants",
    industry: "pcd_personal_care",
    region: "Maharashtra",
    city: "Navi Mumbai",
    person: "R&D Director",
    role: "Technical",
    website: "https://www.galaxysurfactants.com",
    linkedin: "https://www.linkedin.com/company/galaxy-surfactants-limited",
    phone: "+91 22 2769 XXXX",
    source: "Stock Market",
    tags: ["Surfactants", "FMCG Ingredients"],
    pitch: "Pitch our silicone emulsions engineered for compatibility with their surfactant systems, targeting FMCG personal care formulations. As a BSE/NSE-listed ingredient innovator, they value technical collaboration over simple product sales. Propose a joint formulation development project combining their surfactant expertise with our silicone technology.",
    intelligence: "BSE/NSE listed. Innovator in personal care ingredients. Technical collaboration pitch is stronger than just product sales.",
    status: "New"
  },
  {
    company: "Vini Cosmetics (Fogg)",
    industry: "pcd_personal_care",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "Head of R&D",
    role: "R&D",
    website: "https://www.vinicosmetics.com",
    linkedin: "https://www.linkedin.com/company/vini-cosmetics",
    phone: "+91 79 4000 XXXX",
    source: "Brand Data",
    tags: ["Fogg", "Deodorants", "White Tone"],
    pitch: "Pitch our fragrance-compatible Cyclomethicone and silicone-based spray formulations for Fogg deodorant production and Dimethicone for White Tone talcum powder. High-volume aerosol production demands consistent spray-grade silicones with tight viscosity specifications. Offer free formulation samples and propose a cost comparison vs. their current silicone supplier.",
    intelligence: "Founded 2009. Galaxy Tower, Ahmedabad. Fast-growing FMCG company with massive distribution. Volume opportunity.",
    status: "New"
  },
  {
    company: "HCP Wellness Pvt Ltd",
    industry: "pcd_personal_care",
    region: "Gujarat",
    city: "Ahmedabad (Bodakdev)",
    person: "Factory Manager",
    role: "Operations",
    website: "https://www.hcpwellness.in",
    linkedin: "",
    phone: "+91 79 4890 XXXX",
    source: "Company Website",
    tags: ["Private Label", "Skincare", "Oral Care"],
    pitch: "Pitch our Dimethicone and Cyclomethicone for their private-label skincare and hair care formulations, plus silicone-based actives for specialty products. Their ISO/GMP/FDA-certified facility serving 20+ years of third-party manufacturing needs reliable, documented raw material supply. Offer a product portfolio presentation with free samples across their skincare, hair care, and body care lines.",
    intelligence: "Sindhu Bhavan Road, Bodakdev. Third-party manufacturer for skincare, body care, oral care, hair care, and pet care.",
    status: "New"
  },
  {
    company: "Nature's Way",
    industry: "pcd_personal_care",
    region: "Telangana",
    city: "Hyderabad (Ghatkesar)",
    person: "Procurement Manager",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 40 XXXX XXXX",
    source: "Industry Directory",
    tags: ["Skincare", "Haircare", "Natural"],
    pitch: "Pitch our silicone emulsions for skin-feel improvement in their anti-aging and anti-acne ranges, and conditioning agents for their hair care line. Since 1969, they've built expertise in skin and body care \u2014 our silicone emulsions enhance product texture without compromising their natural positioning. Lead with free formulation samples and a technical consultation on silicone-natural ingredient compatibility.",
    intelligence: "Peerzadiguda, Ghatkesar. Long-established natural personal care brand. Anti-acne, anti-aging, and hair care product range.",
    status: "New"
  },
  {
    company: "Fixderma India Pvt Ltd",
    industry: "pcd_personal_care",
    region: "Rajasthan",
    city: "Alwar (Khushkhera)",
    person: "Plant Head",
    role: "Operations",
    website: "https://fixderma.com",
    linkedin: "https://www.linkedin.com/company/fixderma",
    phone: "+91 144 XXX XXXX",
    source: "Company Website",
    tags: ["Derma", "Skincare", "Pharma-grade"],
    pitch: "Pitch our pharma-grade Dimethicone for their dermatological skincare formulations and silicone-based sunscreen actives for their UV protection range. Derma-cosmetics require pharmaceutical-grade silicones with complete safety documentation and batch-to-batch consistency. Offer a free regulatory documentation package and propose a formulation optimization workshop with their R&D team.",
    intelligence: "RIICO Industrial Area, Khushkhera. Specialized dermatological skincare brand. Growing rapidly in Indian derma-cosmetics market.",
    status: "New"
  },
  {
    company: "Rosa Herbalcare Pvt Ltd",
    industry: "pcd_personal_care",
    region: "Rajasthan",
    city: "Alwar (Bhiwadi)",
    person: "R&D Head",
    role: "Technical",
    website: "",
    linkedin: "",
    phone: "+91 1493 XXX XXX",
    source: "Industry Directory",
    tags: ["Herbal", "Cosmetics", "RIICO"],
    pitch: "Pitch our silicone-based emollients formulated for compatibility with herbal and natural active ingredients in their skincare and hair care products. Growing consumer demand for silicone-herbal hybrid formulations makes our compatible emollients a natural fit for their product development roadmap. Offer free compatibility testing samples and a technical brief on silicone-herbal formulation synergies.",
    intelligence: "RIICO Industrial Area, Bhiwadi. Herbal cosmetic manufacturer. Growing demand for silicone-herbal hybrid formulations.",
    status: "New"
  },
  // ===================== PAINTS & COATINGS =====================
  {
    company: "Asian Paints Ltd",
    industry: "paints",
    region: "Maharashtra",
    city: "Mumbai (Andheri East)",
    person: "Head Procurement (Chemicals)",
    role: "VP Supply Chain",
    website: "https://www.asianpaints.com",
    linkedin: "https://www.linkedin.com/company/asian-paints",
    phone: "+91 22 6235 XXXX",
    source: "Annual Report",
    tags: ["Decorative", "Industrial", "Market Leader"],
    pitch: "Pitch our silane-based adhesion promoters for Apex Ultima exterior coatings and defoamers for their water-based emulsion paint lines. With $4.2B revenue and 50%+ market share, even small additive improvements translate to massive volume orders. Lead with a technical data package showing performance improvement in their specific formulation systems.",
    intelligence: "India's largest paint company. Centralized buying in Mumbai HQ but plants trigger requisitions. Khandala & Kasna plants are key.",
    status: "New"
  },
  {
    company: "Kansai Nerolac Paints",
    industry: "paints",
    region: "Maharashtra",
    city: "Mumbai (Lower Parel)",
    person: "Technical Purchase Manager",
    role: "Manager",
    website: "https://www.nerolac.com",
    linkedin: "https://www.linkedin.com/company/kansai-nerolac-paints-ltd",
    phone: "+91 22 2493 XXXX",
    source: "Public DB",
    tags: ["Automotive", "Industrial", "Powder Coating"],
    pitch: "Pitch our epoxy resins and hardeners for their automotive coatings line, plus low-VOC defoamer additives for their industrial paint range. Japanese parent company standards demand consistent quality and regulatory compliance \u2014 our low-VOC systems align with their sustainability targets. Propose a technical seminar on next-generation low-VOC coating additives for their R&D team.",
    intelligence: "Japanese parent (Kansai Paint). Strong quality standards. Manufacturing at Lote Parshuram. Needs low-VOC compliant additives.",
    status: "New"
  },
  {
    company: "Berger Paints India",
    industry: "paints",
    region: "Maharashtra",
    city: "Mumbai",
    person: "Procurement Manager (Resins)",
    role: "Procurement",
    website: "https://www.bergerpaints.com",
    linkedin: "https://www.linkedin.com/company/berger-paints-india",
    phone: "+91 22 6666 XXXX",
    source: "Public Listed",
    tags: ["Decorative", "Industrial", "Waterproofing"],
    pitch: "Pitch our waterproofing additives and silicone-based water repellents for their expanding waterproofing segment, plus defoamers for their decorative paint lines across 13 plants. Their strong push into waterproofing chemicals creates a new high-growth demand channel for our silicone technology. Offer a joint product development proposal for their next-generation waterproofing range.",
    intelligence: "Strong push into waterproofing chemicals segment. Looking for advanced technology partners.",
    status: "New"
  },
  {
    company: "Indigo Paints Ltd",
    industry: "paints",
    region: "Rajasthan",
    city: "Jodhpur",
    person: "Plant Head (Chemicals)",
    role: "Operations",
    website: "https://www.indigopaints.com",
    linkedin: "https://www.linkedin.com/company/indigo-paints",
    phone: "+91 291 XXX XXXX",
    source: "Public Listed",
    tags: ["Decorative", "Fast Growing", "2 Plants"],
    pitch: "Pitch our defoamers for their water-based emulsion paints and epoxy resin systems for their floor coating range at both Jodhpur production units. As a fast-growing challenger brand, they are more accessible for new vendor relationships than industry giants. Lead with competitive pricing and offer a free trial batch for their Jodhpur plant to evaluate.",
    intelligence: "HQ moving to Jodhpur production base. Fast-growing challenger brand. More accessible than Asian Paints for new vendor relationships.",
    status: "New"
  },
  {
    company: "Wonder Paints Pvt Ltd",
    industry: "paints",
    region: "Rajasthan",
    city: "Udaipur (Kaladwas)",
    person: "Technical Director",
    role: "Director",
    website: "https://wonderpaints.com",
    linkedin: "",
    phone: "+91 294 XXX XXXX",
    source: "Company Website",
    tags: ["Decorative", "Texture Paints", "BASF Partner"],
    pitch: "Pitch our defoamers for their water-based emulsion paint range and epoxy systems for their floor coatings. Their existing partnerships with BASF and Patcham Ltd show openness to quality chemical suppliers \u2014 position as a cost-effective domestic alternative. Offer a free trial batch and technical comparison data against imported additives.",
    intelligence: "Kaladwas, Udaipur. High-end decorative paints. Technical partnership with BASF suggests openness to quality chemical suppliers.",
    status: "New"
  },
  {
    company: "Rajasthan Coatings and Chemicals",
    industry: "paints",
    region: "Rajasthan",
    city: "Jodhpur",
    person: "Managing Director",
    role: "Director",
    website: "https://www.rajasthancoatings.com",
    linkedin: "",
    phone: "+91 291 XXX XXXX",
    source: "Company Website",
    tags: ["Paints", "Resins", "Pioneer"],
    pitch: "Pitch our epoxy resins and curing agents for their resin production line, leveraging their dual paint-and-resin manufacturing capability. As Western Rajasthan's first paint/resin manufacturer with 35+ years experience, they value long-term domestic supplier relationships. Lead with a competitive pricing proposal and offer technical support for their epoxy formulation development.",
    intelligence: "Pioneer in Western Rajasthan paint industry. 35+ years experience. Both paint and resin manufacturer - dual opportunity.",
    status: "New"
  },
  {
    company: "National Paint & Chemical Industries",
    industry: "paints",
    region: "Madhya Pradesh",
    city: "Indore (Sanwer Road)",
    person: "Proprietor",
    role: "Owner",
    website: "",
    linkedin: "",
    phone: "+91 731 XXX XXXX",
    source: "Industry Directory",
    tags: ["Industrial Paints", "ISO Certified", "Since 1969"],
    pitch: "Pitch our epoxy resins for their industrial coatings and defoamers for their cement paint and synthetic enamel production lines. With 50+ years of ISO-certified manufacturing, they need reliable domestic suppliers for consistent raw material quality. Offer a free product evaluation package with samples across their paint range.",
    intelligence: "Sanwer Road Industrial Area, Indore. Long-established manufacturer. ISO certified. Full range of industrial and decorative paints.",
    status: "New"
  },
  {
    company: "Raghav Chemicals",
    industry: "paints",
    region: "Madhya Pradesh",
    city: "Indore",
    person: "Owner",
    role: "Owner",
    website: "",
    linkedin: "",
    phone: "+91 731 XXX XXXX",
    source: "Trade Directory",
    tags: ["Epoxy Paint", "PU Paint", "Ultramarine"],
    pitch: "Pitch our epoxy resin systems and hardeners as raw materials for their epoxy coating range, plus TDI/MDI for their polyurethane paint formulations. As a specialist in epoxy and PU paints, they are a direct buyer of our core resin products with good volume potential. Lead with a competitive pricing proposal and offer just-in-time supply from our nearest warehouse.",
    intelligence: "Indore-based. Specializes in epoxy and polyurethane paints. Direct buyer of epoxy resins. Good volume potential.",
    status: "New"
  },
  {
    company: "Gujarat Colours & Coatings (GCCL)",
    industry: "paints",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "Factory Manager",
    role: "Operations",
    website: "",
    linkedin: "",
    phone: "+91 79 2583 XXXX",
    source: "Industry Dir",
    tags: ["Industrial Paints", "Solvents", "Automotive"],
    pitch: "Pitch our specialty resins and defoamer additives for their industrial paint and automotive coating lines. With 3+ decades in industrial paints, they are a reliable regional buyer in Gujarat \u2014 easier to onboard than national brands. Offer a free trial batch and propose a quarterly supply agreement with competitive pricing.",
    intelligence: "Regional leader in Gujarat. Automotive finishes are their strength. Easier entry point than national brands.",
    status: "New"
  },
  // ===================== PVC & PLASTICS =====================
  {
    company: "Supreme Industries Ltd",
    industry: "pvc",
    region: "Maharashtra",
    city: "Mumbai (Andheri East)",
    person: "VP Procurement (Raw Materials)",
    role: "VP Procurement",
    website: "https://www.supreme.co.in",
    linkedin: "https://www.linkedin.com/company/supreme-industries",
    phone: "+91 22 2821 XXXX",
    source: "Public Listed",
    tags: ["PVC", "CPVC", "HDPE", "#1 India"],
    pitch: "Pitch our Ca-Zn stabilizers for their lead-free PVC pipe formulations and PE waxes for processing across their 7.5+ lakh MT capacity. As India's #1 plastic piping company, they need BIS-compliant, lead-free stabilizers as regulatory pressure on lead-based systems increases. Propose a technical evaluation at their Gadegaon plant with free stabilizer trial batches.",
    intelligence: "Gadegaon plant (Maharashtra) is 130 acres + 13 other plants. Founded 1942. Centralized procurement in Mumbai.",
    status: "New"
  },
  {
    company: "Finolex Industries Ltd",
    industry: "pvc",
    region: "Maharashtra",
    city: "Pune",
    person: "Head of Sourcing",
    role: "Sourcing",
    website: "https://www.finolexpipes.com",
    linkedin: "https://www.linkedin.com/company/finolex-industries",
    phone: "+91 20 2714 XXXX",
    source: "Public Listed",
    tags: ["PVC", "CPVC", "uPVC", "Agriculture"],
    pitch: "Pitch our Ca-Zn stabilizers, impact modifiers, and processing aids for their 3.2+ lakh MT PVC pipe extrusion lines. As India's #2 pipe manufacturer with ~18% market share and strong agricultural focus, they need cost-effective lead-free stabilizer alternatives. Offer a plant-level trial with our Ca-Zn system and a cost comparison vs. their current stabilizer package.",
    intelligence: "Founded 1981. Pune-based manufacturing. Strong in agricultural PVC pipes. Quality-conscious procurement.",
    status: "New"
  },
  {
    company: "Prince Pipes & Fittings",
    industry: "pvc",
    region: "Maharashtra",
    city: "Mumbai",
    person: "Sourcing VP",
    role: "Director",
    website: "https://www.princepipes.com",
    linkedin: "https://www.linkedin.com/company/prince-pipes-and-fittings-ltd",
    phone: "+91 22 6602 XXXX",
    source: "Public Listed",
    tags: ["PVC", "CPVC", "PPR", "SWR"],
    pitch: "Pitch our Ca-Zn stabilizers and PE waxes for PVC extrusion across their rapidly expanding 4.2+ lakh MT capacity at Kolhapur and 6 other locations. With ~15% annual growth, their scaling production needs reliable domestic stabilizer supply with consistent quality. Lead with a competitive volume pricing proposal and offer free trial batches at their nearest plant.",
    intelligence: "Founded 1987. Kolhapur plant in Maharashtra + 6 other locations. Expanding rapidly in CPVC segment.",
    status: "New"
  },
  {
    company: "Astral Ltd (Pipes Division)",
    industry: "pvc",
    region: "Gujarat",
    city: "Ahmedabad (Santej)",
    person: "Vendor Development Lead",
    role: "Lead",
    website: "https://www.astralpipes.com",
    linkedin: "https://www.linkedin.com/company/astral-pipes",
    phone: "+91 79 6621 XXXX",
    source: "Public Listed",
    tags: ["CPVC", "Lead-Free", "25yr Warranty"],
    pitch: "Pitch our Ca-Zn stabilizers for their lead-free CPVC pipe lines and silanes for the adhesive products at their Resinova subsidiary. As India's CPVC pioneer with a quality-first procurement culture, they need stabilizers meeting their stringent 25-year warranty specifications. Propose a joint technical evaluation at their Santej plant with comprehensive test data.",
    intelligence: "Plants at Santej & Dholka (Gujarat), Sangli (Maharashtra). Also owns Resinova Adhesives. Quality-first procurement culture.",
    status: "New"
  },
  {
    company: "Jain Irrigation Systems",
    industry: "pvc",
    region: "Maharashtra",
    city: "Jalgaon",
    person: "Procurement Head (Polymers)",
    role: "Procurement",
    website: "https://www.jains.com",
    linkedin: "https://www.linkedin.com/company/jain-irrigation-systems",
    phone: "+91 257 225 XXXX",
    source: "Public Listed",
    tags: ["Micro-irrigation", "PVC", "PE", "Agriculture"],
    pitch: "Pitch our Ca-Zn stabilizers, UV absorbers for outdoor agricultural pipes, and processing aids for their 3+ lakh MT micro-irrigation pipe production. Outdoor irrigation pipes need superior UV stabilization to prevent field degradation \u2014 our UV absorber packages are specifically formulated for agricultural pipe applications. Offer a field performance case study and free trial batch for their Jalgaon plant.",
    intelligence: "Founded 1986. Jalgaon-based. Pioneer in micro-irrigation. Strong agricultural focus. Large volumes.",
    status: "New"
  },
  {
    company: "Raina Industries Ltd",
    industry: "pvc",
    region: "Rajasthan",
    city: "Dholpur",
    person: "Plant Manager",
    role: "Operations",
    website: "https://www.rainaindustries.com",
    linkedin: "",
    phone: "+91 5642 XXX XXX",
    source: "Company Website",
    tags: ["PVC Pipes", "HDPE", "Water Tanks"],
    pitch: "Pitch our Ca-Zn stabilizers and PE waxes for their PVC pipe extrusion lines and HDPE processing at their Dholpur RIICO facility. As a regional leader in Rajasthan with 20+ years experience, they benefit from a reliable nearby supplier reducing lead times and logistics costs. Lead with a competitive landed-cost comparison and offer free trial samples.",
    intelligence: "Dholpur, RIICO Industrial Area. Manufactures PVC pipes, HDPE pipes, multi-layer water storage tanks. Regional leader in Rajasthan.",
    status: "New"
  },
  {
    company: "Tijaria Poly Pipes Ltd",
    industry: "pvc",
    region: "Rajasthan",
    city: "Jaipur (Sitapura RIICO)",
    person: "Purchase Manager",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 9314 669 000",
    source: "Industry Directory",
    tags: ["PVC", "HDPE", "UPVC", "DWC Pipes"],
    pitch: "Pitch our Ca-Zn stabilizers and impact modifiers for their diversified PVC, HDPE, UPVC, and DWC pipe extrusion lines in Sitapura RIICO. Their diversified pipe portfolio means multiple stabilizer and additive requirements from a single supplier \u2014 simplifying their procurement. Offer a consolidated product portfolio presentation with free samples for each pipe type.",
    intelligence: "Sitapura RIICO, Jaipur. 4.5/5 rating. Diversified pipe manufacturer. Good target for stabilizer and processing aid sales.",
    status: "New"
  },
  {
    company: "Hindustan Pipes & Fittings",
    industry: "pvc",
    region: "Rajasthan",
    city: "Jaipur (Jhotwara)",
    person: "Director",
    role: "Director",
    website: "http://www.hindustanpipe.com",
    linkedin: "",
    phone: "+91 8045 476 238",
    source: "Company Website",
    tags: ["Rigid PVC", "uPVC", "SWR", "ISO Certified"],
    pitch: "Pitch our Ca-Zn stabilizers for their lead-free transition across rigid PVC, elastomeric uPVC, and column pipe lines. ISO-certified operations need documented, BIS-compliant stabilizer systems as the industry shifts away from lead-based stabilizers. Offer a complete lead-free transition support package with technical guidance and trial batches.",
    intelligence: "Jhotwara Extension, Jaipur. Certified manufacturer. Strong in agricultural and plumbing PVC pipe segments.",
    status: "New"
  },
  {
    company: "Vigor Plast India Pvt Ltd",
    industry: "pvc",
    region: "Gujarat",
    city: "Jamnagar",
    person: "Director",
    role: "Director",
    website: "https://www.vigorplastindia.com",
    linkedin: "",
    phone: "+91 288 274 XXXX",
    source: "Company Website",
    tags: ["CPVC", "uPVC", "SWR", "BIS Certified"],
    pitch: "Pitch our Ca-Zn stabilizers and processing aids for their CPVC and uPVC pipe production as they scale toward Rs 100 Cr turnover. Fast-growing manufacturers need a responsive domestic supplier that can scale with their production growth. Lead with a flexible MOQ proposal and offer dedicated technical support for their formulation optimization.",
    intelligence: "Fast-growing Gujarat manufacturer. BIS & ISO certified. More accessible than large players for new vendor partnerships.",
    status: "New"
  },
  // ===================== CONSTRUCTION CHEMICALS =====================
  {
    company: "Pidilite Industries",
    industry: "construction",
    region: "Maharashtra",
    city: "Mumbai (Andheri East)",
    person: "Procurement Head (Chemicals)",
    role: "VP Procurement",
    website: "https://www.pidilite.com",
    linkedin: "https://www.linkedin.com/company/pidilite-industries-limited",
    phone: "+91 22 2835 XXXX",
    source: "Public Listed",
    tags: ["Dr. Fixit", "Fevicol", "Waterproofing"],
    pitch: "Pitch our silanes for their Dr. Fixit waterproofing range and defoamers for Fevicol adhesive manufacturing lines. As the market leader with 40-50% share, their next-gen low-VOC waterproofing systems need advanced silane chemistry for superior performance. Propose a joint R&D collaboration for their next-generation waterproofing formulations.",
    intelligence: "Dominant construction chemicals player. Entry barrier is high, but volume is massive. Mahad plant is key manufacturing hub.",
    status: "New"
  },
  {
    company: "Sika India Pvt Ltd",
    industry: "construction",
    region: "Maharashtra",
    city: "Mumbai",
    person: "Category Manager (Raw Materials)",
    role: "Procurement",
    website: "https://in.sika.com",
    linkedin: "https://www.linkedin.com/company/sika-india",
    phone: "+91 22 2856 XXXX",
    source: "MNC",
    tags: ["Admixtures", "Waterproofing", "Flooring"],
    pitch: "Pitch our defoamers for concrete admixture production and silicone-based waterproofing membrane components for their construction chemicals range. Sika's Swiss-standard quality requirements align with our pharma-grade manufacturing processes and full traceability documentation. Offer a technical presentation on defoamer performance in high-performance concrete admixtures.",
    intelligence: "Focus on metro tunnels, expressways, and infrastructure. Strong quality standards from Swiss HQ.",
    status: "New"
  },
  {
    company: "Fosroc Chemicals India",
    industry: "construction",
    region: "Rajasthan",
    city: "Keshwana",
    person: "Plant Manager",
    role: "Operations",
    website: "https://www.fosroc.com",
    linkedin: "https://www.linkedin.com/company/fosroc",
    phone: "+91 1462 XXX XXX",
    source: "Manufacturing Plant",
    tags: ["Waterproofing", "Admixtures", "Manufacturing"],
    pitch: "Pitch our defoamers for their concrete admixture manufacturing and silicone-based water repellent components for their waterproofing product line at Keshwana plant. Proximity of supply to their Rajasthan manufacturing plant reduces logistics costs and enables just-in-time delivery. Offer a plant visit to demonstrate defoamer performance in their specific admixture formulations.",
    intelligence: "Rajasthan manufacturing plant for Fosroc India. Good proximity for supply of raw materials. 80+ years global experience.",
    status: "New"
  },
  {
    company: "Redwop Chemicals Pvt Ltd",
    industry: "construction",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "Director",
    role: "Director",
    website: "https://www.redwop.net",
    linkedin: "https://www.linkedin.com/company/redwop",
    phone: "+91 79 4890 XXXX",
    source: "Company Website",
    tags: ["Tile Adhesive", "Waterproofing", "Eco-friendly"],
    pitch: "Pitch our silicone-based water repellents for their waterproofing range and epoxy systems for their tile adhesive and flooring product lines. With 1000+ distributors and eco-friendly positioning, they need raw materials that align with their sustainability commitment. Offer a free product evaluation and propose a co-development project for their eco-friendly waterproofing range.",
    intelligence: "Gujarat-based with 1000+ distributors. Eco-friendly manufacturing. Growing fast in Western India. Accessible for new vendors.",
    status: "New"
  },
  {
    company: "Siddhi Vinayak Construction Chemical",
    industry: "construction",
    region: "Madhya Pradesh",
    city: "Satna",
    person: "Managing Director",
    role: "Director",
    website: "https://www.svccpl.com",
    linkedin: "",
    phone: "+91 7672 XXX XXX",
    source: "Company Website",
    tags: ["Waterproofing", "Tile Adhesive", "Regional"],
    pitch: "Pitch our silicone-based water repellents for their post-construction waterproofing range and epoxy systems for their tile adhesive formulations. As a regional manufacturer in Satna, they benefit from a reliable domestic supplier with shorter lead times and competitive pricing. Lead with free samples and a technical comparison vs. their current raw material suppliers.",
    intelligence: "Satna Industrial Area, MP. Regional construction chemicals manufacturer. Accessible for new vendor relationships.",
    status: "New"
  },
  {
    company: "Chemax Chemicals",
    industry: "construction",
    region: "Madhya Pradesh",
    city: "Indore",
    person: "Technical Head",
    role: "Technical",
    website: "https://chemaxchemical.com",
    linkedin: "",
    phone: "+91 731 XXX XXXX",
    source: "Company Website",
    tags: ["Waterproofing", "Tile Adhesive", "Multi-state"],
    pitch: "Pitch our silicone-based sealant compounds, water repellents for waterproofing, and epoxy resin systems for their flooring product range. Their multi-state coverage across Maharashtra, Gujarat, Kerala, and MP means consolidated sourcing from one supplier simplifies their procurement. Propose a supply partnership with competitive pricing and technical support across their product lines.",
    intelligence: "Indore-based with multi-state coverage. Construction chemicals and waterproofing specialist. Growing company.",
    status: "New"
  },
  // ===================== AGRICULTURE & AGROCHEMICALS =====================
  {
    company: "UPL Ltd",
    industry: "agriculture",
    region: "Maharashtra",
    city: "Mumbai (Sion)",
    person: "Head of Procurement (Formulations)",
    role: "VP Procurement",
    website: "https://www.upl-ltd.com",
    linkedin: "https://www.linkedin.com/company/upl",
    phone: "+91 22 2407 XXXX",
    source: "Public Listed",
    tags: ["Insecticides", "Fungicides", "Global #5"],
    pitch: "Pitch our silicone-based spray adjuvants (organosilicone wetting agents) to enhance pesticide leaf coverage and reduce water usage across their insecticide and fungicide formulations. As the world's 5th largest agrochemical company with Rs 41,390 Cr revenue, even a 1% efficiency improvement on spray performance generates massive value. Propose a field trial partnership demonstrating improved efficacy with our spray adjuvants on key crop-pesticide combinations.",
    intelligence: "HQ in Sion, Mumbai. Global operations in 138 countries. Massive volume buyer. Focused on sustainable agriculture solutions.",
    status: "New"
  },
  {
    company: "Rallis India Ltd (Tata Group)",
    industry: "agriculture",
    region: "Maharashtra",
    city: "Mumbai (Santacruz East)",
    person: "Procurement Manager",
    role: "Procurement",
    website: "https://www.rallis.com",
    linkedin: "https://www.linkedin.com/company/rallis-india",
    phone: "+91 22 6676 XXXX",
    source: "Public Listed",
    tags: ["Tata Group", "Pesticides", "Since 1948"],
    pitch: "Pitch our silicone-based spray adjuvants for improved leaf coverage and reduced spray drift in their crop protection formulations, plus antifoams for their manufacturing processes. Tata Group's quality standards mean they need well-documented, tested adjuvant systems with proven field performance data. Offer published field trial results and propose a joint efficacy study on their key pesticide formulations.",
    intelligence: "AIMCO House, Santacruz East. Tata-backed means high quality standards. Multiple manufacturing units. Well-established procurement process.",
    status: "New"
  },
  {
    company: "Sharda Cropchem",
    industry: "agriculture",
    region: "Maharashtra",
    city: "Mumbai (Vile Parle West)",
    person: "Sourcing Head",
    role: "Sourcing",
    website: "https://www.shardacropchem.com",
    linkedin: "https://www.linkedin.com/company/sharda-cropchem",
    phone: "+91 22 2618 XXXX",
    source: "Public Listed",
    tags: ["Export", "Formulations", "Biocides"],
    pitch: "Pitch our silicone-based spray adjuvants for their export agrochemical formulations, ensuring compliance with international regulatory requirements across target markets. As an export-heavy company, adjuvants meeting EU and US EPA standards give their products a competitive edge in global markets. Lead with our international regulatory compliance documentation and offer formulation-specific adjuvant recommendations.",
    intelligence: "Vile Parle West, Mumbai. Export-heavy agrochemical company. Looking for additives that comply with international regulations.",
    status: "New"
  },
  {
    company: "Biostadt India Ltd",
    industry: "agriculture",
    region: "Maharashtra",
    city: "Mumbai",
    person: "R&D Director",
    role: "Technical",
    website: "https://www.biostadtindia.com",
    linkedin: "https://www.linkedin.com/company/biostadt-india",
    phone: "+91 22 XXXX XXXX",
    source: "Industry Directory",
    tags: ["Biological", "Chemical", "Pan-India"],
    pitch: "Pitch our silicone-based wetting agents and sticker-spreader adjuvants to improve spray coverage in both their biological and chemical pesticide formulations. Silicone adjuvants are particularly effective with biological formulations where leaf penetration and retention are critical for efficacy. Propose a field demonstration trial comparing spray performance with and without our adjuvants on their key products.",
    intelligence: "Pan-India presence. Growing in biological crop protection. Silicone adjuvants complement their biological formulations well.",
    status: "New"
  },
  {
    company: "PI Industries Ltd",
    industry: "agriculture",
    region: "Gujarat",
    city: "Bharuch (3 Plants)",
    person: "VP Supply Chain",
    role: "VP Supply Chain",
    website: "https://www.piindustries.com",
    linkedin: "https://www.linkedin.com/company/pi-industries",
    phone: "+91 2642 XXX XXX",
    source: "Public Listed",
    tags: ["Custom Synthesis", "Agri-Sciences", "R&D"],
    pitch: "Pitch our spray adjuvants for their agrochemical formulations and antifoams for manufacturing at their 3 Gujarat plants. Their strong R&D capability at the Udaipur center makes them receptive to technical data on adjuvant-formulation compatibility studies. Propose a collaborative R&D evaluation at their Udaipur center with customized adjuvant samples for their specific formulations.",
    intelligence: "Multiple plants in Gujarat. Strong custom synthesis business. Quality-conscious with strong R&D. Udaipur R&D center.",
    status: "New"
  },
  {
    company: "Meghmani Organics Ltd",
    industry: "agriculture",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "Procurement Head (Additives)",
    role: "Procurement",
    website: "https://www.meghmani.com",
    linkedin: "https://www.linkedin.com/company/meghmani-organics",
    phone: "+91 79 2656 XXXX",
    source: "Public Listed",
    tags: ["Insecticides", "Pigments", "Rs 2195 Cr"],
    pitch: "Pitch our silicone spray adjuvants for their insecticide formulations and antifoam agents for their manufacturing processes at multiple Gujarat plants. With Rs 2,195 Cr revenue and diversified chemical manufacturing, they can evaluate both agrochemical adjuvants and industrial antifoams from a single supplier. Offer a dual-product trial covering spray adjuvants for their formulations and process antifoams for manufacturing.",
    intelligence: "Ahmedabad-based. Also makes pigments. Multiple manufacturing units in Gujarat. Diversified chemical company.",
    status: "New"
  },
  {
    company: "Dhanuka Agritech",
    industry: "agriculture",
    region: "Rajasthan",
    city: "Chopanki (Alwar)",
    person: "Plant Head",
    role: "Operations",
    website: "https://www.dhanuka.com",
    linkedin: "https://www.linkedin.com/company/dhanuka-agritech",
    phone: "+91 1493 XXX XXX",
    source: "Public Listed",
    tags: ["Herbicides", "Fungicides", "Forbes Listed"],
    pitch: "Pitch our silicone-based spray adjuvants and wetting agents for their herbicide and fungicide formulations at their recently expanded Chopanki plant. Their ~50% capacity expansion means increased demand for formulation additives \u2014 positioning us early secures volume as they scale up. Lead with a free trial batch timed to their expansion ramp-up and offer field efficacy data.",
    intelligence: "Chopanki, Rajasthan manufacturing plant. Recently expanded capacity ~50%. Growing rapidly. Good entry point for Rajasthan market.",
    status: "New"
  },
  {
    company: "Gharda Chemicals",
    industry: "agriculture",
    region: "Gujarat",
    city: "Bharuch",
    person: "Purchase Manager",
    role: "Procurement",
    website: "https://www.gharda.com",
    linkedin: "https://www.linkedin.com/company/gharda-chemicals",
    phone: "+91 2642 XXX XXX",
    source: "Industry Directory",
    tags: ["Agrochemicals", "4 Plants", "Since 1967"],
    pitch: "Pitch our spray adjuvants to enhance crop protection formulation efficacy and antifoams for production across their 4 manufacturing units in Bharuch. With 55+ years in agrochemicals, they value proven, reliable suppliers \u2014 our consistent supply track record and technical support are key differentiators. Offer a multi-plant supply proposal with competitive pricing for annual contracts.",
    intelligence: "Bharuch, Gujarat. 4 manufacturing units. Long-established agrochemical manufacturer. Consistent quality buyer.",
    status: "New"
  },
  {
    company: "Bharat Rasayan Ltd",
    industry: "agriculture",
    region: "Gujarat",
    city: "Bharuch (Dahej)",
    person: "Procurement Manager",
    role: "Procurement",
    website: "https://www.bharatrasayan.com",
    linkedin: "https://www.linkedin.com/company/bharat-rasayan",
    phone: "+91 2642 XXX XXX",
    source: "Public Listed",
    tags: ["Pesticides", "Fungicides", "Dahej Plant"],
    pitch: "Pitch our silicone-based spray adjuvants for their pesticide and fungicide formulations and antifoams for their Dahej SEZ manufacturing operations. Dahej's proximity to our supply chain enables cost-effective just-in-time delivery, reducing their inventory holding costs. Lead with a logistics cost-saving proposal and offer free adjuvant samples for formulation compatibility testing.",
    intelligence: "Dahej SEZ, Bharuch. Major agrochemical manufacturer. Pesticides, fungicides, herbicides, and acaricides.",
    status: "New"
  },
  // ===================== PAPER & PULP =====================
  {
    company: "Murli Industries Limited",
    industry: "paper_pulp",
    region: "Maharashtra",
    city: "Nagpur",
    person: "Purchase Manager",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 712 XXX XXXX",
    source: "Industry Directory",
    tags: ["Duplex Board", "1000+ Employees", "Nagpur"],
    pitch: "Pitch our Simethicone-based antifoams for foam control in their grey back duplex board pulping, washing, and forming stages. With 1000+ employees and large-scale production, even a small efficiency gain in foam management translates to significant cost savings. Our silicone antifoams offer superior persistence compared to mineral oil defoamers, reducing dosage frequency. Lead with a free plant trial to demonstrate reduced chemical consumption and improved drainage.",
    intelligence: "Nagpur-based. One of Maharashtra's larger paper mills. Grey back duplex board production. Volume buyer of process chemicals.",
    status: "New"
  },
  {
    company: "Ganga Papers India Ltd",
    industry: "paper_pulp",
    region: "Maharashtra",
    city: "Pune (Maval)",
    person: "Factory Manager",
    role: "Operations",
    website: "",
    linkedin: "",
    phone: "+91 2114 XXX XXX",
    source: "Industry Directory",
    tags: ["Paper Manufacturing", "Pune Region"],
    pitch: "Pitch our silicone-based defoamers for wet-end paper manufacturing \u2014 controlling foam during stock preparation, forming, and pressing stages. Their Pune-region location means fast delivery and responsive technical support from Fabrevol's nearby operations. Our antifoams reduce sheet defects caused by entrained air and improve drainage rates. Offer a free on-site trial with dosage optimization to demonstrate measurable production improvements.",
    intelligence: "Village Bebedobal, Maval, Pune. Paper manufacturing. Good proximity for regular supply of process chemicals.",
    status: "New"
  },
  {
    company: "Bell Multikraft Pvt Ltd (BMK)",
    industry: "paper_pulp",
    region: "Gujarat",
    city: "Morbi (Jambudiya)",
    person: "Procurement Head",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 2822 XXX XXX",
    source: "Industry Directory",
    tags: ["Kraft Paper", "350+ Employees", "65000 sqm"],
    pitch: "Pitch our silicone antifoams for their kraft paper pulping and black liquor processing at their 65,000 sqm facility. Kraft manufacturing generates heavy foam during cooking and washing \u2014 our antifoams maintain effectiveness at the high temperatures and alkaline pH typical of kraft processes. Consistent supply from our Gujarat operations ensures zero production downtime. Propose a free dosage trial targeting their highest-foam production line.",
    intelligence: "Jambudiya, Morbi. One of Gujarat's larger paper mills. Kraft paper specialist. Volume buyer of paper chemicals.",
    status: "New"
  },
  {
    company: "Tirthak Paper Mill Pvt Ltd",
    industry: "paper_pulp",
    region: "Gujarat",
    city: "Morbi",
    person: "Director",
    role: "Director",
    website: "",
    linkedin: "",
    phone: "+91 2822 XXX XXX",
    source: "Industry Directory",
    tags: ["Paper Mill", "Morbi Hub", "Since 2006"],
    pitch: "Pitch our silicone-based antifoams and defoamers for their paper production lines to reduce foam-related downtime and improve machine speed. As part of the Tirthak Multi Papers group with growing capacity since 2006, they need a reliable antifoam supplier who can scale with their expansion. Our products offer longer knockdown time than conventional defoamers, reducing re-dosing costs. Lead with a competitive pricing proposal and free trial samples.",
    intelligence: "Morbi, Gujarat. Part of Morbi paper hub. Established paper manufacturer with growing capacity.",
    status: "New"
  },
  {
    company: "N.R. Agarwal Industries Limited",
    industry: "paper_pulp",
    region: "Gujarat",
    city: "Vapi (Valsad)",
    person: "VP Operations",
    role: "VP Operations",
    website: "",
    linkedin: "",
    phone: "+91 260 XXX XXXX",
    source: "Industry Directory",
    tags: ["Paper Manufacturing", "GIDC Vapi", "Large Scale"],
    pitch: "Pitch our silicone antifoams for paper production and silicone-based release agents for their coating operations at GIDC Vapi. As a large-scale manufacturer in Gujarat's industrial corridor, they consume significant volumes of process chemicals monthly. Our antifoams provide superior deaeration compared to fatty acid-based alternatives, improving paper quality and reducing breaks. Offer a volume pricing proposal with a free technical evaluation at their plant.",
    intelligence: "GIDC Vapi, Valsad. Major paper manufacturing operation in Gujarat's industrial corridor.",
    status: "New"
  },
  {
    company: "Rama Newsprint & Papers Ltd",
    industry: "paper_pulp",
    region: "Gujarat",
    city: "Surat (Barbodhan)",
    person: "Plant Head",
    role: "Operations",
    website: "",
    linkedin: "",
    phone: "+91 261 XXX XXXX",
    source: "Industry Directory",
    tags: ["Newsprint", "Surat", "Large Mill"],
    pitch: "Pitch our silicone antifoams specifically formulated for de-inking and newsprint recycling processes where foam control is critical for fiber recovery. Newsprint manufacturing from recycled fiber generates persistent foam during de-inking, screening, and cleaning \u2014 our antifoams are effective at low dosages without causing spots or fisheyes on the finished sheet. Reliable local supply from our Gujarat operations ensures uninterrupted production. Offer a free de-inking process trial with before-and-after quality assessment.",
    intelligence: "Barbodhan, Olpad, Surat. Newsprint manufacturer. Large-scale operation requiring regular supply of paper chemicals.",
    status: "New"
  },
  {
    company: "Nepa Mills Limited",
    industry: "paper_pulp",
    region: "Madhya Pradesh",
    city: "Nepanagar (Burhanpur)",
    person: "General Manager (Purchase)",
    role: "GM Procurement",
    website: "",
    linkedin: "",
    phone: "+91 7325 XXX XXX",
    source: "Government Mill",
    tags: ["Newsprint", "Government", "Historic"],
    pitch: "Pitch our silicone antifoams for their newsprint manufacturing process and wastewater treatment operations at this historic government mill. Government facilities typically use established supplier lists \u2014 our competitive pricing and consistent quality can help them meet cost-reduction targets while improving production efficiency. Offer a formal quotation with full technical data sheets and government procurement-compatible documentation.",
    intelligence: "Nepanagar, Burhanpur, MP. Historic government paper mill. Established supplier relationships but open to competitive offerings.",
    status: "New"
  },
  {
    company: "Jabali Papers Ltd",
    industry: "paper_pulp",
    region: "Madhya Pradesh",
    city: "Jabalpur",
    person: "Factory Manager",
    role: "Operations",
    website: "",
    linkedin: "",
    phone: "+91 761 XXX XXXX",
    source: "Industry Directory",
    tags: ["Kraft Paper", "Advanced Machinery", "12 BF Range"],
    pitch: "Pitch our premium silicone antifoams for their advanced kraft paper production lines, targeting pulp washing and brown stock washing stages. Their investment in latest machinery indicates a quality-focused operation that would benefit from high-performance antifoams over commodity defoamers. Our antifoams are compatible with their 12 BF range production and won't cause depositing issues on modern equipment. Lead with a technical presentation and free trial batch matched to their specific kraft grade.",
    intelligence: "Jabalpur, MP. Advanced kraft paper manufacturer. Latest machinery suggests quality-conscious operation. Good target for premium antifoams.",
    status: "New"
  },
  // ===================== WATER TREATMENT =====================
  {
    company: "Ion Exchange (India) Ltd",
    industry: "water_treatment",
    region: "Maharashtra",
    city: "Mumbai (Mahalaxmi)",
    person: "Head of Chemical Procurement",
    role: "VP Procurement",
    website: "https://www.ionexchangeindia.com",
    linkedin: "https://www.linkedin.com/company/ion-exchange-india",
    phone: "+91 22 2493 XXXX",
    source: "Public Listed",
    tags: ["Ion Exchange Resins", "Membrane Tech", "Market Leader"],
    pitch: "Pitch our silicone-based antifoams for their RO membrane cleaning formulations, boiler water treatment chemicals, and cooling tower operations across India. As the market leader, they formulate and supply chemicals to thousands of industrial customers \u2014 making them a high-volume channel partner for our antifoam concentrates. Our antifoams offer superior thermal stability for boiler applications and membrane compatibility for RO systems. Propose a bulk supply agreement with technical support for formulation optimization.",
    intelligence: "Ion House, Dr. E. Moses Road, Mahalaxmi. Listed company. Large-scale operations across India. Volume buyer of water treatment chemicals.",
    status: "New"
  },
  {
    company: "Thermax Ltd",
    industry: "water_treatment",
    region: "Maharashtra",
    city: "Pune",
    person: "Procurement Manager (Chemicals)",
    role: "Procurement",
    website: "https://www.thermaxglobal.com",
    linkedin: "https://www.linkedin.com/company/thermax",
    phone: "+91 20 6630 XXXX",
    source: "Public Listed",
    tags: ["ETPs", "STPs", "ZLD Systems", "Boiler Chemicals"],
    pitch: "Pitch our silicone antifoams for their boiler water treatment formulations, cooling water chemicals, and ETP/STP/ZLD system applications. Thermax's multi-project operations across India require bulk antifoam supply with consistent quality batch-to-batch \u2014 our manufacturing scale ensures that reliability. Our antifoams withstand the high-temperature, high-TDS conditions common in ZLD systems where conventional defoamers fail. Offer a technical collaboration meeting to customize antifoam grades for their specific ETP and boiler chemical formulations.",
    intelligence: "Pune HQ. Founded 1980. Boiler/cooling water chemicals plus ETP/STP solutions. Large-scale procurement for multiple projects.",
    status: "New"
  },
  {
    company: "Chembond Chemicals Ltd",
    industry: "water_treatment",
    region: "Maharashtra",
    city: "Mumbai",
    person: "Technical Sales Head",
    role: "Technical",
    website: "https://www.chembondindia.com",
    linkedin: "https://www.linkedin.com/company/chembond-chemicals",
    phone: "+91 22 2541 XXXX",
    source: "BSE/NSE Listed",
    tags: ["Specialty Chemicals", "Water Tech", "Since 1974"],
    pitch: "Pitch our antifoam concentrates for their water treatment chemical formulations and silicone-based water repellents for their construction chemicals division. As a BSE/NSE-listed company since 1974, they have established procurement processes \u2014 but our competitive pricing on domestic antifoam supply vs. imports creates a compelling cost advantage. Offer a dual-product sample kit covering both water treatment antifoams and construction water repellents to maximize the relationship.",
    intelligence: "Mumbai HQ. Specialty chemicals for water technologies and construction chemicals. Listed company. Established procurement processes.",
    status: "New"
  },
  {
    company: "Gujarat Alkalies and Chemicals (GACL)",
    industry: "water_treatment",
    region: "Gujarat",
    city: "Vadodara & Dahej",
    person: "GM Procurement",
    role: "GM",
    website: "https://www.gacl.com",
    linkedin: "https://www.linkedin.com/company/gacl",
    phone: "+91 265 239 XXXX",
    source: "Public Listed",
    tags: ["Caustic Soda", "PAC", "Chloromethanes", "Export"],
    pitch: "Pitch our silicone antifoams for foam control in their chlor-alkali electrolysis, hydrogen peroxide production, and PAC manufacturing processes. Their dual manufacturing complexes in Vadodara and Dahej serving 25+ export countries need process chemicals meeting international quality standards. Our antifoams are thermally stable and chemically resistant to the caustic conditions in their brine processing. Propose a multi-plant supply agreement covering both Vadodara and Dahej facilities.",
    intelligence: "Two major manufacturing complexes in Vadodara & Dahej. Exports to 25+ countries. Large chemical operation with multiple antifoam applications.",
    status: "New"
  },
  {
    company: "Fineotex Chemical Limited",
    industry: "water_treatment",
    region: "Maharashtra",
    city: "Ambernath",
    person: "R&D Head",
    role: "Technical",
    website: "https://www.fineotex.com",
    linkedin: "https://www.linkedin.com/company/fineotex-chemical",
    phone: "+91 251 XXX XXXX",
    source: "Public Listed",
    tags: ["Specialty Chemicals", "Water Treatment", "Expansion"],
    pitch: "Pitch our silicone antifoam concentrates and specialty additives for their expanding water treatment chemical portfolio, timed with their Rs 270M facility expansion. Their growing product range needs reliable raw material supply \u2014 our antifoam concentrates can be formulated into their branded product lines. Early engagement before their new capacity comes online secures a preferred supplier position. Propose a technical meeting to align our product grades with their expansion plans.",
    intelligence: "Ambernath, Maharashtra. Recent capacity expansions. Specialty chemicals manufacturer. Growing water treatment portfolio.",
    status: "New"
  },
  {
    company: "Pennar Industries Limited",
    industry: "water_treatment",
    region: "Telangana",
    city: "Hyderabad (Kondapur)",
    person: "Business Head (Chemicals)",
    role: "Business Head",
    website: "https://www.pennarindia.com",
    linkedin: "https://www.linkedin.com/company/pennar-industries",
    phone: "+91 40 4021 XXXX",
    source: "Public Listed",
    tags: ["PENNTREAT", "Boiler Chemicals", "Cooling Water"],
    pitch: "Pitch our silicone antifoams for incorporation into their PENNTREAT boiler water treatment, cooling water, and RO antiscalant formulations. Their diversified chemical division formulates branded products that require high-quality antifoam concentrates as raw material. Our domestic supply offers significant cost savings vs. imported antifoam grades, improving their formulation margins. Lead with competitive bulk pricing and offer technical support for antifoam integration into their PENNTREAT product line.",
    intelligence: "Kondapur, Hyderabad. Diversified company with chemical division. PENNTREAT is their water treatment chemical brand.",
    status: "New"
  },
  // ===================== LEATHER =====================
  {
    company: "Veera Tanneries Pvt Ltd",
    industry: "leather",
    region: "Maharashtra",
    city: "Mumbai (Dharavi)",
    person: "Director",
    role: "Director",
    website: "https://veratan.com",
    linkedin: "",
    phone: "+91 22 2407 XXXX",
    source: "LWG Gold Rated",
    tags: ["Chrome-free Leather", "LWG Gold", "Since 1978"],
    pitch: "Pitch our silicone-based water repellents and leather softeners for their organic and chrome-free finished leather processing. Their LWG Gold certification demands environmentally responsible chemicals \u2014 our silicone softeners are non-toxic and biodegradable, aligning with their sustainability standards. Premium chrome-free leather commands higher margins, justifying investment in quality finishing agents. Offer free samples of our water repellent and softener range with full environmental compliance documentation.",
    intelligence: "266 Innawadi, Kalyanwadi Road, Dharavi. Est. 1978. LWG Gold certification means highest environmental standards. Premium buyer of chemicals.",
    status: "New"
  },
  {
    company: "Kangaroo Leather Pvt Ltd",
    industry: "leather",
    region: "Maharashtra",
    city: "Bhiwandi (Thane)",
    person: "Production Head",
    role: "Operations",
    website: "https://www.kangarooleather.in",
    linkedin: "",
    phone: "+91 2522 XXX XXX",
    source: "Company Website",
    tags: ["Leather Belts", "Leather Goods", "Export"],
    pitch: "Pitch our silicone-based water repellents and leather finishing sprays for their formal and casual leather belt production lines. Export-oriented leather goods need durable water resistance and a premium hand-feel \u2014 our silicone finishes deliver both without affecting dye adhesion. Domestic supply ensures shorter lead times vs. imported finishing chemicals, helping them meet tight export deadlines. Lead with free application trials on their current belt leather grades.",
    intelligence: "Jai Jalaram Complex, Bhiwandi. Leather goods manufacturer. Export-oriented. Uses finishing chemicals in production.",
    status: "New"
  },
  {
    company: "Dadia Chemical Industries",
    industry: "leather",
    region: "Maharashtra",
    city: "Mumbai (Ghatkopar East)",
    person: "Managing Director",
    role: "Director",
    website: "https://www.dadiachemicals.com",
    linkedin: "",
    phone: "+91 22 2510 XXXX",
    source: "Company Website",
    tags: ["Tanning Chemicals", "Supplier to Tanneries"],
    pitch: "Pitch our silicone softeners and water-repellent finishes as additions to their existing tanning chemical range for distribution to tanneries. As a chemical supplier rather than end-user, they represent a channel partner opportunity \u2014 our products complement their existing portfolio without competing. Bundling our silicone finishes with their tanning chemicals creates a one-stop offering for their tannery customers. Propose a distributor agreement with attractive margins and free product training for their sales team.",
    intelligence: "Ghatkopar East, Mumbai. Supplier of tanning chemicals to tanneries. Potential channel partner for selling Resil products to tanneries.",
    status: "New"
  },
  {
    company: "L.V. Associates",
    industry: "leather",
    region: "Rajasthan",
    city: "Udaipur (Girwa)",
    person: "Proprietor",
    role: "Owner",
    website: "",
    linkedin: "",
    phone: "+91 294 XXX XXXX",
    source: "Industry Directory",
    tags: ["Finished Leather", "Udaipur"],
    pitch: "Pitch our silicone-based leather softeners and water-repellent finishing agents for their finished leather processing in Udaipur. As a regional manufacturer, they likely source finishing chemicals from distant suppliers \u2014 our responsive supply chain offers faster delivery and technical support for their Rajasthan operations. Our silicone softeners impart a luxurious hand-feel that commands premium pricing for their finished leather. Offer a free sample kit with application guidelines tailored to their leather grades.",
    intelligence: "21, Rajshree Colony, Girwa, Udaipur. Finished leather processor. Regional target for Rajasthan market entry.",
    status: "New"
  },
  // ===================== WIRE & CABLE =====================
  {
    company: "Polycab India Limited",
    industry: "wire_cable",
    region: "Gujarat",
    city: "Halol / Daman / Kutch",
    person: "VP Procurement (Compounds)",
    role: "VP Procurement",
    website: "https://www.polycab.com",
    linkedin: "https://www.linkedin.com/company/polycab",
    phone: "+91 260 XXX XXXX",
    source: "Public Listed",
    tags: ["PVC Cables", "Market Leader", "10 Plants"],
    pitch: "Pitch our Ca-Zn stabilizers for lead-free PVC cable insulation compounds across their 10 manufacturing units in Halol, Daman, and Kutch. As India's largest wire manufacturer with Rs 8,186 Cr turnover, even a small share of their stabilizer consumption represents massive volume. Our Ca-Zn systems meet EU RoHS and REACH compliance, critical for their growing export business. Propose a multi-plant supply agreement with competitive volume pricing and free processing trials.",
    intelligence: "Turnover Rs 8,186 Cr. Plants in Halol, Daman, Kutch. Market leader in PVC insulated wires. Massive volume buyer of PVC compounds and stabilizers.",
    status: "New"
  },
  {
    company: "Finolex Cables Limited",
    industry: "wire_cable",
    region: "Maharashtra",
    city: "Pune (Pimpri)",
    person: "Head of Sourcing (Raw Materials)",
    role: "Sourcing",
    website: "https://www.finolex.com",
    linkedin: "https://www.linkedin.com/company/finolex-cables",
    phone: "+91 20 2742 XXXX",
    source: "Public Listed",
    tags: ["PVC Winding Wire", "Power Cables", "Pune"],
    pitch: "Pitch our Ca-Zn stabilizers for PVC wire insulation compounds at their Pimpri, Urse, and Verna (Goa) plants. Finolex's quality-conscious procurement process values suppliers with consistent quality and regulatory compliance documentation \u2014 our stabilizers come with full EU RoHS data. Consolidating stabilizer sourcing from a single domestic supplier reduces their multi-vendor complexity and improves supply chain reliability. Lead with a technical comparison study against their current stabilizer system with free test samples.",
    intelligence: "Pimpri, Pune HQ. Major PVC cable manufacturer. Also has plants in Urse and Goa. Quality-conscious procurement.",
    status: "New"
  },
  {
    company: "KEI Industries Limited",
    industry: "wire_cable",
    region: "Maharashtra",
    city: "Mumbai",
    person: "Procurement Manager (Chemicals)",
    role: "Procurement",
    website: "https://www.kei-ind.com",
    linkedin: "https://www.linkedin.com/company/kei-industries",
    phone: "+91 22 XXXX XXXX",
    source: "Public Listed",
    tags: ["Power Cables", "2000+ Partners", "60+ Countries"],
    pitch: "Pitch our Ca-Zn stabilizers and PVC processing aids for cable insulation compounding across their pan-India manufacturing operations. With 2000+ channel partners in 60+ countries, they need RoHS-compliant lead-free stabilizer systems to meet global regulatory requirements. Our Ca-Zn systems provide excellent heat stability and weathering resistance critical for power cable longevity. Lead with a competitive pricing proposal and offer a free processing trial at their nearest manufacturing unit.",
    intelligence: "Mumbai presence. Large-scale wire and cable manufacturer. Pan-India operations. Volume buyer of PVC compounds.",
    status: "New"
  },
  {
    company: "Megacab Wires & Cables",
    industry: "wire_cable",
    region: "Gujarat",
    city: "Rajkot",
    person: "Director",
    role: "Director",
    website: "https://megacabwires.com",
    linkedin: "",
    phone: "+91 281 XXX XXXX",
    source: "Company Website",
    tags: ["PVC Cables", "FRLS", "ISO Certified"],
    pitch: "Pitch our Ca-Zn stabilizers for their lead-free PVC cable compounds and specialty FRLS (Fire Retardant Low Smoke) cable insulation. FRLS cables require specific stabilizer-flame retardant synergy \u2014 our Ca-Zn systems are formulated for compatibility with alumina trihydrate and other FRLS additives. Their ISO 9001:2015 certification means they value documented quality, which our technical data sheets fully support. Offer free compounding trials for their FRLS and submersible cable grades.",
    intelligence: "Rajkot, Gujarat. ISO certified manufacturer. FRLS cables need specific stabilizer systems. Good target for specialty PVC additives.",
    status: "New"
  },
  {
    company: "Torrent Cables Limited",
    industry: "wire_cable",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "Purchase Manager",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 79 2740 XXXX",
    source: "Corporate Group",
    tags: ["EHV", "HT-XLPE", "Power Cables"],
    pitch: "Pitch our Ca-Zn stabilizers and processing aids for their LT-PVC power cable insulation compounding. While their EHV and HT-XLPE lines use cross-linked PE, their LT-PVC cable range is a direct application for our stabilizer systems. As part of the Torrent Group, they have established procurement standards \u2014 our consistent quality and domestic supply reliability meet corporate group requirements. Propose a vendor qualification meeting with technical data sheets and free compounding trial samples.",
    intelligence: "Ahmedabad. Part of Torrent Group (inc. 1991). Manufactures high-voltage to low-voltage power cables. Established procurement.",
    status: "New"
  },
  {
    company: "Prime Cable Industries Pvt Ltd",
    industry: "wire_cable",
    region: "Rajasthan",
    city: "Bhiwadi (Alwar)",
    person: "Plant Head",
    role: "Operations",
    website: "https://www.primecabindia.com",
    linkedin: "",
    phone: "+91 1493 XXX XXX",
    source: "Company Website",
    tags: ["Control Cables", "Power Cables", "ISO Certified"],
    pitch: "Pitch our Ca-Zn stabilizers and PE wax processing aids for PVC cable extrusion at their Bhiwadi facility. Their ISO 14001 environmental certification signals a commitment to lead-free manufacturing \u2014 our Ca-Zn stabilizers are the ideal replacement for legacy lead-based systems. PE waxes improve their extrusion surface finish and throughput, reducing scrap rates. Offer a free extrusion trial with side-by-side comparison against their current stabilizer system.",
    intelligence: "Bhiwadi, Alwar, Rajasthan. Certified cable manufacturer. Environmental certifications suggest interest in lead-free (Ca-Zn) stabilizer systems.",
    status: "New"
  },
  {
    company: "Anchor (Panasonic)",
    industry: "wire_cable",
    region: "Rajasthan",
    city: "Bhiwadi (Alwar)",
    person: "Sourcing Manager",
    role: "Sourcing",
    website: "https://www.panasonic.com/in",
    linkedin: "https://www.linkedin.com/company/panasonic",
    phone: "+91 1493 XXX XXX",
    source: "MNC",
    tags: ["PVC Cables", "Switches", "Panasonic"],
    pitch: "Pitch our Ca-Zn stabilizers and PVC compound additives for their cable and switch manufacturing at Bhiwadi. Panasonic's Japanese parent company mandates strict quality and environmental standards \u2014 our lead-free Ca-Zn systems with full RoHS documentation align perfectly with their global compliance requirements. Consistent batch quality and reliable domestic supply reduce their dependency on imported additives. Propose a formal vendor qualification process with comprehensive technical data and free compound testing.",
    intelligence: "Unit 1 & 2, Bhiwadi, Alwar. Panasonic-backed manufacturing. Turnover Rs 500 Cr approx. Japanese quality standards for raw materials.",
    status: "New"
  },
  // ===================== FOOTWEAR =====================
  {
    company: "Tirubala Footwear",
    industry: "footwear",
    region: "Maharashtra",
    city: "Mumbai Central",
    person: "Procurement Head",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 22 2309 XXXX",
    source: "Industry Directory",
    tags: ["ISO 9001", "12000 Pairs/Day", "Export"],
    pitch: "Pitch our silicone-based mould release agents for their 12,000+ pairs/day production across 4 factories serving Mango, Zara, and Topshop. High-volume moulding operations need release agents that extend mould life and reduce cleaning downtime \u2014 our silicone release agents deliver 30%+ more releases per application vs. conventional waxes. Their ISO 9001 certification and global brand partnerships demand documented, consistent-quality chemicals. Offer a free production-line trial with mould-life tracking data.",
    intelligence: "C9, Dawood Baug, Mumbai Central. 4 factories. Export-oriented, works with global fashion brands. Volume buyer of footwear chemicals.",
    status: "New"
  },
  {
    company: "Lallan Shoes",
    industry: "footwear",
    region: "Maharashtra",
    city: "Mumbai",
    person: "Director",
    role: "Director",
    website: "https://lallanshoes.com",
    linkedin: "",
    phone: "+91 22 XXXX XXXX",
    source: "Company Website",
    tags: ["Precision Footwear", "Mumbai"],
    pitch: "Pitch our silicone-based mould release agents for their precision footwear moulding operations and Ca-Zn stabilizers for PVC sole compound manufacturing. Precision crafting demands clean mould release without residue transfer to finished shoes \u2014 our silicone release agents provide exactly that consistency. Domestic supply means rapid restocking with no import delays during peak production seasons. Lead with free mould release samples and a cost comparison vs. their current release agent.",
    intelligence: "Mumbai-based footwear manufacturer. Precision crafting suggests quality-conscious operations.",
    status: "New"
  },
  {
    company: "Carbon Footwear",
    industry: "footwear",
    region: "Rajasthan",
    city: "Jaipur",
    person: "Managing Director",
    role: "Director",
    website: "https://carbonfootwear.in",
    linkedin: "",
    phone: "+91 141 XXX XXXX",
    source: "Company Website",
    tags: ["ISO 9001", "PU Footwear", "Since 2006"],
    pitch: "Pitch our silicone release agents for their PU and PVC sole moulding operations and Ca-Zn stabilizers for PVC sole compounds across their casual, formal, and school footwear lines. Their diverse product range from heavy-duty to comfort footwear requires multiple mould release formulations \u2014 our silicone range covers all their needs from a single supplier. ISO 9001 certification since 2006 shows they value documented quality. Offer a free product trial across their different footwear categories with tailored release agent recommendations.",
    intelligence: "Jaipur, Rajasthan. ISO certified. Diverse product range from school shoes to formal footwear. Heavy-duty and comfort footwear.",
    status: "New"
  },
  {
    company: "P.P. Rubber Products (Poddar Footwear)",
    industry: "footwear",
    region: "Rajasthan",
    city: "Jaipur (VKI Area)",
    person: "Plant Manager",
    role: "Operations",
    website: "https://www.poddarfootwear.com",
    linkedin: "",
    phone: "+91 141 237 XXXX",
    source: "Company Website",
    tags: ["Rubber Slippers", "VKI Area", "Rubber Products"],
    pitch: "Pitch our silicone release agents for their rubber slipper moulding operations and Ca-Zn stabilizers for PVC sole compound formulations. High-volume slipper production requires efficient mould release to maintain cycle times \u2014 our silicone agents reduce sticking and mould fouling significantly. As both rubber and PVC compound users, they benefit from consolidating process chemical sourcing with a single supplier. Offer a free trial of our release agent range with a bundled PVC stabilizer sample.",
    intelligence: "VKI Area, Jaipur. Rubber slipper manufacturer. Uses rubber and PVC compounds in production. Good target for our full product range.",
    status: "New"
  },
  // ===================== FOOD PROCESSING (Antifoam Buyers) =====================
  {
    company: "Tiny Chempro",
    industry: "food_processing",
    region: "Maharashtra",
    city: "Vasai (Palghar)",
    person: "Sales Manager",
    role: "Sales",
    website: "",
    linkedin: "",
    phone: "+91 250 XXX XXXX",
    source: "Industry Directory",
    tags: ["Food Antifoam", "Sugar Mills", "Distilleries"],
    pitch: "Pitch our food-grade silicone antifoam concentrates as OEM base material for their Tinyfoam GL 364 (potato processing) and GL 6010 (sugar/distillery) products. As an antifoam formulator, they need reliable silicone antifoam fluid supply with consistent quality and competitive pricing to protect their margins. Our domestic production offers significant landed-cost advantage over imported silicone fluid grades. Propose a bulk supply agreement with volume pricing and consistent COA documentation.",
    intelligence: "Vasai, Palghar. Antifoam manufacturer serving food processing industry. Could be both competitor and potential buyer of Resil silicone antifoam base.",
    status: "New"
  },
  {
    company: "RX Chemicals",
    industry: "food_processing",
    region: "Maharashtra",
    city: "Mumbai / Pune / Nashik",
    person: "Director",
    role: "Director",
    website: "https://rxchemicals.com",
    linkedin: "",
    phone: "+91 22 XXXX XXXX",
    source: "Company Website",
    tags: ["Antifoam", "25+ Cities", "Multi-Industry"],
    pitch: "Pitch our silicone antifoam concentrates as base raw material for their RXSOL antifoam formulation business across 25+ cities. Their multi-industry distribution network covering food, paper, and textile industries makes them an ideal channel partner for our antifoam base products. Consistent quality from our production ensures their downstream customers get reliable performance. Propose a distributor-grade bulk supply agreement with volume discounts and co-marketing support.",
    intelligence: "Multi-city presence. Large-scale antifoam distributor. Could be a channel partner for Resil antifoam products across food, paper, and textile industries.",
    status: "New"
  },
  {
    company: "World Chem Industries",
    industry: "food_processing",
    region: "Gujarat",
    city: "Ankleshwar (Bharuch)",
    person: "Director",
    role: "Director",
    website: "",
    linkedin: "",
    phone: "+91 2646 XXX XXX",
    source: "Industry Directory",
    tags: ["Food-grade Antifoam", "Rs 10-25 Cr", "GIDC"],
    pitch: "Pitch our food-grade silicone antifoam base fluid as raw material for their WCI-SIDI food-grade antifoam formulations at GIDC Panoli. With Rs 10-25 Cr turnover, they consume significant volumes of silicone antifoam fluid monthly \u2014 our competitive domestic pricing directly improves their formulation margins. Proximity to our Gujarat supply chain ensures reliable, just-in-time delivery. Lead with a competitive pricing proposal with a free quality evaluation batch.",
    intelligence: "GIDC Panoli, Ankleshwar. Specialized in food-grade antifoam. Good target for Resil silicone antifoam base material supply.",
    status: "New"
  },
  {
    company: "OM Tex Chem Pvt Ltd",
    industry: "food_processing",
    region: "Maharashtra",
    city: "Panvel (Raigad)",
    person: "Technical Head",
    role: "Technical",
    website: "https://www.omtexchem.com",
    linkedin: "",
    phone: "+91 22 2745 XXXX",
    source: "Company Website",
    tags: ["SILAF Series", "Silicone Antifoams", "Food Grade"],
    pitch: "Pitch our silicone antifoam fluid as the primary base material for their SILAF series silicone antifoam product range at Kamothe Industrial Estate. As a silicone antifoam manufacturer, they are a direct buyer of bulk silicone fluid \u2014 consistent viscosity and purity of our base fluid directly affects their end-product quality. Our domestic production eliminates import lead times and forex risk for their raw material procurement. Lead with a quality comparison batch and competitive bulk pricing proposal.",
    intelligence: "Plot 243/244, Kamothe Industrial Estate. Silicone antifoam manufacturer. Uses silicone fluid as base raw material - direct Resil opportunity.",
    status: "New"
  },
  {
    company: "Cilantro Chemicals Pvt Ltd",
    industry: "food_processing",
    region: "Maharashtra",
    city: "Pune",
    person: "Director",
    role: "Director",
    website: "",
    linkedin: "",
    phone: "+91 20 XXXX XXXX",
    source: "Industry Directory",
    tags: ["Defoamers", "Food Processing", "Multi-Industry"],
    pitch: "Pitch our silicone antifoam concentrates as base raw material for their multi-industry defoamer formulations covering food processing, textile, wastewater, and sugar industries. Their diverse customer base across multiple sectors means they need a versatile silicone antifoam fluid that performs across different pH, temperature, and process conditions. Our product range covers all their formulation needs from a single source, simplifying their procurement. Offer a product portfolio presentation with free samples across their key application areas.",
    intelligence: "Pune-based. Supplies defoamers to food processing, textile, wastewater, and sugar industries. Multi-industry opportunity.",
    status: "New"
  },
  // ===================== ADHESIVES & SEALANTS =====================
  {
    company: "Parson Adhesives India Pvt Ltd",
    industry: "adhesives_sealants",
    region: "Gujarat",
    city: "Vadodara",
    person: "Director",
    role: "Director",
    website: "https://parsonadhesives.in",
    linkedin: "",
    phone: "+91 265 XXX XXXX",
    source: "Company Website",
    tags: ["Epoxy", "PU", "Silicone Sealants", "UV Curable"],
    pitch: "Pitch our epoxy resins for their epoxy adhesive formulations, TDI/MDI for PU adhesive manufacturing, and silicone base for their silicone sealant lines. Their comprehensive product range means triple raw material opportunity from a single supplier \u2014 simplifying their procurement and reducing vendor management overhead. Our domestic supply chain ensures consistent availability without the lead time variability of imported resins. Propose a supplier consolidation meeting with competitive pricing across all three product categories.",
    intelligence: "Vadodara, Gujarat. Comprehensive adhesive manufacturer. Uses epoxy, PU, and silicone raw materials. Triple opportunity: epoxy + MDI + Resil silicones.",
    status: "New"
  },
  {
    company: "MR BOND POLYCHEM",
    industry: "adhesives_sealants",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "Technical Director",
    role: "Director",
    website: "https://www.epoxybondpolychem.com",
    linkedin: "",
    phone: "+91 79 XXXX XXXX",
    source: "Company Website",
    tags: ["Epoxy Resins", "PU Resins", "21+ Years"],
    pitch: "Pitch our epoxy resins and hardeners for their adhesive and flooring formulations, plus TDI/MDI for their PU-based sealant and paint products. With 21+ years in the business, they are established formulators who directly consume epoxy and PU raw materials in significant volumes. Our domestic production eliminates import dependency and provides competitive landed costs vs. international suppliers. Lead with a competitive pricing comparison and offer free formulation support for their product development.",
    intelligence: "Ahmedabad, Gujarat. 21+ years experience. Both manufacturer and formulator of epoxy and PU products. Direct buyer of our raw materials.",
    status: "New"
  },
  {
    company: "Henkel (Loctite)",
    industry: "adhesives_sealants",
    region: "Maharashtra",
    city: "Kurkumbh (Pune District)",
    person: "Plant Procurement Head",
    role: "Procurement",
    website: "https://www.henkel.in",
    linkedin: "https://www.linkedin.com/company/henkel",
    phone: "+91 2111 XXX XXX",
    source: "MNC",
    tags: ["Loctite", "Industry 4.0", "LEED Gold"],
    pitch: "Pitch our epoxy resins and specialty chemical intermediates for their Loctite adhesive and sealant manufacturing at their new Industry 4.0 LEED Gold facility. Their plant expansion signals growing production volumes requiring increased raw material supply \u2014 engaging during ramp-up phase positions us before procurement decisions are locked. Our epoxy grades meet the stringent quality specifications demanded by Henkel's global MNC standards. Propose a formal vendor qualification process with comprehensive technical documentation and free resin samples.",
    intelligence: "Kurkumbh, Pune District. MNC with high quality standards. New Industry 4.0 plant suggests growing volumes. Difficult entry but huge volume potential.",
    status: "New"
  },
  {
    company: "Anabond Limited",
    industry: "adhesives_sealants",
    region: "Maharashtra",
    city: "Mumbai (Regional Office)",
    person: "Regional Manager (West)",
    role: "Sales",
    website: "https://anabond.com",
    linkedin: "https://www.linkedin.com/company/anabond",
    phone: "+91 22 XXXX XXXX",
    source: "Company Website",
    tags: ["Anaerobic", "Silicone", "Epoxy", "PU", "Hot Melts"],
    pitch: "Pitch our epoxy resins for their structural adhesive formulations and silicone base compounds for their silicone sealant product line. Since 1979, they've built a comprehensive adhesive portfolio that requires both epoxy and silicone raw materials \u2014 consolidating supply from us offers procurement efficiency and cost savings. Their Mumbai regional office covers the Western India market with significant volume requirements. Offer a dual-product pricing proposal covering both epoxy resins and silicone base materials.",
    intelligence: "Chennai HQ with Mumbai regional office. Large-scale adhesive manufacturer. Dual opportunity for epoxy and silicone products.",
    status: "New"
  },
  // ===================== MEDICAL DEVICES =====================
  {
    company: "Meril Life Sciences",
    industry: "medical_devices",
    region: "Gujarat",
    city: "Vapi",
    person: "VP Procurement",
    role: "VP Procurement",
    website: "https://www.merillife.com",
    linkedin: "https://www.linkedin.com/company/meril-life-sciences",
    phone: "+91 260 XXX XXXX",
    source: "Company Website",
    tags: ["Cardiovascular", "Orthopedics", "Diagnostics"],
    pitch: "Pitch our medical-grade Dimethicone for catheter and guidewire lubrication coatings and silicone components for their cardiovascular and orthopedic device lines. As a rapidly growing Indian medical device company competing with global MNCs, they need medical-grade silicones with full biocompatibility documentation at competitive domestic pricing. Our silicones meet USP/ISO 10993 standards required for device contact applications. Propose a technical meeting at their Vapi facility with biocompatibility data and free evaluation samples.",
    intelligence: "Near Bilakhia Stadium, Vapi. Also Mumbai office at Andheri East. Rapidly growing Indian medical device company. Quality-conscious procurement.",
    status: "New"
  },
  {
    company: "Medmech Healthcare Pvt Ltd",
    industry: "medical_devices",
    region: "Gujarat",
    city: "Vadodara",
    person: "Director",
    role: "Director",
    website: "https://www.medmechindia.com",
    linkedin: "",
    phone: "+91 265 XXX XXXX",
    source: "Company Website",
    tags: ["Surgical Gloves", "Nitrile Gloves", "ISO Certified"],
    pitch: "Pitch our silicone-based internal lubricants for powder-free glove donning and silicone release agents for their latex and nitrile surgical glove mould release process. Their ISO certification and export quality standards require consistent, documented silicone lubricants that meet global biocompatibility requirements. Our domestic supply offers significant cost advantage over imported medical-grade silicone fluids. Offer a free trial batch with full biocompatibility documentation and a cost comparison vs. their current imported supplier.",
    intelligence: "Vadodara, Gujarat. Surgical glove manufacturer. ISO certified. Uses silicone lubricants in glove manufacturing process. Direct Resil opportunity.",
    status: "New"
  },
  {
    company: "M.S. Surgical",
    industry: "medical_devices",
    region: "Gujarat",
    city: "Ahmedabad (Kalol)",
    person: "Purchase Manager",
    role: "Procurement",
    website: "https://www.medistersurgical.com",
    linkedin: "",
    phone: "+91 2764 XXX XXX",
    source: "Company Website",
    tags: ["Surgical Gloves", "Examination Gloves", "Gynecology Kits"],
    pitch: "Pitch our silicone lubricants for powder-free glove coating and donning agents across their surgical gloves, examination gloves, and gynecology kit product lines. Their diversified medical disposable manufacturing uses silicone in multiple product lines \u2014 a single-supplier relationship simplifies their procurement and ensures consistent quality across all applications. Our medical-grade silicones come with full USP documentation. Lead with a comprehensive product sample kit covering all their silicone application needs.",
    intelligence: "Plot 59, Metro Compound, Kalol, Ahmedabad. Diversified medical disposable manufacturer. Uses silicone in multiple product lines.",
    status: "New"
  },
  {
    company: "RH Healthcare",
    industry: "medical_devices",
    region: "Gujarat",
    city: "Gujarat",
    person: "Procurement Head",
    role: "Procurement",
    website: "https://rhhealthcareindia.com",
    linkedin: "",
    phone: "+91 XXXX XXX XXX",
    source: "BIS Approved",
    tags: ["Examination Gloves", "Sanitary Pads", "BIS Approved"],
    pitch: "Pitch our silicone lubricants for their BIS-approved examination glove manufacturing and silicone release agents for sanitary pad and diaper production lines. BIS approval requires documented raw material quality \u2014 our medical-grade silicones with full certification support their compliance requirements. Serving both glove and hygiene product lines, they benefit from single-supplier procurement for silicone-based process chemicals. Offer a free trial across their glove and hygiene product lines with complete BIS-compatible documentation.",
    intelligence: "Gujarat-based. BIS approved medical products manufacturer. Gloves are key product requiring silicone lubricants.",
    status: "New"
  },
  {
    company: "Cartel Healthcare Pvt Ltd",
    industry: "medical_devices",
    region: "Maharashtra",
    city: "Mumbai",
    person: "Procurement Manager",
    role: "Procurement",
    website: "https://www.cartelhealthcare.com",
    linkedin: "",
    phone: "+91 22 XXXX XXXX",
    source: "Company Website",
    tags: ["Surgical Gloves", "Bio-safe Syringes", "ISO 13485"],
    pitch: "Pitch our medical-grade Dimethicone for syringe barrel lubrication and silicone donning agents for their surgical glove manufacturing. Their ISO 13485 and CE certifications require fully traceable, documented medical-grade silicones \u2014 our products come with complete batch documentation and biocompatibility data. Multi-product medical device manufacturers benefit from consolidating their silicone supply from a single qualified vendor. Propose a vendor qualification audit with comprehensive product documentation for their quality team.",
    intelligence: "Mumbai, Maharashtra. Multi-product medical device manufacturer. ISO 13485 certified. Uses medical-grade silicone across product range.",
    status: "New"
  },
  {
    company: "Amigo Surgi-care Pvt Ltd",
    industry: "medical_devices",
    region: "Gujarat",
    city: "Gandhinagar (Rakanpur)",
    person: "Director",
    role: "Director",
    website: "",
    linkedin: "",
    phone: "+91 2717 XXX XXX",
    source: "Industry Directory",
    tags: ["Surgical Gloves", "IV Cannulas", "Surgical Disposables"],
    pitch: "Pitch our medical-grade silicones for surgical glove lubrication, IV cannula component coating, and silicone-based wound dressing treatments. Their diversified surgical disposable range uses silicone across multiple product lines \u2014 from glove donning agents to IV device coatings. Our domestic supply with full biocompatibility documentation reduces their dependency on imported medical-grade silicones. Offer a comprehensive product evaluation kit covering their glove, IV, and dressing applications with technical application support.",
    intelligence: "Plot 780, Sola-Santej Road, Rakanpur, Gandhinagar. Diversified surgical disposable manufacturer. Multiple silicone applications.",
    status: "New"
  },
  // ===================== ADDITIONAL COMPANIES FOR EXPANDED COVERAGE =====================
  // More Pharma - Gujarat
  {
    company: "Sun Pharmaceutical Industries",
    industry: "pharma",
    region: "Gujarat",
    city: "Vadodara (Halol)",
    person: "VP Global Procurement",
    role: "VP Procurement",
    website: "https://www.sunpharma.com",
    linkedin: "https://www.linkedin.com/company/sun-pharma",
    phone: "+91 265 XXX XXXX",
    source: "Public Listed",
    tags: ["Global #4 Generics", "Specialty", "Dermatology"],
    pitch: "Pitch our US-DMF filed Simethicone for their GI formulations, process antifoams for API reactors, and dermatology-grade Dimethicone for their specialty skin care product lines at the Halol plant. As the world's 4th largest generics company with US-FDA audited facilities, they need excipient suppliers with complete regulatory documentation for global filings. Our domestic supply with multi-market compliance reduces their sourcing complexity vs. multiple international suppliers. Lead with a comprehensive regulatory package and offer a vendor qualification audit at our facility.",
    intelligence: "Halol plant is one of their largest. Global operations. Massive volume buyer. High quality standards with US-FDA audited facilities.",
    status: "New"
  },
  // More PVC - Telangana
  {
    company: "Astral Ltd (Hyderabad Plant)",
    industry: "pvc",
    region: "Telangana",
    city: "Hyderabad",
    person: "Plant Manager",
    role: "Operations",
    website: "https://www.astralpipes.com",
    linkedin: "https://www.linkedin.com/company/astral-pipes",
    phone: "+91 40 XXXX XXXX",
    source: "Expansion Plans",
    tags: ["CPVC", "70000 MTPA", "Expansion"],
    pitch: "Pitch our Ca-Zn stabilizers and processing aids for their planned 70,000 MTPA CPVC capacity expansion in Hyderabad by FY2026. Engaging before new plant procurement decisions are finalized positions us as a preferred stabilizer supplier from day one of operations. Our Ca-Zn systems are specifically formulated for CPVC processing temperatures and provide superior heat stability. Propose a technical meeting with their expansion project team to align stabilizer specifications with their new plant design.",
    intelligence: "Hyderabad expansion planned. 70,000 MTPA new capacity. Early engagement opportunity before new plant procurement decisions are finalized.",
    status: "New"
  },
  // More Construction - Gujarat
  {
    company: "Apcotex Industries Ltd",
    industry: "construction",
    region: "Maharashtra",
    city: "Mumbai (Taloja)",
    person: "VP Business Development",
    role: "Business Development",
    website: "https://www.apcotex.com",
    linkedin: "https://www.linkedin.com/company/apcotex-industries",
    phone: "+91 22 4080 XXXX",
    source: "Public Listed",
    tags: ["Polymer Emulsions", "SB Latex", "Waterproofing"],
    pitch: "Pitch our silicone-based water repellents and antifoams for their specialty acrylic polymer emulsion and SB latex manufacturing for construction waterproofing applications. Their BSE-listed, technology-driven operation values technical selling \u2014 our antifoams control foam during emulsion polymerization, improving batch consistency. Silicone water repellents can be offered as complementary additives for their waterproofing product formulations. Propose a joint technical development project combining our silicone additives with their polymer systems.",
    intelligence: "Taloja plant. Specialty flexible waterproofing for cement applications. BSE listed. Technical selling approach preferred.",
    status: "New"
  },
  // More Agriculture - MP
  {
    company: "Crystal Crop Protection",
    industry: "agriculture",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "VP Manufacturing",
    role: "VP",
    website: "",
    linkedin: "",
    phone: "+91 79 XXXX XXXX",
    source: "Industry Directory",
    tags: ["Insecticides", "Fungicides", "Herbicides", "PGRs"],
    pitch: "Pitch our silicone-based spray adjuvants to enhance leaf coverage and rain-fastness of their insecticide, fungicide, and herbicide formulations. Better spray coverage means lower active ingredient dosage for the same efficacy \u2014 a direct cost saving for their farmer customers and a formulation differentiator. Our spray adjuvants are compatible with their technical manufacturing processes and can be incorporated into existing formulations. Offer free adjuvant samples for efficacy trials on their key crop protection products.",
    intelligence: "Gujarat-based technical agrochemical manufacturer. Focus on technical manufacturing. Good target for spray adjuvant sales.",
    status: "New"
  },
  // More Rubber - Gujarat
  {
    company: "Apcotex Industries (Latex Div)",
    industry: "rubber_latex",
    region: "Maharashtra",
    city: "Mumbai (Taloja)",
    person: "Head of R&D (Latex)",
    role: "Technical",
    website: "https://www.apcotex.com",
    linkedin: "https://www.linkedin.com/company/apcotex-industries",
    phone: "+91 22 4080 XXXX",
    source: "Public Listed",
    tags: ["Synthetic Latex", "NBR Latex", "SBR Latex"],
    pitch: "Pitch our silicone-based antifoams for foam control during their NBR, SBR, and specialty latex emulsion polymerization processes. Latex manufacturing generates significant foam during agitation and stripping \u2014 our antifoams provide effective knockdown without affecting latex stability or particle size distribution. As a BSE-listed producer, they value documented quality and consistent supply. Propose a process trial at their Taloja plant with dosage optimization to demonstrate reduced foam-related batch time.",
    intelligence: "Taloja plant. Produces NBR, SBR, and specialty latexes. BSE listed. Process chemicals buyer for latex manufacturing.",
    status: "New"
  },
  // Additional Water Treatment
  {
    company: "National Cooling Towers",
    industry: "water_treatment",
    region: "Gujarat",
    city: "Umbergaon",
    person: "Chemical Division Head",
    role: "Operations",
    website: "",
    linkedin: "",
    phone: "+91 260 XXX XXXX",
    source: "ISO/CE Certified",
    tags: ["Cooling Water Additives", "Corrosion Inhibitors", "ISO Certified"],
    pitch: "Pitch our silicone antifoams for their cooling water treatment formulations, targeting foam control in cooling towers and recirculating water systems. Their ISO 9001 and CE certifications indicate quality-conscious chemical formulation \u2014 our antifoams meet the documentation standards their certifications demand. Consistent antifoam supply from our Gujarat operations ensures their formulation batches remain on schedule. Offer a free antifoam evaluation batch with technical data sheets for their cooling water product formulations.",
    intelligence: "Umbergaon, Gujarat. HQ in Mumbai. ISO and CE certified. Cooling water chemical specialist. Consistent buyer of antifoam additives.",
    status: "New"
  },
  // Additional Paints - Telangana
  {
    company: "Asian Paints (Hyderabad Depot)",
    industry: "paints",
    region: "Telangana",
    city: "Hyderabad",
    person: "Regional Sourcing Manager",
    role: "Sourcing",
    website: "https://www.asianpaints.com",
    linkedin: "https://www.linkedin.com/company/asian-paints",
    phone: "+91 40 XXXX XXXX",
    source: "Annual Report",
    tags: ["Decorative", "Regional Depot", "Market Leader"],
    pitch: "Pitch our silicone defoamers for their water-based decorative paint formulations and epoxy coating resins for their industrial coatings range through their Hyderabad regional sourcing office. Regional sourcing decisions influence national procurement \u2014 establishing a relationship here opens access to their broader South India supply requirements. Our defoamers are specifically formulated for water-based paint systems without causing surface defects. Propose a technical presentation to their regional sourcing team with free defoamer samples for paint formulation testing.",
    intelligence: "Hyderabad regional office. Covers South India market. Regional sourcing decisions can influence national procurement.",
    status: "New"
  },
  // Additional Adhesives - Maharashtra
  {
    company: "Choksey Chemicals (FixGuruu)",
    industry: "adhesives_sealants",
    region: "Maharashtra",
    city: "Mumbai",
    person: "Director",
    role: "Director",
    website: "https://chokseychem.com",
    linkedin: "",
    phone: "+91 22 XXXX XXXX",
    source: "Company Website",
    tags: ["Sealants", "Waterproofing", "Construction"],
    pitch: "Pitch our silicone base compounds for their FixGuruu sealant manufacturing and epoxy resins for their construction adhesive formulations. Their dual product lines \u2014 sealants and waterproofing \u2014 mean a double raw material opportunity from a single supplier. Our domestic silicone and epoxy supply eliminates import lead times, helping them maintain production schedules for their growing FixGuruu brand. Propose a dual-product pricing proposal with free formulation samples for both their sealant and adhesive development teams.",
    intelligence: "Mumbai-based. Leaders in sealants and waterproofing chemicals. FixGuruu brand. Dual product opportunity.",
    status: "New"
  },
  // Additional Personal Care - Gujarat
  {
    company: "Alembic Pharmaceuticals (Personal Care Div)",
    industry: "pcd_personal_care",
    region: "Gujarat",
    city: "Vadodara",
    person: "Procurement Head (Excipients)",
    role: "Procurement",
    website: "https://www.alembicpharmaceuticals.com",
    linkedin: "https://www.linkedin.com/company/alembic-pharmaceuticals",
    phone: "+91 265 228 XXXX",
    source: "Public Listed",
    tags: ["Derma", "Personal Care", "Topicals"],
    pitch: "Pitch our Dimethicone blends and silicone emulsions for their dermatology topical formulations and personal care product lines. As a major pharma company with a growing derma division, they need cosmetic-grade silicones with pharmaceutical-level documentation \u2014 our products meet both IP and USP standards. Their established vendor qualification process values suppliers with comprehensive quality documentation and audit readiness. Lead with a product portfolio presentation to their R&D team and offer free formulation samples for their derma product development.",
    intelligence: "Vadodara HQ. Large pharma company with dermatology division. Quality-conscious with established vendor qualification process.",
    status: "New"
  },
  // Additional Food Processing - Gujarat
  {
    company: "Chemlink Corporation",
    industry: "food_processing",
    region: "Gujarat",
    city: "Ahmedabad (Vatva GIDC)",
    person: "Director",
    role: "Director",
    website: "https://www.chemlinkcorporation.com",
    linkedin: "",
    phone: "+91 79 XXXX XXXX",
    source: "Company Website",
    tags: ["Food-grade Antifoam", "GIDC Vatva"],
    pitch: "Pitch our food-grade silicone antifoam concentrates as base raw material for their antifoaming agent formulations at Vatva GIDC. As a specialized food-grade antifoam manufacturer, they consume bulk silicone antifoam fluid \u2014 consistent quality and competitive pricing directly impact their product performance and margins. Our proximity to their Ahmedabad location ensures reliable just-in-time delivery. Lead with a quality evaluation batch and competitive bulk pricing proposal for annual supply.",
    intelligence: "Vatva GIDC, Ahmedabad. Food-grade antifoam specialist. Direct buyer of silicone antifoam fluid. Good Resil channel opportunity.",
    status: "New"
  },
  // Additional Leather - Telangana
  {
    company: "Hyderabad Leather Cluster",
    industry: "leather",
    region: "Telangana",
    city: "Hyderabad",
    person: "Cluster Manager",
    role: "Manager",
    website: "",
    linkedin: "",
    phone: "+91 40 XXXX XXXX",
    source: "Council for Leather Exports",
    tags: ["Footwear", "Leather Goods", "Production Center"],
    pitch: "Pitch our silicone-based water repellents, leather softeners, and finishing sprays to the Hyderabad leather cluster's footwear and leather goods manufacturers. Engaging the cluster collectively through the Council for Leather Exports provides access to multiple manufacturers simultaneously. Our silicone finishes improve water resistance and hand-feel for export-quality leather products. Propose a cluster-wide product demonstration and training session with free sample kits for participating manufacturers.",
    intelligence: "Hyderabad is listed by Council for Leather Exports as major production center. Growing footwear and leather goods manufacturing base.",
    status: "New"
  },
  // Additional Wire & Cable - Maharashtra
  {
    company: "Lapp India",
    industry: "wire_cable",
    region: "Maharashtra",
    city: "Bhiwandi (Thane)",
    person: "Warehouse & Distribution Head",
    role: "Operations",
    website: "https://www.lappindia.com",
    linkedin: "https://www.linkedin.com/company/lapp-india",
    phone: "+91 2522 XXX XXX",
    source: "MNC",
    tags: ["Industrial Cables", "PVC Insulated", "German"],
    pitch: "Pitch our Ca-Zn stabilizers and PVC compound additives for their industrial and PVC insulated cable range distributed across Maharashtra, MP, Gujarat, and Chhattisgarh. German MNC quality standards require documented, consistent-quality PVC additives \u2014 our Ca-Zn systems with full RoHS compliance meet their parent company specifications. Domestic supply from our operations reduces lead times vs. imported additives for their western India distribution hub. Propose a vendor qualification with comprehensive technical documentation and free compounding samples.",
    intelligence: "Bhiwandi warehouse catering to western India. German parent means high quality standards. Growing India operations.",
    status: "New"
  },
  // Additional Paper - Gujarat
  {
    company: "Edicon Paper Products (Icon Group)",
    industry: "paper_pulp",
    region: "Gujarat",
    city: "Morbi",
    person: "Factory Manager",
    role: "Operations",
    website: "",
    linkedin: "",
    phone: "+91 2822 XXX XXX",
    source: "Industry Directory",
    tags: ["Gujarat 2nd Largest", "Paper Mill", "Icon Group"],
    pitch: "Pitch our silicone antifoams for their large-scale paper manufacturing operations, targeting pulping, washing, and sizing stages. As Gujarat's 2nd largest paper mill and part of the Icon Group, they consume significant volumes of process chemicals \u2014 our antifoams offer superior persistence and lower dosage rates vs. mineral oil alternatives. Proximity to our Gujarat operations ensures reliable supply and responsive technical support. Propose a multi-grade antifoam trial covering their key production stages with cost-per-ton savings analysis.",
    intelligence: "Morbi, Gujarat. 2nd largest paper mill in Gujarat. Part of Icon Group. Large-scale operations require significant volumes of paper chemicals.",
    status: "New"
  },
  // Additional Construction - Telangana
  {
    company: "True Build Enterprise",
    industry: "construction",
    region: "Telangana",
    city: "Hyderabad",
    person: "Director",
    role: "Director",
    website: "",
    linkedin: "",
    phone: "+91 40 XXXX XXXX",
    source: "Industry Directory",
    tags: ["SBR Latex", "Waterproofing", "Tile Grout"],
    pitch: "Pitch our epoxy resin systems for their epoxy grout and flooring products, plus silicone sealants for their waterproofing range. Their growing presence in Hyderabad's booming construction market creates increasing demand for quality epoxy and silicone raw materials. Our domestic supply chain ensures consistent availability as the Telangana construction sector expands. Lead with competitive pricing on epoxy grout-grade resins and offer free formulation samples for their product development.",
    intelligence: "Hyderabad-based construction chemicals company. Manufactures waterproofing and tile-related products. Growing Telangana construction market.",
    status: "New"
  },
  // Additional Footwear - Maharashtra
  {
    company: "D S Enterprises",
    industry: "footwear",
    region: "Maharashtra",
    city: "Pune (Jejuri)",
    person: "Proprietor",
    role: "Owner",
    website: "",
    linkedin: "",
    phone: "+91 2115 XXX XXX",
    source: "Industry Directory",
    tags: ["PVC Soles", "Rexine", "Nagra Shoes"],
    pitch: "Pitch our Ca-Zn stabilizers and plasticizer systems for their PVC sole compound manufacturing used in Rexine Nagra shoes. Lead-free Ca-Zn stabilizers improve the weathering resistance and flexibility retention of PVC soles, reducing customer complaints about cracking. Our competitive domestic pricing directly improves their PVC compound cost per pair. Offer free compounding trial samples with a side-by-side comparison against their current stabilizer system.",
    intelligence: "Jejuri, Pune. PVC sole footwear manufacturer. Uses PVC compounds directly. Stabilizer opportunity.",
    status: "New"
  },
  // Additional Agriculture - Maharashtra
  {
    company: "Wilshire Pesticides & Fertilizers",
    industry: "agriculture",
    region: "Maharashtra",
    city: "Nashik",
    person: "Director",
    role: "Director",
    website: "",
    linkedin: "",
    phone: "+91 253 XXX XXXX",
    source: "Industry Directory",
    tags: ["Pesticides", "Fertilizers", "Since 2012"],
    pitch: "Pitch our silicone-based spray adjuvants for improving the leaf coverage, penetration, and rain-fastness of their pesticide formulations. As a newer company since 2012, they are likely more open to new vendor relationships and product innovations than legacy agrochemical firms. Our spray adjuvants differentiate their formulations by delivering better field efficacy at lower application rates. Offer free field trial samples and propose a joint efficacy study on their key pesticide products in Nashik's agricultural region.",
    intelligence: "Nashik, Maharashtra. Growing agrochemical company. Relatively newer company, likely more accessible for new vendor relationships.",
    status: "New"
  },
  // Additional PVC - Madhya Pradesh  
  {
    company: "Apollo Pipes (MP Distribution)",
    industry: "pvc",
    region: "Madhya Pradesh",
    city: "Indore / Bhopal",
    person: "Regional Sales Manager",
    role: "Sales",
    website: "https://www.apollopipes.com",
    linkedin: "https://www.linkedin.com/company/apollo-pipes",
    phone: "+91 731 XXX XXXX",
    source: "Company Website",
    tags: ["PVC Pipes", "APL Apollo Group", "National"],
    pitch: "Pitch our Ca-Zn stabilizers and processing aids for PVC pipe extrusion across their MP plumbing, agriculture, and borewell pipe production lines. As part of the APL Apollo Group expanding in central India, they need a reliable domestic stabilizer supplier who can scale with their growing MP operations. Our lead-free Ca-Zn systems meet BIS pipe standards and improve pipe weathering resistance for outdoor agricultural applications. Propose a competitive pricing proposal with free extrusion trial support at their MP manufacturing facility.",
    intelligence: "National presence including MP. APL Apollo Group. Growing in central India market. Potential for stabilizer supply to MP operations.",
    status: "New"
  },
  // Additional Medical - Telangana
  {
    company: "Allengers Medical Systems",
    industry: "medical_devices",
    region: "Telangana",
    city: "Hyderabad",
    person: "Procurement Manager",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 40 XXXX XXXX",
    source: "Company Website",
    tags: ["Diagnostic Imaging", "X-ray", "Ultrasound"],
    pitch: "Pitch our medical-grade silicones for gaskets, seals, and electrical insulation components in their X-ray, ultrasound, and MRI diagnostic imaging equipment. Medical imaging devices require silicones with exceptional dielectric properties and long-term thermal stability for safe, reliable operation. Our medical-grade silicone compounds meet IEC and ISO standards required for equipment component certifications. Propose a technical evaluation meeting with free silicone compound samples matched to their specific equipment sealing and insulation requirements.",
    intelligence: "Amrutha Hills, Punjagutta, Hyderabad. Medical equipment manufacturer. Uses silicone in equipment components and assemblies.",
    status: "New"
  },
  // Additional Water Treatment - MP
  {
    company: "Durga Bondchem Pvt Ltd",
    industry: "water_treatment",
    region: "Madhya Pradesh",
    city: "Indore",
    person: "Technical Director",
    role: "Director",
    website: "",
    linkedin: "",
    phone: "+91 731 XXX XXXX",
    source: "Industry Directory",
    tags: ["Water Treatment", "Construction Chemicals", "Indore"],
    pitch: "Pitch our silicone antifoams for their water treatment chemical formulations and silicone-based water repellents for their construction chemicals division. Their dual business model means two distinct product opportunities from a single vendor relationship, simplifying their procurement process. Our competitive domestic pricing improves their formulation margins in both water treatment and construction product lines. Offer a dual-product evaluation kit with application-specific samples for both their business divisions.",
    intelligence: "Indore, MP. Dual water treatment and construction chemicals business. Two product lines to target with Resil chemicals.",
    status: "New"
  },
  // Additional Pharma - Rajasthan
  {
    company: "Windlas Biotech Limited",
    industry: "pharma",
    region: "Rajasthan",
    city: "Jaipur (Kukas)",
    person: "Head of Procurement",
    role: "Procurement",
    website: "https://www.windlasbiotech.com",
    linkedin: "https://www.linkedin.com/company/windlas-biotech",
    phone: "+91 1426 XXX XXX",
    source: "Public Listed",
    tags: ["CDMO", "Formulations", "Contract Mfg"],
    pitch: "Pitch our Simethicone excipients and process antifoams for their CDMO operations manufacturing formulations for multiple pharma clients at Kukas Industrial Area. As a contract manufacturer, they need excipient suppliers who can provide consistent quality with complete regulatory documentation to satisfy their diverse client base. Our US-DMF filed Simethicone simplifies their clients' regulatory submissions across markets. Propose a vendor qualification meeting with comprehensive documentation and free excipient evaluation samples.",
    intelligence: "Kukas Industrial Area, Jaipur. Listed CDMO. Multiple formulation capabilities. Growing contract manufacturing volumes.",
    status: "New"
  },
  // Additional PVC - Gujarat
  {
    company: "Narmada Agrobase Ltd",
    industry: "pvc",
    region: "Gujarat",
    city: "Ahmedabad (Changodar)",
    person: "Purchase Manager",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 79 XXXX XXXX",
    source: "Industry Directory",
    tags: ["PVC Pipes", "Drip Irrigation", "Agriculture"],
    pitch: "Pitch our Ca-Zn stabilizers with UV absorber packages specifically formulated for outdoor PVC drip irrigation and agricultural pipe applications. Outdoor irrigation pipes face extreme UV exposure and temperature cycling \u2014 our stabilizer-UV absorber combination provides the extended service life that farmers demand. Lead-free Ca-Zn systems also meet evolving BIS standards for pipes in contact with irrigation water. Offer a free extrusion trial with accelerated weathering test data to demonstrate superior UV protection.",
    intelligence: "Changodar, Ahmedabad. Agricultural PVC pipe manufacturer. UV resistance is critical for outdoor irrigation pipes.",
    status: "New"
  },
  // Additional Food Processing - Rajasthan
  {
    company: "Harmony Additives Pvt Ltd",
    industry: "food_processing",
    region: "Gujarat",
    city: "Umargam (Valsad)",
    person: "Director",
    role: "Director",
    website: "",
    linkedin: "",
    phone: "+91 260 XXX XXXX",
    source: "Industry Directory",
    tags: ["Silicon Defoamer", "DF Series", "Industrial"],
    pitch: "Pitch our silicone antifoam concentrates and silicone fluids as primary base raw material for their DF series defoamer products. As a dedicated silicone defoamer manufacturer, they directly consume bulk silicone fluid \u2014 consistent viscosity and quality of our base material is critical for their end-product performance. Our competitive domestic pricing eliminates import duty and forex risk, directly improving their production margins. Lead with a quality evaluation batch matched to their DF series specifications and a competitive annual supply pricing proposal.",
    intelligence: "Umargam, Valsad, Gujarat. Silicone defoamer manufacturer. Direct buyer of silicone fluid raw materials. Key Resil supply opportunity.",
    status: "New"
  },
  // More Pharma - MP
  {
    company: "Lupin (Indore Plant)",
    industry: "pharma",
    region: "Madhya Pradesh",
    city: "Indore (Pithampur)",
    person: "Plant Procurement Manager",
    role: "Procurement",
    website: "https://www.lupin.com",
    linkedin: "https://www.linkedin.com/company/lupin",
    phone: "+91 731 XXX XXXX",
    source: "Manufacturing Data",
    tags: ["Formulations", "Pithampur SEZ", "US-FDA"],
    pitch: "Pitch our US-DMF filed Simethicone and process antifoams for their formulation manufacturing at the US-FDA approved Pithampur facility. As a plant-level procurement decision, engaging the local plant team directly can accelerate vendor qualification vs. going through Mumbai HQ. Our regulatory documentation aligns with their US-FDA audit requirements, simplifying excipient qualification. Propose a site visit with free evaluation samples and complete DMF documentation for their quality team's review.",
    intelligence: "Pithampur Industrial Area, Indore. Major Lupin manufacturing facility. US-FDA approved. Strict quality standards but large volumes.",
    status: "New"
  },
  // More Rubber - Telangana
  {
    company: "Fenner (India) Ltd (Madras Rubber)",
    industry: "rubber_latex",
    region: "Telangana",
    city: "Hyderabad",
    person: "Regional Manager",
    role: "Manager",
    website: "https://www.fennerindia.com",
    linkedin: "https://www.linkedin.com/company/fenner-india",
    phone: "+91 40 XXXX XXXX",
    source: "Public Listed",
    tags: ["Industrial Rubber", "Conveyor Belts", "V-Belts"],
    pitch: "Pitch our silicone-based release agents for their conveyor belt and V-belt mould release operations, plus processing aids for their rubber compounding and vulcanization lines. Industrial rubber product manufacturing generates significant mould fouling \u2014 our silicone release agents extend mould life and reduce cleaning downtime between production runs. As a publicly listed company with Chennai HQ, their Hyderabad regional operations need local supplier support. Offer a free plant trial with mould-life extension data and processing efficiency comparison.",
    intelligence: "Hyderabad regional office. Chennai-listed. Industrial rubber products. Uses process chemicals in rubber manufacturing.",
    status: "New"
  },
  // More Wire Cable - Madhya Pradesh
  {
    company: "Lapp India (MP Distribution)",
    industry: "wire_cable",
    region: "Madhya Pradesh",
    city: "Indore / Bhopal",
    person: "Regional Manager (Central)",
    role: "Manager",
    website: "https://www.lappindia.com",
    linkedin: "https://www.linkedin.com/company/lapp-india",
    phone: "+91 731 XXX XXXX",
    source: "Distribution Network",
    tags: ["Industrial Cables", "German Quality", "MP Coverage"],
    pitch: "Pitch our Ca-Zn stabilizers and PVC compound additives for their industrial cables distributed across central India through their MP regional operations. Growing industrial demand in Madhya Pradesh and Chhattisgarh means increasing cable consumption \u2014 and proportional demand for PVC compound additives. Our domestic supply chain provides faster turnaround for their central India operations vs. sourcing from coastal import hubs. Lead with a regional supply proposal covering their MP and Chhattisgarh distribution requirements.",
    intelligence: "Serves MP, Gujarat, Chhattisgarh from Bhiwandi. Growing industrial cable demand in central India. German quality standards.",
    status: "New"
  },
  // Additional Agriculture - Telangana
  {
    company: "Nagarjuna Agrichem Limited",
    industry: "agriculture",
    region: "Telangana",
    city: "Hyderabad",
    person: "VP Operations",
    role: "VP",
    website: "",
    linkedin: "",
    phone: "+91 40 XXXX XXXX",
    source: "Industry Directory",
    tags: ["Agrochemicals", "Fertilizers", "South India"],
    pitch: "Pitch our silicone-based spray adjuvants as wetting agents and spreaders for their crop protection formulations targeting South India's diverse cropping systems. Better spray coverage on waxy leaves (rice, sugarcane) and hairy leaves (cotton) improves pesticide efficacy \u2014 a key selling point for their farmer customers. Our adjuvants are compatible with most agrochemical formulations and can be tank-mixed or pre-formulated. Offer free field trial samples for their major crop protection products and propose a joint efficacy demonstration in Telangana.",
    intelligence: "Hyderabad HQ. Agrochemical and fertilizer company. Strong in South India market. Good entry point for Telangana region.",
    status: "New"
  },
  // Additional Paints - Gujarat
  {
    company: "Akzo Nobel India (Gujarat Plant)",
    industry: "paints",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "Plant Sourcing Manager",
    role: "Sourcing",
    website: "https://www.akzonobel.com/en/india",
    linkedin: "https://www.linkedin.com/company/akzonobel",
    phone: "+91 79 XXXX XXXX",
    source: "MNC",
    tags: ["Dulux", "Industrial Coatings", "MNC"],
    pitch: "Pitch our silicone defoamers for their Dulux water-based decorative paint formulations and epoxy resins for their industrial coating products at the Gujarat plant. As a Dutch MNC with global quality standards, they require documented, consistent-quality raw materials with full regulatory compliance. Our domestic supply chain provides faster response times for their Gujarat manufacturing operations vs. imported specialty chemicals. Propose a formal vendor qualification process with comprehensive product specifications and free defoamer samples for their formulation lab.",
    intelligence: "Gujarat operations for Akzo Nobel India. Dutch MNC. High quality standards. Decorative and industrial coatings.",
    status: "New"
  },
  // Additional Medical - Maharashtra
  {
    company: "Claris Lifesciences",
    industry: "medical_devices",
    region: "Gujarat",
    city: "Ahmedabad (Vasana)",
    person: "Procurement Head",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 79 XXXX XXXX",
    source: "Company Website",
    tags: ["IV Solutions", "Injectables", "Surgical Products"],
    pitch: "Pitch our medical-grade Dimethicone for rubber stopper siliconization, syringe barrel lubrication, and vial closure coating across their multiple Gujarat IV and injectable manufacturing facilities. IV and injectable products require ultra-pure medical-grade silicones to prevent particulate contamination and ensure smooth plunger action. Our pharmaceutical-grade silicones with full USP/EP documentation meet the stringent requirements for parenteral contact applications. Propose a multi-facility supply agreement with comprehensive biocompatibility and extractables data.",
    intelligence: "Vasana, Ahmedabad. Multiple facilities. IV and injectable products require medical-grade silicones for container components.",
    status: "New"
  },
  // Footwear - Telangana
  {
    company: "Sreeleathers (Hyderabad Outlet)",
    industry: "footwear",
    region: "Telangana",
    city: "Hyderabad",
    person: "Procurement Manager",
    role: "Procurement",
    website: "",
    linkedin: "",
    phone: "+91 40 XXXX XXXX",
    source: "Brand Directory",
    tags: ["Leather Footwear", "Premium Brand", "Retail"],
    pitch: "Pitch our silicone-based leather finishing sprays and water-repellent treatments for their premium leather footwear range. Premium footwear commands higher prices when it offers visible quality features like water resistance and a luxurious hand-feel \u2014 our silicone finishes deliver both without compromising leather breathability. Domestic supply ensures consistent availability for their Hyderabad retail and production operations. Offer free finishing spray samples with application demonstrations on their current leather grades.",
    intelligence: "Hyderabad presence. Premium leather footwear. Uses finishing chemicals and water-repellent treatments in production.",
    status: "New"
  },
  // More Paper - Maharashtra
  {
    company: "Ellora Paper Mills",
    industry: "paper_pulp",
    region: "Maharashtra",
    city: "Bhandara (Tumsar)",
    person: "Factory Manager",
    role: "Operations",
    website: "",
    linkedin: "",
    phone: "+91 7183 XXX XXX",
    source: "Industry Directory",
    tags: ["Paper Mills", "Eastern Maharashtra"],
    pitch: "Pitch our silicone antifoams for their paper manufacturing process at Dewoda Khurd, targeting foam control in pulping and stock preparation. As a smaller-scale eastern Maharashtra mill, they benefit from a responsive local supplier who can provide technical support and flexible order quantities. Our silicone antifoams improve drainage and sheet formation, directly reducing production downtime. Offer a free process trial with dosage optimization and a cost-per-ton savings analysis.",
    intelligence: "Eastern Maharashtra paper mill. Smaller scale but consistent buyer of paper chemicals. Good entry point for Vidarbha region.",
    status: "New"
  },
  // More Agriculture
  {
    company: "AIMCO Pesticides Ltd",
    industry: "agriculture",
    region: "Gujarat",
    city: "Vadodara",
    person: "CEO",
    role: "CEO",
    website: "",
    linkedin: "",
    phone: "+91 265 XXX XXXX",
    source: "Industry Directory",
    tags: ["Pesticides", "Since 1989", "Vadodara"],
    pitch: "Pitch our silicone-based spray adjuvants for improving leaf coverage and rain-fastness of their pesticide formulations across Gujarat's agricultural market. With 35+ years in the business, they have established farmer relationships where improved spray performance translates directly into customer loyalty and repeat sales. Our organosilicone adjuvants reduce surface tension for superior wetting on difficult-to-spray crops. Offer free adjuvant samples with field trial support and propose a co-branded efficacy demonstration for their key dealer network.",
    intelligence: "Vadodara, Gujarat. Established pesticide manufacturer since 1989. CEO is Pradip Dave. Consistent quality buyer.",
    status: "New"
  },
  // More Construction Chemicals
  {
    company: "Mapei India (Pune)",
    industry: "construction",
    region: "Maharashtra",
    city: "Pune",
    person: "Technical Procurement Lead",
    role: "Procurement",
    website: "https://www.mapei.com/in",
    linkedin: "https://www.linkedin.com/company/mapei",
    phone: "+91 20 XXXX XXXX",
    source: "MNC",
    tags: ["Tile Adhesives", "Waterproofing", "Italian"],
    pitch: "Pitch our epoxy resins for their tile adhesive and concrete restoration formulations, plus silicone-based waterproofing additives for their construction sealant range. As an Italian MNC with a quality-first approach to vendor selection, they need raw material suppliers with comprehensive technical documentation and consistent batch quality. Our domestic supply reduces lead times vs. their current imported specialty chemical sources. Propose a formal vendor qualification meeting with their technical procurement team and offer free resin samples for their formulation lab.",
    intelligence: "High-performance solutions provider. Extensive technical support team. Quality-first approach to vendor selection.",
    status: "New"
  },
  // Additional PVC Gujarat
  {
    company: "Ashirvad Pipes (Aliaxis India)",
    industry: "pvc",
    region: "Gujarat",
    city: "Ahmedabad",
    person: "Procurement Head",
    role: "Procurement",
    website: "https://www.ashirvadpipes.com",
    linkedin: "https://www.linkedin.com/company/ashirvad-pipes",
    phone: "+91 79 XXXX XXXX",
    source: "MNC",
    tags: ["CPVC", "uPVC", "SWR", "1.08 Lakh MT"],
    pitch: "Pitch our Ca-Zn stabilizers, impact modifiers, and processing aids for their 1,08,000 MT PVC/CPVC pipe extrusion operations across multiple plants in India. As part of Belgian Aliaxis Group, they follow European quality standards \u2014 our Ca-Zn systems with full REACH and RoHS documentation align with their parent company's global raw material specifications. Domestic supply from our operations reduces their import dependency and improves supply chain resilience. Propose a formal vendor qualification with comprehensive technical data and free compound trial samples for their PVC and CPVC lines.",
    intelligence: "Part of Belgian Aliaxis Group. Multiple plants across India. MNC quality standards. Volume buyer of PVC additives.",
    status: "New"
  },
  // Additional Personal Care - MP
  {
    company: "Herbal Hills Pvt Ltd",
    industry: "pcd_personal_care",
    region: "Madhya Pradesh",
    city: "Indore",
    person: "R&D Manager",
    role: "Technical",
    website: "",
    linkedin: "",
    phone: "+91 731 XXX XXXX",
    source: "Industry Directory",
    tags: ["Herbal", "Ayurvedic", "Personal Care"],
    pitch: "Pitch our silicone emollients and Dimethicone blends formulated for compatibility with herbal and Ayurvedic personal care ingredients in their skincare and haircare range. Herbal brands increasingly combine traditional botanicals with modern silicone technology to deliver superior sensory feel and product stability. Our emollients enhance spreadability and skin-feel without masking the natural positioning of their herbal products. Offer free formulation samples and a technical consultation on silicone-herbal ingredient compatibility for their R&D team.",
    intelligence: "Indore, MP. Growing herbal personal care brand. Increasing interest in silicone-herbal combinations for product differentiation.",
    status: "New"
  }
];

// server/routes.ts
import OpenAI from "openai";
import multer from "multer";
var upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
var openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || void 0
});
function requireAuth(req, res, next) {
  if (req.session?.isAuthenticated) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}
async function registerRoutes(httpServer2, app2) {
  app2.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const validUsername = (process.env.AUTH_USERNAME || "").trim();
    const validPassword = (process.env.AUTH_PASSWORD || "").trim();
    if (!validUsername || !validPassword) {
      return res.status(500).json({ message: "Authentication not configured" });
    }
    const inputUsername = (username || "").trim();
    const inputPassword = (password || "").trim();
    if (inputUsername === validUsername && inputPassword === validPassword) {
      req.session.isAuthenticated = true;
      req.session.username = username;
      return res.json({ ok: true, username });
    }
    return res.status(401).json({ message: "Invalid username or password" });
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      return res.json({ ok: true });
    });
  });
  app2.get("/api/auth/me", (req, res) => {
    if (req.session?.isAuthenticated) {
      return res.json({ authenticated: true, username: req.session.username });
    }
    return res.json({ authenticated: false });
  });
  app2.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app2.use("/api/leads", requireAuth);
  app2.use("/api/products", requireAuth);
  app2.use("/api/suppliers", requireAuth);
  try {
    const existing = await storage.getLeads();
    if (existing.length === 0) {
      console.log("Seeding database with default leads...");
      for (const lead of seedLeads) {
        await storage.createLead(lead);
      }
      console.log(`Seeded ${seedLeads.length} leads.`);
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
  try {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length === 0) {
      console.log("Seeding database with default products...");
      const { seedProducts: seedProducts2 } = await Promise.resolve().then(() => (init_seed_products(), seed_products_exports));
      for (const product of seedProducts2) {
        await storage.createProduct(product);
      }
      console.log(`Seeded ${seedProducts2.length} products.`);
    }
  } catch (err) {
    console.error("Error seeding products:", err);
  }
  app2.get(api.leads.list.path, async (req, res) => {
    const leads4 = await storage.getLeads();
    res.json(leads4);
  });
  app2.get("/api/leads/deleted", async (_req, res) => {
    const deleted = await storage.getDeletedLeads();
    res.json(deleted);
  });
  app2.patch("/api/leads/:id/restore", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    try {
      const restored = await storage.restoreLead(id);
      if (!restored) return res.status(404).json({ message: "Lead not found" });
      res.json(restored);
    } catch {
      res.status(500).json({ message: "Failed to restore lead" });
    }
  });
  app2.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z3.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join(".")
        });
      }
      throw err;
    }
  });
  app2.patch(api.leads.update.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    try {
      const input = api.leads.update.input.parse(req.body);
      const updated = await storage.updateLead(id, input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z3.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join(".")
        });
      }
      throw err;
    }
  });
  app2.delete(api.leads.delete.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    const reason = req.body?.reason;
    if (!reason || typeof reason !== "string" || !reason.trim()) {
      return res.status(400).json({ message: "A reason for dismissing this lead is required." });
    }
    await storage.softDeleteLead(id, reason.trim());
    res.status(204).end();
  });
  const INDUSTRY_PRODUCTS = {
    rubber_latex: "Silicone release agents, silicone oil/fluids (PDMS 350 cst), processing aids, mould release agents, silane coupling agents for rubber compounding, antioxidants, polymer additives",
    pharma: "Simethicone (anti-flatulents, USP/IP/EP grades), Dimethicone (skin protectants), pharmaceutical intermediates (gluconate salts, lactate salts, MSM, DMSO), silicone fluids, pharma-grade antifoams",
    pcd_personal_care: "Cyclomethicone, Dimethicone (hair care, skin care), silicone emulsions, volatile silicones (D4/D5), MQ silicone resin for cosmetics, silicone surfactants, solvents (propylene glycol)",
    pvc: "Ca-Zn stabilizers, PVC heat stabilizers (calcium/zinc acetylacetonate, stearates), light stabilizers (HALS), UV absorbers, antioxidants, one-pack stabilizers, ESBO, silane coupling agents for fillers",
    paints: "Epoxy resins (HSC1100/3300/2306 for industrial/protective coatings), epoxy hardeners & amines (Jeffamine, MXDA, IPDA), silicone-based additives (defoamers, flow agents), silane coupling agents, solvents (MIBK, propylene carbonate, benzyl alcohol), light stabilizers, UV absorbers, MQ silicone resin",
    construction: "Epoxy flooring resins, epoxy hardeners (TETA, DETA), silicone water repellents (Aquaphobe), waterproofing silicone emulsions, construction sealants, silane coupling agents, solvents (furfuryl alcohol, propylene carbonate)",
    agriculture: "Spray adjuvants (silicone-based wetters/spreaders like Resilwet/Resicare), antifoam agents for agrochemical formulations, silicone surfactants",
    paper_pulp: "Antifoam agents (silicone-based defoamers for pulp washing, paper coating), paper making chemicals, silicone fluids",
    water_treatment: "Antifoam agents (silicone defoamers for effluent treatment, aeration), process chemicals",
    leather: "Silicone softeners, silicone release agents for leather finishing, water repellent treatments, silicone surfactants & wetting agents",
    wire_cable: "Ca-Zn stabilizers for PVC wire insulation, PVC heat stabilizers, lead-free stabilizer systems, antioxidants, silane coupling agents, polymer additives",
    footwear: "Silicone release agents for shoe mould release, silicone-based polish/finish agents, polymer additives",
    food_processing: "Food-grade antifoam (Simethicone-based), food-grade silicone lubricants/fluids, defoamers for sugar/beverage processing",
    adhesives_sealants: "Epoxy resins (structural adhesives), epoxy hardeners & amines, silicone sealants, silane coupling agents (adhesion promoters), MQ silicone resin, antioxidants, solvents",
    medical_devices: "Medical-grade silicone (biocompatible), silicone fluids (PDMS), silicone tubing, epoxy encapsulation resins"
  };
  const INDUSTRY_NAMES = {
    rubber_latex: "Rubber & Latex",
    pharma: "Pharmaceuticals",
    pcd_personal_care: "Personal Care & Cosmetics",
    pvc: "PVC & Plastics",
    paints: "Paints & Coatings",
    construction: "Construction Chemicals",
    agriculture: "Agriculture & Agrochemicals",
    paper_pulp: "Paper & Pulp",
    water_treatment: "Water Treatment",
    leather: "Leather",
    wire_cable: "Wire & Cable",
    footwear: "Footwear",
    food_processing: "Food Processing",
    adhesives_sealants: "Adhesives & Sealants",
    medical_devices: "Medical Devices"
  };
  const generateInputSchema = z3.object({
    industry: z3.string().min(1),
    region: z3.string().min(1),
    count: z3.number().int().min(1).max(8).default(5),
    product: z3.string().optional(),
    industries: z3.array(z3.string()).optional()
  });
  const generatedLeadSchema = z3.object({
    company: z3.string().min(1),
    region: z3.string().min(1),
    city: z3.string().default(""),
    person: z3.string().default("Decision Maker"),
    role: z3.string().default("Procurement"),
    website: z3.string().default(""),
    linkedin: z3.string().default(""),
    tags: z3.array(z3.string()).default([]),
    pitch: z3.string().default(""),
    intelligence: z3.string().default("")
  });
  async function generateLeadsForIndustry(industry, region, count, product, existingLeads) {
    const industryName = INDUSTRY_NAMES[industry] || industry;
    const products2 = product ? `${product} (specifically focus on buyers of this product)` : INDUSTRY_PRODUCTS[industry] || "specialty chemical products";
    const existingCompanies = existingLeads.filter((l) => l.industry === industry).map((l) => l.company).join(", ");
    const regionFilter = region === "India" ? "anywhere in India (focus on Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Telangana)" : `in ${region}, India`;
    const prompt = `You are a B2B sales intelligence tool for Fabrevol, an Indian specialty chemicals supplier offering PVC stabilizers, epoxy resins, TDI, MDI, and Resil products (silicones, antifoams, spray adjuvants, water repellents \u2014 excluding textile division).

Generate ${Math.min(count, 8)} REAL manufacturer companies in the "${industryName}" industry located ${regionFilter} that would be potential buyers of: ${products2}.

IMPORTANT: These must be real, verifiable Indian manufacturing companies. Do NOT invent fictional companies.
${existingCompanies ? `
Do NOT include these companies (already in database): ${existingCompanies}` : ""}

For each company, return a JSON array with objects containing:
- "company": Full legal company name
- "industry": "${industry}" (use this exact ID)
- "region": The Indian state (one of: Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Telangana, or the actual state if outside these)
- "city": City name with industrial area/MIDC if known (e.g. "Pune (Ranjangaon MIDC)")
- "person": Likely decision maker title (e.g. "Purchase Manager", "VP Operations", "Director Procurement")
- "role": Short role label (e.g. "Procurement", "Operations", "Director")
- "website": Company website URL if known, otherwise empty string
- "linkedin": Company LinkedIn URL if known, otherwise empty string
- "source": "AI Discovery"
- "tags": Array of 2-4 relevant tags about the company (products, certifications, specializations)
- "pitch": A detailed 3-4 sentence sales pitch structured as: (1) WHICH specific Fabrevol product to pitch, (2) WHY this company needs it \u2014 referencing their actual manufacturing processes or products, (3) our competitive advantage (cost savings, regulatory compliance, technical superiority, or reliability of supply), and (4) a suggested opening angle for the first conversation (e.g. "Offer a free trial batch" or "Lead with compliance documentation"). Make it actionable for the sales rep.
- "intelligence": A 2-3 sentence procurement intelligence note about the company covering: capacity/scale, certifications (ISO, FDA, CE etc.), parent company or group, and any known procurement patterns or decision-making structure.

Return a JSON object with a "companies" key containing the array of company objects. Example: {"companies": [...]}`;
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a B2B sales intelligence tool. Always respond with a valid JSON array of company objects. No markdown, no explanation." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 6e3,
      response_format: { type: "json_object" }
    });
    const content = response.choices[0]?.message?.content || "{}";
    let rawParsed;
    try {
      rawParsed = JSON.parse(content);
    } catch {
      return [];
    }
    const generatedLeads = Array.isArray(rawParsed) ? rawParsed : Array.isArray(rawParsed.companies) ? rawParsed.companies : Array.isArray(rawParsed.leads) ? rawParsed.leads : [];
    const allExisting = existingLeads.map((l) => l.company.toLowerCase().trim());
    const savedLeads = [];
    for (const rawLead of generatedLeads) {
      const validated = generatedLeadSchema.safeParse(rawLead);
      if (!validated.success) continue;
      const lead = validated.data;
      const companyLower = lead.company.toLowerCase().trim();
      if (allExisting.includes(companyLower)) continue;
      try {
        const saved = await storage.createLead({
          company: lead.company,
          industry,
          region: lead.region || region,
          city: lead.city,
          person: lead.person,
          role: lead.role,
          website: lead.website || null,
          linkedin: lead.linkedin || null,
          phone: null,
          source: "AI Discovery",
          tags: lead.tags,
          pitch: lead.pitch || null,
          intelligence: lead.intelligence || null,
          status: "New",
          isFavorite: false,
          dealStage: "new",
          dealValue: 0,
          directEmail: null,
          mobile: null,
          nextFollowUp: null,
          nextAction: null,
          activities: []
        });
        savedLeads.push(saved);
      } catch (err) {
        console.error("Error saving AI-generated lead:", err);
      }
    }
    return savedLeads;
  }
  app2.post("/api/leads/generate", async (req, res) => {
    try {
      const genInput = generateInputSchema.safeParse(req.body);
      if (!genInput.success) {
        return res.status(400).json({ message: genInput.error.errors[0]?.message || "Invalid input" });
      }
      const { industry, region, count, product, industries } = genInput.data;
      const existingLeads = await storage.getAllLeadsIncludingDeleted();
      if (industries && industries.length > 0) {
        const leadsPerIndustry = Math.max(2, Math.floor(count / industries.length)) || 3;
        const allSavedLeads = [];
        for (const ind of industries) {
          const leads4 = await generateLeadsForIndustry(ind, region, leadsPerIndustry, product, existingLeads);
          allSavedLeads.push(...leads4);
        }
        if (allSavedLeads.length === 0) {
          return res.status(500).json({ message: "No leads generated" });
        }
        return res.status(201).json(allSavedLeads);
      }
      const savedLeads = await generateLeadsForIndustry(industry, region, count, product, existingLeads);
      if (savedLeads.length === 0) {
        return res.status(500).json({ message: "No leads generated" });
      }
      res.status(201).json(savedLeads);
    } catch (err) {
      console.error("Error generating leads:", err);
      res.status(500).json({ message: "Failed to generate leads. Please try again." });
    }
  });
  const ALL_INDUSTRIES = [
    "Rubber & Latex",
    "Pharmaceuticals",
    "Personal Care & Cosmetics",
    "PVC & Plastics",
    "Paints & Coatings",
    "Construction Chemicals",
    "Agriculture & Agrochemicals",
    "Paper & Pulp",
    "Water Treatment",
    "Leather",
    "Wire & Cable",
    "Footwear",
    "Food Processing",
    "Adhesives & Sealants",
    "Medical Devices"
  ];
  app2.get("/api/products", async (req, res) => {
    const prods = await storage.getProducts();
    res.json(prods);
  });
  app2.post("/api/products/analyze-text", async (req, res) => {
    try {
      const { name } = req.body;
      if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ message: "Product name is required" });
      }
      const prompt = `You are a specialty chemicals sales intelligence tool for Fabrevol, an Indian chemicals supplier.

Analyze this product: "${name.trim()}"

Return a JSON object with:
- "name": The product name (clean, standard industry name)
- "description": A 2-3 sentence description of what this product is, its chemical composition/type, and its key properties
- "applications": A 2-3 sentence description of the main industrial applications and use cases
- "targetIndustries": An array of industries from this list that would buy this product: ${JSON.stringify(ALL_INDUSTRIES)}. Only include industries where this product has clear relevance.
- "keywords": An array of 5-10 lowercase search keywords that would help match this product to potential buyers. Include the product name, chemical synonyms, common abbreviations, application terms, and related product categories.

Return ONLY the JSON object, no markdown or explanation.`;
      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are a chemicals industry expert. Respond only with valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2e3,
        response_format: { type: "json_object" }
      });
      const content = response.choices[0]?.message?.content || "{}";
      const aiResult = JSON.parse(content);
      const product = await storage.createProduct({
        name: aiResult.name || name.trim(),
        description: aiResult.description || null,
        applications: aiResult.applications || null,
        targetIndustries: aiResult.targetIndustries || [],
        keywords: aiResult.keywords || [],
        source: "text",
        pdfName: null
      });
      res.status(201).json(product);
    } catch (err) {
      console.error("Error analyzing product:", err);
      res.status(500).json({ message: "Failed to analyze product. Please try again." });
    }
  });
  app2.post("/api/products/analyze-pdf", upload.single("pdf"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "PDF file is required" });
      }
      const { createRequire } = await import("module");
      const require2 = createRequire(import.meta.url);
      const pdfParse = require2("pdf-parse");
      const pdfData = await pdfParse(req.file.buffer);
      const pdfText = pdfData.text.substring(0, 4e3);
      const prompt = `You are a specialty chemicals sales intelligence tool for Fabrevol, an Indian chemicals supplier.

Analyze this product technical data sheet (TDS) text extracted from a PDF:

---
${pdfText}
---

Return a JSON object with:
- "name": The product name extracted from the document (clean, standard industry name)
- "description": A 2-3 sentence description of what this product is, its chemical composition/type, and its key properties based on the TDS
- "applications": A 2-3 sentence description of the main industrial applications and use cases mentioned in the TDS
- "targetIndustries": An array of industries from this list that would buy this product: ${JSON.stringify(ALL_INDUSTRIES)}. Only include industries where this product has clear relevance based on the applications described.
- "keywords": An array of 5-10 lowercase search keywords that would help match this product to potential buyers. Include the product name, chemical synonyms, common abbreviations, application terms, and related product categories mentioned in the TDS.

Return ONLY the JSON object, no markdown or explanation.`;
      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are a chemicals industry expert. Respond only with valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2e3,
        response_format: { type: "json_object" }
      });
      const content = response.choices[0]?.message?.content || "{}";
      const pdfAiResult = JSON.parse(content);
      const product = await storage.createProduct({
        name: pdfAiResult.name || req.file.originalname || "Unknown Product",
        description: pdfAiResult.description || null,
        applications: pdfAiResult.applications || null,
        targetIndustries: pdfAiResult.targetIndustries || [],
        keywords: pdfAiResult.keywords || [],
        source: "pdf",
        pdfName: req.file.originalname || null
      });
      res.status(201).json(product);
    } catch (err) {
      console.error("Error analyzing PDF:", err);
      res.status(500).json({ message: "Failed to analyze PDF. Please try again." });
    }
  });
  app2.delete("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    await storage.deleteProduct(id);
    res.status(204).end();
  });
  const ALL_PRODUCT_NAMES = [
    "Ca-Zn Stabilizers",
    "Epoxy Resins",
    "Simethicone / Dimethicone",
    "Antifoams / Defoamers",
    "Spray Adjuvants",
    "Silicone Release Agents",
    "TDI (Toluene Diisocyanate)",
    "MDI (Methylene Diphenyl Diisocyanate)",
    "Water Repellents",
    "Silicone Softeners"
  ];
  try {
    const existingSuppliers = await storage.getSuppliers();
    if (existingSuppliers.length === 0) {
      console.log("Seeding database with default suppliers...");
      const defaultSuppliers = [
        {
          name: "Resil Chemicals",
          description: "Leading Indian manufacturer of specialty silicones (est. 1994). 27+ years experience, 1000+ customers across 4 continents. Products include silicone fluids, antifoams, simethicone, spray adjuvants, water repellents, and release agents. Fabrevol is an authorized distributor.",
          website: "https://resilsilicones.com",
          contactName: null,
          contactEmail: null,
          contactPhone: null,
          contactDesignation: null,
          notes: "Primary supplier for silicone-based products. Authorized distributor relationship. Excludes textile division products.",
          pdfName: null,
          products: [
            "Simethicone / Dimethicone",
            "Antifoams / Defoamers",
            "Spray Adjuvants",
            "Silicone Release Agents",
            "Water Repellents",
            "Silicone Softeners",
            "Silicone Fluids (PDMS)",
            "Silicone Surfactants & Wetting Agents"
          ]
        },
        {
          name: "Mobelchem",
          description: "Indian specialty chemicals company (est. 2020) serving 1000+ clients with 200+ products. Offers silane coupling agents, polymer additives, silicone intermediates, epoxy resins, hardeners, and solvents across industries including coatings, adhesives, rubber, agriculture, and wire & cable.",
          website: "https://www.mobelchem.com",
          contactName: null,
          contactEmail: null,
          contactPhone: null,
          contactDesignation: null,
          notes: "Can supply their products but Fabrevol is NOT an official distributor. Do not mention Mobelchem in customer-facing materials.",
          pdfName: null,
          products: [
            "Silane Coupling Agents",
            "Epoxy Resins",
            "Epoxy Hardeners & Amines",
            "Polymer Additives",
            "Silicone Intermediates (HMDSO / D4 / D5 / DMC)",
            "Solvents"
          ]
        },
        {
          name: "Lanya Chem",
          description: "Chinese-origin specialty chemicals manufacturer (15+ years) focused on silane coupling agents and acetylacetone production. Offers PVC additives (heat/light stabilizers, UV absorbers, antioxidants), silicone oils, paper chemicals, MQ silicone resin, and pharmaceutical intermediates.",
          website: "https://lanyachemindia.com",
          contactName: null,
          contactEmail: null,
          contactPhone: null,
          contactDesignation: null,
          notes: null,
          pdfName: null,
          products: [
            "Silane Coupling Agents",
            "PVC Heat Stabilizers (Ca/Zn Acetylacetonate)",
            "Light Stabilizers (HALS)",
            "UV Absorbers",
            "Antioxidants",
            "Silicone Fluids (PDMS)",
            "Acetylacetone & Metal Salts",
            "Paper Making Chemicals",
            "MQ Silicone Resin",
            "Pharmaceutical Intermediates"
          ]
        }
      ];
      for (const supplier of defaultSuppliers) {
        await storage.createSupplier(supplier);
      }
      console.log(`Seeded ${defaultSuppliers.length} suppliers.`);
    }
  } catch (err) {
    console.error("Error seeding suppliers:", err);
  }
  app2.get("/api/suppliers", async (req, res) => {
    const allSuppliers = await storage.getSuppliers();
    res.json(allSuppliers);
  });
  app2.post("/api/suppliers", async (req, res) => {
    try {
      const input = insertSupplierSchema.parse(req.body);
      const supplier = await storage.createSupplier(input);
      res.status(201).json(supplier);
    } catch (err) {
      if (err instanceof z3.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });
  app2.patch("/api/suppliers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    try {
      const input = insertSupplierSchema.partial().parse(req.body);
      const updated = await storage.updateSupplier(id, input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z3.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });
  app2.delete("/api/suppliers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    await storage.deleteSupplier(id);
    res.status(204).end();
  });
  app2.get("/api/export", requireAuth, async (_req, res) => {
    const [allLeads, allProducts, allSuppliers] = await Promise.all([
      storage.getAllLeadsIncludingDeleted(),
      storage.getProducts(),
      storage.getSuppliers()
    ]);
    res.json({ leads: allLeads, products: allProducts, suppliers: allSuppliers });
  });
  app2.post("/api/import", requireAuth, async (req, res) => {
    const { leads: inLeads = [], products: inProducts = [], suppliers: inSuppliers = [] } = req.body;
    const [existingLeads, existingProducts, existingSuppliers] = await Promise.all([
      storage.getAllLeadsIncludingDeleted(),
      storage.getProducts(),
      storage.getSuppliers()
    ]);
    const existingCompanies = new Set(existingLeads.map((l) => l.company.toLowerCase().trim()));
    const existingProductNames = new Set(existingProducts.map((p) => p.name.toLowerCase().trim()));
    const existingSupplierNames = new Set(existingSuppliers.map((s) => s.name.toLowerCase().trim()));
    let leadsImported = 0, productsImported = 0, suppliersImported = 0;
    for (const lead of inLeads) {
      if (existingCompanies.has((lead.company || "").toLowerCase().trim())) continue;
      const { id, createdAt, ...rest } = lead;
      await storage.createLead(rest);
      leadsImported++;
    }
    for (const product of inProducts) {
      if (existingProductNames.has((product.name || "").toLowerCase().trim())) continue;
      const { id, createdAt, ...rest } = product;
      await storage.createProduct(rest);
      productsImported++;
    }
    for (const supplier of inSuppliers) {
      if (existingSupplierNames.has((supplier.name || "").toLowerCase().trim())) continue;
      const { id, createdAt, ...rest } = supplier;
      await storage.createSupplier(rest);
      suppliersImported++;
    }
    res.json({ leadsImported, productsImported, suppliersImported });
  });
  return httpServer2;
}

// server/app.ts
import { createServer } from "http";
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
var app = express();
var httpServer = createServer(app);
app.set("trust proxy", 1);
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express.urlencoded({ extended: false }));
var PgStore = connectPgSimple(session);
app.use(
  session({
    store: new PgStore({
      pool,
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1e3,
      sameSite: "lax"
    }
  })
);
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });
  next();
});
async function initApp() {
  await registerRoutes(httpServer, app);
  app.use((err, _req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) {
      return next(err);
    }
    return res.status(status).json({ message });
  });
}

// server/vercel.ts
var initPromise = initApp();
async function handler(req, res) {
  await initPromise;
  app(req, res);
}
export {
  handler as default
};
