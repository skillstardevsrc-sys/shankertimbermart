"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  Phone,
  Mail,
  User,
  MapPin,
  MessageSquare,
  Sparkles,
  Printer,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { ConfiguredItem, ConfiguratorEnquirySubmission } from "@/lib/configurator/types";
import { SITE_SETTINGS } from "@/lib/constants";

interface EnquirySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ConfiguredItem[];
  onSubmissionSuccess?: (refCode: string) => void;
}

const CUSTOMER_TYPES = [
  "Homeowner",
  "Architect",
  "Interior Designer",
  "Contractor",
  "Builder",
  "Other",
];

export function EnquirySubmissionModal({
  isOpen,
  onClose,
  items,
  onSubmissionSuccess,
}: EnquirySubmissionModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [customerType, setCustomerType] = useState("Homeowner");
  const [projectLocation, setProjectLocation] = useState("Coimbatore");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [siteMeasurement, setSiteMeasurement] = useState(false);
  const [consent, setConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] = useState<{
    referenceCode: string;
    createdAt: string;
    itemsCount: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number for quotation follow-up.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ConfiguratorEnquirySubmission = {
        items,
        customer: {
          fullName,
          phone,
          email,
          customerType,
          projectLocation,
          additionalMessage,
          siteMeasurementConsultationRequested: siteMeasurement,
          consent,
        },
      };

      const res = await fetch("/api/configurator/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSubmittedResult({
        referenceCode: data.referenceCode,
        createdAt: data.createdAt,
        itemsCount: data.itemsCount,
      });

      if (onSubmissionSuccess) {
        onSubmissionSuccess(data.referenceCode);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit quotation request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp link preparation
  const cleanWhatsApp = SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappText = encodeURIComponent(
    `Hello Shankar Timber Mart, I have submitted a product configuration quotation request.\n\n` +
      `Reference: ${submittedResult?.referenceCode || ""}\n` +
      `Name: ${fullName}\n` +
      `Location: ${projectLocation}\n` +
      `Items: ${items.length} configured products (${items.map((i) => i.productTypeName).join(", ")})\n\n` +
      `Please provide estimation and availability schedule.`
  );
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${whatsappText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-walnut/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden border border-sand-300 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-ivory border-b border-sand-300 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-timber block">
              Direct Architectural Quotation
            </span>
            <h3 className="font-serif text-2xl font-semibold text-walnut mt-0.5">
              {submittedResult ? "Enquiry Submitted Successfully" : "Submit Configuration Enquiry"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-charcoal/60 hover:text-walnut hover:bg-sand-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedResult ? (
            /* Confirmation View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-olive/15 text-olive flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs uppercase font-bold tracking-widest text-timber">
                  Official Quotation Reference
                </span>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-walnut bg-sand-100 py-2 px-4 rounded-xl border border-sand-300 inline-block tracking-wider">
                  {submittedResult.referenceCode}
                </div>
                <p className="text-xs sm:text-sm text-charcoal/70 max-w-md mx-auto mt-2">
                  Thank you, <strong className="text-walnut">{fullName}</strong>. Your customisation requirement for <strong className="text-walnut">{items.length} architectural {items.length === 1 ? "product" : "products"}</strong> has been logged directly with our estimation desk.
                </p>
              </div>

              {/* Items Summary Quick Box */}
              <div className="text-left bg-ivory rounded-xl border border-sand-300 p-4 space-y-2 text-xs">
                <div className="font-semibold text-walnut uppercase tracking-wider text-[11px] pb-1 border-b border-sand-200">
                  Configured Items Included in this Enquiry:
                </div>
                {items.map((item, idx) => (
                  <div key={item.id} className="flex justify-between items-center text-charcoal/80">
                    <span>
                      {idx + 1}. {item.productTypeName} ({item.categoryName}) - {item.materialName || "Standard"}
                    </span>
                    <span className="font-semibold text-walnut font-mono">
                      {item.quantity} {item.salesUnit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-button bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Follow-up</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-button bg-white border border-sand-300 hover:bg-sand-100 text-walnut text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Printer className="w-4 h-4 text-timber" />
                  <span>Print Schedule</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-button bg-walnut text-ivory text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form View */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Summary Pill */}
              <div className="p-3.5 rounded-xl bg-sand-100 border border-sand-300 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-walnut">
                    {items.length} {items.length === 1 ? "Product" : "Products"} in Schedule:
                  </span>
                  <div className="text-charcoal/70 line-clamp-1 text-[11px] mt-0.5">
                    {items.map((i) => i.productTypeName).join(", ")}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-sand-200 text-timber font-bold text-[11px]">
                  Custom Quote
                </span>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-charcoal/40" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ar. Rajesh Kumar"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-xs text-walnut shadow-sm outline-none"
                    />
                  </div>
                </div>

                {/* Mobile Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-charcoal/40" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 94430 42244"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-xs text-walnut shadow-sm outline-none"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-charcoal/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rajesh@archstudio.in"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-xs text-walnut shadow-sm outline-none"
                    />
                  </div>
                </div>

                {/* Customer Type */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
                    I am a...
                  </label>
                  <select
                    value={customerType}
                    onChange={(e) => setCustomerType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-xs text-walnut shadow-sm outline-none cursor-pointer"
                  >
                    {CUSTOMER_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Location */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
                  Project Location / City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-charcoal/40" />
                  <input
                    type="text"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="e.g. RS Puram, Coimbatore / Tiruppur / Ooty"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-xs text-walnut shadow-sm outline-none"
                  />
                </div>
              </div>

              {/* Additional Message */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
                  Additional Message or Delivery Timeline (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  placeholder="Need estimation within 24 hours; ready for site inspection next Tuesday."
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-xs text-walnut shadow-sm outline-none resize-none"
                />
              </div>

              {/* Free site consultation checkbox */}
              <div className="p-3 rounded-xl bg-sand-100/60 border border-sand-300 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="siteConsultCheck"
                  checked={siteMeasurement}
                  onChange={(e) => setSiteMeasurement(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded text-timber focus:ring-timber border-sand-400 accent-timber cursor-pointer"
                />
                <label htmlFor="siteConsultCheck" className="text-xs text-walnut cursor-pointer select-none">
                  <span className="font-semibold block">Request Free Site Measurement Visit</span>
                  <span className="text-charcoal/70">
                    A Shankar Timber Mart technical specialist will visit to confirm door frame and window openings.
                  </span>
                </label>
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2 text-[11px] text-charcoal/70">
                <input
                  type="checkbox"
                  id="consentCheck"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded text-timber focus:ring-timber border-sand-400 accent-timber cursor-pointer"
                />
                <label htmlFor="consentCheck" className="cursor-pointer select-none">
                  I agree to receive the detailed specification quotation and material consultation via WhatsApp and phone.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-button bg-walnut hover:bg-walnut-700 text-ivory text-xs uppercase tracking-wider font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting Enquiry..." : "Submit Enquiry for Custom Quotation"}
                </button>
                <p className="text-center text-[10px] text-charcoal/50 mt-2">
                  Shankar Timber Mart • 178-C, Mettupalayam Road, Coimbatore • Official Direct Quotation
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
