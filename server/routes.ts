import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { leads, insertSupplierSchema } from "@shared/schema";
import { seedLeads } from "./seed-data";
import OpenAI from "openai";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || undefined,
});

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAuthenticated) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/auth/login", (req, res) => {
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

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      return res.json({ ok: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.session?.isAuthenticated) {
      return res.json({ authenticated: true, username: req.session.username });
    }
    return res.json({ authenticated: false });
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/leads", requireAuth);
  app.use("/api/products", requireAuth);
  app.use("/api/suppliers", requireAuth);

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
      const { seedProducts } = await import("./seed-products");
      for (const product of seedProducts) {
        await storage.createProduct(product);
      }
      console.log(`Seeded ${seedProducts.length} products.`);
    }
  } catch (err) {
    console.error("Error seeding products:", err);
  }

  app.get(api.leads.list.path, async (req, res) => {
    const leads = await storage.getLeads();
    res.json(leads);
  });

  app.get("/api/leads/deleted", async (_req, res) => {
    const deleted = await storage.getDeletedLeads();
    res.json(deleted);
  });

  app.patch("/api/leads/:id/restore", async (req, res) => {
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

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.patch(api.leads.update.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    try {
      const input = api.leads.update.input.parse(req.body);
      const updated = await storage.updateLead(id, input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.leads.delete.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const reason = req.body?.reason;
    if (!reason || typeof reason !== "string" || !reason.trim()) {
      return res.status(400).json({ message: "A reason for dismissing this lead is required." });
    }
    await storage.softDeleteLead(id, reason.trim());
    res.status(204).end();
  });

  const INDUSTRY_PRODUCTS: Record<string, string> = {
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
    medical_devices: "Medical-grade silicone (biocompatible), silicone fluids (PDMS), silicone tubing, epoxy encapsulation resins",
  };

  const INDUSTRY_NAMES: Record<string, string> = {
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
    medical_devices: "Medical Devices",
  };

  const generateInputSchema = z.object({
    industry: z.string().min(1),
    region: z.string().min(1),
    count: z.number().int().min(1).max(8).default(5),
    product: z.string().optional(),
    industries: z.array(z.string()).optional(),
  });

  const generatedLeadSchema = z.object({
    company: z.string().min(1),
    region: z.string().min(1),
    city: z.string().default(""),
    person: z.string().default("Decision Maker"),
    role: z.string().default("Procurement"),
    website: z.string().default(""),
    linkedin: z.string().default(""),
    tags: z.array(z.string()).default([]),
    pitch: z.string().default(""),
    intelligence: z.string().default(""),
  });

  async function generateLeadsForIndustry(industry: string, region: string, count: number, product: string | undefined, existingLeads: any[]) {
    const industryName = INDUSTRY_NAMES[industry] || industry;
    const products = product 
      ? `${product} (specifically focus on buyers of this product)`
      : (INDUSTRY_PRODUCTS[industry] || "specialty chemical products");

    const existingCompanies = existingLeads
      .filter(l => l.industry === industry)
      .map(l => l.company)
      .join(", ");

    const regionFilter = region === "India" 
      ? "anywhere in India (focus on Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Telangana)" 
      : `in ${region}, India`;

    const prompt = `You are a B2B sales intelligence tool for Fabrevol, an Indian specialty chemicals supplier offering PVC stabilizers, epoxy resins, TDI, MDI, and Resil products (silicones, antifoams, spray adjuvants, water repellents — excluding textile division).

Generate ${Math.min(count, 8)} REAL manufacturer companies in the "${industryName}" industry located ${regionFilter} that would be potential buyers of: ${products}.

IMPORTANT: These must be real, verifiable Indian manufacturing companies. Do NOT invent fictional companies.
${existingCompanies ? `\nDo NOT include these companies (already in database): ${existingCompanies}` : ""}

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
- "pitch": A detailed 3-4 sentence sales pitch structured as: (1) WHICH specific Fabrevol product to pitch, (2) WHY this company needs it — referencing their actual manufacturing processes or products, (3) our competitive advantage (cost savings, regulatory compliance, technical superiority, or reliability of supply), and (4) a suggested opening angle for the first conversation (e.g. "Offer a free trial batch" or "Lead with compliance documentation"). Make it actionable for the sales rep.
- "intelligence": A 2-3 sentence procurement intelligence note about the company covering: capacity/scale, certifications (ISO, FDA, CE etc.), parent company or group, and any known procurement patterns or decision-making structure.

Return a JSON object with a "companies" key containing the array of company objects. Example: {"companies": [...]}`;

    let response;
    try {
      response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a B2B sales intelligence tool. Always respond with a valid JSON array of company objects. No markdown, no explanation." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 6000,
        response_format: { type: "json_object" },
      });
    } catch (aiErr: any) {
      console.error("OpenAI API error:", aiErr?.message || aiErr);
      throw new Error(`OpenAI error: ${aiErr?.message || "Unknown AI error"}`);
    }

    const content = response.choices[0]?.message?.content || "{}";
    let rawParsed;
    try {
      rawParsed = JSON.parse(content);
    } catch {
      return [];
    }

    const generatedLeads = Array.isArray(rawParsed) 
      ? rawParsed 
      : Array.isArray(rawParsed.companies) 
        ? rawParsed.companies 
        : Array.isArray(rawParsed.leads) 
          ? rawParsed.leads 
          : [];

    const allExisting = existingLeads.map(l => l.company.toLowerCase().trim());

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
          industry: industry,
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
          activities: [],
        });
        savedLeads.push(saved);
      } catch (err) {
        console.error("Error saving AI-generated lead:", err);
      }
    }

    return savedLeads;
  }

  app.post("/api/leads/generate", async (req, res) => {
    // Fail fast with a clear message if the key is not configured
    const openaiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res.status(500).json({ message: "OpenAI API key is not configured. Please set OPENAI_API_KEY in Vercel environment variables." });
    }

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
          const leads = await generateLeadsForIndustry(ind, region, leadsPerIndustry, product, existingLeads);
          allSavedLeads.push(...leads);
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
    } catch (err: any) {
      console.error("Error generating leads:", err);
      const detail = err?.message || String(err);
      res.status(500).json({ message: `Failed to generate leads: ${detail}` });
    }
  });

  const ALL_INDUSTRIES = [
    "Rubber & Latex", "Pharmaceuticals", "Personal Care & Cosmetics",
    "PVC & Plastics", "Paints & Coatings", "Construction Chemicals",
    "Agriculture & Agrochemicals", "Paper & Pulp", "Water Treatment",
    "Leather", "Wire & Cable", "Footwear", "Food Processing",
    "Adhesives & Sealants", "Medical Devices"
  ];

  app.get("/api/products", async (req, res) => {
    const prods = await storage.getProducts();
    res.json(prods);
  });

  app.post("/api/products/analyze-text", async (req, res) => {
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

      let aiResponse;
      try {
        aiResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a chemicals industry expert. Respond only with valid JSON." },
            { role: "user", content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2000,
          response_format: { type: "json_object" },
        });
      } catch (aiErr: any) {
        console.error("OpenAI error (analyze-text):", aiErr?.message);
        return res.status(500).json({ message: `OpenAI error: ${aiErr?.message || "Unknown error"}` });
      }

      const content = aiResponse.choices[0]?.message?.content || "{}";
      const aiResult = JSON.parse(content);

      const product = await storage.createProduct({
        name: aiResult.name || name.trim(),
        description: aiResult.description || null,
        applications: aiResult.applications || null,
        targetIndustries: aiResult.targetIndustries || [],
        keywords: aiResult.keywords || [],
        source: "text",
        pdfName: null,
      });

      res.status(201).json(product);
    } catch (err: any) {
      console.error("Error analyzing product:", err);
      res.status(500).json({ message: `Failed to analyze product: ${err?.message || err}` });
    }
  });

  app.post("/api/products/analyze-pdf", upload.single("pdf"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "PDF file is required" });
      }

      const { createRequire } = await import("module");
      const require = createRequire(import.meta.url);
      const pdfParse = require("pdf-parse");
      let pdfData: any;
      try {
        pdfData = await pdfParse(req.file.buffer);
      } catch (pdfErr: any) {
        console.error("PDF parse error:", pdfErr?.message);
        return res.status(500).json({ message: `Failed to read PDF: ${pdfErr?.message || "Unknown error"}` });
      }
      const pdfText = pdfData.text.substring(0, 4000);

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

      let pdfAiResponse;
      try {
        pdfAiResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a chemicals industry expert. Respond only with valid JSON." },
            { role: "user", content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2000,
          response_format: { type: "json_object" },
        });
      } catch (aiErr: any) {
        console.error("OpenAI error (analyze-pdf):", aiErr?.message);
        return res.status(500).json({ message: `OpenAI error: ${aiErr?.message || "Unknown error"}` });
      }

      const content = pdfAiResponse.choices[0]?.message?.content || "{}";
      const pdfAiResult = JSON.parse(content);

      const product = await storage.createProduct({
        name: pdfAiResult.name || req.file!.originalname || "Unknown Product",
        description: pdfAiResult.description || null,
        applications: pdfAiResult.applications || null,
        targetIndustries: pdfAiResult.targetIndustries || [],
        keywords: pdfAiResult.keywords || [],
        source: "pdf",
        pdfName: req.file!.originalname || null,
      });

      res.status(201).json(product);
    } catch (err: any) {
      console.error("Error analyzing PDF:", err);
      res.status(500).json({ message: `Failed to analyze PDF: ${err?.message || err}` });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    await storage.deleteProduct(id);
    res.status(204).end();
  });

  const ALL_PRODUCT_NAMES = [
    "Ca-Zn Stabilizers", "Epoxy Resins", "Simethicone / Dimethicone",
    "Antifoams / Defoamers", "Spray Adjuvants", "Silicone Release Agents",
    "TDI (Toluene Diisocyanate)", "MDI (Methylene Diphenyl Diisocyanate)",
    "Water Repellents", "Silicone Softeners"
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
            "Silicone Surfactants & Wetting Agents",
          ],
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
            "Solvents",
          ],
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
            "Pharmaceutical Intermediates",
          ],
        },
      ];
      for (const supplier of defaultSuppliers) {
        await storage.createSupplier(supplier);
      }
      console.log(`Seeded ${defaultSuppliers.length} suppliers.`);
    }
  } catch (err) {
    console.error("Error seeding suppliers:", err);
  }

  app.get("/api/suppliers", async (req, res) => {
    const allSuppliers = await storage.getSuppliers();
    res.json(allSuppliers);
  });

  app.post("/api/suppliers", async (req, res) => {
    try {
      const input = insertSupplierSchema.parse(req.body);
      const supplier = await storage.createSupplier(input);
      res.status(201).json(supplier);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.patch("/api/suppliers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    try {
      const input = insertSupplierSchema.partial().parse(req.body);
      const updated = await storage.updateSupplier(id, input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete("/api/suppliers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    await storage.deleteSupplier(id);
    res.status(204).end();
  });

  // TEMPORARY: data export — visit while logged in on Replit, then remove
  app.get("/api/export", requireAuth, async (_req, res) => {
    const [allLeads, allProducts, allSuppliers] = await Promise.all([
      storage.getAllLeadsIncludingDeleted(),
      storage.getProducts(),
      storage.getSuppliers(),
    ]);
    res.json({ leads: allLeads, products: allProducts, suppliers: allSuppliers });
  });

  // TEMPORARY: data import — POST the exported JSON here after Vercel deploy, then remove
  app.post("/api/import", requireAuth, async (req, res) => {
    const { leads: inLeads = [], products: inProducts = [], suppliers: inSuppliers = [] } = req.body;

    const [existingLeads, existingProducts, existingSuppliers] = await Promise.all([
      storage.getAllLeadsIncludingDeleted(),
      storage.getProducts(),
      storage.getSuppliers(),
    ]);

    const existingCompanies = new Set(existingLeads.map((l: any) => l.company.toLowerCase().trim()));
    const existingProductNames = new Set(existingProducts.map((p: any) => p.name.toLowerCase().trim()));
    const existingSupplierNames = new Set(existingSuppliers.map((s: any) => s.name.toLowerCase().trim()));

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

  return httpServer;
}
