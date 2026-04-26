import { motion } from "framer-motion";
import { 
  Building2, MapPin, User, Globe, Plus, Trash2, Linkedin,
  ExternalLink, CheckCircle2, TrendingUp, Lightbulb, BadgeCheck, Wand2, Mail, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { type Lead } from "@shared/schema";
import { cn } from "@/lib/utils";

interface LeadCardProps {
  lead: Lead;
  onAction: (lead: Lead) => void;
  actionType: "add" | "delete";
  isActionPending?: boolean;
  onDelete?: (lead: Lead) => void;
  isDeletePending?: boolean;
}

export function LeadCard({ lead, onAction, actionType, isActionPending, onDelete, isDeletePending }: LeadCardProps) {
  const isTarget = lead.status === "Target";

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
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display font-bold text-lg text-[#153e4d] leading-tight">
                  {lead.company}
                </h3>
                {lead.isFavorite && <BadgeCheck className="w-4 h-4 text-primary fill-primary/10" />}
                {lead.source === "AI Discovery" && (
                  <Badge variant="outline" className="no-default-active-elevate text-[10px] px-1.5 py-0 border-[#153e4d]/30 text-[#153e4d]/70">
                    <Wand2 className="w-2.5 h-2.5 mr-0.5" />
                    AI
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
              <span className="text-xs text-slate-500 pl-5.5 truncate" title={lead.role}>
                {lead.role}
              </span>
              {lead.directEmail && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-5.5 truncate" title={lead.directEmail}>
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  {lead.directEmail}
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-5.5">
                  <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                  {lead.phone}
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Connect</span>
              {lead.website ? (
                <a 
                  href={lead.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline text-sm"
                >
                  <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                  Website <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-sm text-slate-400">No website</span>
              )}
              {lead.linkedin && (
                <a
                  href={lead.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline text-xs"
                >
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
              <p className="text-sm text-sky-900 leading-relaxed">
                {lead.pitch}
              </p>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(lead)}
                disabled={isDeletePending}
                className="gap-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 px-2"
                data-testid={`button-delete-lead-${lead.id}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="text-xs">Delete</span>
              </Button>
            )}
            <div className={cn("flex justify-end", !onDelete && "w-full")}>
              {actionType === "add" ? (
                <Button 
                  size="sm" 
                  onClick={() => onAction(lead)}
                  disabled={isTarget || isActionPending}
                  data-testid={`button-add-target-${lead.id}`}
                  className={cn(
                    "gap-2 transition-all duration-300",
                    isTarget 
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-none cursor-default" 
                      : "bg-[#0ea5e9] hover:bg-[#0284c7] hover:shadow-md hover:shadow-sky-200"
                  )}
                >
                  {isTarget ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Added to CRM
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Target
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onAction(lead)}
                  disabled={isActionPending}
                  data-testid={`button-remove-lead-${lead.id}`}
                  className="gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-200 shadow-none"
                >
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
