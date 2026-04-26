import { useState } from "react";
import { useLeads, useUpdateLead, useCreateLead } from "@/hooks/use-leads";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription
} from "@/components/ui/dialog";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Loader2, TrendingUp, IndianRupee, Phone, Mail, Calendar,
  MessageSquare, PhoneCall, Video, PenLine, ChevronRight,
  Building2, User, MapPin, Filter, BarChart3, Target, Plus, UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { DEAL_STAGES, type Lead, type Activity } from "@shared/schema";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "Rubber & Latex", "Pharmaceuticals", "Personal Care & Cosmetics",
  "PVC & Plastics", "Paints & Coatings", "Construction Chemicals",
  "Agriculture & Agrochemicals", "Paper & Pulp", "Water Treatment",
  "Leather", "Wire & Cable", "Footwear", "Food Processing",
  "Adhesives & Sealants", "Medical Devices"
];

const REGIONS = ["Maharashtra", "Gujarat", "Rajasthan", "Madhya Pradesh", "Telangana"];

const REVENUE_TARGET = 1000;

const ACTIVITY_TYPES = [
  { id: "note", label: "Note", icon: PenLine },
  { id: "call", label: "Call", icon: PhoneCall },
  { id: "email", label: "Email", icon: Mail },
  { id: "meeting", label: "Meeting", icon: Video },
] as const;

function formatCurrency(lakhs: number) {
  if (lakhs >= 100) return `${(lakhs / 100).toFixed(1)} Cr`;
  return `${lakhs} L`;
}

function StageColumn({ stage, leads, onSelectLead }: {
  stage: typeof DEAL_STAGES[number];
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}) {
  const stageValue = leads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

  return (
    <div className="flex flex-col min-w-[260px] max-w-[280px]">
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={cn("w-2.5 h-2.5 rounded-full", stage.color)} />
          <span className="text-sm font-semibold text-slate-700">{stage.label}</span>
          <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
            {leads.length}
          </span>
        </div>
        {stageValue > 0 && (
          <span className="text-xs font-medium text-slate-500">
            {formatCurrency(stageValue)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1 bg-slate-50/70 rounded-xl p-2 min-h-[120px] border border-slate-100">
        <AnimatePresence>
          {leads.map(lead => (
            <motion.div
              key={lead.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card
                className="cursor-pointer border border-slate-200 bg-white hover:border-[#0ea5e9]/40 hover:shadow-md transition-all duration-200"
                onClick={() => onSelectLead(lead)}
                data-testid={`crm-card-${lead.id}`}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#153e4d] leading-tight line-clamp-1">
                      {lead.company}
                    </h4>
                    {(lead.dealValue || 0) > 0 && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                        {formatCurrency(lead.dealValue || 0)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <User className="w-3 h-3 shrink-0" />
                    <span className="truncate">{lead.person}</span>
                    {lead.role && <span className="text-slate-400 truncate">· {lead.role}</span>}
                  </div>
                  {(lead.directEmail || lead.phone) && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      {lead.directEmail && (
                        <div className="flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3 shrink-0" />
                          <span className="truncate">{lead.directEmail}</span>
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-1 truncate">
                          <Phone className="w-3 h-3 shrink-0" />
                          <span className="truncate">{lead.phone}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Building2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{lead.industry}</span>
                  </div>
                  {lead.nextFollowUp && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      <Calendar className="w-3 h-3 shrink-0" />
                      <span>{lead.nextFollowUp}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {leads.length === 0 && (
          <div className="flex items-center justify-center h-20 text-xs text-slate-400">
            No deals
          </div>
        )}
      </div>
    </div>
  );
}

function LeadDetailDialog({ lead, open, onOpenChange }: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const updateMutation = useUpdateLead();
  const { toast } = useToast();
  const [activityType, setActivityType] = useState<string>("note");
  const [activityContent, setActivityContent] = useState("");
  const [dealValue, setDealValue] = useState<string>("");
  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [directEmail, setDirectEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [initialized, setInitialized] = useState<number | null>(null);

  if (!lead) return null;

  if (initialized !== lead.id) {
    setContactName(lead.person || "");
    setContactRole(lead.role || "");
    setDirectEmail(lead.directEmail || "");
    setContactPhone(lead.phone || "");
    setMobile(lead.mobile || "");
    setDealValue(String(lead.dealValue || ""));
    setNextFollowUp(lead.nextFollowUp || "");
    setNextAction(lead.nextAction || "");
    setInitialized(lead.id);
  }

  const activities: Activity[] = Array.isArray(lead.activities) ? (lead.activities as Activity[]) : [];

  const handleStageChange = (newStage: string) => {
    updateMutation.mutate({ id: lead.id, dealStage: newStage }, {
      onSuccess: () => {
        toast({ title: "Stage Updated", description: `${lead.company} moved to ${DEAL_STAGES.find(s => s.id === newStage)?.label}` });
      }
    });
  };

  const handleSaveContact = () => {
    const updates: Record<string, unknown> = {};
    if (contactName !== (lead.person || "")) updates.person = contactName;
    if (contactRole !== (lead.role || "")) updates.role = contactRole;
    if (directEmail !== (lead.directEmail || "")) updates.directEmail = directEmail;
    if (contactPhone !== (lead.phone || "")) updates.phone = contactPhone;
    if (mobile !== (lead.mobile || "")) updates.mobile = mobile;
    if (nextFollowUp !== (lead.nextFollowUp || "")) updates.nextFollowUp = nextFollowUp;
    if (nextAction !== (lead.nextAction || "")) updates.nextAction = nextAction;
    const parsedDealValue = parseInt(dealValue) || 0;
    if (parsedDealValue !== (lead.dealValue || 0)) updates.dealValue = parsedDealValue;

    if (Object.keys(updates).length === 0) {
      toast({ title: "No Changes", description: "No fields were modified." });
      return;
    }

    updateMutation.mutate({ id: lead.id, ...updates } as any, {
      onSuccess: () => {
        toast({ title: "Contact Updated", description: `${lead.company} details saved.` });
      }
    });
  };

  const handleAddActivity = () => {
    if (!activityContent.trim()) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      type: activityType as Activity["type"],
      content: activityContent.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedActivities = [newActivity, ...activities];

    updateMutation.mutate({ id: lead.id, activities: updatedActivities } as any, {
      onSuccess: () => {
        setActivityContent("");
        toast({ title: "Activity Added", description: "Note saved to timeline." });
      }
    });
  };

  const currentStage = DEAL_STAGES.find(s => s.id === (lead.dealStage || "new"));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" data-testid="crm-lead-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[#153e4d]">
            <Building2 className="w-5 h-5 text-[#0ea5e9]" />
            {lead.company}
          </DialogTitle>
          <DialogDescription>Manage deal pipeline, contact details, and activity for this lead.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-slate-100 text-slate-600">{lead.industry}</Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600">
              <MapPin className="w-3 h-3 mr-1" />{lead.city}, {lead.region}
            </Badge>
            <div className="flex items-center gap-1">
              <div className={cn("w-2.5 h-2.5 rounded-full", currentStage?.color)} />
              <span className="text-sm font-medium text-slate-600">{currentStage?.label}</span>
            </div>
          </div>

          <Tabs defaultValue="pipeline" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-slate-100" data-testid="crm-detail-tabs">
              <TabsTrigger value="pipeline" data-testid="tab-pipeline">Pipeline</TabsTrigger>
              <TabsTrigger value="contact" data-testid="tab-contact">Contact</TabsTrigger>
              <TabsTrigger value="activity" data-testid="tab-activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="pipeline" className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Deal Stage</label>
                <Select value={lead.dealStage || "new"} onValueChange={handleStageChange}>
                  <SelectTrigger data-testid="select-deal-stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEAL_STAGES.map(s => (
                      <SelectItem key={s.id} value={s.id}>
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", s.color)} />
                          {s.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Deal Value (in Lakhs)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0"
                    value={dealValue}
                    onChange={e => setDealValue(e.target.value)}
                    data-testid="input-deal-value"
                  />
                  <Button onClick={handleSaveContact} disabled={updateMutation.isPending} data-testid="button-save-deal">
                    Save
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Next Follow-up</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={nextFollowUp}
                    onChange={e => setNextFollowUp(e.target.value)}
                    data-testid="input-next-followup"
                  />
                  <Input
                    placeholder="e.g. Send proposal"
                    value={nextAction}
                    onChange={e => setNextAction(e.target.value)}
                    data-testid="input-next-action"
                  />
                </div>
                <Button onClick={handleSaveContact} disabled={updateMutation.isPending} className="mt-2" size="sm" data-testid="button-save-followup">
                  Save Follow-up
                </Button>
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
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0ea5e9]" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Contact Name</label>
                    <Input
                      placeholder="e.g. Rajesh Sharma"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      data-testid="input-contact-name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Designation</label>
                    <Input
                      placeholder="e.g. Purchase Manager"
                      value={contactRole}
                      onChange={e => setContactRole(e.target.value)}
                      data-testid="input-contact-role"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Email</label>
                    <Input
                      type="email"
                      placeholder="e.g. rajesh@company.com"
                      value={directEmail}
                      onChange={e => setDirectEmail(e.target.value)}
                      data-testid="input-direct-email"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Phone</label>
                    <Input
                      type="tel"
                      placeholder="e.g. +91 22 1234 5678"
                      value={contactPhone}
                      onChange={e => setContactPhone(e.target.value)}
                      data-testid="input-contact-phone"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Mobile (if different from phone)</label>
                  <Input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    data-testid="input-mobile"
                  />
                </div>
                {lead.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xs text-slate-400">Website:</span>
                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-[#0ea5e9] hover:underline truncate">
                      {lead.website}
                    </a>
                  </div>
                )}
                <Button onClick={handleSaveContact} disabled={updateMutation.isPending} size="sm" className="bg-[#0ea5e9] hover:bg-[#0284c7]" data-testid="button-save-contact">
                  Save Contact Info
                </Button>
              </div>

              {lead.intelligence && (
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-sm text-amber-900">
                  <span className="font-semibold text-xs uppercase text-amber-700 block mb-1">Procurement Intelligence</span>
                  {lead.intelligence}
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {ACTIVITY_TYPES.map(at => {
                    const Icon = at.icon;
                    return (
                      <Button
                        key={at.id}
                        variant={activityType === at.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActivityType(at.id)}
                        className={cn(
                          activityType === at.id && "bg-[#0ea5e9] hover:bg-[#0284c7]"
                        )}
                        data-testid={`button-activity-type-${at.id}`}
                      >
                        <Icon className="w-3.5 h-3.5 mr-1.5" />
                        {at.label}
                      </Button>
                    );
                  })}
                </div>
                <Textarea
                  placeholder="Add a note about your interaction..."
                  value={activityContent}
                  onChange={e => setActivityContent(e.target.value)}
                  className="min-h-[80px]"
                  data-testid="textarea-activity"
                />
                <Button
                  onClick={handleAddActivity}
                  disabled={!activityContent.trim() || updateMutation.isPending}
                  className="bg-[#0ea5e9] hover:bg-[#0284c7]"
                  data-testid="button-add-activity"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-700">Timeline</h4>
                {activities.length > 0 ? (
                  <div className="space-y-3">
                    {activities.map((act) => {
                      const typeInfo = ACTIVITY_TYPES.find(t => t.id === act.type);
                      const Icon = typeInfo?.icon || PenLine;
                      return (
                        <div key={act.id} className="flex gap-3 items-start" data-testid={`activity-${act.id}`}>
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-slate-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-600 uppercase">{typeInfo?.label}</span>
                              <span className="text-xs text-slate-400">
                                {new Date(act.timestamp).toLocaleDateString("en-IN", {
                                  day: "numeric", month: "short", year: "numeric",
                                  hour: "2-digit", minute: "2-digit"
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700">{act.content}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 text-center py-6">No activities recorded yet.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddLeadDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const createMutation = useCreateLead();
  const { toast } = useToast();
  const [form, setForm] = useState({
    company: "", industry: INDUSTRIES[0], region: REGIONS[0], city: "",
    person: "", role: "", directEmail: "", phone: "", mobile: "",
    website: "", pitch: "", intelligence: "",
  });

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    if (!form.company.trim() || !form.person.trim()) {
      toast({ title: "Missing Fields", description: "Company name and contact name are required.", variant: "destructive" });
      return;
    }
    createMutation.mutate({
      company: form.company.trim(),
      industry: form.industry,
      region: form.region,
      city: form.city.trim() || form.region,
      person: form.person.trim(),
      role: form.role.trim() || "Contact",
      phone: form.phone.trim() || null,
      directEmail: form.directEmail.trim() || null,
      mobile: form.mobile.trim() || null,
      website: form.website.trim() || null,
      pitch: form.pitch.trim() || null,
      intelligence: form.intelligence.trim() || null,
      status: "Target",
      isFavorite: true,
      dealStage: "new",
      dealValue: 0,
      source: "Manual",
      tags: [],
      linkedin: null,
      nextFollowUp: null,
      nextAction: null,
      activities: [],
    }, {
      onSuccess: () => {
        toast({ title: "Lead Added", description: `${form.company} added to your CRM pipeline.` });
        setForm({ company: "", industry: INDUSTRIES[0], region: REGIONS[0], city: "", person: "", role: "", directEmail: "", phone: "", mobile: "", website: "", pitch: "", intelligence: "" });
        onOpenChange(false);
      },
      onError: (err: Error) => {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto" data-testid="add-lead-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#153e4d]">
            <UserPlus className="w-5 h-5 text-[#0ea5e9]" />
            Add Lead Manually
          </DialogTitle>
          <DialogDescription>Add a new company to your CRM pipeline with contact details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Company Name *</label>
            <Input placeholder="e.g. Acme Industries Pvt Ltd" value={form.company} onChange={e => updateField("company", e.target.value)} data-testid="input-add-company" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Industry *</label>
              <Select value={form.industry} onValueChange={v => updateField("industry", v)}>
                <SelectTrigger data-testid="select-add-industry"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Region *</label>
              <Select value={form.region} onValueChange={v => updateField("region", v)}>
                <SelectTrigger data-testid="select-add-region"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">City</label>
            <Input placeholder="e.g. Mumbai, Ahmedabad" value={form.city} onChange={e => updateField("city", e.target.value)} data-testid="input-add-city" />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-sm font-semibold text-[#153e4d] mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#0ea5e9]" />
              Contact Information
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Contact Name *</label>
                <Input placeholder="e.g. Rajesh Sharma" value={form.person} onChange={e => updateField("person", e.target.value)} data-testid="input-add-person" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Designation</label>
                <Input placeholder="e.g. Purchase Manager" value={form.role} onChange={e => updateField("role", e.target.value)} data-testid="input-add-role" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Email</label>
                <Input type="email" placeholder="e.g. rajesh@acme.com" value={form.directEmail} onChange={e => updateField("directEmail", e.target.value)} data-testid="input-add-email" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Phone</label>
                <Input type="tel" placeholder="e.g. +91 98765 43210" value={form.phone} onChange={e => updateField("phone", e.target.value)} data-testid="input-add-phone" />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Mobile (if different)</label>
              <Input type="tel" placeholder="e.g. +91 91234 56789" value={form.mobile} onChange={e => updateField("mobile", e.target.value)} data-testid="input-add-mobile" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Website</label>
            <Input placeholder="e.g. https://acme.com" value={form.website} onChange={e => updateField("website", e.target.value)} data-testid="input-add-website" />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Sales Notes / Pitch</label>
            <Textarea placeholder="Any notes about why this company is a good prospect, what products to pitch..." value={form.pitch} onChange={e => updateField("pitch", e.target.value)} className="min-h-[60px]" data-testid="input-add-pitch" />
          </div>

          <Button onClick={handleSubmit} disabled={createMutation.isPending} className="w-full bg-[#0ea5e9] hover:bg-[#0284c7]" data-testid="button-submit-add-lead">
            {createMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Add to CRM Pipeline
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CRM() {
  const { data: leads, isLoading } = useLeads();
  const { toast } = useToast();
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"board" | "table">("board");
  const [filterIndustry, setFilterIndustry] = useState("all");

  const crmLeads = leads?.filter(l => l.status === "Target" || l.isFavorite) || [];

  const filteredLeads = filterIndustry === "all"
    ? crmLeads
    : crmLeads.filter(l => l.industry === filterIndustry);

  const industries = [...new Set(crmLeads.map(l => l.industry))].sort();

  const totalPipeline = crmLeads
    .filter(l => l.dealStage !== "lost")
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const wonValue = crmLeads
    .filter(l => l.dealStage === "won")
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);

  const progressPercent = Math.min((wonValue / REVENUE_TARGET) * 100, 100);

  const selectedLead = leads?.find(l => l.id === selectedLeadId) || null;

  const handleSelectLead = (lead: Lead) => {
    setSelectedLeadId(lead.id);
    setDialogOpen(true);
  };

  const activeDealStages = DEAL_STAGES.filter(s => s.id !== "lost");

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-[1400px] mx-auto space-y-6">

          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-[#153e4d] mb-2 flex items-center gap-3">
                CRM Pipeline
                <span className="text-sm font-bold bg-[#0ea5e9] text-white px-3 py-1 rounded-full shadow-sm">
                  {crmLeads.length} Deals
                </span>
              </h1>
              <p className="text-slate-500">
                Track your deals from first contact to close. Manage your pipeline toward the Rs 10 Cr target.
              </p>
            </div>
            <Button onClick={() => setAddLeadOpen(true)} className="bg-[#0ea5e9] hover:bg-[#0284c7] gap-2" data-testid="button-add-lead">
              <UserPlus className="w-4 h-4" />
              Add Lead
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-medium">Won Revenue</p>
                    <p className="text-xl font-bold text-emerald-600" data-testid="text-won-revenue">{formatCurrency(wonValue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-medium">Total Pipeline</p>
                    <p className="text-xl font-bold text-blue-600" data-testid="text-total-pipeline">{formatCurrency(totalPipeline)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-medium">Active Deals</p>
                    <p className="text-xl font-bold text-purple-600" data-testid="text-active-deals">
                      {crmLeads.filter(l => l.dealStage !== "won" && l.dealStage !== "lost").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-4">
                <p className="text-xs text-slate-400 uppercase font-medium mb-2">Revenue Target: Rs 10 Cr</p>
                <Progress value={progressPercent} className="h-3 mb-1" data-testid="progress-revenue" />
                <p className="text-xs text-slate-500 text-right">{progressPercent.toFixed(1)}% achieved</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger className="w-[200px]" data-testid="select-filter-industry">
                  <Filter className="w-4 h-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map(ind => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              <Button
                variant={viewMode === "board" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("board")}
                className={cn(viewMode === "board" && "bg-[#153e4d]")}
                data-testid="button-board-view"
              >
                Board
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className={cn(viewMode === "table" && "bg-[#153e4d]")}
                data-testid="button-table-view"
              >
                Table
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[#0ea5e9]" />
            </div>
          ) : crmLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Deals in Pipeline</h3>
              <p className="text-slate-500 max-w-sm mb-6">
                Add companies from the Sales Centre or add leads manually to get started.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => setAddLeadOpen(true)} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white gap-2" data-testid="button-add-lead-empty">
                  <UserPlus className="w-4 h-4" />
                  Add Lead Manually
                </Button>
                <Button asChild variant="outline" className="border-[#153e4d] text-[#153e4d]">
                  <a href="/" data-testid="link-go-to-sales-centre">Go to Sales Centre <ChevronRight className="w-4 h-4 ml-1" /></a>
                </Button>
              </div>
            </div>
          ) : viewMode === "board" ? (
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-max">
                {activeDealStages.map(stage => (
                  <StageColumn
                    key={stage.id}
                    stage={stage}
                    leads={filteredLeads.filter(l => (l.dealStage || "new") === stage.id)}
                    onSelectLead={handleSelectLead}
                  />
                ))}
              </div>

              {filteredLeads.some(l => l.dealStage === "lost") && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-slate-500 mb-2 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    Lost ({filteredLeads.filter(l => l.dealStage === "lost").length})
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {filteredLeads.filter(l => l.dealStage === "lost").map(lead => (
                      <Badge
                        key={lead.id}
                        variant="secondary"
                        className="bg-red-50 text-red-600 cursor-pointer"
                        onClick={() => handleSelectLead(lead)}
                      >
                        {lead.company}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold">Company</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Email / Phone</TableHead>
                    <TableHead className="font-semibold">Industry</TableHead>
                    <TableHead className="font-semibold">Stage</TableHead>
                    <TableHead className="font-semibold text-right">Value (L)</TableHead>
                    <TableHead className="font-semibold">Next Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map(lead => {
                    const stage = DEAL_STAGES.find(s => s.id === (lead.dealStage || "new"));
                    return (
                      <TableRow
                        key={lead.id}
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => handleSelectLead(lead)}
                        data-testid={`crm-row-${lead.id}`}
                      >
                        <TableCell>
                          <div>
                            <p className="font-semibold text-[#153e4d]">{lead.company}</p>
                            <p className="text-xs text-slate-400">{lead.city}, {lead.region}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{lead.person}</p>
                          <p className="text-xs text-slate-400">{lead.role}</p>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs space-y-0.5">
                            {lead.directEmail && (
                              <p className="text-slate-600 truncate max-w-[160px]" title={lead.directEmail}>{lead.directEmail}</p>
                            )}
                            {lead.phone && (
                              <p className="text-slate-400">{lead.phone}</p>
                            )}
                            {!lead.directEmail && !lead.phone && (
                              <span className="text-slate-300">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs">{lead.industry}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <div className={cn("w-2 h-2 rounded-full", stage?.color)} />
                            <span className="text-sm">{stage?.label}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {lead.dealValue || 0}
                        </TableCell>
                        <TableCell>
                          {lead.nextFollowUp ? (
                            <div className="text-xs">
                              <p className="text-amber-600">{lead.nextFollowUp}</p>
                              {lead.nextAction && <p className="text-slate-400">{lead.nextAction}</p>}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-300">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      <LeadDetailDialog
        lead={selectedLead}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <AddLeadDialog
        open={addLeadOpen}
        onOpenChange={setAddLeadOpen}
      />
    </div>
  );
}
