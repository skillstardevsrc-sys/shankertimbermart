"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Ruler,
  Truck,
  MessageSquare,
  X,
  CheckCircle2,
  ChevronRight,
  RotateCw,
  Search,
  ZoomIn,
  ZoomOut,
  Eye,
  Layers,
} from "lucide-react";
import {
  PRODUCT_TYPES_LIST,
  WOOD_SPECIES_LIST,
  DESIGN_STYLES,
  FINISH_OPTIONS,
  HARDWARE_ACCENTS,
  ProductType,
  WoodSpecies,
  DesignStyle,
  DimensionOption,
  FinishOption,
  HardwareAccent,
} from "@/lib/data/customizerData";
import { SITE_SETTINGS } from "@/lib/constants";

export function HeroProductCustomizer() {
  // Studio Modal State (Triggered from Hero Hook)
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Active Wizard Step inside the Full Studio: 1 to 5
  const [activeStep, setActiveStep] = useState<number>(1);

  // Active configurations
  const [selectedProduct, setSelectedProduct] = useState<ProductType>(PRODUCT_TYPES_LIST[0]);
  const [selectedWood, setSelectedWood] = useState<WoodSpecies>(WOOD_SPECIES_LIST[0]);
  const [selectedDesign, setSelectedDesign] = useState<DesignStyle>(selectedProduct.designs[0] || DESIGN_STYLES[0]);
  const [selectedDimension, setSelectedDimension] = useState<DimensionOption>(selectedProduct.dimensions[0]);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISH_OPTIONS[0]);
  const [selectedHardware, setSelectedHardware] = useState<HardwareAccent>(HARDWARE_ACCENTS[0]);

  // Dimension customization
  const [isCustomDimension, setIsCustomDimension] = useState(false);
  const [customWidth, setCustomWidth] = useState(4.0);
  const [customHeight, setCustomHeight] = useState(8.0);
  const [customThickness, setCustomThickness] = useState(45);

  // Perspective views: 'front' | 'macro' | 'room'
  const [viewAngle, setViewAngle] = useState<"front" | "macro" | "room">("front");

  // INTERACTIVE INSPECTION LENS / MAGNIFIER STATE
  const [isLensActive, setIsLensActive] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(2.5); // 2.5x magnification
  const [lensPos, setLensPos] = useState<{ x: number; y: number; show: boolean; bgX: number; bgY: number }>({
    x: 0,
    y: 0,
    show: false,
    bgX: 0,
    bgY: 0,
  });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Direct Order Submission states
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Customer checkout form
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerLocation, setCustomerLocation] = useState("Coimbatore, Tamil Nadu");
  const [customerNotes, setCustomerNotes] = useState("");
  const [formError, setFormError] = useState("");

  // Lock body scroll when any modal is open & handle Escape key
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showOrderModal) {
          setShowOrderModal(false);
        } else if (isStudioOpen) {
          setIsStudioOpen(false);
        }
      }
    };

    if (isStudioOpen || showOrderModal) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("studio-modal-active");
      window.dispatchEvent(new Event("studio-modal-change"));
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("studio-modal-active");
      window.dispatchEvent(new Event("studio-modal-change"));
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("studio-modal-active");
      window.dispatchEvent(new Event("studio-modal-change"));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStudioOpen, showOrderModal]);

  // Product selection handler
  const handleProductSelect = (prod: ProductType) => {
    setSelectedProduct(prod);
    if (prod.designs.length > 0) setSelectedDesign(prod.designs[0]);
    if (prod.dimensions.length > 0) {
      setSelectedDimension(prod.dimensions[0]);
      setIsCustomDimension(false);
    }
  };

  // Pricing calculation
  const pricing = useMemo(() => {
    const base = selectedProduct.basePrice;
    const woodMult = selectedWood.multiplier;
    const dimMult = isCustomDimension
      ? (customWidth * customHeight) / 28
      : selectedDimension.multiplier;
    const designExtra = selectedDesign ? selectedDesign.priceExtra : 0;
    const finishExtra = selectedFinish.priceExtra;

    const calculatedBase = Math.round(base * woodMult * dimMult + designExtra + finishExtra);
    const roundedPrice = Math.round(calculatedBase / 500) * 500;
    const gst = Math.round(roundedPrice * 0.18);
    const totalPrice = roundedPrice + gst;

    return {
      subtotal: roundedPrice,
      gst,
      total: totalPrice,
    };
  }, [selectedProduct, selectedWood, selectedDesign, selectedDimension, selectedFinish, isCustomDimension, customWidth, customHeight]);

  // Current visual preview image
  const currentPreviewImage = useMemo(() => {
    if (viewAngle === "macro") {
      return selectedWood.textureImage || selectedProduct.previewAngleImages.macro;
    }
    if (viewAngle === "room") {
      return selectedProduct.previewAngleImages.room;
    }
    if (selectedProduct.woodSpecificPreviews && selectedProduct.woodSpecificPreviews[selectedWood.id]) {
      return selectedProduct.woodSpecificPreviews[selectedWood.id].front;
    }
    if (selectedDesign && selectedDesign.previewImage) {
      return selectedDesign.previewImage;
    }
    return selectedProduct.previewAngleImages.front;
  }, [viewAngle, selectedProduct, selectedWood, selectedDesign]);

  // Handle Inspection Lens Mouse Move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isLensActive || !imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        setLensPos((prev) => ({ ...prev, show: false }));
        return;
      }

      const lensSize = 130;
      const bgX = -(x * zoomLevel - lensSize / 2);
      const bgY = -(y * zoomLevel - lensSize / 2);

      setLensPos({
        x: x - lensSize / 2,
        y: y - lensSize / 2,
        show: true,
        bgX,
        bgY,
      });
    },
    [isLensActive, zoomLevel]
  );

  const handleMouseLeave = () => {
    setLensPos((prev) => ({ ...prev, show: false }));
  };

  // WhatsApp order link
  const whatsappUrl = useMemo(() => {
    const sizeText = isCustomDimension
      ? `${customHeight}ft (H) × ${customWidth}ft (W) × ${customThickness}mm`
      : `${selectedDimension.name} (${selectedDimension.tagline})`;

    const message = `*Custom Order Configuration from Shankar Timber Mart*
----------------------------------------
*Product:* ${selectedProduct.name} (${selectedProduct.tamilName})
*Wood Species:* ${selectedWood.name} (${selectedWood.tamilName})
*Carving / Design:* ${selectedDesign.name}
*Dimensions:* ${sizeText}
*Finish:* ${selectedFinish.name} (${selectedFinish.sheenLevel})
*Hardware Accent:* ${selectedHardware.name}
----------------------------------------
*Estimated Total:* ₹${pricing.total.toLocaleString("en-IN")} (incl. 18% GST)
*Timber Guarantee:* ${selectedWood.warrantyYears}-Year Warranty (${selectedWood.durabilityRating})
*Delivery Location:* ${customerLocation || "Coimbatore, Tamil Nadu"}

Please confirm timber stock and arrange a master craftsman site inspection.`;

    const encoded = encodeURIComponent(message);
    const rawPhone = SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${rawPhone}?text=${encoded}`;
  }, [selectedProduct, selectedWood, selectedDesign, selectedDimension, selectedFinish, selectedHardware, isCustomDimension, customHeight, customWidth, customThickness, pricing, customerLocation]);

  // Submit direct order to backend
  const handleDirectOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!customerName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOrderSubmitting(true);
    try {
      const sizeText = isCustomDimension
        ? `${customHeight}ft x ${customWidth}ft x ${customThickness}mm`
        : `${selectedDimension.name} (${selectedDimension.tagline})`;

      const payload = {
        fullName: customerName.trim(),
        phone: customerPhone.trim(),
        email: "",
        customerType: "Homeowner",
        productCategory: selectedProduct.category === "doors" ? "Doors & WPC" : "Timber",
        projectLocation: customerLocation,
        estimatedQuantity: `1 Custom ${selectedProduct.name}`,
        requirementDescription: `[BESPOKE STUDIO ORDER]: ${selectedProduct.name} in ${selectedWood.name} with ${selectedDesign.name}. Size: ${sizeText}. Finish: ${selectedFinish.name}. Hardware: ${selectedHardware.name}. Estimated Price: ₹${pricing.total.toLocaleString("en-IN")}. Customer Notes: ${customerNotes}`,
        consent: true,
      };

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrderSuccess(true);
      } else {
        setFormError(data.error || "Failed to submit custom order. Please order via WhatsApp.");
      }
    } catch {
      setFormError("Network error. Please order directly via WhatsApp.");
    } finally {
      setOrderSubmitting(false);
    }
  };

  const stepTitles = [
    "PRODUCT TYPE",
    "WOOD SPECIES",
    "CARVING & STYLE",
    "DIMENSIONS",
    "FINISH & ORDER",
  ];

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO RIGHT-SIDE HOOK CARD (Compact, Clean, High-Conversion)*/}
      {/* ============================================================ */}
      <div className="relative w-full rounded-3xl bg-walnut-950/90 border border-sand-400/35 backdrop-blur-xl shadow-2xl p-4 sm:p-5 group transition-all duration-300 hover:border-sand-400/60">
        {/* Hook Card Top Bar */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-timber/25 border border-timber/50 text-sand-300 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-timber" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-sand-300 font-semibold block">
                Bespoke Studio 2026
              </span>
              <span className="text-xs text-ivory/70">
                Interactive Configurator & 3D Lens
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Preview
          </span>
        </div>

        {/* Visual Showcase Teaser in the Hook */}
        <div className="my-2.5 rounded-2xl overflow-hidden bg-black border border-white/15 h-48 sm:h-56 relative group-hover:border-sand-400/50 transition-all duration-500">
          <Image
            src={currentPreviewImage}
            alt={`${selectedProduct.name} in ${selectedWood.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>

        {/* Clean Spec Bar Below the Image */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 mb-2.5 text-xs">
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/40 flex-shrink-0"
                style={{ backgroundColor: selectedWood.colorHex }}
              />
              <span className="font-serif font-bold text-ivory truncate text-xs">
                {selectedProduct.name}
              </span>
            </div>
            <span className="text-[10px] text-sand-300 font-medium block truncate mt-0.5">
              {selectedWood.name} ({selectedWood.tamilName})
            </span>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-[9px] text-ivory/50 uppercase tracking-wider block">Est. Price</span>
            <span className="text-sm font-serif font-bold text-amber-300">
              ₹{pricing.total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Quick Wood Texture Swatches in the Hook */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-ivory/70 mb-1.5">
            <span className="text-[10px] uppercase tracking-wider text-sand-300 font-semibold">
              Select Wood to Preview:
            </span>
            <span className="text-[10px] font-mono text-ivory/50">8 Species</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {WOOD_SPECIES_LIST.slice(0, 4).map((wood) => {
              const isSelected = selectedWood.id === wood.id;
              return (
                <button
                  key={wood.id}
                  onClick={() => setSelectedWood(wood)}
                  className={`group/btn relative text-left p-1 rounded-xl border transition-all overflow-hidden ${
                    isSelected
                      ? "bg-sand-400/25 border-sand-400 text-ivory shadow-glow ring-1 ring-sand-400 scale-105"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-ivory/75"
                  }`}
                  title={`${wood.name} (${wood.tamilName})`}
                >
                  <div className="relative w-full h-7 rounded-lg overflow-hidden mb-0.5">
                    <Image
                      src={wood.textureImage}
                      alt={wood.name}
                      fill
                      sizes="60px"
                      className="object-cover group-hover/btn:scale-110 transition-transform"
                    />
                    {isSelected && (
                      <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-sand-300 text-walnut flex items-center justify-center font-bold text-[8px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-serif font-semibold block leading-tight truncate">
                    {wood.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PRIMARY CTA */}
        <button
          onClick={() => setIsStudioOpen(true)}
          className="w-full bg-gradient-to-r from-timber to-timber-600 hover:from-timber-600 hover:to-amber-600 text-ivory text-xs uppercase tracking-widest font-bold py-3 px-5 rounded-2xl shadow-hover transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] border border-amber-400/40"
        >
          <Search className="w-3.5 h-3.5 text-amber-200" />
          <span>Launch 3D Studio & Inspect with Lens</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/* 2. DYNAMIC FULL-SCREEN BESPOKE STUDIO (100% FRAMED, NO SCROLL)*/}
      {/* ============================================================ */}
      {isStudioOpen && mounted && typeof document !== "undefined" ? createPortal(
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsStudioOpen(false);
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-6xl max-h-[94vh] rounded-2xl bg-walnut-950 border border-sand-400/40 shadow-2xl flex flex-col overflow-hidden text-ivory">
            {/* Studio Top Control Bar (Slim & Non-Clipping) */}
            <div className="flex-shrink-0 px-4 py-2.5 border-b border-white/10 flex items-center justify-between gap-3 bg-walnut-900/90">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-timber/20 border border-timber/40 text-timber flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-sm sm:text-base font-bold text-sand-200 leading-tight">
                      Bespoke Timber Studio & 3D Lens Inspection
                    </h2>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                      ● Active Configurator
                    </span>
                  </div>
                  <p className="text-[10px] text-ivory/60 leading-none mt-0.5">
                    Precision Wood Grain & Carving Lens • Real-time Instant Pricing
                  </p>
                </div>
              </div>

              {/* Top Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-xl transition-all items-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-3 h-3 fill-white text-transparent" />
                  <span>WhatsApp Quote</span>
                </a>

                <button
                  onClick={() => setShowOrderModal(true)}
                  className="bg-timber hover:bg-timber-600 text-ivory text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-xl transition-all shadow-hover"
                >
                  <span>Order Piece</span>
                </button>

                <button
                  onClick={() => setIsStudioOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-ivory transition-colors"
                  aria-label="Close Studio"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Studio Main Workspace: 2-Column Responsive Split */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              {/* -------------------------------------------------------- */}
              {/* LEFT CANVAS: Clean Visual Stage with Precision Lens      */}
              {/* -------------------------------------------------------- */}
              <div className="lg:col-span-6 flex flex-col justify-between p-3 sm:p-4 bg-gradient-to-b from-[#180f0a] via-[#100804] to-[#0a0503] border-b lg:border-b-0 lg:border-r border-white/10">
                {/* Top Controls Bar: View Modes & Lens Zoom */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10 text-xs">
                  {/* Perspective Toggle */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-white/10 text-[11px]">
                    <button
                      onClick={() => setViewAngle("front")}
                      className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                        viewAngle === "front"
                          ? "bg-sand-400/30 text-sand-200 border border-sand-400/40 font-semibold"
                          : "text-ivory/70 hover:text-ivory"
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Front</span>
                    </button>

                    <button
                      onClick={() => setViewAngle("macro")}
                      className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                        viewAngle === "macro"
                          ? "bg-sand-400/30 text-sand-200 border border-sand-400/40 font-semibold"
                          : "text-ivory/70 hover:text-ivory"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Texture</span>
                    </button>

                    <button
                      onClick={() => setViewAngle("room")}
                      className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                        viewAngle === "room"
                          ? "bg-sand-400/30 text-sand-200 border border-sand-400/40 font-semibold"
                          : "text-ivory/70 hover:text-ivory"
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Villa</span>
                    </button>
                  </div>

                  {/* LENS TOGGLE & ZOOM */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsLensActive(!isLensActive)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                        isLensActive
                          ? "bg-amber-500/25 border-amber-400 text-amber-200 shadow-glow"
                          : "bg-white/5 border-white/10 text-ivory/60 hover:text-ivory"
                      }`}
                    >
                      <Search className="w-3 h-3" />
                      <span>Lens: {isLensActive ? "ON" : "OFF"}</span>
                    </button>

                    {isLensActive && (
                      <div className="flex items-center gap-0.5 bg-black/40 border border-white/10 p-0.5 rounded text-[10px] font-mono">
                        <button
                          onClick={() => setZoomLevel((z) => Math.max(1.8, z - 0.5))}
                          className="px-1 hover:bg-white/10 rounded text-ivory/80"
                          title="Zoom Out"
                        >
                          <ZoomOut className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-sand-300 px-0.5">{zoomLevel.toFixed(1)}x</span>
                        <button
                          onClick={() => setZoomLevel((z) => Math.min(3.5, z + 0.5))}
                          className="px-1 hover:bg-white/10 rounded text-ivory/80"
                          title="Zoom In"
                        >
                          <ZoomIn className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dimension Info Strip (Cleanly placed ABOVE the image) */}
                <div className="py-1.5 flex items-center justify-between text-[11px] text-ivory/70 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sand-300 font-semibold">Dimensions:</span>
                    <span>
                      {isCustomDimension
                        ? `${customHeight}ft (H) × ${customWidth}ft (W) • ${customThickness}mm`
                        : `${selectedDimension.name} (${selectedDimension.tagline})`}
                    </span>
                  </div>
                  <span className="text-emerald-400">
                    {isCustomDimension
                      ? `${(customWidth * customHeight).toFixed(1)} Sq.Ft`
                      : `${selectedDimension.baseSqFt} Sq.Ft`}
                  </span>
                </div>

                {/* THE 100% UNMASKED PRODUCT IMAGE (NO COVERS, NO MASKS) */}
                <div className="relative my-auto flex items-center justify-center py-1">
                  <div
                    ref={imageContainerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative w-full max-w-md h-[270px] sm:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden border border-sand-400/30 bg-black shadow-2xl cursor-crosshair group/stage"
                  >
                    <Image
                      src={currentPreviewImage}
                      alt={selectedProduct.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-opacity duration-300"
                      priority
                    />

                    {/* THE MAGNIFYING INSPECTION LENS CIRCLE */}
                    {isLensActive && lensPos.show && (
                      <div
                        className="absolute w-[130px] h-[130px] rounded-full border-2 border-amber-300 shadow-[0_0_25px_rgba(200,138,62,0.7)] pointer-events-none z-30 overflow-hidden bg-no-repeat"
                        style={{
                          left: `${lensPos.x}px`,
                          top: `${lensPos.y}px`,
                          backgroundImage: `url(${currentPreviewImage})`,
                          backgroundPosition: `${lensPos.bgX}px ${lensPos.bgY}px`,
                          backgroundSize: `${(imageContainerRef.current?.clientWidth || 380) * zoomLevel}px ${(imageContainerRef.current?.clientHeight || 300) * zoomLevel}px`,
                        }}
                      >
                        <div className="absolute inset-0 border border-white/40 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-amber-400/90 pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Specs Info Strip (Cleanly placed BELOW the image) */}
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/40 flex-shrink-0"
                      style={{ backgroundColor: selectedWood.colorHex }}
                    />
                    <span className="font-serif font-bold text-sand-200 text-xs">
                      {selectedWood.name} ({selectedWood.tamilName})
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">• {selectedWood.warrantyYears}y Guarantee</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-ivory/50 uppercase">Est. Total: </span>
                    <span className="text-base sm:text-lg font-serif font-bold text-amber-300">
                      ₹{pricing.total.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-emerald-400 ml-1 font-mono">(GST Inc.)</span>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------- */}
              {/* RIGHT CONTROLS: 100% FRAMED COMPACT GRID (NO SCROLLBAR) */}
              {/* -------------------------------------------------------- */}
              <div className="lg:col-span-6 flex flex-col justify-between p-3 sm:p-4 bg-walnut-900/90 overflow-hidden">
                {/* Stepper Header (Fixed Height, No Clipping) */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-sand-300 font-bold">
                        Step {activeStep} of 5:
                      </span>
                      <span className="text-xs font-semibold text-timber uppercase tracking-wider">
                        {stepTitles[activeStep - 1]}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <button
                          key={step}
                          onClick={() => setActiveStep(step)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            activeStep === step
                              ? "w-5 bg-sand-300 shadow-glow"
                              : activeStep > step
                              ? "w-2.5 bg-timber"
                              : "w-2 bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-ivory/60 mt-1.5 leading-tight">
                    {activeStep === 1 && "Select the architectural product to customize:"}
                    {activeStep === 2 && "Click any wood species to inspect natural grain under the lens:"}
                    {activeStep === 3 && "Choose architectural carvings or contemporary CNC patterns:"}
                    {activeStep === 4 && "Choose architectural dimensions or adjust custom sliders:"}
                    {activeStep === 5 && "Select surface protective finish and metal hardware accents:"}
                  </p>
                </div>

                {/* STEP CONTENT: 100% FRAMED (NO VERTICAL SCROLLBAR!) */}
                <div className="my-auto py-2">
                  {/* STEP 1: Product Types (3 Columns × 2 Rows = All 6 fit cleanly!) */}
                  {activeStep === 1 && (
                    <div className="grid grid-cols-3 gap-2">
                      {PRODUCT_TYPES_LIST.map((prod) => {
                        const isSelected = selectedProduct.id === prod.id;
                        return (
                          <button
                            key={prod.id}
                            onClick={() => handleProductSelect(prod)}
                            className={`text-left p-1.5 rounded-xl border transition-all flex flex-col justify-between ${
                              isSelected
                                ? "bg-sand-400/20 border-sand-400 text-ivory ring-1 ring-sand-400 shadow-glow"
                                : "bg-white/5 border-white/10 hover:bg-white/10 text-ivory/80"
                            }`}
                          >
                            <div className="relative w-full h-14 rounded-lg overflow-hidden mb-1">
                              <Image
                                src={prod.previewAngleImages.front}
                                alt={prod.name}
                                fill
                                sizes="120px"
                                className="object-cover"
                              />
                              {isSelected && (
                                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-sand-300 text-walnut flex items-center justify-center font-bold text-[10px]">
                                  ✓
                                </span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-serif text-[11px] font-semibold text-ivory leading-tight truncate">
                                {prod.name}
                              </h4>
                              <span className="text-[9px] text-sand-300/80 block mt-0.5 truncate">
                                {prod.tamilName}
                              </span>
                              <span className="text-[9px] text-emerald-400 font-mono block mt-0.5">
                                From ₹{prod.basePrice.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 2: Wood Species (4 Columns × 2 Rows = All 8 fit cleanly!) */}
                  {activeStep === 2 && (
                    <div className="grid grid-cols-4 gap-2">
                      {WOOD_SPECIES_LIST.map((wood) => {
                        const isSelected = selectedWood.id === wood.id;
                        return (
                          <button
                            key={wood.id}
                            onClick={() => setSelectedWood(wood)}
                            className={`text-left p-1.5 rounded-xl border transition-all flex flex-col justify-between ${
                              isSelected
                                ? "bg-sand-400/20 border-sand-400 text-ivory ring-1 ring-sand-400 shadow-glow"
                                : "bg-white/5 border-white/10 hover:bg-white/10 text-ivory/80"
                            }`}
                          >
                            <div className="relative w-full h-12 rounded-lg overflow-hidden mb-1">
                              <Image
                                src={wood.textureImage}
                                alt={wood.name}
                                fill
                                sizes="100px"
                                className="object-cover"
                              />
                              {isSelected && (
                                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-sand-300 text-walnut flex items-center justify-center font-bold text-[9px]">
                                  ✓
                                </span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-serif text-[10px] font-semibold text-ivory leading-tight truncate">
                                {wood.name.split(" ")[0]} {wood.name.split(" ")[1] || ""}
                              </h4>
                              <span className="text-[9px] text-sand-300 font-medium block truncate">
                                {wood.tamilName.split(" ")[0]}
                              </span>
                              <span className="text-[9px] text-emerald-400 font-mono block truncate mt-0.5">
                                🛡️ {wood.warrantyYears}y
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 3: Designs & Carvings (3 Columns × 2 Rows = All 6 fit cleanly!) */}
                  {activeStep === 3 && (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProduct.designs.map((design) => {
                        const isSelected = selectedDesign?.id === design.id;
                        return (
                          <button
                            key={design.id}
                            onClick={() => setSelectedDesign(design)}
                            className={`text-left p-1.5 rounded-xl border transition-all flex flex-col justify-between ${
                              isSelected
                                ? "bg-sand-400/20 border-sand-400 text-ivory ring-1 ring-sand-400 shadow-glow"
                                : "bg-white/5 border-white/10 hover:bg-white/10 text-ivory/80"
                            }`}
                          >
                            <div className="relative w-full h-14 rounded-lg overflow-hidden mb-1">
                              <Image
                                src={design.previewImage}
                                alt={design.name}
                                fill
                                sizes="120px"
                                className="object-cover"
                              />
                              {isSelected && (
                                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-sand-300 text-walnut flex items-center justify-center font-bold text-[10px]">
                                  ✓
                                </span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-serif text-[11px] font-semibold text-ivory leading-tight truncate">
                                {design.name}
                              </h4>
                              <span className="text-[9px] text-sand-300 block truncate mt-0.5">
                                {design.tamilName}
                              </span>
                              <span className="text-[9px] text-emerald-400 font-mono block mt-0.5">
                                {design.priceExtra > 0 ? `+₹${design.priceExtra.toLocaleString("en-IN")}` : "Included"}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 4: Proportions & Dimensions (Compact Sizing Grid or Inline Sliders) */}
                  {activeStep === 4 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
                        <span className="text-ivory/80 text-[11px]">Sizing Mode:</span>
                        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/10 text-[10px]">
                          <button
                            onClick={() => setIsCustomDimension(false)}
                            className={`px-2.5 py-0.5 rounded transition-all ${
                              !isCustomDimension ? "bg-sand-400/30 text-sand-200 font-bold" : "text-ivory/60"
                            }`}
                          >
                            Standard
                          </button>
                          <button
                            onClick={() => setIsCustomDimension(true)}
                            className={`px-2.5 py-0.5 rounded transition-all ${
                              isCustomDimension ? "bg-sand-400/30 text-sand-200 font-bold" : "text-ivory/60"
                            }`}
                          >
                            Custom Sliders
                          </button>
                        </div>
                      </div>

                      {!isCustomDimension ? (
                        <div className="grid grid-cols-2 gap-2">
                          {selectedProduct.dimensions.map((dim) => {
                            const isSelected = selectedDimension.id === dim.id;
                            return (
                              <button
                                key={dim.id}
                                onClick={() => setSelectedDimension(dim)}
                                className={`text-left p-2 rounded-xl border transition-all flex flex-col justify-between ${
                                  isSelected
                                    ? "bg-sand-400/20 border-sand-400 text-ivory ring-1 ring-sand-400"
                                    : "bg-white/5 border-white/10 hover:bg-white/10 text-ivory/80"
                                }`}
                              >
                                <div>
                                  <h5 className="font-serif text-xs font-semibold text-ivory truncate">{dim.name}</h5>
                                  <span className="text-[10px] text-sand-300 font-mono mt-0.5 block truncate">{dim.tagline}</span>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-sand-200 mt-1 block">{dim.baseSqFt} Sq.Ft</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-2 p-2.5 rounded-xl bg-black/30 border border-white/10 text-xs">
                          <div>
                            <div className="flex justify-between mb-0.5 font-mono text-[11px]">
                              <span className="text-ivory/70">Height (Feet):</span>
                              <span className="text-sand-300 font-bold">{customHeight} ft</span>
                            </div>
                            <input
                              type="range"
                              min="5.0"
                              max="11.0"
                              step="0.5"
                              value={customHeight}
                              onChange={(e) => setCustomHeight(parseFloat(e.target.value))}
                              className="w-full accent-amber-500 cursor-pointer h-1"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-0.5 font-mono text-[11px]">
                              <span className="text-ivory/70">Width (Feet):</span>
                              <span className="text-sand-300 font-bold">{customWidth} ft</span>
                            </div>
                            <input
                              type="range"
                              min="2.5"
                              max="8.0"
                              step="0.5"
                              value={customWidth}
                              onChange={(e) => setCustomWidth(parseFloat(e.target.value))}
                              className="w-full accent-amber-500 cursor-pointer h-1"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-0.5 font-mono text-[11px]">
                              <span className="text-ivory/70">Thickness (mm):</span>
                              <span className="text-sand-300 font-bold">{customThickness} mm</span>
                            </div>
                            <input
                              type="range"
                              min="30"
                              max="75"
                              step="5"
                              value={customThickness}
                              onChange={(e) => setCustomThickness(parseInt(e.target.value))}
                              className="w-full accent-amber-500 cursor-pointer h-1"
                            />
                          </div>

                          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex justify-between font-mono text-sand-300 text-[11px]">
                            <span>Total Surface Area:</span>
                            <span className="font-bold">{(customWidth * customHeight).toFixed(1)} Sq.Ft</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 5: Finishes & Hardware (Clean 2x2 + 4 Chips) */}
                  {activeStep === 5 && (
                    <div className="space-y-2">
                      <span className="text-[10px] text-ivory/60 uppercase tracking-widest block font-medium">
                        1. Protective Finish Sheen
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {FINISH_OPTIONS.map((fin) => {
                          const isSelected = selectedFinish.id === fin.id;
                          return (
                            <button
                              key={fin.id}
                              onClick={() => setSelectedFinish(fin)}
                              className={`text-left p-2 rounded-xl border transition-all ${
                                isSelected
                                  ? "bg-sand-400/20 border-sand-400 text-ivory ring-1 ring-sand-400"
                                  : "bg-white/5 border-white/10 hover:bg-white/10 text-ivory/80"
                              }`}
                            >
                              <h6 className="font-serif text-xs font-semibold text-ivory truncate">{fin.name}</h6>
                              <span className="text-[9px] text-sand-300 font-mono block mt-0.5">{fin.sheenLevel}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-1.5 border-t border-white/10">
                        <span className="text-[10px] text-ivory/60 uppercase tracking-widest block font-medium mb-1">
                          2. Hardware & Inlay Metal Trim
                        </span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {HARDWARE_ACCENTS.map((hw) => {
                            const isSelected = selectedHardware.id === hw.id;
                            return (
                              <button
                                key={hw.id}
                                onClick={() => setSelectedHardware(hw)}
                                className={`p-1.5 rounded-xl border text-center transition-all flex flex-col items-center ${
                                  isSelected
                                    ? "bg-sand-400/20 border-sand-400 text-ivory"
                                    : "bg-white/5 border-white/10 text-ivory/65"
                                }`}
                              >
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-white/30 mb-0.5"
                                  style={{ backgroundColor: hw.colorHex }}
                                />
                                <span className="text-[9px] font-medium truncate w-full">{hw.name.split(" ")[0]}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Summary Box */}
                      <div className="p-2 rounded-xl bg-black/40 border border-sand-400/25 text-xs flex justify-between items-center">
                        <span className="text-ivory/70 text-[11px] truncate">
                          {selectedProduct.name} in {selectedWood.name}
                        </span>
                        <span className="font-mono font-bold text-amber-300 text-xs flex-shrink-0 ml-2">
                          ₹{pricing.total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Buttons (Always Visible, Never Cut Off) */}
                <div className="flex-shrink-0 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  {activeStep > 1 ? (
                    <button
                      onClick={() => setActiveStep((prev) => prev - 1)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-ivory/80 transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-ivory/40 font-mono">Step 1 of 5</span>
                  )}

                  {activeStep < 5 ? (
                    <button
                      onClick={() => setActiveStep((prev) => prev + 1)}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-timber hover:bg-timber-600 text-ivory text-xs uppercase tracking-wider font-semibold transition-all shadow-hover hover:scale-105"
                    >
                      <span>Next: {stepTitles[activeStep]}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold py-1.5 px-3 rounded-xl flex items-center gap-1 shadow-md"
                      >
                        <MessageSquare className="w-3 h-3 fill-white text-transparent" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => setShowOrderModal(true)}
                        className="bg-timber hover:bg-timber-600 text-ivory text-xs uppercase tracking-wider font-semibold px-4 py-1.5 rounded-xl transition-all shadow-hover hover:scale-105 flex items-center gap-1"
                      >
                        <span>Book Piece</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      ) : null}

      {/* ============================================================ */}
      {/* 3. ORDER BOOKING MODAL (z-[1000] so it stays above studio)   */}
      {/* ============================================================ */}
      {showOrderModal && mounted && typeof document !== "undefined" ? createPortal(
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowOrderModal(false);
              setOrderSuccess(false);
            }
          }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-walnut-950 border border-sand-400/40 p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto text-ivory">
            <button
              onClick={() => {
                setShowOrderModal(false);
                setOrderSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-ivory transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!orderSuccess ? (
              <form onSubmit={handleDirectOrderSubmit} className="space-y-3.5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sand-400/20 text-sand-200 text-[10px] font-semibold mb-1">
                    <Sparkles className="w-3 h-3 text-timber" />
                    <span>Direct Order Checkout</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory">
                    Confirm Custom Order Specification
                  </h3>
                  <p className="text-[11px] text-ivory/70 mt-0.5">
                    Our master timber joinery consultant will contact you within 2 hours.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Product:</span>
                    <span className="font-semibold text-ivory">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Wood:</span>
                    <span className="font-semibold text-sand-300">{selectedWood.name} ({selectedWood.tamilName})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Carving:</span>
                    <span className="font-semibold text-ivory">{selectedDesign?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/60">Dimensions:</span>
                    <span className="font-mono text-sand-300">
                      {isCustomDimension
                        ? `${customHeight}x${customWidth}ft (${customThickness}mm)`
                        : `${selectedDimension.name}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/10 text-sand-200 font-semibold">
                    <span>Estimated Total (with 18% GST):</span>
                    <span className="text-amber-300 font-mono text-sm">₹{pricing.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-ivory/80 mb-0.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Anandha Kumar"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-ivory text-xs focus:border-sand-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-ivory/80 mb-0.5">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 94430 42244"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-ivory text-xs focus:border-sand-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-ivory/80 mb-0.5">Site / Delivery City</label>
                    <input
                      type="text"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      placeholder="e.g. Coimbatore, Tirupur, Salem, Pollachi"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-ivory text-xs focus:border-sand-400 focus:outline-none"
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-rose-400 bg-rose-500/10 p-2 rounded-xl">{formError}</p>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white text-transparent" />
                    <span>Order via WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    disabled={orderSubmitting}
                    className="flex-1 bg-timber hover:bg-timber-600 disabled:opacity-50 text-ivory text-xs uppercase tracking-wider font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-hover"
                  >
                    {orderSubmitting ? "Submitting..." : "Submit Direct Order"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-5 text-center space-y-2.5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-sand-200">Custom Order Received!</h4>
                <p className="text-xs text-ivory/80">
                  Thank you, <strong className="text-sand-300">{customerName}</strong>. Your customized order specification has been saved. Our master joinery expert will contact you at <strong className="text-sand-300">{customerPhone}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowOrderModal(false);
                      setOrderSuccess(false);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-ivory text-xs uppercase tracking-wider font-semibold py-2 px-5 rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
