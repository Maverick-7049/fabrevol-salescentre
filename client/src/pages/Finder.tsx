import { useState, useRef } from "react";
import { useLeads, useUpdateLead, useDeleteLead, useGenerateLeads } from "@/hooks/use-leads";
import { useProducts, useAnalyzeProductByName, useAnalyzeProductByPdf, useDeleteProduct } from "@/hooks/use-products";
import { LeadCard } from "@/components/LeadCard";
import { Sidebar } from "@/components/Sidebar";
import {
  Search, Filter, Loader2, Sparkles, Building2, Map, Database, Wand2, Bot, FlaskConical,
  Plus, Upload, X, FileText, Trash2, ChevronDown, ChevronUp, Brain, Layers, Package
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

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductDef {
  id: string;
  name: string;
  keywords: string[];
  industries: string[];
}

interface ProductCategory {
  label: string;
  emoji: string;
  products: ProductDef[];
}

// ─── Industries ───────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { id: 'rubber_latex',      name: 'Rubber & Latex' },
  { id: 'pcd_personal_care', name: 'Personal Care & Cosmetics' },
  { id: 'pharma',            name: 'Pharmaceuticals' },
  { id: 'pvc',               name: 'PVC & Plastics' },
  { id: 'paints',            name: 'Paints & Coatings' },
  { id: 'construction',      name: 'Construction Chemicals' },
  { id: 'agriculture',       name: 'Agriculture & Agrochemicals' },
  { id: 'paper_pulp',        name: 'Paper & Pulp' },
  { id: 'water_treatment',   name: 'Water Treatment' },
  { id: 'leather',           name: 'Leather' },
  { id: 'wire_cable',        name: 'Wire & Cable' },
  { id: 'footwear',          name: 'Footwear' },
  { id: 'food_processing',   name: 'Food Processing' },
  { id: 'adhesives_sealants', name: 'Adhesives & Sealants' },
  { id: 'medical_devices',   name: 'Medical Devices' },
];

const REGIONS = [
  { id: 'Maharashtra',    name: 'Maharashtra' },
  { id: 'Gujarat',        name: 'Gujarat' },
  { id: 'Rajasthan',      name: 'Rajasthan' },
  { id: 'Madhya Pradesh', name: 'Madhya Pradesh' },
  { id: 'Telangana',      name: 'Telangana' },
  { id: 'India',          name: 'Pan India' },
];

// ─── Product Categories (no duplicates) ──────────────────────────────────────

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    label: 'Silicones & PDMS',
    emoji: '💧',
    products: [
      {
        id: 'silicone_fluids',
        name: 'Silicone Fluids / PDMS',
        keywords: ['silicone fluid', 'pdms', 'polydimethylsiloxane', 'resifluid', 'silicone oil', 'dimethyl silicone'],
        industries: ['rubber_latex', 'pharma', 'pcd_personal_care', 'medical_devices', 'food_processing', 'paper_pulp', 'leather'],
      },
      {
        id: 'dimethicone',
        name: 'Simethicone / Dimethicone',
        keywords: ['simethicone', 'dimethicone', 'dmc fluid', 'antiflatul', 'pharma silicone'],
        industries: ['pharma', 'pcd_personal_care', 'medical_devices', 'food_processing'],
      },
      {
        id: 'silicone_release',
        name: 'Mould Release Agents',
        keywords: ['release agent', 'mould release', 'mold release', 'die cast release', 'tire release'],
        industries: ['rubber_latex', 'footwear', 'medical_devices', 'leather'],
      },
      {
        id: 'antifoams',
        name: 'Antifoams / Defoamers',
        keywords: ['antifoam', 'defoam', 'anti-foam', 'foam control', 'defoamer', 'silicone emulsion antifoam'],
        industries: ['paper_pulp', 'water_treatment', 'food_processing', 'agriculture', 'rubber_latex'],
      },
      {
        id: 'silicone_surfactants',
        name: 'Silicone Surfactants & Wetting Agents',
        keywords: ['silicone surfactant', 'wetting agent', 'polyether modified silicone', 'resilwet', 'uniwet'],
        industries: ['agriculture', 'paints', 'leather', 'adhesives_sealants', 'pcd_personal_care'],
      },
      {
        id: 'mq_silicone_resin',
        name: 'MQ Silicone Resin',
        keywords: ['mq resin', 'silicone resin', 'vinyl mq resin'],
        industries: ['pcd_personal_care', 'paints', 'adhesives_sealants'],
      },
      {
        id: 'silicone_softeners',
        name: 'Silicone Softeners',
        keywords: ['silicone softener', 'leather finish', 'fabric softener silicone'],
        industries: ['leather', 'pcd_personal_care'],
      },
      {
        id: 'silicone_intermediates',
        name: 'Cyclic Siloxanes (D4 / D5 / DMC)',
        keywords: ['d4', 'd5', 'dmc', 'cyclotetrasiloxane', 'cyclopentasiloxane', 'siloxane intermediate'],
        industries: ['pcd_personal_care', 'rubber_latex'],
      },
    ],
  },
  {
    label: 'Agrochemicals',
    emoji: '🌱',
    products: [
      {
        id: 'spray_adjuvants',
        name: 'Spray Adjuvants (Super-Spreaders)',
        keywords: ['spray adjuvant', 'trisiloxane', 'super spreader', 'wetter', 'spreader', 'resilwet', 'omri adjuvant', 'stomatal'],
        industries: ['agriculture'],
      },
      {
        id: 'agro_dispersants',
        name: 'Dispersing Agents (Agro)',
        keywords: ['dispersing agent', 'alkylnaphthalene', 'sulphonate condensate', 'suspension concentrate', 'sc formulation'],
        industries: ['agriculture'],
      },
    ],
  },
  {
    label: 'Water Repellents',
    emoji: '🛡️',
    products: [
      {
        id: 'water_repellents',
        name: 'Silane-Siloxane Water Repellents',
        keywords: ['water repellent', 'aquaphobe', 'silane siloxane', 'hydrophobic impregnation', 'siliconate', 'wr 22'],
        industries: ['construction', 'leather'],
      },
      {
        id: 'potassium_siliconate',
        name: 'Potassium Methyl Siliconate',
        keywords: ['potassium siliconate', 'methyl siliconate', 'masonry sealer', 'brick sealer'],
        industries: ['construction'],
      },
      {
        id: 'concrete_sealer',
        name: 'Octyltriethoxysilane / Micro-Emulsion Sealers',
        keywords: ['octylsilane', 'octyltriethoxysilane', 'concrete sealer', 'micro-emulsion sealer', 'bridge sealer', 'chloride protection'],
        industries: ['construction'],
      },
    ],
  },
  {
    label: 'Paints & Coatings Additives',
    emoji: '🎨',
    products: [
      {
        id: 'rheology_modifiers',
        name: 'Rheology Modifiers (HEC / HEUR / HASE)',
        keywords: ['rheology modifier', 'hec', 'heur', 'hase', 'thickener', 'associative thickener', 'viscosity paint'],
        industries: ['paints', 'construction', 'adhesives_sealants'],
      },
      {
        id: 'paint_dispersants',
        name: 'Dispersants & Wetting Agents (Paints)',
        keywords: ['dispersant', 'polyacrylate dispersant', 'block copolymer dispersant', 'pigment disperser', 'anti-flocculation'],
        industries: ['paints'],
      },
      {
        id: 'paint_defoamers',
        name: 'Defoamers / De-aerators (Paints)',
        keywords: ['paint defoamer', 'coating defoamer', 'de-aerator', 'silicone defoamer coating'],
        industries: ['paints', 'adhesives_sealants'],
      },
      {
        id: 'matting_agents',
        name: 'Matting Agents (Silica / Wax)',
        keywords: ['matting agent', 'precipitated silica', 'pe wax', 'polyamide wax', 'gloss reduction', 'matte coating'],
        industries: ['paints', 'leather'],
      },
      {
        id: 'adhesion_promoters',
        name: 'Adhesion Promoters',
        keywords: ['adhesion promoter', 'chlorinated polyolefin', 'acrylic resin adhesion', 'bonding agent coating'],
        industries: ['paints', 'adhesives_sealants', 'construction'],
      },
      {
        id: 'uv_hals',
        name: 'UV Absorbers & HALS',
        keywords: ['uv absorber', 'hals', 'light stabilizer', 'benzotriazole', 'triazine', 'benzophenone', 'photostabilizer'],
        industries: ['paints', 'pvc', 'rubber_latex'],
      },
    ],
  },
  {
    label: 'Organic Pigments',
    emoji: '🎭',
    products: [
      {
        id: 'phthalocyanine',
        name: 'Phthalocyanine Pigments (Blues / Greens)',
        keywords: ['phthalocyanine', 'cupc', 'copper phthalocyanine', 'blue pigment', 'green pigment'],
        industries: ['paints', 'rubber_latex', 'pvc'],
      },
      {
        id: 'quinacridone',
        name: 'Quinacridone Pigments (Reds / Violets)',
        keywords: ['quinacridone', 'quinacridone red', 'violet pigment', 'magenta pigment'],
        industries: ['paints', 'pvc'],
      },
      {
        id: 'dpp_pigment',
        name: 'DPP Pigments — Highest Lightfastness (Reds / Oranges)',
        keywords: ['dpp', 'diketopyrrolopyrrole', 'dpp red', 'dpp orange', 'lightfastness 8'],
        industries: ['paints', 'pvc'],
      },
      {
        id: 'azo_pigments',
        name: 'Azo Pigments (Yellows / Oranges / Reds)',
        keywords: ['azo pigment', 'monoazo', 'disazo', 'yellow pigment', 'azo yellow', 'azo red'],
        industries: ['paints', 'rubber_latex', 'pvc'],
      },
    ],
  },
  {
    label: 'Silane Coupling Agents',
    emoji: '⚗️',
    products: [
      {
        id: 'amino_silanes',
        name: 'Amino Silanes (APTES / APTMS / DAMO)',
        keywords: ['amino silane', 'aptes', 'aptms', 'damo', 'aminopropylsilane', 'aminosilane'],
        industries: ['paints', 'adhesives_sealants', 'rubber_latex', 'construction'],
      },
      {
        id: 'epoxy_silanes',
        name: 'Epoxy Silanes (GLYMO)',
        keywords: ['epoxy silane', 'glymo', 'glycidoxypropyl', 'glycidoxy silane'],
        industries: ['adhesives_sealants', 'paints', 'construction'],
      },
      {
        id: 'vinyl_silanes',
        name: 'Vinyl Silanes (VTES / VTMO)',
        keywords: ['vinyl silane', 'vtes', 'vtmo', 'xlpe', 'vinyltrimethoxysilane', 'polyethylene crosslinking'],
        industries: ['wire_cable', 'pvc'],
      },
      {
        id: 'methacrylate_silane',
        name: 'Methacrylate Silane (MEMO)',
        keywords: ['memo', 'methacrylate silane', 'methacryloxysilane', 'fiberglass coupling'],
        industries: ['paints', 'construction'],
      },
      {
        id: 'alkyl_silanes',
        name: 'Alkyl Silanes (Isobutyl / Propyl)',
        keywords: ['alkyl silane', 'isobutyl silane', 'propyl silane', 'ibtmo', 'ptmo', 'hydrophobic silane'],
        industries: ['construction', 'paints'],
      },
      {
        id: 'sealant_silanes',
        name: 'Sealant Silanes (MTAS / Ketoxime)',
        keywords: ['mtas', 'ketoxime silane', 'rtv crosslinker', 'acetoxy silane', 'silicone sealant crosslinker'],
        industries: ['adhesives_sealants', 'construction'],
      },
    ],
  },
  {
    label: 'PVC & Polymer Additives',
    emoji: '🧪',
    products: [
      {
        id: 'cazn_stabilizers',
        name: 'Ca-Zn Stabilizers (One-Pack)',
        keywords: ['ca-zn', 'cazn', 'calcium zinc stabilizer', 'one-pack stabilizer', 'lead-free stabilizer', 'esbo'],
        industries: ['pvc', 'wire_cable'],
      },
      {
        id: 'pvc_heat_stabilizers',
        name: 'PVC Heat Stabilizers',
        keywords: ['heat stabilizer', 'pvc stabilizer', 'acetylacetonate', 'calcium stearate', 'zinc stearate', 'dibenzoylmethane'],
        industries: ['pvc', 'wire_cable'],
      },
      {
        id: 'antioxidants',
        name: 'Antioxidants',
        keywords: ['antioxidant', 'phenolic antioxidant', 'irganox', 'polymer antioxidant'],
        industries: ['pvc', 'rubber_latex', 'wire_cable', 'adhesives_sealants'],
      },
      {
        id: 'polymer_additives',
        name: 'Polymer Additives & Processing Aids',
        keywords: ['polymer additive', 'processing aid', 'pvc modifier', 'rubber additive'],
        industries: ['pvc', 'rubber_latex', 'wire_cable', 'footwear'],
      },
      {
        id: 'acetylacetone',
        name: 'Acetylacetone & Metal Salts',
        keywords: ['acetylacetone', 'acetylacetonate', 'acac', 'metal acetylacetonate'],
        industries: ['pvc', 'paints', 'rubber_latex'],
      },
    ],
  },
  {
    label: 'Epoxy Systems & Isocyanates',
    emoji: '🔩',
    products: [
      {
        id: 'epoxy_resins',
        name: 'Epoxy Resins',
        keywords: ['epoxy resin', 'epoxy', 'bpa epoxy', 'hsc1100', 'hsc3300', 'epoxid'],
        industries: ['paints', 'adhesives_sealants', 'construction'],
      },
      {
        id: 'epoxy_hardeners',
        name: 'Epoxy Hardeners & Amines',
        keywords: ['epoxy hardener', 'amine hardener', 'teta', 'deta', 'ipda', 'mxda', 'jeffamine', 'curing agent'],
        industries: ['paints', 'adhesives_sealants', 'construction'],
      },
      {
        id: 'tdi',
        name: 'TDI (Toluene Diisocyanate)',
        keywords: ['tdi', 'toluene diisocyanate', 'isocyanate tdi'],
        industries: ['paints', 'adhesives_sealants', 'footwear', 'construction'],
      },
      {
        id: 'mdi',
        name: 'MDI (Methylene Diphenyl Diisocyanate)',
        keywords: ['mdi', 'methylene diphenyl diisocyanate', 'isocyanate mdi'],
        industries: ['paints', 'adhesives_sealants', 'construction'],
      },
    ],
  },
  {
    label: 'Flame Retardants',
    emoji: '🔥',
    products: [
      {
        id: 'tcpp',
        name: 'TCPP — PU Foam Flame Retardant',
        keywords: ['tcpp', 'chloroisopropyl phosphate', 'pu foam flame retardant', 'polyurethane fr'],
        industries: ['pvc', 'construction'],
      },
      {
        id: 'tep_fr',
        name: 'TEP (Triethyl Phosphate)',
        keywords: ['tep', 'triethyl phosphate', 'upe resin flame', 'frp flame retardant'],
        industries: ['pvc', 'adhesives_sealants'],
      },
      {
        id: 'bdp_fr',
        name: 'BDP — Halogen-Free Flame Retardant',
        keywords: ['bdp', 'bisphenol phosphate', 'halogen-free fr', 'rohs flame retardant', 'pc abs fr'],
        industries: ['pvc', 'wire_cable'],
      },
      {
        id: 'ippp_fr',
        name: 'IPPP — PVC & Rubber Flame Retardant',
        keywords: ['ippp', 'isopropylated phenyl phosphate', 'pvc flame retardant', 'flexible pvc fr'],
        industries: ['pvc', 'rubber_latex', 'wire_cable'],
      },
    ],
  },
  {
    label: 'Specialty',
    emoji: '✨',
    products: [
      {
        id: 'fumed_silica',
        name: 'Fumed Silica / Wacker HDK',
        keywords: ['fumed silica', 'pyrogenic silica', 'aerosil', 'wacker hdk', 'hdk', 'amorphous silica', 'hdk n20', 'hdk t30', 'hydrophobic fumed silica'],
        industries: ['paints', 'adhesives_sealants', 'rubber_latex', 'pharma', 'pcd_personal_care', 'construction'],
      },
      {
        id: 'pharma_intermediates',
        name: 'Pharmaceutical Intermediates',
        keywords: ['pharmaceutical intermediate', 'gluconate salt', 'lactate salt', 'dmso', 'msm', 'pharma chemical'],
        industries: ['pharma'],
      },
      {
        id: 'solvents',
        name: 'Solvents',
        keywords: ['propylene carbonate', 'benzyl alcohol', 'mibk', 'furfuryl alcohol', 'ethylene carbonate', 'propylene glycol solvent'],
        industries: ['paints', 'construction', 'adhesives_sealants', 'pcd_personal_care'],
      },
      {
        id: 'paper_chemicals',
        name: 'Paper Making Chemicals',
        keywords: ['paper chemical', 'paper making', 'pulp chemical', 'paper coating chemical'],
        industries: ['paper_pulp'],
      },
      {
        id: 'carbon_black',
        name: 'Carbon Black (N220)',
        keywords: ['carbon black', 'n220', 'rubber filler', 'kohlenstoff', 'tire carbon'],
        industries: ['rubber_latex', 'footwear', 'wire_cable', 'pvc'],
      },
      {
        id: 'hmds',
        name: 'HMDS (Hexamethyldisilazane)',
        keywords: ['hmds', 'hexamethyldisilazane', 'semiconductor silane', 'photolithography', 'silazane'],
        industries: ['medical_devices'],
      },
    ],
  },
];

// Flat list for easy lookup
const ALL_BUILTIN_PRODUCTS: ProductDef[] = PRODUCT_CATEGORIES.flatMap(c => c.products);

// Reverse map: industry → all product ids that target it
const INDUSTRY_TO_PRODUCTS: Record<string, string[]> = {};
ALL_BUILTIN_PRODUCTS.forEach(p => {
  p.industries.forEach(ind => {
    if (!INDUSTRY_TO_PRODUCTS[ind]) INDUSTRY_TO_PRODUCTS[ind] = [];
    INDUSTRY_TO_PRODUCTS[ind].push(p.id);
  });
});

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

// ─── Component ────────────────────────────────────────────────────────────────

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

  // Mode: find buyers for a product vs find leads in an industry
  const [mode, setMode] = useState<'product' | 'industry'>('product');
  const [selectedProduct, setSelectedProduct] = useState(ALL_BUILTIN_PRODUCTS[0].id);
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0].id);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0].id);
  const [showProductPanel, setShowProductPanel] = useState(false);
  const [productNameInput, setProductNameInput] = useState("");
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  // Build full product list (builtins + custom DB products)
  const allProducts: ProductDef[] = [
    ...ALL_BUILTIN_PRODUCTS,
    ...(customProducts || []).map((p: Product) => ({
      id: `custom_${p.id}`,
      name: p.name,
      keywords: p.keywords || [],
      industries: (p.targetIndustries || [])
        .map((n: string) => INDUSTRY_NAME_TO_ID[n])
        .filter(Boolean) as string[],
    })),
  ];

  const getProductDef = (id: string) => allProducts.find(p => p.id === id);

  // ── Filtering leads ──────────────────────────────────────────────────────

  const filteredLeads = (leads || []).filter(lead => {
    const regionMatch = selectedRegion === 'India' || lead.region === selectedRegion;

    if (mode === 'industry') {
      return lead.industry === selectedIndustry && regionMatch;
    }

    // product mode — keyword match across pitch/tags/intelligence
    const def = getProductDef(selectedProduct);
    if (!def) return regionMatch;
    const haystack = [
      lead.pitch || '',
      (lead.tags || []).join(' '),
      lead.intelligence || '',
    ].join(' ').toLowerCase();
    const productMatch = def.keywords.some(kw => haystack.includes(kw));
    return productMatch && regionMatch;
  });

  const aiGeneratedCount = filteredLeads.filter(l => l.source === "AI Discovery").length;

  // ── AI Generate ───────────────────────────────────────────────────────────

  const handleAIGenerate = () => {
    if (mode === 'industry') {
      // Industry mode: generate leads in the selected industry using all Fabrevol products
      generateMutation.mutate(
        { industry: selectedIndustry, region: selectedRegion, count: 6 },
        {
          onSuccess: (newLeads) => {
            const industryName = INDUSTRIES.find(i => i.id === selectedIndustry)?.name;
            toast({
              title: "AI Leads Generated",
              description: `${Array.isArray(newLeads) ? newLeads.length : 0} companies discovered in ${industryName}.`,
            });
          },
          onError: (err) => toast({ title: "Generation Failed", description: (err as Error).message, variant: "destructive" }),
        }
      );
      return;
    }

    // Product mode: generate across all industries that buy this product
    const def = getProductDef(selectedProduct);
    if (!def) return;
    const targetIndustries = def.industries;

    if (targetIndustries.length === 0) {
      toast({
        title: "No Target Industries",
        description: "This product has no target industries defined. Select an industry manually.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate(
      {
        industry: "all",
        region: selectedRegion,
        count: Math.min(targetIndustries.length * 3, 8),
        product: def.name,
        industries: targetIndustries,
      },
      {
        onSuccess: (newLeads) => {
          toast({
            title: "AI Discovery Complete",
            description: `${Array.isArray(newLeads) ? newLeads.length : 0} buyers found across ${targetIndustries.length} industries for ${def.name}.`,
          });
        },
        onError: (err) => toast({ title: "Generation Failed", description: (err as Error).message, variant: "destructive" }),
      }
    );
  };

  // ── Other handlers ────────────────────────────────────────────────────────

  const handleDeleteLead = () => {
    if (!deletingLead) return;
    const reason = deleteReason === "custom" ? customReason : deleteReason;
    if (!reason) return;
    deleteMutation.mutate({ id: deletingLead.id, reason }, {
      onSuccess: () => {
        toast({ title: "Lead Dismissed", description: `${deletingLead.company} has been removed.` });
        setDeletingLead(null); setDeleteReason(""); setCustomReason("");
      },
      onError: (err) => toast({ title: "Failed", description: (err as Error).message, variant: "destructive" }),
    });
  };

  const handleAddProductByName = () => {
    if (!productNameInput.trim()) return;
    analyzeByName.mutate(productNameInput.trim(), {
      onSuccess: (product) => {
        setProductNameInput("");
        toast({ title: "Product Added", description: `${product.name} analyzed and added.` });
      },
      onError: (err) => toast({ title: "Failed", description: (err as Error).message, variant: "destructive" }),
    });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        if (selectedProduct === `custom_${id}`) setSelectedProduct(ALL_BUILTIN_PRODUCTS[0].id);
        toast({ title: "Product Removed", description: "Product removed from your list." });
      },
      onError: () => toast({ title: "Failed", description: "Could not delete product.", variant: "destructive" }),
    });
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Invalid File", description: "Please upload a PDF.", variant: "destructive" });
      return;
    }
    analyzeByPdf.mutate(file, {
      onSuccess: (product) => {
        toast({ title: "PDF Analyzed", description: `${product.name} extracted and added.` });
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
      onError: (err) => {
        toast({ title: "Failed", description: (err as Error).message, variant: "destructive" });
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  const handleAddToCRM = (lead: Lead) => {
    updateMutation.mutate({ id: lead.id, status: "Target", isFavorite: true }, {
      onSuccess: () => toast({ title: "Added to Targets", description: `${lead.company} added to your CRM.` }),
    });
  };

  // ── Derived display values ────────────────────────────────────────────────

  const selectedProductDef = getProductDef(selectedProduct);
  const selectedIndustryName = INDUSTRIES.find(i => i.id === selectedIndustry)?.name;

  const targetIndustryNames = (selectedProductDef?.industries || [])
    .map(id => INDUSTRIES.find(i => i.id === id)?.name)
    .filter(Boolean) as string[];

  const productsForIndustry = (INDUSTRY_TO_PRODUCTS[selectedIndustry] || [])
    .map(id => ALL_BUILTIN_PRODUCTS.find(p => p.id === id)?.name)
    .filter(Boolean) as string[];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <header>
            <h1 className="text-3xl font-display font-bold text-[#153e4d] mb-1">Sales Centre</h1>
            <p className="text-slate-500 max-w-2xl">
              AI-powered discovery of manufacturers matched to Fabrevol's specialty chemical portfolio.
            </p>
          </header>

          {/* ── Control Panel ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">

            {/* Mode Toggle */}
            <div className="flex border-b border-slate-100">
              <button
                onClick={() => setMode('product')}
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 text-sm font-semibold transition-all ${
                  mode === 'product'
                    ? 'bg-[#153e4d] text-white'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Package className="w-4 h-4" />
                By Product
                <span className={`text-xs font-normal ${mode === 'product' ? 'text-white/70' : 'text-slate-400'}`}>
                  — find buyers across industries
                </span>
              </button>
              <button
                onClick={() => setMode('industry')}
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 text-sm font-semibold transition-all ${
                  mode === 'industry'
                    ? 'bg-[#153e4d] text-white'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                By Industry
                <span className={`text-xs font-normal ${mode === 'industry' ? 'text-white/70' : 'text-slate-400'}`}>
                  — target a sector with all products
                </span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                {/* Product selector (product mode) */}
                {mode === 'product' && (
                  <div className="md:col-span-5 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5" /> Product
                    </label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px]">
                        {PRODUCT_CATEGORIES.map(cat => (
                          <div key={cat.label}>
                            <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 sticky top-0">
                              {cat.emoji} {cat.label}
                            </div>
                            {cat.products.map(p => (
                              <SelectItem key={p.id} value={p.id} className="pl-4">
                                {p.name}
                              </SelectItem>
                            ))}
                            {/* Custom products at the end */}
                          </div>
                        ))}
                        {(customProducts || []).length > 0 && (
                          <div>
                            <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 sticky top-0">
                              🧬 My Custom Products
                            </div>
                            {(customProducts || []).map((p: Product) => (
                              <SelectItem key={`custom_${p.id}`} value={`custom_${p.id}`} className="pl-4">
                                {p.name}
                              </SelectItem>
                            ))}
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Industry selector (industry mode) */}
                {mode === 'industry' && (
                  <div className="md:col-span-5 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" /> Industry
                    </label>
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map(ind => (
                          <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Region */}
                <div className="md:col-span-4 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Map className="w-3.5 h-3.5" /> Region
                  </label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map(r => (
                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate button */}
                <div className="md:col-span-3">
                  <Button
                    size="lg"
                    onClick={handleAIGenerate}
                    disabled={generateMutation.isPending}
                    className="w-full h-11 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold shadow-lg shadow-sky-200 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {generateMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Discovering...</>
                    ) : (
                      <><Wand2 className="w-4 h-4 mr-2" />AI Discover</>
                    )}
                  </Button>
                </div>
              </div>

              {/* Context hint */}
              <AnimatePresence mode="wait">
                {mode === 'product' && selectedProductDef && targetIndustryNames.length > 0 && (
                  <motion.div
                    key="product-hint"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-start gap-2 text-xs text-slate-500 bg-sky-50 border border-sky-100 rounded-xl px-4 py-2.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold text-[#153e4d]">AI Discover</span> will find buyers of{' '}
                      <span className="font-medium text-[#0ea5e9]">{selectedProductDef.name}</span> across{' '}
                      <span className="font-medium">{targetIndustryNames.slice(0, 4).join(', ')}{targetIndustryNames.length > 4 ? ` +${targetIndustryNames.length - 4} more` : ''}</span>.
                    </span>
                  </motion.div>
                )}

                {mode === 'industry' && selectedIndustryName && productsForIndustry.length > 0 && (
                  <motion.div
                    key="industry-hint"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-start gap-2 text-xs text-slate-500 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold text-[#153e4d]">AI Discover</span> will find{' '}
                      <span className="font-medium text-emerald-700">{selectedIndustryName}</span> manufacturers for{' '}
                      <span className="font-medium">{productsForIndustry.slice(0, 3).join(', ')}{productsForIndustry.length > 3 ? ` +${productsForIndustry.length - 3} more` : ''}</span>.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Product Intelligence Panel ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <button
              onClick={() => setShowProductPanel(!showProductPanel)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#153e4d] to-[#0ea5e9] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[#153e4d]">Product Intelligence</h3>
                  <p className="text-sm text-slate-500">Add custom products by name or upload a PDF data sheet</p>
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
                          <Plus className="w-4 h-4 text-[#0ea5e9]" /> Add by Product Name
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="e.g. Fumed Silica, Epoxy Resin..."
                            value={productNameInput}
                            onChange={(e) => setProductNameInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddProductByName()}
                            className="h-11 bg-slate-50"
                          />
                          <Button
                            onClick={handleAddProductByName}
                            disabled={!productNameInput.trim() || analyzeByName.isPending}
                            className="h-11 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 shrink-0"
                          >
                            {analyzeByName.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                          </Button>
                        </div>
                        {analyzeByName.isPending && (
                          <p className="text-xs text-[#0ea5e9] flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> AI is researching this product...
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#0ea5e9]" /> Upload Product TDS (PDF)
                        </label>
                        <div className="flex gap-2">
                          <input type="file" ref={fileInputRef} accept="application/pdf" onChange={handlePdfUpload} className="hidden" />
                          <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={analyzeByPdf.isPending}
                            className="h-11 flex-1 border-dashed border-2 border-slate-300 hover:border-[#0ea5e9] hover:bg-sky-50 text-slate-600"
                          >
                            {analyzeByPdf.isPending ? (
                              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing PDF...</>
                            ) : (
                              <><FileText className="w-4 h-4 mr-2" />Choose PDF File</>
                            )}
                          </Button>
                        </div>
                        {analyzeByPdf.isPending && (
                          <p className="text-xs text-[#0ea5e9] flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Extracting product details from TDS...
                          </p>
                        )}
                      </div>
                    </div>

                    {(customProducts || []).length > 0 && (
                      <div className="space-y-2 border-t border-slate-100 pt-4">
                        <h4 className="text-sm font-medium text-slate-700">Custom Products</h4>
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
                                  variant="ghost" size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="h-7 w-7 p-0 text-slate-300 hover:text-red-500 hover:bg-red-50 shrink-0"
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

          {/* ── Results ── */}
          <div className="min-h-[400px]">
            {generateMutation.isPending ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
                  <div className="absolute inset-0 border-4 border-[#153e4d] rounded-full border-t-transparent animate-spin" />
                  <Bot className="absolute inset-0 m-auto w-8 h-8 text-[#153e4d]" />
                </div>
                <p className="text-slate-500 font-medium animate-pulse">
                  {mode === 'product' ? 'Finding buyers across industries...' : 'Discovering leads in this industry...'}
                </p>
                <p className="text-slate-400 text-sm">
                  {mode === 'product'
                    ? `Searching for real buyers of ${selectedProductDef?.name}`
                    : `Finding manufacturers in ${selectedIndustryName}`}
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
                  <h2 className="text-xl font-bold text-[#153e4d] flex items-center gap-2">
                    <Search className="w-5 h-5 text-[#0ea5e9]" />
                    {mode === 'product'
                      ? <>Buyers of <span className="text-[#0ea5e9]">{selectedProductDef?.name}</span></>
                      : <>Leads in <span className="text-[#0ea5e9]">{selectedIndustryName}</span></>
                    }
                    <Badge variant="secondary" className="no-default-active-elevate text-xs">{filteredLeads.length} Found</Badge>
                    {aiGeneratedCount > 0 && (
                      <Badge variant="outline" className="no-default-active-elevate text-xs border-[#153e4d] text-[#153e4d]">
                        <Wand2 className="w-3 h-3 mr-1" />{aiGeneratedCount} AI
                      </Badge>
                    )}
                  </h2>
                </div>

                {/* Group by industry in product mode */}
                {mode === 'product' ? (
                  (() => {
                    const grouped: Record<string, typeof filteredLeads> = {};
                    filteredLeads.forEach(lead => {
                      const ind = lead.industry || 'other';
                      if (!grouped[ind]) grouped[ind] = [];
                      grouped[ind].push(lead);
                    });
                    return (
                      <div className="space-y-6">
                        {Object.entries(grouped)
                          .sort((a, b) => b[1].length - a[1].length)
                          .map(([industryId, industryLeads]) => (
                            <div key={industryId} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
                              <div className="px-5 py-3.5 bg-gradient-to-r from-[#153e4d] to-[#1a5568] flex items-center gap-3">
                                <Building2 className="w-4 h-4 text-white/80" />
                                <h3 className="font-semibold text-white">{INDUSTRIES.find(i => i.id === industryId)?.name || industryId}</h3>
                                <Badge className="bg-white/20 text-white border-0 no-default-active-elevate text-xs">{industryLeads.length} leads</Badge>
                              </div>
                              <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <AnimatePresence>
                                  {industryLeads.map(lead => (
                                    <LeadCard key={lead.id} lead={lead} onAction={handleAddToCRM} actionType="add" isActionPending={updateMutation.isPending} onDelete={setDeletingLead} isDeletePending={deleteMutation.isPending} />
                                  ))}
                                </AnimatePresence>
                              </div>
                            </div>
                          ))}
                      </div>
                    );
                  })()
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {filteredLeads.map(lead => (
                        <LeadCard key={lead.id} lead={lead} onAction={handleAddToCRM} actionType="add" isActionPending={updateMutation.isPending} onDelete={setDeletingLead} isDeletePending={deleteMutation.isPending} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700">No matching leads yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  {mode === 'product'
                    ? `Click AI Discover to find buyers of ${selectedProductDef?.name}.`
                    : `Click AI Discover to find leads in ${selectedIndustryName}.`}
                </p>
              </div>
            )}
          </div>

          {/* Delete dialog */}
          <Dialog open={!!deletingLead} onOpenChange={(open) => { if (!open) { setDeletingLead(null); setDeleteReason(""); setCustomReason(""); } }}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Dismiss Lead</DialogTitle>
                <DialogDescription>
                  Why are you removing <strong>{deletingLead?.company}</strong>? It won't be re-generated by AI.
                </DialogDescription>
              </DialogHeader>
              <RadioGroup value={deleteReason} onValueChange={setDeleteReason} className="space-y-2 py-2">
                {["Not a relevant buyer", "Duplicate lead", "Wrong industry or region", "Company no longer active", "Already a customer"].map(r => (
                  <div key={r} className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
                    <RadioGroupItem value={r} id={r} />
                    <Label htmlFor={r} className="cursor-pointer font-normal flex-1">{r}</Label>
                  </div>
                ))}
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value="custom" id="reason-custom" />
                  <Label htmlFor="reason-custom" className="cursor-pointer font-normal flex-1">Other reason</Label>
                </div>
              </RadioGroup>
              {deleteReason === "custom" && (
                <Textarea placeholder="Tell us why..." value={customReason} onChange={(e) => setCustomReason(e.target.value)} className="mt-1" />
              )}
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => { setDeletingLead(null); setDeleteReason(""); setCustomReason(""); }}>Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteLead}
                  disabled={!deleteReason || (deleteReason === "custom" && !customReason.trim()) || deleteMutation.isPending}
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
