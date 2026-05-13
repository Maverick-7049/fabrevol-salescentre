import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
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
  deleteReason: text("delete_reason"),
  // Company size: A = MNC/large listed, B = mid-large, C = regional SME, D = small/startup
  companySize: text("company_size"),
  // Verification: unverified | partial | verified | invalid
  verificationStatus: text("verification_status").default("unverified"),
  // Signals: { website, linkedin, gst, phone, manual }
  verificationSignals: jsonb("verification_signals").default({}),
});

export const activitySchema = z.object({
  id: z.string(),
  type: z.enum(["note", "call", "email", "meeting"]),
  content: z.string(),
  timestamp: z.string(),
});

export type Activity = z.infer<typeof activitySchema>;

export const insertLeadSchema = createInsertSchema(leads).omit({ 
  id: true, 
  createdAt: true 
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  applications: text("applications"),
  targetIndustries: text("target_industries").array(),
  keywords: text("keywords").array(),
  source: text("source"),
  pdfName: text("pdf_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const suppliers = pgTable("suppliers", {
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true,
});

export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;

// ─── Purchase Order tables ─────────────────────────────────────────────────

export const poSuppliers = pgTable("po_suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  gstin: text("gstin"),
  address: text("address"),
  contactName: text("contact_name"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPoSupplierSchema = createInsertSchema(poSuppliers).omit({ id: true, createdAt: true });
export type PoSupplier = typeof poSuppliers.$inferSelect;
export type InsertPoSupplier = z.infer<typeof insertPoSupplierSchema>;

export const poAddresses = pgTable("po_addresses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  gstin: text("gstin"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPoAddressSchema = createInsertSchema(poAddresses).omit({ id: true, createdAt: true });
export type PoAddress = typeof poAddresses.$inferSelect;
export type InsertPoAddress = z.infer<typeof insertPoAddressSchema>;

export const poItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  packs: z.number().nullable(),
  kgPerPack: z.number().nullable(),
  totalQty: z.number(),
  unit: z.string(),
  rate: z.number(),
  amount: z.number(),
});
export type POItem = z.infer<typeof poItemSchema>;

export const purchaseOrders = pgTable("purchase_orders", {
  id: serial("id").primaryKey(),
  poNumber: text("po_number").notNull(),
  date: text("date").notNull(),
  supplierId: integer("supplier_id"),
  supplierName: text("supplier_name"),
  shipToAddressId: integer("ship_to_address_id"),
  shipToName: text("ship_to_name"),
  shipToAddress: text("ship_to_address"),
  shipToGstin: text("ship_to_gstin"),
  shipToPhone: text("ship_to_phone"),
  items: jsonb("items").default([]),
  gstType: text("gst_type").default("igst"),  // "igst" | "cgst_sgst"
  paymentTerms: text("payment_terms"),
  transportTerms: text("transport_terms"),
  insuranceTerms: text("insurance_terms"),
  dispatchSchedule: text("dispatch_schedule"),
  transporterDetails: text("transporter_details"),
  notes: text("notes"),
  subtotal: real("subtotal").default(0),
  gstAmount: real("gst_amount").default(0),
  totalAmount: real("total_amount").default(0),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrders).omit({ id: true, createdAt: true });
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;

export const DEAL_STAGES = [
  { id: "new", label: "New", color: "bg-slate-500" },
  { id: "contacted", label: "Contacted", color: "bg-blue-500" },
  { id: "meeting", label: "Meeting Set", color: "bg-purple-500" },
  { id: "proposal", label: "Proposal Sent", color: "bg-amber-500" },
  { id: "sampling", label: "Sampling", color: "bg-teal-500" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { id: "won", label: "Won", color: "bg-emerald-500" },
  { id: "lost", label: "Lost", color: "bg-red-500" },
] as const;
