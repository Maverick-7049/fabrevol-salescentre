import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  Mail, Linkedin, Copy, Check, ChevronDown, ChevronRight,
  Building2, Handshake, CalendarCheck, MessageSquare, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  title: string;
  category: "cold" | "followup" | "meeting" | "linkedin";
  industry?: string;
  subject?: string;
  body: string;
}

const TEMPLATES: Template[] = [
  {
    id: "cold-pvc",
    title: "PVC Stabilizers Introduction",
    category: "cold",
    industry: "PVC & Plastics",
    subject: "Ca-Zn Stabilizers for Your PVC Operations - Fabrevol",
    body: `Dear [Name],

I hope this finds you well. I'm reaching out from Fabrevol, suppliers of specialty PVC additives in India.

We understand that [Company] is a leading manufacturer in the PVC/Plastics space, and I wanted to introduce our Ca-Zn stabilizer range that several manufacturers in your region have adopted as a lead-free alternative.

Key benefits for your operations:
- Lead-free formulation compliant with latest BIS standards
- Excellent thermal stability for rigid and flexible PVC
- Competitive pricing with consistent supply chain

I'd welcome the opportunity to send you technical data sheets and discuss a trial order. Would a 15-minute call this week work for you?

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals
[Phone] | [Email]`
  },
  {
    id: "cold-pharma",
    title: "Pharma Grade Simethicone",
    category: "cold",
    industry: "Pharma",
    subject: "USP/EP Grade Simethicone & Antifoams - Fabrevol",
    body: `Dear [Name],

I'm writing from Fabrevol, authorized distributors for Resil's pharmaceutical-grade silicone range in India.

Given [Company]'s strong presence in formulations/API manufacturing, I wanted to introduce our Simethicone (USP/EP grade) and process antifoam range that meets FDA and WHO-GMP compliance requirements.

Our offering includes:
- Simethicone Emulsion (30% & 100% grades)
- Process antifoams for API synthesis
- Dimethicone for topical formulations
- Full regulatory documentation (DMF, CoA, stability data)

Would you be open to evaluating our products against your current supplier? We can arrange a technical presentation at your facility.

Warm regards,
[Your Name]
Fabrevol | Specialty Chemicals
[Phone] | [Email]`
  },
  {
    id: "cold-paints",
    title: "Epoxy Resins & Defoamers for Paints",
    category: "cold",
    industry: "Paints & Coatings",
    subject: "High-Performance Epoxy Resins & Defoamers - Fabrevol",
    body: `Dear [Name],

I'm reaching out from Fabrevol regarding our epoxy resin range and Resil's defoamer solutions for the coatings industry.

For [Company]'s paint manufacturing operations, we offer:
- Epoxy resins and hardeners for floor coatings & primers
- Silicone-based defoamers for water-based emulsions
- Low-VOC additives for regulatory compliance
- Silane adhesion promoters for exterior coatings

Our products are already being used by several leading paint manufacturers in the region. I'd be happy to share performance data and arrange a small trial batch.

Could we schedule a brief call to discuss your current requirements?

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals
[Phone] | [Email]`
  },
  {
    id: "cold-agri",
    title: "Spray Adjuvants for Agrochemicals",
    category: "cold",
    industry: "Agriculture",
    subject: "Organosilicone Spray Adjuvants - Fabrevol",
    body: `Dear [Name],

I'm contacting you from Fabrevol, distributors for Resil's agrochemical adjuvant range.

For [Company]'s crop protection formulations, our organosilicone spray adjuvants can significantly improve:
- Spray coverage and penetration on waxy leaves
- Rainfastness of applied formulations
- Active ingredient uptake efficiency (up to 3x improvement)

We also supply antifoam agents for pesticide manufacturing processes and silicone-based emulsifiers for EC formulations.

Would you be interested in field trial data from Indian crops? I can share performance reports from trials conducted across Maharashtra and Gujarat.

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals
[Phone] | [Email]`
  },
  {
    id: "cold-rubber",
    title: "Silicone Release Agents for Rubber",
    category: "cold",
    industry: "Rubber & Latex",
    subject: "Silicone Release Agents & Processing Aids - Fabrevol",
    body: `Dear [Name],

Reaching out from Fabrevol regarding Resil's silicone solutions for rubber and latex processing.

For [Company]'s manufacturing operations, we supply:
- Silicone release agents for mould release
- Process oils (350 cst and custom viscosities)
- Internal lubricants for rubber compounding
- Antifoams for latex processing

Our pharma-grade silicone oils are particularly relevant for medical glove and condom manufacturers requiring FDA-compliant lubricants.

I'd welcome the chance to understand your current requirements and share competitive pricing. Would next week work for a call?

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals
[Phone] | [Email]`
  },
  {
    id: "cold-generic",
    title: "General Introduction (All Industries)",
    category: "cold",
    subject: "Specialty Chemicals Partnership Opportunity - Fabrevol",
    body: `Dear [Name],

I'm reaching out from Fabrevol, suppliers of specialty chemicals across India.

As [Company] operates in the [Industry] sector, I believe our product range could add value to your manufacturing process. We supply:

- PVC stabilizers, epoxy resins, TDI, MDI
- Resil silicones, antifoams, spray adjuvants, water repellents

We work with manufacturers across 15 industries and pride ourselves on:
- Consistent supply with buffer stock availability
- Technical support for product selection
- Competitive pricing backed by strong principal relationships

I'd appreciate 15 minutes of your time to understand your chemical sourcing needs. Would this week work?

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals
[Phone] | [Email]`
  },
  {
    id: "followup-1",
    title: "First Follow-up (3 Days After)",
    category: "followup",
    subject: "Re: Quick Follow-up - [Product] for [Company]",
    body: `Dear [Name],

Just following up on my earlier email about our [Product] range for [Company].

I understand you're busy, so I'll keep this brief - I've attached a one-page product summary with specifications and pricing indicative for your reference.

If you'd prefer, I'm also happy to drop by your office/plant for a quick 10-minute introduction. No commitment needed.

Looking forward to hearing from you.

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals`
  },
  {
    id: "followup-2",
    title: "Second Follow-up (Value Add)",
    category: "followup",
    subject: "Re: Industry Insight - [Industry] Chemical Trends",
    body: `Dear [Name],

I wanted to share a quick industry insight that might be relevant to [Company].

We've been seeing several [Industry] manufacturers in [Region] switch to [specific product/technology] due to [regulatory change/cost benefit/performance improvement]. Some key data points:

- [Specific benefit 1 with numbers]
- [Specific benefit 2]
- [Regulatory compliance angle if applicable]

Happy to discuss how this trend might impact your operations and how we can help you stay ahead.

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals`
  },
  {
    id: "followup-3",
    title: "Post-Meeting Follow-up",
    category: "followup",
    subject: "Thank You - Next Steps from Our Discussion",
    body: `Dear [Name],

Thank you for taking the time to meet with me today. It was great learning about [Company]'s operations and your requirements for [specific products discussed].

As discussed, here's a summary of next steps:

1. I'll send the TDS and CoA for [Product 1] by [date]
2. We'll arrange a [trial quantity] for evaluation
3. Follow-up call scheduled for [date] to discuss trial results

Please don't hesitate to reach out if you need any additional information in the meantime.

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals`
  },
  {
    id: "meeting-request",
    title: "Meeting Request",
    category: "meeting",
    subject: "Meeting Request - Specialty Chemicals Discussion",
    body: `Dear [Name],

I hope this message finds you well. I'd like to request a brief meeting to discuss how Fabrevol's chemical solutions could support [Company]'s manufacturing operations.

Proposed agenda (15-20 minutes):
1. Quick overview of our specialty chemicals product range relevant to your industry
2. Understanding your current chemical sourcing challenges
3. Discussing a potential trial/evaluation

I'm flexible with timing and happy to visit your office or plant at your convenience. Alternatively, we could do a quick video call.

Would any of these slots work?
- [Day 1], [Time]
- [Day 2], [Time]
- [Day 3], [Time]

Looking forward to your response.

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals
[Phone] | [Email]`
  },
  {
    id: "meeting-plant-visit",
    title: "Plant Visit Request",
    category: "meeting",
    subject: "Request for Plant Visit - Technical Discussion",
    body: `Dear [Name],

Following our recent conversation, I'd like to arrange a visit to your [City] plant to better understand your manufacturing process and identify where our products can add maximum value.

During the visit, I can:
- Assess your current chemical usage and suggest optimizations
- Present product samples relevant to your specific applications
- Discuss customized solutions with our technical team

I'll ensure the visit is brief and focused - approximately 30-45 minutes. I can also bring our technical expert if you'd like a deeper discussion on formulations.

Would [Date option 1] or [Date option 2] work for your team?

Best regards,
[Your Name]
Fabrevol | Specialty Chemicals`
  },
  {
    id: "linkedin-connect",
    title: "LinkedIn Connection Request",
    category: "linkedin",
    body: `Hi [Name], I'm with Fabrevol - we supply specialty chemicals to [Industry] manufacturers across India. I noticed [Company]'s impressive work in the sector. Would love to connect and explore potential synergies. Looking forward to connecting!`
  },
  {
    id: "linkedin-intro",
    title: "LinkedIn Introduction Message",
    category: "linkedin",
    body: `Hi [Name],

Thanks for connecting! I wanted to briefly introduce what we do at Fabrevol.

We supply specialty chemicals including:
- PVC stabilizers, epoxy resins, TDI, MDI
- Resil silicones, antifoams, spray adjuvants

We work with several manufacturers in [Industry] across [Region] and I think our [specific product] could be relevant to [Company]'s operations.

Would you be open to a quick chat? Happy to share some product specs that might be useful for your team.

Best, [Your Name]`
  },
  {
    id: "linkedin-followup",
    title: "LinkedIn Follow-up Message",
    category: "linkedin",
    body: `Hi [Name],

Hope you're doing well! I wanted to follow up on my earlier message.

I recently helped a [Industry] manufacturer in [Region] reduce their [specific cost/improve specific metric] by switching to our [Product]. 

Thought this might be relevant for [Company] as well. Happy to share the details if you're interested.

Best, [Your Name]`
  },
  {
    id: "linkedin-referral",
    title: "LinkedIn Referral Request",
    category: "linkedin",
    body: `Hi [Name],

Thanks for our recent conversation about [topic]. Really appreciate your time.

I'm looking to connect with the right person at [Company] who handles procurement of specialty chemicals / raw materials. Would you be able to introduce me to your purchase head or technical team?

Happy to return the favor if there's anyone in my network you'd like an introduction to.

Thanks, [Your Name]`
  },
];

const CATEGORIES = [
  { id: "cold", label: "Cold Outreach", icon: Send, description: "First contact emails tailored by industry" },
  { id: "followup", label: "Follow-ups", icon: MessageSquare, description: "Nurture sequences after initial contact" },
  { id: "meeting", label: "Meeting Requests", icon: CalendarCheck, description: "Schedule plant visits and discussions" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, description: "Connection requests and messages" },
] as const;

function TemplateCard({ template }: { template: Template }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied!", description: `${type} copied to clipboard.` });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border border-slate-200 bg-white" data-testid={`template-card-${template.id}`}>
      <CardHeader className="pb-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-[#153e4d]">{template.title}</h3>
            {template.industry && (
              <Badge variant="secondary" className="mt-1 text-[10px] bg-sky-50 text-sky-700 border-sky-200">
                {template.industry}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-3">
          {template.subject && (
            <div className="flex items-center justify-between gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
              <div className="min-w-0">
                <span className="text-[10px] uppercase text-slate-400 font-medium block">Subject Line</span>
                <p className="text-sm text-slate-700 truncate">{template.subject}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(template.subject!, "Subject line")}
                data-testid={`button-copy-subject-${template.id}`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              </Button>
            </div>
          )}

          <div className="relative">
            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed bg-slate-50 rounded-lg p-4 border border-slate-100 max-h-[300px] overflow-y-auto">
              {template.body}
            </pre>
            <Button
              size="sm"
              className="absolute top-2 right-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white gap-1.5"
              onClick={() => handleCopy(template.body, "Template")}
              data-testid={`button-copy-body-${template.id}`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function Roadmap() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto space-y-6">

          <header>
            <h1 className="text-3xl font-display font-bold text-[#153e4d] mb-2 flex items-center gap-3">
              Outreach Templates
              <Badge variant="secondary" className="text-xs bg-sky-50 text-sky-700 border-sky-200">
                {TEMPLATES.length} Templates
              </Badge>
            </h1>
            <p className="text-slate-500 max-w-2xl">
              Ready-to-use email and LinkedIn templates for reaching out to prospects. 
              Customize the placeholders in [brackets] before sending.
            </p>
          </header>

          <Tabs defaultValue="cold" className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-slate-100 h-auto" data-testid="template-tabs">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                return (
                  <TabsTrigger key={cat.id} value={cat.id} className="flex flex-col gap-1 py-3" data-testid={`tab-${cat.id}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium hidden sm:block">{cat.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {CATEGORIES.map(cat => (
              <TabsContent key={cat.id} value={cat.id} className="mt-4 space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <cat.icon className="w-5 h-5 text-[#0ea5e9]" />
                  <div>
                    <h2 className="font-semibold text-[#153e4d]">{cat.label}</h2>
                    <p className="text-xs text-slate-400">{cat.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {TEMPLATES.filter(t => t.category === cat.id).map(template => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

        </div>
      </main>
    </div>
  );
}
