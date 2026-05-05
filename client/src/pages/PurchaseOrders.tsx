import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Plus, Trash2, Printer, FileText, ChevronDown, ChevronRight,
  Building2, MapPin, Edit2, X, Check, Package
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
interface PoSupplier {
  id: number;
  name: string;
  gstin?: string | null;
  address?: string | null;
  contactName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
}

interface PoAddress {
  id: number;
  name: string;
  address: string;
  gstin?: string | null;
  phone?: string | null;
}

interface POItem {
  id: string;
  description: string;
  packs: number | null;
  kgPerPack: number | null;
  totalQty: number;
  unit: string;
  rate: number;
  amount: number;
}

interface PurchaseOrder {
  id: number;
  poNumber: string;
  date: string;
  supplierId?: number | null;
  supplierName?: string | null;
  shipToAddressId?: number | null;
  shipToName?: string | null;
  shipToAddress?: string | null;
  shipToGstin?: string | null;
  shipToPhone?: string | null;
  items: POItem[];
  gstType: string;
  paymentTerms?: string | null;
  transportTerms?: string | null;
  insuranceTerms?: string | null;
  dispatchSchedule?: string | null;
  transporterDetails?: string | null;
  notes?: string | null;
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  status: string;
  createdAt?: string;
}

// ── Company defaults ──────────────────────────────────────────────────────────
const COMPANY = {
  name: "Fabrevol",
  address: "B-903, Tinsel County Phase 3, Hinjewadi Phase 3, Pune, Maharashtra, 411057",
  phone: "8955980050, 9829020833",
  email: "Yash.jhanwar@fabrevol.com",
  gstin: "27BMBPJ8161R1ZE",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getFinancialYear() {
  const now = new Date();
  const m = now.getMonth(); // 0-based; April = 3
  const y = now.getFullYear();
  const fyStart = m >= 3 ? y : y - 1;
  const s = String(fyStart).slice(-2);
  const e = String(fyStart + 1).slice(-2);
  return `${s}-${e}`;
}

function makePONumber(existing: PurchaseOrder[]) {
  const fy = getFinancialYear();
  const fyPos = existing.filter((p) => p.poNumber.includes(fy));
  const serials = fyPos.map((p) => parseInt(p.poNumber.split("/")[0])).filter((n) => !isNaN(n));
  const next = serials.length ? Math.max(...serials) + 1 : 1;
  return `${next}/${fy}`;
}

function calcTotals(items: POItem[], gstType: string) {
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const gstAmount = subtotal * 0.18;
  const totalAmount = subtotal + gstAmount;
  return { subtotal, gstAmount, totalAmount };
}

function newItem(): POItem {
  return { id: crypto.randomUUID(), description: "", packs: null, kgPerPack: null, totalQty: 0, unit: "Kgs", rate: 0, amount: 0 };
}

// ── Print / PDF view ──────────────────────────────────────────────────────────
function POPrintView({ po, supplier }: { po: PurchaseOrder; supplier?: PoSupplier | null }) {
  const gstLabel = po.gstType === "cgst_sgst" ? "CGST + SGST (9% each)" : "IGST @ 18%";
  const halfGst = po.gstAmount / 2;
  return (
    <div className="po-print-body bg-white text-black font-sans text-[13px]" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ border: "2px solid #1a5276", borderRadius: 6, padding: "14px 18px", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#1a5276", letterSpacing: 1 }}>FABREVOL</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{COMPANY.address}</div>
            <div style={{ fontSize: 11, color: "#555" }}>Phone: {COMPANY.phone} | Email: {COMPANY.email}</div>
            <div style={{ fontSize: 11, color: "#555" }}>GSTIN: <strong>{COMPANY.gstin}</strong></div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1a5276", letterSpacing: 2 }}>PURCHASE ORDER</div>
            <table style={{ marginTop: 6, marginLeft: "auto", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, paddingRight: 12, fontSize: 12 }}>PO No.</td>
                  <td style={{ fontWeight: 700, fontSize: 13, color: "#1a5276" }}>{po.poNumber}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, paddingRight: 12, fontSize: 12 }}>Date</td>
                  <td style={{ fontSize: 12 }}>{po.date}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* To / Ship To row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {/* Supplier */}
        <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: "10px 14px" }}>
          <div style={{ fontWeight: 700, color: "#1a5276", fontSize: 11, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>To (Supplier)</div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{po.supplierName || "—"}</div>
          {supplier?.address && <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{supplier.address}</div>}
          {supplier?.gstin && <div style={{ fontSize: 11, color: "#444" }}>GSTIN: {supplier.gstin}</div>}
          {supplier?.contactPhone && <div style={{ fontSize: 11, color: "#444" }}>Ph: {supplier.contactPhone}</div>}
        </div>
        {/* Ship To */}
        <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: "10px 14px" }}>
          <div style={{ fontWeight: 700, color: "#1a5276", fontSize: 11, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Ship To &amp; Deliver At</div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{po.shipToName || "—"}</div>
          {po.shipToAddress && <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{po.shipToAddress}</div>}
          {po.shipToPhone && <div style={{ fontSize: 11, color: "#444" }}>Ph: {po.shipToPhone}</div>}
          {po.shipToGstin && <div style={{ fontSize: 11, color: "#444" }}>GSTIN: {po.shipToGstin}</div>}
        </div>
      </div>

      {/* Bill To */}
      <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: "8px 14px", marginBottom: 12, fontSize: 11 }}>
        <strong>Bill To:</strong> {COMPANY.name}, {COMPANY.address} &nbsp;|&nbsp; GSTIN: {COMPANY.gstin}
      </div>

      {/* Items table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12, fontSize: 12 }}>
        <thead>
          <tr style={{ backgroundColor: "#1a5276", color: "#fff" }}>
            <th style={{ padding: "7px 10px", textAlign: "left", width: 30 }}>S.No</th>
            <th style={{ padding: "7px 10px", textAlign: "left" }}>Description</th>
            <th style={{ padding: "7px 10px", textAlign: "center" }}>Quantity</th>
            <th style={{ padding: "7px 10px", textAlign: "center" }}>Unit</th>
            <th style={{ padding: "7px 10px", textAlign: "right" }}>Rate (₹)</th>
            <th style={{ padding: "7px 10px", textAlign: "right" }}>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {(po.items || []).map((item, idx) => (
            <tr key={item.id} style={{ backgroundColor: idx % 2 === 0 ? "#f8f9fa" : "#fff", borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "7px 10px" }}>{idx + 1}</td>
              <td style={{ padding: "7px 10px", fontWeight: 500 }}>{item.description}</td>
              <td style={{ padding: "7px 10px", textAlign: "center" }}>
                {item.packs && item.kgPerPack
                  ? `${item.packs} × ${item.kgPerPack} = ${item.totalQty}`
                  : item.totalQty}
              </td>
              <td style={{ padding: "7px 10px", textAlign: "center" }}>{item.unit}</td>
              <td style={{ padding: "7px 10px", textAlign: "right" }}>{fmt(item.rate)}</td>
              <td style={{ padding: "7px 10px", textAlign: "right" }}>{fmt(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <table style={{ borderCollapse: "collapse", minWidth: 300, fontSize: 12 }}>
          <tbody>
            <tr>
              <td style={{ padding: "4px 16px", fontWeight: 500 }}>Subtotal</td>
              <td style={{ padding: "4px 16px", textAlign: "right" }}>₹ {fmt(po.subtotal)}</td>
            </tr>
            {po.gstType === "cgst_sgst" ? (
              <>
                <tr>
                  <td style={{ padding: "4px 16px", fontWeight: 500 }}>CGST @ 9%</td>
                  <td style={{ padding: "4px 16px", textAlign: "right" }}>₹ {fmt(halfGst)}</td>
                </tr>
                <tr>
                  <td style={{ padding: "4px 16px", fontWeight: 500 }}>SGST @ 9%</td>
                  <td style={{ padding: "4px 16px", textAlign: "right" }}>₹ {fmt(halfGst)}</td>
                </tr>
              </>
            ) : (
              <tr>
                <td style={{ padding: "4px 16px", fontWeight: 500 }}>IGST @ 18%</td>
                <td style={{ padding: "4px 16px", textAlign: "right" }}>₹ {fmt(po.gstAmount)}</td>
              </tr>
            )}
            <tr style={{ borderTop: "2px solid #1a5276" }}>
              <td style={{ padding: "7px 16px", fontWeight: 700, fontSize: 14 }}>GRAND TOTAL</td>
              <td style={{ padding: "7px 16px", textAlign: "right", fontWeight: 700, fontSize: 14, color: "#1a5276" }}>₹ {fmt(po.totalAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Terms */}
      {(po.paymentTerms || po.transportTerms || po.insuranceTerms || po.dispatchSchedule || po.transporterDetails || po.notes) && (
        <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: "10px 14px", marginBottom: 12, fontSize: 11 }}>
          <div style={{ fontWeight: 700, color: "#1a5276", marginBottom: 6, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Terms &amp; Conditions</div>
          {po.paymentTerms && <div><strong>Payment Terms:</strong> {po.paymentTerms}</div>}
          {po.transportTerms && <div><strong>Transport:</strong> {po.transportTerms}</div>}
          {po.insuranceTerms && <div><strong>Insurance:</strong> {po.insuranceTerms}</div>}
          {po.dispatchSchedule && <div><strong>Dispatch Schedule:</strong> {po.dispatchSchedule}</div>}
          {po.transporterDetails && (
            <div style={{ marginTop: 4 }}>
              <strong>Transporter Details:</strong>
              <div style={{ whiteSpace: "pre-line", marginLeft: 8 }}>{po.transporterDetails}</div>
            </div>
          )}
          {po.notes && <div style={{ marginTop: 4 }}><strong>Notes:</strong> {po.notes}</div>}
        </div>
      )}

      {/* Signature */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
        <div style={{ textAlign: "center", minWidth: 180 }}>
          <div style={{ borderTop: "1px solid #333", paddingTop: 4, fontSize: 11 }}>
            <div style={{ fontWeight: 600 }}>For Fabrevol</div>
            <div style={{ color: "#555" }}>Authorised Signatory</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PurchaseOrders() {
  const qc = useQueryClient();
  const { toast } = useToast();

  // Data
  const { data: pos = [] } = useQuery<PurchaseOrder[]>({ queryKey: ["/api/purchase-orders"] });
  const { data: poSuppliers = [] } = useQuery<PoSupplier[]>({ queryKey: ["/api/po-suppliers"] });
  const { data: poAddresses = [] } = useQuery<PoAddress[]>({ queryKey: ["/api/po-addresses"] });

  // UI state
  const [view, setView] = useState<"list" | "form" | "print">("list");
  const [editingPO, setEditingPO] = useState<PurchaseOrder | null>(null);
  const [printPO, setPrintPO] = useState<PurchaseOrder | null>(null);
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<PoSupplier | null>(null);
  const [editingAddress, setEditingAddress] = useState<PoAddress | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Form state
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "/");
  const [form, setForm] = useState<Partial<PurchaseOrder>>({});
  const [items, setItems] = useState<POItem[]>([newItem()]);
  const [gstType, setGstType] = useState("igst");

  // Supplier form
  const [supForm, setSupForm] = useState<Partial<PoSupplier>>({});
  // Address form
  const [addrForm, setAddrForm] = useState<Partial<PoAddress>>({});

  // Mutations
  const createPO = useMutation({ mutationFn: (d: any) => apiRequest("POST", "/api/purchase-orders", d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/purchase-orders"] }); toast({ title: "PO Created" }); setView("list"); } });
  const updatePO = useMutation({ mutationFn: ({ id, d }: any) => apiRequest("PATCH", `/api/purchase-orders/${id}`, d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/purchase-orders"] }); toast({ title: "PO Updated" }); setView("list"); } });
  const deletePO = useMutation({ mutationFn: (id: number) => apiRequest("DELETE", `/api/purchase-orders/${id}`), onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/purchase-orders"] }) });

  const createSup = useMutation({ mutationFn: (d: any) => apiRequest("POST", "/api/po-suppliers", d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/po-suppliers"] }); setShowSupplierDialog(false); setSupForm({}); toast({ title: "Supplier saved" }); } });
  const updateSup = useMutation({ mutationFn: ({ id, d }: any) => apiRequest("PATCH", `/api/po-suppliers/${id}`, d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/po-suppliers"] }); setShowSupplierDialog(false); setEditingSupplier(null); setSupForm({}); } });
  const deleteSup = useMutation({ mutationFn: (id: number) => apiRequest("DELETE", `/api/po-suppliers/${id}`), onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/po-suppliers"] }) });

  const createAddr = useMutation({ mutationFn: (d: any) => apiRequest("POST", "/api/po-addresses", d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/po-addresses"] }); setShowAddressDialog(false); setAddrForm({}); toast({ title: "Address saved" }); } });
  const updateAddr = useMutation({ mutationFn: ({ id, d }: any) => apiRequest("PATCH", `/api/po-addresses/${id}`, d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/po-addresses"] }); setShowAddressDialog(false); setEditingAddress(null); setAddrForm({}); } });
  const deleteAddr = useMutation({ mutationFn: (id: number) => apiRequest("DELETE", `/api/po-addresses/${id}`), onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/po-addresses"] }) });

  // ── Open new PO form ──────────────────────────────────────────────────────
  function openNewPO() {
    setEditingPO(null);
    setItems([newItem()]);
    setGstType("igst");
    setForm({ poNumber: makePONumber(pos), date: today, status: "draft" });
    setView("form");
  }

  function openEditPO(po: PurchaseOrder) {
    setEditingPO(po);
    setItems((po.items as POItem[]) || [newItem()]);
    setGstType(po.gstType || "igst");
    setForm({ ...po });
    setView("form");
  }

  // ── Item helpers ──────────────────────────────────────────────────────────
  function updateItem(id: string, field: keyof POItem, value: any) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        // Auto-compute totalQty if packs and kgPerPack are set
        if (field === "packs" || field === "kgPerPack") {
          const p = field === "packs" ? value : updated.packs;
          const k = field === "kgPerPack" ? value : updated.kgPerPack;
          if (p && k) updated.totalQty = p * k;
        }
        // Auto-compute amount
        updated.amount = updated.totalQty * updated.rate;
        return updated;
      })
    );
  }

  // ── Select supplier / address ─────────────────────────────────────────────
  function selectSupplier(supplierId: string) {
    const s = poSuppliers.find((x) => x.id === parseInt(supplierId));
    if (!s) return;
    setForm((f) => ({ ...f, supplierId: s.id, supplierName: s.name }));
  }

  function selectAddress(addrId: string) {
    const a = poAddresses.find((x) => x.id === parseInt(addrId));
    if (!a) return;
    setForm((f) => ({
      ...f,
      shipToAddressId: a.id,
      shipToName: a.name,
      shipToAddress: a.address,
      shipToGstin: a.gstin || "",
      shipToPhone: a.phone || "",
    }));
  }

  // ── Save PO ───────────────────────────────────────────────────────────────
  function savePO() {
    const { subtotal, gstAmount, totalAmount } = calcTotals(items, gstType);
    const payload = {
      ...form,
      items,
      gstType,
      subtotal,
      gstAmount,
      totalAmount,
    };
    if (editingPO) {
      updatePO.mutate({ id: editingPO.id, d: payload });
    } else {
      createPO.mutate(payload);
    }
  }

  // ── Print ─────────────────────────────────────────────────────────────────
  function handlePrint(po: PurchaseOrder) {
    setPrintPO(po);
    setTimeout(() => window.print(), 300);
  }

  // ── Totals preview ────────────────────────────────────────────────────────
  const { subtotal, gstAmount, totalAmount } = calcTotals(items, gstType);

  // ─────────────────────────────────────────────────────────────────────────
  // PRINT VIEW (whole page takeover via @media print)
  if (printPO) {
    const supplier = poSuppliers.find((s) => s.id === printPO.supplierId);
    return (
      <>
        {/* screen controls */}
        <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
          <Button onClick={() => window.print()} className="bg-[#1a5276] text-white">
            <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
          </Button>
          <Button variant="outline" onClick={() => setPrintPO(null)}>Close</Button>
        </div>
        <div className="no-print fixed top-4 left-4 z-50 text-sm text-gray-500">
          Tip: Choose "Save as PDF" in the print dialog
        </div>
        <div ref={printRef} className="p-8 max-w-4xl mx-auto mt-16">
          <POPrintView po={printPO} supplier={supplier} />
        </div>
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { margin: 0; }
            .po-print-body { font-size: 12px; }
          }
        `}</style>
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FORM VIEW
  if (view === "form") {
    return (
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 md:ml-64 overflow-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => setView("list")}>← Back</Button>
              <h1 className="text-xl font-bold text-slate-800">{editingPO ? `Edit PO #${editingPO.poNumber}` : "New Purchase Order"}</h1>
            </div>

            <div className="grid gap-6">
              {/* PO Header */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2"><FileText className="w-4 h-4" /> PO Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label>PO Number</Label>
                    <Input value={form.poNumber || ""} onChange={(e) => setForm((f) => ({ ...f, poNumber: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input value={form.date || ""} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} placeholder="DD/MM/YYYY" />
                  </div>
                  <div>
                    <Label>GST Type</Label>
                    <Select value={gstType} onValueChange={setGstType}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="igst">IGST (Inter-State)</SelectItem>
                        <SelectItem value="cgst_sgst">CGST + SGST (Intra-State)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Supplier */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-slate-700 flex items-center gap-2"><Building2 className="w-4 h-4" /> Supplier</h2>
                  <Button size="sm" variant="outline" onClick={() => { setEditingSupplier(null); setSupForm({}); setShowSupplierDialog(true); }}>
                    <Plus className="w-3 h-3 mr-1" /> Add Supplier
                  </Button>
                </div>
                <Select value={form.supplierId ? String(form.supplierId) : ""} onValueChange={selectSupplier}>
                  <SelectTrigger><SelectValue placeholder="Select supplier…" /></SelectTrigger>
                  <SelectContent>
                    {poSuppliers.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.supplierName && (
                  <div className="mt-3 text-sm text-slate-600">
                    {poSuppliers.find((s) => s.id === form.supplierId)?.address && (
                      <p>{poSuppliers.find((s) => s.id === form.supplierId)?.address}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Ship To */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-slate-700 flex items-center gap-2"><MapPin className="w-4 h-4" /> Ship To &amp; Delivery Address</h2>
                  <Button size="sm" variant="outline" onClick={() => { setEditingAddress(null); setAddrForm({}); setShowAddressDialog(true); }}>
                    <Plus className="w-3 h-3 mr-1" /> Add Address
                  </Button>
                </div>
                <Select value={form.shipToAddressId ? String(form.shipToAddressId) : ""} onValueChange={selectAddress}>
                  <SelectTrigger><SelectValue placeholder="Select delivery address…" /></SelectTrigger>
                  <SelectContent>
                    {poAddresses.map((a) => (
                      <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.shipToName && (
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <Label className="text-xs">Company Name</Label>
                      <Input value={form.shipToName || ""} onChange={(e) => setForm((f) => ({ ...f, shipToName: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs">GSTIN</Label>
                      <Input value={form.shipToGstin || ""} onChange={(e) => setForm((f) => ({ ...f, shipToGstin: e.target.value }))} />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Address</Label>
                      <Textarea rows={2} value={form.shipToAddress || ""} onChange={(e) => setForm((f) => ({ ...f, shipToAddress: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs">Phone</Label>
                      <Input value={form.shipToPhone || ""} onChange={(e) => setForm((f) => ({ ...f, shipToPhone: e.target.value }))} />
                    </div>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-2"><Package className="w-4 h-4" /> Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600">
                        <th className="text-left p-2 rounded-l">Description</th>
                        <th className="text-center p-2 w-20">Packs</th>
                        <th className="text-center p-2 w-24">Kg/Pack</th>
                        <th className="text-center p-2 w-24">Total Qty</th>
                        <th className="text-center p-2 w-20">Unit</th>
                        <th className="text-right p-2 w-28">Rate (₹)</th>
                        <th className="text-right p-2 w-28 rounded-r">Amount (₹)</th>
                        <th className="w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-slate-100">
                          <td className="p-1">
                            <Input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder="Product name…" className="h-8" />
                          </td>
                          <td className="p-1">
                            <Input type="number" value={item.packs ?? ""} onChange={(e) => updateItem(item.id, "packs", e.target.value ? Number(e.target.value) : null)} placeholder="—" className="h-8 text-center" />
                          </td>
                          <td className="p-1">
                            <Input type="number" value={item.kgPerPack ?? ""} onChange={(e) => updateItem(item.id, "kgPerPack", e.target.value ? Number(e.target.value) : null)} placeholder="—" className="h-8 text-center" />
                          </td>
                          <td className="p-1">
                            <Input type="number" value={item.totalQty || ""} onChange={(e) => updateItem(item.id, "totalQty", Number(e.target.value))} className="h-8 text-center" />
                          </td>
                          <td className="p-1">
                            <Select value={item.unit} onValueChange={(v) => updateItem(item.id, "unit", v)}>
                              <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {["Kgs", "MT", "Litres", "Nos", "Drums", "Bags"].map((u) => (
                                  <SelectItem key={u} value={u}>{u}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-1">
                            <Input type="number" value={item.rate || ""} onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))} className="h-8 text-right" />
                          </td>
                          <td className="p-1 text-right font-medium text-slate-700 px-3">
                            ₹ {fmt(item.amount)}
                          </td>
                          <td className="p-1">
                            <button onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))} className="text-red-400 hover:text-red-600 p-1">
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button size="sm" variant="outline" className="mt-3" onClick={() => setItems((prev) => [...prev, newItem()])}>
                  <Plus className="w-3 h-3 mr-1" /> Add Row
                </Button>

                {/* Totals */}
                <div className="mt-4 flex justify-end">
                  <div className="text-sm space-y-1 min-w-64">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium">₹ {fmt(subtotal)}</span>
                    </div>
                    {gstType === "cgst_sgst" ? (
                      <>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-600">CGST @ 9%</span>
                          <span>₹ {fmt(gstAmount / 2)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b">
                          <span className="text-slate-600">SGST @ 9%</span>
                          <span>₹ {fmt(gstAmount / 2)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-slate-600">IGST @ 18%</span>
                        <span>₹ {fmt(gstAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2">
                      <span className="font-bold text-base">Grand Total</span>
                      <span className="font-bold text-base text-[#1a5276]">₹ {fmt(totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="font-semibold text-slate-700 mb-4">Terms &amp; Notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Payment Terms</Label>
                    <Input value={form.paymentTerms || ""} onChange={(e) => setForm((f) => ({ ...f, paymentTerms: e.target.value }))} placeholder="e.g. 45 Days PDC" />
                  </div>
                  <div>
                    <Label>Transport Terms</Label>
                    <Input value={form.transportTerms || ""} onChange={(e) => setForm((f) => ({ ...f, transportTerms: e.target.value }))} placeholder="e.g. Freight paid up to destination" />
                  </div>
                  <div>
                    <Label>Insurance Terms</Label>
                    <Input value={form.insuranceTerms || ""} onChange={(e) => setForm((f) => ({ ...f, insuranceTerms: e.target.value }))} placeholder="e.g. On supplier's part" />
                  </div>
                  <div>
                    <Label>Dispatch Schedule</Label>
                    <Input value={form.dispatchSchedule || ""} onChange={(e) => setForm((f) => ({ ...f, dispatchSchedule: e.target.value }))} placeholder="e.g. 5MT by 31/01/26…" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Transporter Details</Label>
                    <Textarea rows={3} value={form.transporterDetails || ""} onChange={(e) => setForm((f) => ({ ...f, transporterDetails: e.target.value }))} placeholder="Transporter name, address, contact…" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Additional Notes</Label>
                    <Textarea rows={2} value={form.notes || ""} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pb-8">
                <Button variant="outline" onClick={() => setView("list")}>Cancel</Button>
                <Button className="bg-[#1a5276] hover:bg-[#154360] text-white" onClick={savePO} disabled={createPO.isPending || updatePO.isPending}>
                  <Check className="w-4 h-4 mr-2" />
                  {editingPO ? "Update PO" : "Create PO"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LIST VIEW
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 md:ml-64 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Purchase Orders</h1>
            <p className="text-xs text-slate-500 mt-0.5">{pos.length} order{pos.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setEditingSupplier(null); setSupForm({}); setShowSupplierDialog(true); }}>
              <Building2 className="w-4 h-4 mr-1" /> Manage Suppliers
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setEditingAddress(null); setAddrForm({}); setShowAddressDialog(true); }}>
              <MapPin className="w-4 h-4 mr-1" /> Manage Addresses
            </Button>
            <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white" size="sm" onClick={openNewPO}>
              <Plus className="w-4 h-4 mr-1" /> New PO
            </Button>
          </div>
        </div>

        <div className="p-6">
          {pos.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No purchase orders yet</p>
              <p className="text-sm mt-1">Click "New PO" to create your first order</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pos.map((po) => (
                <div key={po.id} className="bg-white rounded-xl border shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-[#1a5276]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#1a5276]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800">PO #{po.poNumber}</span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        po.status === "draft" ? "bg-slate-100 text-slate-600" :
                        po.status === "sent" ? "bg-blue-100 text-blue-700" :
                        "bg-emerald-100 text-emerald-700"
                      )}>
                        {po.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mt-0.5">
                      {po.supplierName || "No supplier"} · {po.date}
                    </div>
                    {po.shipToName && (
                      <div className="text-xs text-slate-400 mt-0.5">Ship to: {po.shipToName}</div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-[#1a5276] text-lg">₹ {fmt(po.totalAmount)}</div>
                    <div className="text-xs text-slate-400">{(po.items as POItem[])?.length || 0} item(s)</div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button size="sm" variant="ghost" onClick={() => handlePrint(po)} title="Print / PDF">
                      <Printer className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => openEditPO(po)} title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-600" onClick={() => { if (confirm("Delete this PO?")) deletePO.mutate(po.id); }} title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Supplier Dialog ─────────────────────────────────────────────── */}
      <Dialog open={showSupplierDialog} onOpenChange={(o) => { setShowSupplierDialog(o); if (!o) { setEditingSupplier(null); setSupForm({}); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingSupplier ? "Edit Supplier" : "Manage Suppliers"}</DialogTitle>
          </DialogHeader>
          {/* List */}
          {!editingSupplier && (
            <div className="space-y-2 max-h-60 overflow-auto mb-4">
              {poSuppliers.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2 rounded border text-sm">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    {s.gstin && <div className="text-xs text-slate-500">GSTIN: {s.gstin}</div>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingSupplier(s); setSupForm(s); }} className="text-slate-500 hover:text-slate-800 p-1"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteSup.mutate(s.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Form */}
          <div className="grid gap-3">
            <div><Label>Supplier Name *</Label><Input value={supForm.name || ""} onChange={(e) => setSupForm((f) => ({ ...f, name: e.target.value }))} /></div>
            <div><Label>GSTIN</Label><Input value={supForm.gstin || ""} onChange={(e) => setSupForm((f) => ({ ...f, gstin: e.target.value }))} /></div>
            <div><Label>Address</Label><Textarea rows={2} value={supForm.address || ""} onChange={(e) => setSupForm((f) => ({ ...f, address: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Contact Name</Label><Input value={supForm.contactName || ""} onChange={(e) => setSupForm((f) => ({ ...f, contactName: e.target.value }))} /></div>
              <div><Label>Phone</Label><Input value={supForm.contactPhone || ""} onChange={(e) => setSupForm((f) => ({ ...f, contactPhone: e.target.value }))} /></div>
            </div>
            <div><Label>Email</Label><Input value={supForm.contactEmail || ""} onChange={(e) => setSupForm((f) => ({ ...f, contactEmail: e.target.value }))} /></div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            {editingSupplier && <Button variant="ghost" onClick={() => { setEditingSupplier(null); setSupForm({}); }}>← Back</Button>}
            <Button className="bg-[#1a5276] text-white" onClick={() => {
              if (!supForm.name) return;
              if (editingSupplier) updateSup.mutate({ id: editingSupplier.id, d: supForm });
              else createSup.mutate(supForm);
            }}>
              {editingSupplier ? "Update" : "Add Supplier"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Address Dialog ──────────────────────────────────────────────── */}
      <Dialog open={showAddressDialog} onOpenChange={(o) => { setShowAddressDialog(o); if (!o) { setEditingAddress(null); setAddrForm({}); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Manage Delivery Addresses"}</DialogTitle>
          </DialogHeader>
          {!editingAddress && (
            <div className="space-y-2 max-h-60 overflow-auto mb-4">
              {poAddresses.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-2 rounded border text-sm">
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-slate-500 truncate max-w-xs">{a.address}</div>
                    {a.gstin && <div className="text-xs text-slate-500">GSTIN: {a.gstin}</div>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingAddress(a); setAddrForm(a); }} className="text-slate-500 hover:text-slate-800 p-1"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteAddr.mutate(a.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="grid gap-3">
            <div><Label>Company / Location Name *</Label><Input value={addrForm.name || ""} onChange={(e) => setAddrForm((f) => ({ ...f, name: e.target.value }))} /></div>
            <div><Label>Full Address *</Label><Textarea rows={3} value={addrForm.address || ""} onChange={(e) => setAddrForm((f) => ({ ...f, address: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>GSTIN</Label><Input value={addrForm.gstin || ""} onChange={(e) => setAddrForm((f) => ({ ...f, gstin: e.target.value }))} /></div>
              <div><Label>Phone</Label><Input value={addrForm.phone || ""} onChange={(e) => setAddrForm((f) => ({ ...f, phone: e.target.value }))} /></div>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            {editingAddress && <Button variant="ghost" onClick={() => { setEditingAddress(null); setAddrForm({}); }}>← Back</Button>}
            <Button className="bg-[#1a5276] text-white" onClick={() => {
              if (!addrForm.name || !addrForm.address) return;
              if (editingAddress) updateAddr.mutate({ id: editingAddress.id, d: addrForm });
              else createAddr.mutate(addrForm);
            }}>
              {editingAddress ? "Update" : "Add Address"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
