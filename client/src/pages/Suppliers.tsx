import { useState } from "react";
import { useSuppliers, useCreateSupplier, useUpdateSupplier, useDeleteSupplier } from "@/hooks/use-suppliers";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Package, Plus, Globe, User, Mail, Phone, Briefcase, FileText,
  Trash2, Edit3, ChevronDown, ChevronUp, Loader2, StickyNote, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import type { Supplier } from "@shared/schema";

const ALL_PRODUCT_OPTIONS = [
  "Simethicone / Dimethicone",
  "Antifoams / Defoamers",
  "Spray Adjuvants",
  "Silicone Release Agents",
  "Water Repellents",
  "Silicone Softeners",
  "Silicone Fluids (PDMS)",
  "Silicone Surfactants & Wetting Agents",
  "Silane Coupling Agents",
  "Silicone Intermediates (HMDSO / D4 / D5 / DMC)",
  "MQ Silicone Resin",
  "Epoxy Resins",
  "Epoxy Hardeners & Amines",
  "Solvents",
  "Polymer Additives",
  "PVC Heat Stabilizers (Ca/Zn Acetylacetonate)",
  "Light Stabilizers (HALS)",
  "UV Absorbers",
  "Antioxidants",
  "Acetylacetone & Metal Salts",
  "Paper Making Chemicals",
  "Pharmaceutical Intermediates",
  "Ca-Zn Stabilizers",
  "TDI (Toluene Diisocyanate)",
  "MDI (Methylene Diphenyl Diisocyanate)",
];

interface SupplierFormData {
  name: string;
  description: string;
  website: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactDesignation: string;
  notes: string;
  products: string[];
}

const emptyForm: SupplierFormData = {
  name: "", description: "", website: "",
  contactName: "", contactEmail: "", contactPhone: "",
  contactDesignation: "", notes: "", products: [],
};

function SupplierFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  initialData,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SupplierFormData) => void;
  isPending: boolean;
  initialData?: SupplierFormData;
  title: string;
}) {
  const [form, setForm] = useState<SupplierFormData>(initialData || emptyForm);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) setForm(initialData || emptyForm);
    onOpenChange(isOpen);
  };

  const toggleProduct = (product: string) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#153e4d] font-display">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Supplier Name *</label>
            <Input
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Resil Chemicals"
              data-testid="input-supplier-name"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <Textarea
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the supplier..."
              rows={2}
              data-testid="input-supplier-description"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Website</label>
            <Input
              value={form.website}
              onChange={e => setForm(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://www.example.com"
              data-testid="input-supplier-website"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Contact Name</label>
              <Input
                value={form.contactName}
                onChange={e => setForm(prev => ({ ...prev, contactName: e.target.value }))}
                placeholder="John Doe"
                data-testid="input-supplier-contact-name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Designation</label>
              <Input
                value={form.contactDesignation}
                onChange={e => setForm(prev => ({ ...prev, contactDesignation: e.target.value }))}
                placeholder="Sales Manager"
                data-testid="input-supplier-designation"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <Input
                value={form.contactEmail}
                onChange={e => setForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="contact@example.com"
                data-testid="input-supplier-email"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Phone</label>
              <Input
                value={form.contactPhone}
                onChange={e => setForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="+91 98765 43210"
                data-testid="input-supplier-phone"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Notes</label>
            <Textarea
              value={form.notes}
              onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Internal notes about this supplier..."
              rows={2}
              data-testid="input-supplier-notes"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Products Supplied</label>
            <div className="flex flex-wrap gap-2">
              {ALL_PRODUCT_OPTIONS.map(product => (
                <Badge
                  key={product}
                  variant={form.products.includes(product) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    form.products.includes(product)
                      ? "bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => toggleProduct(product)}
                  data-testid={`badge-product-toggle-${product.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {product}
                  {form.products.includes(product) && <X className="w-3 h-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" data-testid="button-cancel-supplier">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => onSubmit(form)}
            disabled={!form.name.trim() || isPending}
            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
            data-testid="button-save-supplier"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Supplier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SupplierCard({ supplier, onEdit, onDelete }: {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="overflow-hidden border border-slate-200/60 hover:border-[#0ea5e9]/30 transition-all duration-300 bg-white" data-testid={`card-supplier-${supplier.id}`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#153e4d] to-[#0ea5e9] flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-lg text-[#153e4d] leading-tight truncate" data-testid={`text-supplier-name-${supplier.id}`}>
                  {supplier.name}
                </h3>
                {supplier.description && (
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{supplier.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost" size="sm"
                onClick={() => onEdit(supplier)}
                className="h-8 w-8 p-0 text-slate-400 hover:text-[#0ea5e9]"
                data-testid={`button-edit-supplier-${supplier.id}`}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost" size="sm"
                onClick={() => onDelete(supplier)}
                className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                data-testid={`button-delete-supplier-${supplier.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {supplier.website && (
              <a
                href={supplier.website.startsWith("http") ? supplier.website : `https://${supplier.website}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#0ea5e9] hover:underline"
                data-testid={`link-supplier-website-${supplier.id}`}
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                Website
              </a>
            )}
            {supplier.contactName && (
              <div className="flex items-center gap-2 text-slate-700">
                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{supplier.contactName}</span>
                {supplier.contactDesignation && (
                  <span className="text-xs text-slate-400">({supplier.contactDesignation})</span>
                )}
              </div>
            )}
            {supplier.contactEmail && (
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate text-xs">{supplier.contactEmail}</span>
              </div>
            )}
            {supplier.contactPhone && (
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-xs">{supplier.contactPhone}</span>
              </div>
            )}
          </div>

          {supplier.notes && (
            <div className="flex gap-2 items-start text-xs text-slate-500 bg-amber-50 p-2.5 rounded-lg border border-amber-100">
              <StickyNote className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p>{supplier.notes}</p>
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-medium text-[#153e4d] hover:text-[#0ea5e9] transition-colors w-full"
            data-testid={`button-toggle-products-${supplier.id}`}
          >
            <Package className="w-4 h-4" />
            Products ({(supplier.products || []).length})
            {expanded ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(supplier.products || []).map(product => (
                    <Badge
                      key={product}
                      variant="secondary"
                      className="text-xs bg-sky-50 text-sky-700 border border-sky-200"
                      data-testid={`badge-supplier-product-${supplier.id}-${product.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {product}
                    </Badge>
                  ))}
                  {(supplier.products || []).length === 0 && (
                    <span className="text-xs text-slate-400 italic">No products assigned</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Suppliers() {
  const { data: suppliers, isLoading } = useSuppliers();
  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();
  const deleteMutation = useDeleteSupplier();
  const { toast } = useToast();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [deletingSupplier, setDeletingSupplier] = useState<Supplier | null>(null);

  const handleCreate = (data: SupplierFormData) => {
    createMutation.mutate({
      name: data.name.trim(),
      description: data.description || null,
      website: data.website || null,
      contactName: data.contactName || null,
      contactEmail: data.contactEmail || null,
      contactPhone: data.contactPhone || null,
      contactDesignation: data.contactDesignation || null,
      notes: data.notes || null,
      pdfName: null,
      products: data.products,
    }, {
      onSuccess: () => {
        setShowAddDialog(false);
        toast({ title: "Supplier Added", description: `${data.name} has been added.` });
      },
      onError: (error) => {
        toast({ title: "Failed", description: error.message, variant: "destructive" });
      },
    });
  };

  const handleUpdate = (data: SupplierFormData) => {
    if (!editingSupplier) return;
    updateMutation.mutate({
      id: editingSupplier.id,
      name: data.name.trim(),
      description: data.description || null,
      website: data.website || null,
      contactName: data.contactName || null,
      contactEmail: data.contactEmail || null,
      contactPhone: data.contactPhone || null,
      contactDesignation: data.contactDesignation || null,
      notes: data.notes || null,
      products: data.products,
    }, {
      onSuccess: () => {
        setEditingSupplier(null);
        toast({ title: "Supplier Updated", description: `${data.name} has been updated.` });
      },
      onError: (error) => {
        toast({ title: "Failed", description: error.message, variant: "destructive" });
      },
    });
  };

  const handleDelete = () => {
    if (!deletingSupplier) return;
    deleteMutation.mutate(deletingSupplier.id, {
      onSuccess: () => {
        toast({ title: "Supplier Deleted", description: `${deletingSupplier.name} has been removed.` });
        setDeletingSupplier(null);
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-[#153e4d] mb-2 flex items-center gap-3" data-testid="text-page-title">
                My Suppliers
                <span className="text-sm font-bold bg-[#0ea5e9] text-white px-3 py-1 rounded-full shadow-sm">
                  {(suppliers || []).length}
                </span>
              </h1>
              <p className="text-slate-500">
                Manage your supplier network, contacts, and product catalogs.
              </p>
            </div>

            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white shadow-lg shadow-sky-200"
              data-testid="button-add-supplier"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Supplier
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[#0ea5e9]" />
            </div>
          ) : (suppliers || []).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {(suppliers || []).map(supplier => (
                  <SupplierCard
                    key={supplier.id}
                    supplier={supplier}
                    onEdit={setEditingSupplier}
                    onDelete={setDeletingSupplier}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Suppliers Yet</h3>
              <p className="text-slate-500 max-w-sm mb-8">
                Add your first supplier to start tracking your supply chain.
              </p>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
                data-testid="button-add-first-supplier"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Supplier
              </Button>
            </div>
          )}
        </div>
      </main>

      <SupplierFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
        title="Add New Supplier"
      />

      <SupplierFormDialog
        open={!!editingSupplier}
        onOpenChange={(open) => { if (!open) setEditingSupplier(null); }}
        onSubmit={handleUpdate}
        isPending={updateMutation.isPending}
        initialData={editingSupplier ? {
          name: editingSupplier.name,
          description: editingSupplier.description || "",
          website: editingSupplier.website || "",
          contactName: editingSupplier.contactName || "",
          contactEmail: editingSupplier.contactEmail || "",
          contactPhone: editingSupplier.contactPhone || "",
          contactDesignation: editingSupplier.contactDesignation || "",
          notes: editingSupplier.notes || "",
          products: editingSupplier.products || [],
        } : undefined}
        title="Edit Supplier"
      />

      <AlertDialog open={!!deletingSupplier} onOpenChange={(open) => { if (!open) setDeletingSupplier(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deletingSupplier?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-supplier">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              data-testid="button-confirm-delete-supplier"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
