"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-card border border-sand-200 shadow-luxury space-y-6">
        <div className="text-center space-y-3">
          <div className="relative w-24 h-24 mx-auto mb-2">
            <Image
              src="/logo.png"
              alt="Shankar Timber Mart Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-walnut block">
            SHANKAR TIMBER MART
          </span>
          <p className="text-xs text-timber uppercase tracking-widest font-semibold">
            Administrative CMS Portal
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-form flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
              Admin Access Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password..."
              className="w-full px-4 py-2.5 text-sm bg-ivory-50 border border-sand-300 rounded-form focus:outline-none focus:ring-1 focus:ring-timber transition-colors"
            />
            <p className="text-[11px] text-charcoal/50 mt-1">
              Default demo credential: <code className="bg-sand-100 px-1 py-0.5 rounded text-walnut font-mono">admin123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span>{isLoading ? "Verifying..." : "Access Dashboard"}</span>
            <ArrowRight className="w-4 h-4 text-sand-300" />
          </button>
        </form>

        <div className="pt-4 border-t border-sand-100 text-center text-xs text-charcoal/60">
          <p>Restricted to authorized showroom management.</p>
        </div>
      </div>
    </div>
  );
}
