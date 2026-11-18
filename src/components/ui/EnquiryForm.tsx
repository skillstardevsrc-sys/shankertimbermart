"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { CustomerType } from "@/lib/types";

const CUSTOMER_TYPES: CustomerType[] = [
  "Homeowner",
  "Architect",
  "Interior Designer",
  "Contractor",
  "Builder",
  "Other",
];

const PRODUCT_CATEGORIES = [
  "Timber",
  "Plywood & MDF",
  "Doors",
  "WPC",
  "Windows",
  "Modular Interiors",
  "Services",
  "Other",
];

interface EnquiryFormProps {
  initialCategory?: string;
  initialProduct?: string;
  initialCustomerType?: CustomerType;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export function EnquiryForm({
  initialCategory = "Timber",
  initialProduct = "",
  initialCustomerType = "Homeowner",
  title = "Request Material Specifications & Quotation",
  subtitle = "Direct consultation with Shankar Timber Mart's technical and materials team.",
  compact = false,
  onSuccess,
}: EnquiryFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    customerType: initialCustomerType,
    productCategory: initialCategory,
    projectLocation: "",
    estimatedQuantity: "",
    requirementDescription: initialProduct
      ? `I would like to enquire about ${initialProduct}. Please share detailed specifications and bulk availability.`
      : "",
    attachmentUrl: "",
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    // Phone validation: Indian standard or international
    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, "");
    if (!cleanPhone) {
      errs.phone = "Phone number is required.";
    } else if (cleanPhone.length < 10 || cleanPhone.length > 13) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.requirementDescription.trim() || formData.requirementDescription.length < 10) {
      errs.requirementDescription = "Please provide at least a brief description of your requirements (min 10 characters).";
    }

    if (!formData.consent) {
      errs.consent = "Please agree to be contacted regarding this enquiry.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerErrorMessage("");

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmitStatus("success");
      if (onSuccess) {
        onSuccess();
      } else {
        // Redirect to success page for complete tracked experience
        setTimeout(() => {
          router.push(`/enquiry/success?ref=${data.enquiry?.id || ""}`);
        }, 800);
      }
    } catch (err: unknown) {
      setSubmitStatus("error");
      setServerErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please contact us directly via phone or WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success" && !onSuccess) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-sand-200/90 shadow-[0_12px_40px_rgb(0,0,0,0.06)] text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-olive mx-auto" />
        <h3 className="font-serif text-2xl font-medium text-walnut">
          Enquiry Transmitted
        </h3>
        <p className="text-sm text-charcoal/80 max-w-md mx-auto leading-relaxed">
          Thank you for contacting Shankar Timber Mart. Our team has received your enquiry and will get in touch with you.
        </p>
        <p className="text-xs text-charcoal/50">Redirecting to confirmation...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.05)] border border-sand-200/90 ${
        compact ? "p-6" : "p-8 md:p-10"
      } space-y-6`}
      noValidate
    >
      <div>
        <h3 className="font-serif text-2xl md:text-3xl font-medium text-walnut">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs md:text-sm text-charcoal/70 mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {serverErrorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverErrorMessage}</span>
        </div>
      )}

      {/* Row 1: Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
            Full Name <span className="text-timber">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Ar. Sundaram / Mr. Rajesh"
            className={`w-full px-4 py-3 text-sm bg-ivory-50/80 border rounded-xl focus:outline-none focus:ring-2 focus:ring-timber/30 focus:border-timber transition-all ${
              errors.fullName ? "border-red-400" : "border-sand-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
            Phone Number <span className="text-timber">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 94430 00000"
            className={`w-full px-4 py-3 text-sm bg-ivory-50/80 border rounded-xl focus:outline-none focus:ring-2 focus:ring-timber/30 focus:border-timber transition-all ${
              errors.phone ? "border-red-400" : "border-sand-300"
            }`}
          />
          {errors.phone && (
            <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email and Customer Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
            Email Address <span className="text-charcoal/40 font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@example.com"
            className={`w-full px-4 py-3 text-sm bg-ivory-50/80 border rounded-xl focus:outline-none focus:ring-2 focus:ring-timber/30 focus:border-timber transition-all ${
              errors.email ? "border-red-400" : "border-sand-300"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
            Customer Type <span className="text-timber">*</span>
          </label>
          <select
            value={formData.customerType}
            onChange={(e) => setFormData({ ...formData, customerType: e.target.value as CustomerType })}
            className="w-full px-4 py-3 text-sm bg-ivory-50/80 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-timber/30 focus:border-timber transition-all text-charcoal"
          >
            {CUSTOMER_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Product Category and Project Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
            Product Category <span className="text-timber">*</span>
          </label>
          <select
            value={formData.productCategory}
            onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
            className="w-full px-4 py-3 text-sm bg-ivory-50/80 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-timber/30 focus:border-timber transition-all text-charcoal"
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
            Project Location <span className="text-charcoal/40 font-normal">(e.g. Coimbatore, RS Puram)</span>
          </label>
          <input
            type="text"
            value={formData.projectLocation}
            onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
            placeholder="City / Area"
            className="w-full px-4 py-3 text-sm bg-ivory-50/80 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-timber/30 focus:border-timber transition-all"
          />
        </div>
      </div>

      {/* Row 4: Estimated Quantity */}
      <div>
        <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
          Estimated Quantity / Scope <span className="text-charcoal/40 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          value={formData.estimatedQuantity}
          onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
          placeholder="e.g. 50 cu ft Teak / 120 sheets BWP Plywood / 8 Bedroom Doors"
          className="w-full px-4 py-3 text-sm bg-ivory-50/80 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-timber/30 focus:border-timber transition-all"
        />
      </div>

      {/* Row 5: Requirement Description */}
      <div>
        <label className="block text-xs font-semibold text-walnut mb-1.5 uppercase tracking-wider">
          Requirement Details & Dimensions <span className="text-timber">*</span>
        </label>
        <textarea
          rows={compact ? 3 : 4}
          required
          value={formData.requirementDescription}
          onChange={(e) => setFormData({ ...formData, requirementDescription: e.target.value })}
          placeholder="Please describe your wood species, thicknesses, sizes, or interior space details..."
          className={`w-full px-4 py-3 text-sm bg-ivory-50/80 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-timber/30 focus:border-timber transition-all ${
            errors.requirementDescription ? "border-red-400" : "border-sand-300"
          }`}
        />
        {errors.requirementDescription && (
          <p className="text-[11px] text-red-500 mt-1">{errors.requirementDescription}</p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="p-3 bg-ivory-50/60 rounded-xl border border-sand-200/50">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-1 h-4 w-4 rounded-md border-sand-400 text-timber focus:ring-timber"
          />
          <span className="text-xs text-charcoal/70 leading-normal">
            I consent to Shankar Timber Mart contacting me via phone, email or WhatsApp regarding this enquiry and quotation.
          </span>
        </label>
        {errors.consent && (
          <p className="text-[11px] text-red-500 mt-1">{errors.consent}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-8 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-sand-300" />
            <span>Validating & Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-sand-300" />
            <span>Submit Material Enquiry</span>
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-charcoal/50">
        Your information is protected and used solely to fulfill your architectural inquiry.
      </p>
    </form>
  );
}
