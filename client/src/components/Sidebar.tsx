import { useLocation, Link } from "wouter";
import { 
  Database, Users, CheckCircle, Mail,
  Linkedin, Zap, BarChart3, LogOut, Package 
} from "lucide-react";
import { cn } from "@/lib/utils";
const logoPath = "/fabrevol-logo.png";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { label: "Sales Centre", icon: Database, path: "/" },
    { label: "My Targets", icon: Users, path: "/targets" },
    { label: "CRM Pipeline", icon: BarChart3, path: "/crm" },
    { label: "My Suppliers", icon: Package, path: "/suppliers" },
    { label: "Outreach", icon: Mail, path: "/roadmap" },
  ];

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
    }
    window.location.href = "/";
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[#153e4d] text-white fixed h-full inset-y-0 z-50 shadow-xl border-r border-[#1e5264]">
        {/* Header */}
        <div className="p-5 border-b border-[#1e5264]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-white/95 p-1 shadow-md shadow-black/10 shrink-0">
              <img
                src={logoPath}
                alt="Fabrevol"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight leading-none text-white">
                FABREVOL
              </h1>
              <p className="text-[11px] font-medium text-cyan-200/80 tracking-wider uppercase mt-1">
                Sales Centre
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group relative overflow-hidden",
                    isActive 
                      ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20" 
                      : "text-slate-300 hover:text-white hover:bg-[#1e5264]"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    isActive ? "scale-100" : "group-hover:scale-110"
                  )} />
                  {item.label}
                  
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
        
        {/* Capabilities Badge */}
        <div className="p-4 border-t border-[#1e5264]">
          <div className="bg-[#10303b] rounded-xl p-4 border border-[#1e5264]/50 shadow-inner">
            <p className="font-semibold text-cyan-200 text-xs mb-3 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Centre Capabilities
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Automated Web Scraping</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>LinkedIn Profile Lookup</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Verify Contact Details</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 pt-0">
          <button
            onClick={handleLogout}
            data-testid="button-logout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-[#1e5264] transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#153e4d] text-white p-2 flex justify-around z-50 border-t border-[#1e5264] shadow-2xl">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <div className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors cursor-pointer",
                isActive ? "text-[#0ea5e9]" : "text-slate-400"
              )}>
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-400 cursor-pointer" data-testid="button-logout-mobile">
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] font-medium">Sign Out</span>
        </button>
      </nav>
    </>
  );
}
