"use client";

import { useState } from "react";
import { CheckCircle2, Save, Key, Phone, MapPin, Mail, Clock } from "lucide-react";
import { SiteSettings } from "@/lib/types";

interface SettingsManagerProps {
  initialSettings: SiteSettings;
}

export function SettingsManager({ initialSettings }: SettingsManagerProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password reset state
  const [newPassword, setNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-form flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Site settings successfully updated and persisted across the website!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-8 rounded-card border border-sand-200 shadow-sm space-y-6">
        <h3 className="font-serif text-2xl font-medium text-walnut border-b border-sand-100 pb-3">
          Business Identity & Contact Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-walnut uppercase mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-walnut uppercase mb-1">
              Official Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-walnut uppercase mb-1">
            Supporting Brand Statement
          </label>
          <input
            type="text"
            value={settings.supportingStatement}
            onChange={(e) => setSettings({ ...settings, supportingStatement: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-sand-100">
          <div>
            <label className="block text-xs font-semibold text-walnut uppercase mb-1">
              Verified WhatsApp Number *
            </label>
            <input
              type="text"
              required
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              placeholder="+91 94430 42244"
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form font-mono"
            />
            <p className="text-[10px] text-charcoal/50 mt-1">Used for floating WhatsApp button and direct enquiries.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-walnut uppercase mb-1">
              Primary Showroom Phone *
            </label>
            <input
              type="text"
              required
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-walnut uppercase mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-sand-100">
          <div>
            <label className="block text-xs font-semibold text-walnut uppercase mb-1">
              Showroom Street Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-walnut uppercase mb-1">
              City, State & Pincode
            </label>
            <input
              type="text"
              value={`${settings.city}, ${settings.state} - ${settings.pincode}`}
              onChange={(e) => {
                const parts = e.target.value.split(",");
                setSettings({
                  ...settings,
                  city: parts[0]?.trim() || "Coimbatore",
                });
              }}
              className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-walnut uppercase mb-1">
            Operating Hours
          </label>
          <input
            type="text"
            value={settings.openingHours}
            onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
          />
        </div>

        <div className="pt-4 border-t border-sand-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm"
          >
            <Save className="w-4 h-4 text-sand-300" />
            <span>{isSaving ? "Saving Settings..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
