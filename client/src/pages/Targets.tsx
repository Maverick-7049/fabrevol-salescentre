import { useState } from "react";
import { useLeads, useUpdateLead, useDeleteLead } from "@/hooks/use-leads";
import { LeadCard } from "@/components/LeadCard";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Download, Users, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@shared/schema";

export default function Targets() {
  const { data: leads, isLoading } = useLeads();
  const updateMutation = useUpdateLead();
  const deleteMutation = useDeleteLead();
  const { toast } = useToast();
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const targetLeads = leads?.filter(lead => lead.status === "Target" || lead.isFavorite) || [];

  const handleRemoveFromCRM = (lead: Lead) => {
    updateMutation.mutate({ 
      id: lead.id, 
      status: "New", 
      isFavorite: false 
    }, {
      onSuccess: () => {
        toast({
          title: "Removed from Targets",
          description: `${lead.company} has been removed from your target list but kept in the database.`,
        });
      }
    });
  };

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
    });
  };

  const exportCSV = () => {
    if (targetLeads.length === 0) return;

    const headers = "Company,Industry,Region,City,Person,Role,Phone,Website,Status\n";
    const rows = targetLeads.map(l => 
      `"${l.company}","${l.industry}","${l.region}","${l.city}","${l.person}","${l.role}","${l.phone || ''}","${l.website || ''}","${l.status}"`
    ).join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fabrevol_targets_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `Downloaded ${targetLeads.length} records to CSV.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-[#153e4d] mb-2 flex items-center gap-3">
                My Targets
                <span className="text-sm font-bold bg-[#0ea5e9] text-white px-3 py-1 rounded-full shadow-sm">
                  {targetLeads.length}
                </span>
              </h1>
              <p className="text-slate-500">
                Manage your qualified leads and export data for outreach.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={exportCSV}
                disabled={targetLeads.length === 0}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[#0ea5e9]" />
            </div>
          ) : targetLeads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {targetLeads.map((lead) => (
                  <LeadCard 
                    key={lead.id} 
                    lead={lead} 
                    onAction={handleRemoveFromCRM}
                    actionType="delete"
                    isActionPending={updateMutation.isPending}
                    onDelete={setDeletingLead}
                    isDeletePending={deleteMutation.isPending}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No Targets Yet</h3>
              <p className="text-slate-500 max-w-sm mb-8">
                Go to the Sales Centre to mine data and add potential leads to your target list.
              </p>
              <Button asChild className="bg-[#153e4d] hover:bg-[#1e5264] text-white">
                <a href="/">
                  Go to Sales Centre <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!deletingLead} onOpenChange={(open) => { if (!open) { setDeletingLead(null); setDeleteReason(""); setCustomReason(""); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dismiss Lead</DialogTitle>
            <DialogDescription>
              Why are you removing <strong>{deletingLead?.company}</strong>? This lead won't appear in your results or be re-generated by AI.
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={deleteReason} onValueChange={setDeleteReason} className="space-y-2 py-2" data-testid="radio-delete-reason-target">
            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
              <RadioGroupItem value="Not a relevant buyer" id="t-reason-1" />
              <Label htmlFor="t-reason-1" className="cursor-pointer font-normal flex-1">Not a relevant buyer</Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
              <RadioGroupItem value="Duplicate lead" id="t-reason-2" />
              <Label htmlFor="t-reason-2" className="cursor-pointer font-normal flex-1">Duplicate lead</Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
              <RadioGroupItem value="Wrong industry or region" id="t-reason-3" />
              <Label htmlFor="t-reason-3" className="cursor-pointer font-normal flex-1">Wrong industry or region</Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
              <RadioGroupItem value="Company no longer active" id="t-reason-4" />
              <Label htmlFor="t-reason-4" className="cursor-pointer font-normal flex-1">Company no longer active</Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
              <RadioGroupItem value="Already a customer" id="t-reason-5" />
              <Label htmlFor="t-reason-5" className="cursor-pointer font-normal flex-1">Already a customer</Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-slate-50 cursor-pointer">
              <RadioGroupItem value="custom" id="t-reason-6" />
              <Label htmlFor="t-reason-6" className="cursor-pointer font-normal flex-1">Other reason</Label>
            </div>
          </RadioGroup>
          {deleteReason === "custom" && (
            <Textarea
              placeholder="Tell us why you're dismissing this lead..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="mt-1"
              data-testid="input-custom-delete-reason-target"
            />
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => { setDeletingLead(null); setDeleteReason(""); setCustomReason(""); }} data-testid="button-cancel-delete-target">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteLead}
              disabled={!deleteReason || (deleteReason === "custom" && !customReason.trim()) || deleteMutation.isPending}
              data-testid="button-confirm-delete-target"
            >
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Dismiss Lead
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
