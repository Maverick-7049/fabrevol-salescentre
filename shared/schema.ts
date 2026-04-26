import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
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

export const DEAL_STAGES = [
  { id: "new", label: "New", color: "bg-slate-500" },
  { id: "contacted", label: "Contacted", color: "bg-blue-500" },
  { id: "meeting", label: "Meeting Set", color: "bg-purple-500" },
  { id: "proposal", label: "Proposal Sent", color: "bg-amber-500" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { id: "won", label: "Won", color: "bg-emerald-500" },
  { id: "lost", label: "Lost", color: "bg-red-500" },
] as const;
