import Link from "next/link";
import { CheckCircle2, ArrowRight, MessageCircle, Home, Phone } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";

interface SuccessPageProps {
  searchParams: {
    ref?: string;
  };
}

export const metadata = {
  title: "Enquiry Received | Shankar Timber Mart",
  description: "Thank you for contacting Shankar Timber Mart. Your material enquiry has been recorded.",
};

export default function EnquirySuccessPage({ searchParams }: SuccessPageProps) {
  const refId = searchParams.ref || `STM-${Date.now().toString().slice(-6)}`;
  const cleanNumber = SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Hello Shankar Timber Mart, I just submitted an enquiry on your website (Ref: ${refId}). Following up here.`
  )}`;

  return (
    <div className="bg-ivory min-h-[75vh] flex items-center justify-center py-16 px-6">
      <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-card border border-sand-200 shadow-luxury text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-olive-50 text-olive flex items-center justify-center mx-auto border border-olive-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-timber">
            Enquiry Successfully Transmitted
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-walnut">
            Thank You for Contacting Shankar Timber Mart.
          </h1>
        </div>

        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
          Our team has received your enquiry and will get in touch with you shortly to discuss availability, specifications, and quotation details.
        </p>

        {refId && (
          <div className="p-3 bg-ivory rounded-card border border-sand-300 text-xs text-charcoal/70 inline-block">
            <span>Reference Tracking ID: </span>
            <strong className="text-walnut font-mono">{refId}</strong>
          </div>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp Now</span>
          </a>

          <Link
            href="/products"
            className="w-full sm:w-auto py-3 px-5 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors flex items-center justify-center gap-2"
          >
            <span>Continue Browsing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="pt-6 border-t border-sand-100 text-xs text-charcoal/60 flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-timber flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span>•</span>
          <a href={`tel:${SITE_SETTINGS.phone}`} className="hover:text-timber flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" />
            <span>Call: {SITE_SETTINGS.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
