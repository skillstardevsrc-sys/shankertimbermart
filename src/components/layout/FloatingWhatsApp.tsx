"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if any studio modal or dialogue is active
  useEffect(() => {
    const checkModalState = () => {
      const hasActiveModal =
        document.body.classList.contains("studio-modal-active") ||
        document.body.classList.contains("modal-open");
      setIsModalOpen(hasActiveModal);
    };

    checkModalState();

    window.addEventListener("studio-modal-change", checkModalState);
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("studio-modal-change", checkModalState);
      observer.disconnect();
    };
  }, []);

  // If in admin dashboard or if a studio modal is active, hide floating WhatsApp
  if (pathname.startsWith("/admin") || isModalOpen) {
    return null;
  }

  const cleanNumber = SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
  const defaultText = formatWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultText}`;

  return (
    <div
      id="floating-whatsapp"
      className="floating-whatsapp-container fixed z-30 flex items-center group transition-all duration-300 bottom-6 right-6"
    >
      {/* Tooltip prompt */}
      <span className="hidden sm:inline-block mr-3 bg-walnut text-ivory text-xs py-1.5 px-3 rounded-card shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-sand-400/20">
        Chat with our Material Specialists
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Shankar Timber Mart on WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-hover hover:scale-105 transition-all duration-300 ring-4 ring-white/70"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
