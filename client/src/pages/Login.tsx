import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, AlertCircle } from "lucide-react";

const logoPath = "/fabrevol-logo.png";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d2a36] via-[#153e4d] to-[#0d2a36] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-3 rounded-2xl bg-white/95 p-3 shadow-xl shadow-black/20">
            <img
              src={logoPath}
              alt="Fabrevol"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-cyan-200/80 text-sm font-medium tracking-wider uppercase mt-1">
            Sales Centre
          </p>
        </div>

        <Card className="border-[#1e5264] bg-[#10303b] shadow-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300 text-sm">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="username"
                    data-testid="input-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10 bg-[#0d2630] border-[#1e5264] text-white placeholder:text-slate-500 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    data-testid="input-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 bg-[#0d2630] border-[#1e5264] text-white placeholder:text-slate-500 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]/20"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg" data-testid="text-login-error">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                data-testid="button-login"
                disabled={isLoading}
                className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white font-semibold"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-slate-400/60 text-xs mt-6">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
