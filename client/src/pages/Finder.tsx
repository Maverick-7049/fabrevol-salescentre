import { useState, useRef } from "react";
import { useLeads, useUpdateLead, useDeleteLead, useGenerateLeads } from "@/hooks/use-leads";
import { useProducts, useAnalyzeProductByName, useAnalyzeProductByPdf, useDeleteProduct } from "@/hooks/use-products";
import { LeadCard } from "@/components/LeadCard";
import { Sidebar } from "@/components/Sidebar";
import { 
  Search, Filter, Loader2, Sparkles, Building2, Map, Database, Wand2, Bot, FlaskConical,
  Plus, Upload, X, FileText, Trash2, ChevronDown, ChevronUp, Brain
} from "lucide-react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import type { Lead, Product } from "@shared/schema";

const INDUSTRIES = [
  { id: 'all', name: 'All Industries' },
  { id: 'rubber_latex', name: 'Rubber & Latex' },
  { id: 'pcd_personal_care', name: 'Personal Care & Cosmetics' },
  { id: 'pharma', name: 'Pharmaceuticals' },
  { id: 'pvc', name: 'PVC & Plastics' },
  { id: 'paints', name: 'Paints & Coatings' },
  { id: 'construction', name: 'Construction Chemicals' },
  { id: 'agriculture', name: 'Agriculture & Agrochemicals' },
  { id: 'paper_pulp', name: 'Paper & Pulp' },
  { id: 'water_treatment', name: 'Water Treatment' },
  { id: 'leather', name: 'Leather' },
  { id: 'wire_cable', name: 'Wire & Cable' },
  { id: 'footwear', name: 'Footwear' },
  { id: 'food_processing', name: 'Food Processing' },
  { id: 'adhesives_sealants', name: 'Adhesives & Sealants' },
  { id: 'medical_devices', name: 'Medical Devices' },
];

const REGIONS = [
  { id: 'Maharashtra', name: 'Maharashtra' },
  { id: 'Gujarat', name: 'Gujarat' },
  { id: 'Rajasthan', name: 'Rajasthan' },
  { id: 'Madhya Pradesh', name: 'Madhya Pradesh' },
  { id: 'Telangana', name: 'Telangana' },
  { id: 'India', name: 'Pan India' }
];

const PRODUCTS = [
  { id: 'all', name: 'All Products', keywords: [] },
  { id: 'cazn_stabilizers', name: 'Ca-Zn Stabilizers', keywords: ['ca-zn', 'stabiliz', 'one-pack', 'lead-free stabiliz', 'esbo', 'epoxidized soybean'] },
  { id: 'epoxy_resins', name: 'Epoxy Resins', keywords: ['epoxy', 'epoxid'] },
  { id: 'simethicone', name: 'Simethicone / Dimethicone', keywords: ['simethicone', 'dimethicone', 'silicone oil', 'silicone fluid', 'pdms', 'polydimethylsiloxane'] },
  { id: 'antifoams', name: 'Antifoams / Defoamers', keywords: ['antifoam', 'defoam', 'anti-foam', 'foam control'] },
  { id: 'spray_adjuvants', name: 'Spray Adjuvants', keywords: ['spray adjuvant', 'wetter', 'spreader', 'surfactant'] },
  { id: 'silicone_release', name: 'Silicone Release Agents', keywords: ['release agent', 'mould release', 'mold release'] },
  { id: 'tdi', name: 'TDI (Toluene Diisocyanate)', keywords: ['tdi', 'toluene diisocyanate', 'isocyanate'] },
  { id: 'mdi', name: 'MDI (Methylene Diphenyl Diisocyanate)', keywords: ['mdi', 'methylene diphenyl', 'isocyanate'] },
  { id: 'water_repellents', name: 'Water Repellents', keywords: ['water repellent', 'waterproof', 'hydrophob', 'siliconate', 'aquaphobe'] },
  { id: 'silicone_softeners', name: 'Silicone Softeners', keywords: ['silicone softener', 'softener', 'leather soft'] },
  { id: 'silane_coupling', name: 'Silane Coupling Agents', keywords: ['silane', 'coupling agent', 'aminosilane', 'epoxysilane', 'vinylsilane', 'methacrylsilane', 'trimethoxysilane', 'triethoxysilane'] },
  { id: 'silicone_fluids', name: 'Silicone Fluids (PDMS)', keywords: ['silicone fluid', 'pdms', 'polydimethylsiloxane', 'silicone oil', 'dimethyl silicone', 'resifluid'] },
  { id: 'silicone_intermediates', name: 'Silicone Intermediates', keywords: ['hmdso', 'hexamethyldisiloxane', 'cyclotetrasiloxane', 'cyclopentasiloxane', 'd4', 'd5', 'dmc', 'siloxane'] },
  { id: 'epoxy_hardeners', name: 'Epoxy Hardeners & Amines', keywords: ['hardener', 'amine', 'jeffamine', 'mxda', 'teta', 'deta', 'ipda', 'diamine', 'curing agent'] },
  { id: 'solvents', name: 'Solvents', keywords: ['solvent', 'propylene carbonate', 'benzyl alcohol', 'mibk', 'furfuryl alcohol', 'ethylene carbonate', 'propylene glycol'] },
  { id: 'polymer_additives', name: 'Polymer Additives', keywords: ['polymer additive', 'processing aid', 'additive', 'modifier'] },
  { id: 'pvc_heat_stabilizers', name: 'PVC Heat Stabilizers', keywords: ['heat stabiliz', 'acetylacetonate', 'calcium stearate', 'zinc stearate', 'dibenzoylmethane', 'stearoylbenzoylmethane', 'theic'] },
  { id: 'light_stabilizers', name: 'Light Stabilizers (HALS)', keywords: ['light stabiliz', 'hals', 'hindered amine', 'uv stabiliz'] },
  { id: 'uv_absorbers', name: 'UV Absorbers', keywords: ['uv absorber', 'benzotriazole', 'benzophenone', 'ultraviolet'] },
  { id: 'antioxidants', name: 'Antioxidants', keywords: ['antioxidant', 'oxidation', 'irganox', 'phenolic'] },
  { id: 'acetylacetone', name: 'Acetylacetone & Metal Salts', keywords: ['acetylacetone', 'acetylacetonate', 'acac'] },
  { id: 'paper_chemicals', name: 'Paper Making Chemicals', keywords: ['paper', 'pulp', 'paper chemical', 'paper coating'] },
  { id: 'mq_silicone_resin', name: 'MQ Silicone Resin', keywords: ['mq resin', 'silicone resin', 'vinyl mq'] },
  { id: 'pharma_intermediates', name: 'Pharmaceutical Intermediates', keywords: ['pharmaceutical intermediate', 'gluconate', 'lactate', 'pharma intermediate', 'dmso', 'msm'] },
  { id: 'silicone_surfactants', name: 'Silicone Surfactants & Wetting Agents', keywords: ['silicone surfactant', 'wetting agent', 'polyether modified', 'uniwet'] },
];

export default function Finder() {
  const { data: leads, isLoading } = useLeads();
  const { data: customProducts } = useProducts();
  const updateMutation = useUpdateLead();
  const deleteMutation = useDeleteLead();
  const generateMutation = useGenerateLeads();
  const analyzeByName = useAnalyzeProductByName();
  const analyzeByPdf = useAnalyzeProductByPdf();
  const deleteProduct = useDeleteProduct();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0].id);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0].id);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);
  const [showProductPanel, setShowProductPanel] = useState(false);
  const [productNameInput, setProductNameInput] = useState("");
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const allProducts = [
    ...PRODUCTS,
    ...(customProducts || []).map((p: Product) => ({
      id: `custom_${p.id}`,
      name: p.name,
      keywords: p.keywords || [],
    })),
  ];

  const filteredLeads = leads?.filter(lead => {
    const industryMatch = selectedIndustry === 'all' || lead.industry === selectedIndustry;
    const regionMatch = selectedRegion === 'India' || lead.region === selectedRegion;
    const productDef = allProducts.find(p => p.id === selectedProduct);
    const productMatch = selectedProduct === 'all' || (productDef && productDef.keywords.some(kw => {
      const pitchLower = (lead.pitch || '').toLowerCase();
      const tagsLower = (lead.tags || []).join(' ').toLowerCase();
      const intelligenceLower = (lead.intelligence || '').toLowerCase();
      return pitchLower.includes(kw) || tagsLower.includes(kw) || intelligenceLower.includes(kw);
    }));
    return industryMatch && regionMatch && productMatch;
  }) || [];

  const aiGeneratedCount = filteredLeads.filter(l => l.source === "AI Discovery").length;

  const handleDeleteLead = () => {
    if (!deletingLead) return;
    const reason = deleteReason === "custom" ? customReason : deleteReason;
    if (!reason) return;
    deleteMutation.mutate({ id: deletingLead.id, reason }, {
      onSuccess: () => {
        toast({
          title: "Lead Dismissed",
          description: `${deletingLead.company} has been removed. It won't appear again.`,
        });
        setDeletingLead(null);
        setDeleteReason("");
        setCustomReason("");
      },
      onError: (error) => {
        toast({ title: "Failed", description: error.message, variant: "destructive" });
      },
    });
  };

  const handleAddProductByName = () => {
    if (!productNameInput.trim()) return;
    analyzeByName.mutate(productNameInput.trim(), {
      onSuccess: (product) => {
        setProductNameInput("");
        toast({
          title: "Product Added",
          description: `${product.name} has been analyzed and added to your product list.`,
        });
      },
      onError: (error) => {
        toast({ title: "Failed", description: error.message, variant: "destructive" });
      },
    });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        if (selectedProduct === `custom_${id}`) setSelectedProduct("all");
        toast({ title: "Product Removed", description: "Product removed from your list." });
      },
      onError: () => {
        toast({ title: "Failed", description: "Could not delete product.", variant: "destructive" });
      },
    });
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Invalid File", description: "Please upload a PDF file.", variant: "destructive" });
      return;
    }
    analyzeByPdf.mutate(file, {
      onSuccess: (product) => {
        toast({
          title: "PDF Analyzed",
          description: `${product.name} has been extracted and added to your product list.`,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
      onError: (error) => {
        toast({ title: "Failed", description: error.message, variant: "destructive" });
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        if (selectedProduct === `custom_${id}`) setSelectedProduct("all");
        toast({ title: "Product Removed", description: "Product removed from your list." });
      },
    });
  };

  const INDUSTRY_NAME_TO_ID: Record<string, string> = {
    "Rubber & Latex": "rubber_latex",
    "Personal Care & Cosmetics": "pcd_personal_care",
    "Pharmaceuticals": "pharma",
    "PVC & Plastics": "pvc",
    "Paints & Coatings": "paints",
    "Construction Chemicals": "construction",
    "Agriculture & Agrochemicals": "agriculture",
    "Paper & Pulp": "paper_pulp",
    "Water Treatment": "water_treatment",
    "Leather": "leather",
    "Wire & Cable": "wire_cable",
    "Footwear": "footwear",
    "Food Processing": "food_processing",
    "Adhesives & Sealants": "adhesives_sealants",
    "Medical Devices": "medical_devices",
  };

  const BUILTIN_PRODUCT_INDUSTRIES: Record<string, string[]> = {
    cazn_stabilizers: ["pvc", "wire_cable"],
    epoxy_resins: ["paints", "adhesives_sealants", "construction"],
    simethicone: ["pharma", "pcd_personal_care", "medical_devices", "food_processing"],
    antifoams: ["paper_pulp", "water_treatment", "food_processing"],
    spray_adjuvants: ["agriculture"],
    silicone_release: ["rubber_latex", "leather", "footwear", "medical_devices"],
    tdi: ["paints", "adhesives_sealants", "construction", "footwear"],
    mdi: ["paints", "adhesives_sealants", "construction"],
    water_repellents: ["construction", "leather"],
    silicone_softeners: ["leather", "pcd_personal_care"],
    silane_coupling: ["rubber_latex", "paints", "adhesives_sealants", "construction", "wire_cable", "pvc"],
    silicone_fluids: ["rubber_latex", "pharma", "pcd_personal_care", "medical_devices", "food_processing", "paper_pulp"],
    silicone_intermediates: ["pcd_personal_care", "paints", "rubber_latex"],
    epoxy_hardeners: ["paints", "adhesives_sealants", "construction"],
    solvents: ["paints", "construction", "adhesives_sealants", "pcd_personal_care"],
    polymer_additives: ["pvc", "rubber_latex", "wire_cable", "footwear"],
    pvc_heat_stabilizers: ["pvc", "wire_cable"],
    light_stabilizers: ["pvc", "paints", "rubber_latex"],
    uv_absorbers: ["pvc", "paints", "pcd_personal_care"],
    antioxidants: ["pvc", "rubber_latex", "wire_cable", "adhesives_sealants"],
    acetylacetone: ["pvc", "paints", "rubber_latex"],
    paper_chemicals: ["paper_pulp"],
    mq_silicone_resin: ["pcd_personal_care", "paints", "adhesives_sealants"],
    pharma_intermediates: ["pharma"],
    silicone_surfactants: ["paints", "leather", "adhesives_sealants", "agriculture"],
  };

  const getProductTargetIndustries = (productId: string): string[] => {
    if (BUILTIN_PRODUCT_INDUSTRIES[productId]) {
      return BUILTIN_PRODUCT_INDUSTRIES[productId];
    }
    if (productId.startsWith("custom_")) {
      const customId = parseInt(productId.replace("custom_", ""));
      const customProd = (customProducts || []).find((p: Product) => p.id === customId);
      if (customProd?.targetIndustries) {
        return customProd.targetIndustries
          .map((name: string) => INDUSTRY_NAME_TO_ID[name])
          .filter(Boolean) as string[];
      }
    }
    return [];
  };

  const handleAIGenerate = () => {
    const productDef = allProducts.find(p => p.id === selectedProduct);
    const productName = selectedProduct !== 'all' ? productDef?.name : undefined;
    const hasProduct = selectedProduct !== 'all';

    if (selectedIndustry === 'all' && !hasProduct) {
      toast({
        title: "Select a Product or Industry",
        description: "Choose a specific product to discover across all industries, or select an industry.",
        variant: "destructive",
      });
      return;
    }

    if (selectedIndustry === 'all' && hasProduct) {
      const targetIndustries = getProductTargetIndustries(selectedProduct);
      if (targetIndustries.length === 0) {
        toast({
          title: "No Target Industries",
          description: "This product doesn't have target industries defined. Please select an industry manually.",
          variant: "destructive",
        });
        return;
      }

      setSelectedIndustry('all');
      generateMutation.mutate(
        { industry: "all", region: selectedRegion, count: Math.min(targetIndustries.length * 3, 8), product: productName, industries: targetIndustries },
        {
          onSuccess: (newLeads) => {
            const count = Array.isArray(newLeads) ? newLeads.length : 0;
            const industryCount = targetIndustries.length;
            toast({
              title: "AI Discovery Complete",
              description: `${count} companies discovered across ${industryCount} industries for ${productName}.`,
            });
          },
          onError: (error) => {
            toast({
              title: "Generation Failed",
              description: error.message,
              variant: "destructive",
            });
          },
        }
      );
      return;
    }

    generateMutation.mutate(
      { industry: selectedIndustry, region: selectedRegion, count: 5, product: productName },
      {
        onSuccess: (newLeads) => {
          toast({
            title: "AI Leads Generated",
            description: `${Array.isArray(newLeads) ? newLeads.length : 0} new companies discovered using AI.`,
          });
        },
        onError: (error) => {
          toast({
            title: "Generation Failed",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleAddToCRM = (lead: Lead) => {
    updateMutation.mutate({ 
      id: lead.id, 
      status: "Target", 
      isFavorite: true 
    }, {
      onSuccess: () => {
        toast({
          title: "Added to Targets",
          description: `${lead.company} has been added to your CRM.`,
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <header>
            <h1 className="text-3xl font-display font-bold text-[#153e4d] mb-2">
              Sales Centre
            </h1>
            <p className="text-slate-500 max-w-2xl">
              Automated discovery of manufacturers matched to our specialty chemical products.
              Configure your search parameters below to mine new leads.
            </p>
          </header>

          {/* Control Panel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              
              {/* Industry Selector */}
              <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0ea5e9]" />
                  Target Industry
                </label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#0ea5e9] focus:ring-opacity-20" data-testid="select-industry">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map(ind => (
                      <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Region Selector */}
              <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Map className="w-4 h-4 text-[#0ea5e9]" />
                  Region
                </label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#0ea5e9] focus:ring-opacity-20" data-testid="select-region">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map(reg => (
                      <SelectItem key={reg.id} value={reg.id}>{reg.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Selector */}
              <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-[#0ea5e9]" />
                  Product
                </label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#0ea5e9] focus:ring-opacity-20" data-testid="select-product">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCTS.map(prod => (
                      <SelectItem key={prod.id} value={prod.id}>{prod.name}</SelectItem>
                    ))}
                    {(customProducts || []).length > 0 && (
                      <>
                        <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 border-t mt-1 pt-2">Custom Products</div>
                        {(customProducts || []).map((p: Product) => (
                          <SelectItem key={`custom_${p.id}`} value={`custom_${p.id}`}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Button */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <Button 
                  size="lg"
                  onClick={handleAIGenerate}
                  disabled={generateMutation.isPending}
                  data-testid="button-ai-generate"
                  className="w-full h-12 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold text-base shadow-lg shadow-sky-200 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {selectedIndustry === 'all' && selectedProduct !== 'all' ? 'Discovering Across Industries...' : 'AI Discovering...'}
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      {selectedIndustry === 'all' && selectedProduct !== 'all' ? 'AI Discover All Industries' : 'AI Discover New'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Product Intelligence Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <button
              onClick={() => setShowProductPanel(!showProductPanel)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors"
              data-testid="button-toggle-product-panel"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#153e4d] to-[#0ea5e9] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[#153e4d]">Product Intelligence</h3>
                  <p className="text-sm text-slate-500">Add products by name or upload a PDF technical data sheet</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(customProducts || []).length > 0 && (
                  <Badge variant="secondary" className="no-default-active-elevate">{(customProducts || []).length} added</Badge>
                )}
                {showProductPanel ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </div>
            </button>

            <AnimatePresence>
              {showProductPanel && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#0ea5e9]" />
                          Add by Product Name
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="e.g. Fumed Silica, Carbon Black N220..."
                            value={productNameInput}
                            onChange={(e) => setProductNameInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddProductByName()}
                            className="h-11 bg-slate-50"
                            data-testid="input-product-name"
                          />
                          <Button
                            onClick={handleAddProductByName}
                            disabled={!productNameInput.trim() || analyzeByName.isPending}
                            className="h-11 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 shrink-0"
                            data-testid="button-add-product-name"
                          >
                            {analyzeByName.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        {analyzeByName.isPending && (
                          <p className="text-xs text-[#0ea5e9] flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            AI is researching this product...
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#0ea5e9]" />
                          Upload Product TDS (PDF)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="application/pdf"
                            onChange={handlePdfUpload}
                            className="hidden"
                            data-testid="input-pdf-upload"
                          />
                          <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={analyzeByPdf.isPending}
                            className="h-11 flex-1 border-dashed border-2 border-slate-300 hover:border-[#0ea5e9] hover:bg-sky-50 text-slate-600"
                            data-testid="button-upload-pdf"
                          >
                            {analyzeByPdf.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Analyzing PDF...
                              </>
                            ) : (
                              <>
                                <FileText className="w-4 h-4 mr-2" />
                                Choose PDF File
                              </>
                            )}
                          </Button>
                        </div>
                        {analyzeByPdf.isPending && (
                          <p className="text-xs text-[#0ea5e9] flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            AI is extracting product details from TDS...
                          </p>
                        )}
                      </div>
                    </div>

                    {(customProducts || []).length > 0 && (
                      <div className="space-y-2 border-t border-slate-100 pt-4">
                        <h4 className="text-sm font-medium text-slate-700">Added Products</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {(customProducts || []).map((product: Product) => (
                            <div key={product.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200 hover:border-red-200 transition-colors group">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <h5 className="font-semibold text-[#153e4d] text-sm truncate">{product.name}</h5>
                                  <div className="flex flex-wrap gap-1 mt-1.5">
                                    {(product.targetIndustries || []).slice(0, 2).map((ind: string) => (
                                      <Badge key={ind} variant="secondary" className="no-default-active-elevate text-[10px] py-0 px-1.5">{ind}</Badge>
                                    ))}
                                    {(product.targetIndustries || []).length > 2 && (
                                      <Badge variant="secondary" className="no-default-active-elevate text-[10px] py-0 px-1.5">+{(product.targetIndustries || []).length - 2}</Badge>
                                    )}
                                  </div>
                                  {product.source === "pdf" && product.pdfName && (
                                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                      <FileText className="w-3 h-3" /> {product.pdfName}
                                    </p>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="h-7 w-7 p-0 text-slate-300 hover:text-red-500 hover:bg-red-50 shrink-0"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Area */}
          <div className="min-h-[400px]">
            {generateMutation.isPending ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#153e4d] rounded-full border-t-transparent animate-spin"></div>
                  <Bot className="absolute inset-0 m-auto w-8 h-8 text-[#153e4d]" />
                </div>
                <p className="text-slate-500 font-medium animate-pulse">
                  {selectedIndustry === 'all' && selectedProduct !== 'all' 
                    ? 'Discovering companies across multiple industries...' 
                    : 'AI is discovering new companies...'}
                </p>
                <p className="text-slate-400 text-sm">
                  {selectedIndustry === 'all' && selectedProduct !== 'all'
                    ? 'Finding buyers for your product across all target industries'
                    : 'Finding real manufacturers that match your product portfolio'}
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#0ea5e9]" />
                <p>Loading leads...</p>
              </div>
            ) : filteredLeads.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-xl font-bold text-[#153e4d] flex items-center gap-2" data-testid="text-results-header">
                    <Search className="w-5 h-5 text-[#0ea5e9]" />
                    Leads
                    <Badge variant="secondary" className="no-default-active-elevate text-xs">
                      {filteredLeads.length} Found
                    </Badge>
                    {aiGeneratedCount > 0 && (
                      <Badge variant="outline" className="no-default-active-elevate text-xs border-[#153e4d] text-[#153e4d]">
                        <Wand2 className="w-3 h-3 mr-1" />
                        {aiGeneratedCount} AI
                      </Badge>
                    )}
                  </h2>
                </div>

                {selectedIndustry === 'all' ? (
                    (() => {
                      const grouped: Record<string, typeof filteredLeads> = {};
                      filteredLeads.forEach(lead => {
                        const ind = lead.industry || 'other';
                        if (!grouped[ind]) grouped[ind] = [];
                        grouped[ind].push(lead);
                      });
                      const industryLabel = (id: string) => INDUSTRIES.find(i => i.id === id)?.name || id;
                      return (
                        <div className="space-y-8">
                          {Object.entries(grouped)
                            .sort((a, b) => b[1].length - a[1].length)
                            .map(([industryId, industryLeads]) => {
                              const regionGroups: Record<string, number> = {};
                              industryLeads.forEach(l => {
                                const r = l.region || 'Unknown';
                                regionGroups[r] = (regionGroups[r] || 0) + 1;
                              });
                              return (
                                <div key={industryId} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden" data-testid={`group-industry-${industryId}`}>
                                  <div className="px-5 py-4 bg-gradient-to-r from-[#153e4d] to-[#1a5568] flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <Building2 className="w-5 h-5 text-white/80" />
                                      <h3 className="font-semibold text-white text-lg">{industryLabel(industryId)}</h3>
                                      <Badge className="bg-white/20 text-white border-0 no-default-active-elevate">{industryLeads.length} leads</Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {Object.entries(regionGroups).map(([region, count]) => (
                                        <Badge key={region} variant="outline" className="border-white/30 text-white/90 text-xs no-default-active-elevate">
                                          <Map className="w-3 h-3 mr-1" />
                                          {region} ({count})
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                      <AnimatePresence>
                                        {industryLeads.map((lead) => (
                                          <LeadCard 
                                            key={lead.id} 
                                            lead={lead} 
                                            onAction={handleAddToCRM}
                                            actionType="add"
                                            isActionPending={updateMutation.isPending}
                                            onDelete={setDeletingLead}
                                            isDeletePending={deleteMutation.isPending}
                                          />
                                        ))}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <AnimatePresence>
                        {filteredLeads.map((lead) => (
                          <LeadCard 
                            key={lead.id} 
                            lead={lead} 
                            onAction={handleAddToCRM}
                            actionType="add"
                            isActionPending={updateMutation.isPending}
                            onDelete={setDeletingLead}
                            isDeletePending={deleteMutation.isPending}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700">No matching leads found</h3>
                <p className="text-slate-500">Try changing your industry, region, or product filters, or use AI Discover to find new companies.</p>
              </div>
            )}
          </div>

          <Dialog open={!!deletingLead} onOpenChange={(open) => { if (!open) { setDeletingLead(null); setDeleteReason(""); setCustomReason(""); } }}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Dismiss Lead</DialogTitle>
                <DialogDescription>
                  Why are you removing <strong>{deletingLead?.company}</strong>? This lead won't appear in your results or be re-generated by AI.
                </DialogDescription>
              </DialogHeader>
              <RadioGroup value={deleteReason} onValueChange={setDeleteReason} className="space-y-2 py-2" data-testid="radio-delete-reason">
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="Not a relevant buyer" id="reason-1" />
                  <Label htmlFor="reason-1" className="cursor-pointer font-normal flex-1">Not a relevant buyer</Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="Duplicate lead" id="reason-2" />
                  <Label htmlFor="reason-2" className="cursor-pointer font-normal flex-1">Duplicate lead</Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="Wrong industry or region" id="reason-3" />
                  <Label htmlFor="reason-3" className="cursor-pointer font-normal flex-1">Wrong industry or region</Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="Company no longer active" id="reason-4" />
                  <Label htmlFor="reason-4" className="cursor-pointer font-normal flex-1">Company no longer active</Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="Already a customer" id="reason-5" />
                  <Label htmlFor="reason-5" className="cursor-pointer font-normal flex-1">Already a customer</Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="custom" id="reason-6" />
                  <Label htmlFor="reason-6" className="cursor-pointer font-normal flex-1">Other reason</Label>
                </div>
              </RadioGroup>
              {deleteReason === "custom" && (
                <Textarea
                  placeholder="Tell us why you're dismissing this lead..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="mt-1"
                  data-testid="input-custom-delete-reason"
                />
              )}
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => { setDeletingLead(null); setDeleteReason(""); setCustomReason(""); }} data-testid="button-cancel-delete-lead">
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteLead}
                  disabled={!deleteReason || (deleteReason === "custom" && !customReason.trim()) || deleteMutation.isPending}
                  data-testid="button-confirm-delete-lead"
                >
                  {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
                  Dismiss Lead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
