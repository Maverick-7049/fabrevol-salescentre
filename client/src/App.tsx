import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Finder from "@/pages/Finder";
import Targets from "@/pages/Targets";
import Roadmap from "@/pages/Roadmap";
import CRM from "@/pages/CRM";
import Suppliers from "@/pages/Suppliers";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Finder} />
      <Route path="/targets" component={Targets} />
      <Route path="/crm" component={CRM} />
      <Route path="/suppliers" component={Suppliers} />
      <Route path="/roadmap" component={Roadmap} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthGate() {
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setAuthState(data.authenticated ? "authenticated" : "unauthenticated");
      })
      .catch(() => {
        setAuthState("unauthenticated");
      });
  }, []);

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-[#153e4d] flex items-center justify-center">
        <div className="text-white text-lg font-medium animate-pulse">Loading...</div>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <Login onLogin={() => setAuthState("authenticated")} />;
  }

  return <Router />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthGate />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
