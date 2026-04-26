import { db } from "./db";
import { leads, products, suppliers, type Lead, type InsertLead, type Product, type InsertProduct, type Supplier, type InsertSupplier } from "@shared/schema";
import { eq, desc, isNull, isNotNull } from "drizzle-orm";

export interface IStorage {
  getLeads(): Promise<Lead[]>;
  getAllLeadsIncludingDeleted(): Promise<Lead[]>;
  getDeletedLeads(): Promise<Lead[]>;
  createLead(insertLead: InsertLead): Promise<Lead>;
  updateLead(id: number, updates: Partial<InsertLead>): Promise<Lead>;
  softDeleteLead(id: number, reason: string): Promise<void>;
  restoreLead(id: number): Promise<Lead>;
  getProducts(): Promise<Product[]>;
  createProduct(insertProduct: InsertProduct): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  getSuppliers(): Promise<Supplier[]>;
  createSupplier(insertSupplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: number, updates: Partial<InsertSupplier>): Promise<Supplier>;
  deleteSupplier(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).where(isNull(leads.deletedAt)).orderBy(desc(leads.createdAt));
  }

  async getAllLeadsIncludingDeleted(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getDeletedLeads(): Promise<Lead[]> {
    return await db.select().from(leads).where(isNotNull(leads.deletedAt)).orderBy(desc(leads.deletedAt));
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async updateLead(id: number, updates: Partial<InsertLead>): Promise<Lead> {
    const [updated] = await db.update(leads)
      .set(updates)
      .where(eq(leads.id, id))
      .returning();
    return updated;
  }

  async softDeleteLead(id: number, reason: string): Promise<void> {
    await db.update(leads)
      .set({ deletedAt: new Date(), deleteReason: reason })
      .where(eq(leads.id, id));
  }

  async restoreLead(id: number): Promise<Lead> {
    const [restored] = await db.update(leads)
      .set({ deletedAt: null, deleteReason: null })
      .where(eq(leads.id, id))
      .returning();
    return restored;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  async getSuppliers(): Promise<Supplier[]> {
    return await db.select().from(suppliers).orderBy(desc(suppliers.createdAt));
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const [supplier] = await db.insert(suppliers).values(insertSupplier).returning();
    return supplier;
  }

  async updateSupplier(id: number, updates: Partial<InsertSupplier>): Promise<Supplier> {
    const [updated] = await db.update(suppliers)
      .set(updates)
      .where(eq(suppliers.id, id))
      .returning();
    return updated;
  }

  async deleteSupplier(id: number): Promise<void> {
    await db.delete(suppliers).where(eq(suppliers.id, id));
  }
}

export const storage = new DatabaseStorage();
