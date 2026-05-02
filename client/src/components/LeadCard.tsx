import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, MapPin, User, Globe, Plus, Trash2, Linkedin,
  ExternalLink, CheckCircle2, TrendingUp, Lightbulb, BadgeCheck,
  Wand2, Mail, Phone, ShieldCheck, ShieldAlert, ShieldQuestion,
  ShieldOff, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { type Lead } from "@shared/schema";
import { cn } from "@/lib/utils";
import { useUpdateLead } from "@/hooks/use-leads";
import { useToast } from "@/hooks/use-toast";

// ─── Company Size Config ───────────────────────────────────────────────────────

const SIZE_CONFIG = {
  A: {
    label: "A",
    title: "MNC / Large Listed",
    desc: "MNC or large listed Indian company (>₹500 Cr turnover)",
    classes: "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200",
  },
  B: {
    label: "B",
    title: "Mid-Large",
    desc: "Established mid-large company (₹50–500 Cr turnover)",
    classes: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
  },
  C: {
    label: "C",
    title: "Regional SME",
    desc: "Regional manufacturer (₹5–50 Cr turnover)",
    classes: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
  },
  D: {
    label: "D",
    title: "Small / Startup",
    desc: "Small manufacturer or proprietorship (<₹5 Cr)",
    classes: "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200",
  },
} as const;

// ─── Verification Config ──────────────────────────────────────────────────────

const VERIFICATION_CONFIG = {
  verified: {
    icon: ShieldCheck,
    label: "Verified",
    classes: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  partial: {
    icon: ShieldAlert,
    label: "Partial",
    classes: "bg-amber-100 text-amber-700 border-amber-200",
  },
  unverified: {
    icon: ShieldQuestion,
    label: "Unverified",
    classes: "bg-slate-100 text-slate-500 border-slate-200",
  },
  invalid: {
    icon: ShieldOff,
    label: "Invalid",
    classes: "bg-red-100 text-red-600 border-red-200",
  },
} as const;

type VerificationStatus = keyof typeof VERIFICATION_CONFIG;
type CompanySize = keyof typeof SIZE_CONFIG;

const SIGNAL_LABELS: Record<string, string> = {
  website: "Website confirmed",
  linkedin: "LinkedIn found",
  gst: "GST / CIN verified",
  phone: "Phone confirmed",
  manual: "Manually verified",
};

// ─── Component ────────────────────────────────────────────────────────────────

interface LeadCardProps {
  lead: Lead;
  onAction: (lead: Lead) => void;
  actionType: "add" | "delete";
  isActionPending?: boolean;
  onDelete?: (lead: Lead) => void;
  isDeletePending?: boolean;
}

export function LeadCard({
  lead, onAction, actionType, isActionPending, onDelete, isDeletePending
}: LeadCardProps) {
  const isTarget = lead.status === "Target";
  const updateMutation = useUpdateLead();
  const { toast } = useToast();

  const currentSize = (lead.companySize as CompanySize) || null;
  const currentVerification = (lead.verificationStatus as VerificationStatus) || "unverified";
  const signals: Record<string, boolean> = (lead.verificationSignals as Record<string, boolean>) || {};

  const [verifyOpen, setVerifyOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  const updateField = (updates: Partial<Lead>) => {
    updateMutation.mutate({ id: lead.id, ...updates } as any, {
      onError: () => toast({ title: "Update failed", variant: "destructive" }),
    });
  };

  const toggleSignal = (key: string, checked: boolean) => {
    const newSignals = { ...signals, [key]: checked };
    const count = Object.values(newSignals).filter(Boolean).length;
    const newStatus: VerificationStatus =
      newSignals.manual || count >= 3 ? "verified"
      : count >= 1 ? "partial"
      : "unverified";
    updateField({ verificationSignals: newSignals as any, verificationStatus: newStatus });
  };

  const setVerificationStatus = (status: VerificationStatus) => {
    updateField({ verificationStatus: status });
    setVerifyOpen(false);
  };

  const setSize = (size: CompanySize | null) => {
    updateField({ companySize: size as any });
    setSizeOpen(false);
  };

  const verCfg = VERIFICATION_CONFIG[currentVerification] ?? VERIFICATION_CONFIG.unverified;
  const VerIcon = verCfg.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "h-full overflow-hidden border transition-all duration-300 bg-white",
        isTarget ? "border-l-4 border-l-primary shadow-md" : "hover:border-primary/30 hover:shadow-lg"
      )}>
        <CardHeader className="pb-3 bg-slate-50/50 border-b border-slate-100">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display font-bold text-lg text-[#153e4d] leading-tight">
                  {lead.company}
                </h3>
                {lead.isFavorite && <BadgeCheck className="w-4 h-4 text-primary fill-primary/10" />}
                {lead.source === "AI Discovery" && (
                  <Badge variant="outline" className="no-default-active-elevate text-[10px] px-1.5 py-0 border-[#153e4d]/30 text-[#153e4d]/70">
                    <Wand2 className="w-2.5 h-2.5 mr-0.5" />AI
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                <Badge variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-normal">
                  {lead.industry}
                </Badge>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {lead.city}, {lead.region}
                </div>
              </div>
            </div>

            {/* Size + Verification badges */}
            <div className="flex flex-col gap-1.5 shrink-0">

              {/* Company Size Badge */}
              <Popover open={sizeOpen} onOpenChange={setSizeOpen}>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-bold transition-colors cursor-pointer",
                    currentSize
                      ? SIZE_CONFIG[currentSize].classes
                      : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                  )}>
                    {currentSize ? `${currentSize} — ${SIZE_CONFIG[currentSize].title}` : "Set size"}
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2" side="left">
                  <p className="text-xs font-semibold text-slate-500 px-2 pb-2 border-b mb-2">Company Size</p>
                  {(Object.entries(SIZE_CONFIG) as [CompanySize, typeof SIZE_CONFIG[CompanySize]][]).map(([key, cfg]) => (
                    <button
                      key={key}
                      onClick={() => setSize(key)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-xs transition-colors mb-0.5",
                        currentSize === key ? cfg.classes : "hover:bg-slate-50"
                      )}
                    >
                      <span className="font-bold mr-2">{cfg.label}</span>
                      <span className="font-medium">{cfg.title}</span>
                      <span className="text-slate-400 block text-[10px] mt-0.5">{cfg.desc}</span>
                    </button>
                  ))}
                  {currentSize && (
                    <button
                      onClick={() => setSize(null)}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:bg-slate-50 mt-1 border-t"
                    >
                      Clear size
                    </button>
                  )}
                </PopoverContent>
              </Popover>

              {/* Verification Badge */}
              <Popover open={verifyOpen} onOpenChange={setVerifyOpen}>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-medium transition-colors cursor-pointer",
                    verCfg.classes
                  )}>
                    <VerIcon className="w-3 h-3" />
                    {verCfg.label}
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3" side="left">
                  <p className="text-xs font-semibold text-slate-500 pb-2 border-b mb-3">Verification Signals</p>
                  <div className="space-y-2.5 mb-4">
                    {Object.entries(SIGNAL_LABELS).map(([key, label]) => (
                      <div key={key} className="flex items-center gap-2.5">
                        <Checkbox
                          id={`sig-${lead.id}-${key}`}
                          checked={!!signals[key]}
                          onCheckedChange={(checked) => toggleSignal(key, !!checked)}
                        />
                        <Label htmlFor={`sig-${lead.id}-${key}`} className="text-xs cursor-pointer">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 pb-2 border-b mb-2">Overall Status</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(Object.entries(VERIFICATION_CONFIG) as [VerificationStatus, typeof VERIFICATION_CONFIG[VerificationStatus]][]).map(([key, cfg]) => {
                      const Icon = cfg.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setVerificationStatus(key)}
                          className={cn(
                            "flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs border transition-colors",
                            currentVerification === key ? cfg.classes : "hover:bg-slate-50 border-slate-200"
                          )}
                        >
                          <Icon className="w-3 h-3" />
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>

            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Contact</span>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <User className="w-3.5 h-3.5 text-primary" />
                {lead.person}
              </div>
              <span className="text-xs text-slate-500 pl-5.5 truncate" title={lead.role ?? ""}>{lead.role}</span>
              {lead.directEmail && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  {lead.directEmail}
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                  {lead.phone}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Connect</span>
              {lead.website ? (
                <a href={lead.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                  Website <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-sm text-slate-400">No website</span>
              )}
              {lead.linkedin && (
                <a href={lead.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline text-xs">
                  <Linkedin className="w-3.5 h-3.5 shrink-0" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {lead.pitch && (
            <div className="bg-sky-50 rounded-lg p-3 border border-sky-100">
              <div className="flex items-center gap-2 mb-1 text-sky-800 font-semibold text-xs uppercase tracking-wide">
                <TrendingUp className="w-3.5 h-3.5" />
                Sales Pitch
              </div>
              <p className="text-sm text-sky-900 leading-relaxed">{lead.pitch}</p>
            </div>
          )}

          {lead.intelligence && (
            <div className="flex gap-2 items-start text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p>{lead.intelligence}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-2 pb-4 border-t border-slate-50 mt-auto bg-slate-50/30">
          <div className="flex w-full justify-between items-center">
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={() => onDelete(lead)} disabled={isDeletePending}
                className="gap-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 px-2">
                <Trash2 className="w-3.5 h-3.5" />
                <span className="text-xs">Delete</span>
              </Button>
            )}
            <div className={cn("flex justify-end", !onDelete && "w-full")}>
              {actionType === "add" ? (
                <Button size="sm" onClick={() => onAction(lead)} disabled={isTarget || isActionPending}
                  className={cn(
                    "gap-2 transition-all duration-300",
                    isTarget
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-none cursor-default"
                      : "bg-[#0ea5e9] hover:bg-[#0284c7] hover:shadow-md hover:shadow-sky-200"
                  )}>
                  {isTarget ? (
                    <><CheckCircle2 className="w-4 h-4" />Added to CRM</>
                  ) : (
                    <><Plus className="w-4 h-4" />Add Target</>
                  )}
                </Button>
              ) : (
                <Button variant="destructive" size="sm" onClick={() => onAction(lead)} disabled={isActionPending}
                  className="gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-200 shadow-none">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
