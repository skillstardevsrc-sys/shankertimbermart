"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ConfiguratorCategory,
  ConfiguratorCategoryId,
  ConfiguratorProductType,
  ConfiguratorMaterial,
  ConfiguratorDesign,
  DimensionFieldConfig,
  ConfiguredItem,
  StepDefinition,
} from "@/lib/configurator/types";
import { ConfiguratorProgress } from "./ConfiguratorProgress";
import { ConfiguratorNavigation } from "./ConfiguratorNavigation";
import { ProductCategorySelector } from "./ProductCategorySelector";
import { ProductTypeSelector } from "./ProductTypeSelector";
import { MaterialSelector } from "./MaterialSelector";
import { DesignGallery } from "./DesignGallery";
import { DesignPreview } from "./DesignPreview";
import { DimensionSelector } from "./DimensionSelector";
import { QuantitySelector } from "./QuantitySelector";
import { ConfigurationSummary } from "./ConfigurationSummary";
import { EnquiryScheduleDrawer } from "./EnquiryScheduleDrawer";
import { EnquirySubmissionModal } from "./EnquirySubmissionModal";
import { Sparkles, ShoppingBag, AlertTriangle, ArrowLeft } from "lucide-react";

interface ConfiguratorMainProps {
  initialCategories: ConfiguratorCategory[];
  initialAllProductTypes: ConfiguratorProductType[];
  initialAllMaterials: ConfiguratorMaterial[];
  initialAllDesigns: ConfiguratorDesign[];
  initialDimensions: Record<string, DimensionFieldConfig>;
}

export function ConfiguratorMain({
  initialCategories,
  initialAllProductTypes,
  initialAllMaterials,
  initialAllDesigns,
  initialDimensions,
}: ConfiguratorMainProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Selected Category (Module 01)
  const categoryParam = searchParams.get("category") as ConfiguratorCategoryId | null;
  const [selectedCategoryId, setSelectedCategoryId] = useState<ConfiguratorCategoryId | null>(
    categoryParam || null
  );

  // Active Category Object
  const currentCategory = useMemo(() => {
    return initialCategories.find((c) => c.id === selectedCategoryId) || null;
  }, [initialCategories, selectedCategoryId]);

  // Current Step Index in active category journey (0-based)
  // When selectedCategoryId is null, we are on Step 0 (Product Category Selection)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Current Working Item State
  const [selectedProductType, setSelectedProductType] = useState<ConfiguratorProductType | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<ConfiguratorMaterial | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<ConfiguratorDesign | null>(null);
  const [dimensions, setDimensions] = useState<{
    height?: number;
    width?: number;
    length?: number;
    thickness?: string;
    unit: string;
    standardSizeLabel?: string;
    isCustom?: boolean;
    notes?: string;
  }>({
    unit: "mm",
  });
  const [specialRequirements, setSpecialRequirements] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [salesUnit, setSalesUnit] = useState<string>("pieces");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  // Compatibility alert message
  const [compatibilityAlert, setCompatibilityAlert] = useState<string | null>(null);

  // Multi-item quotation schedule (Module 10)
  const [scheduleItems, setScheduleItems] = useState<ConfiguredItem[]>([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  // Load saved schedule from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("stm_configurator_schedule");
      if (saved) {
        setScheduleItems(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Save schedule to localStorage
  const saveSchedule = (items: ConfiguredItem[]) => {
    setScheduleItems(items);
    try {
      localStorage.setItem("stm_configurator_schedule", JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  };

  // Synchronize category selection when URL changes
  useEffect(() => {
    if (categoryParam && categoryParam !== selectedCategoryId) {
      setSelectedCategoryId(categoryParam);
      setCurrentStepIndex(0);
      resetWorkingItem(categoryParam);
    }
  }, [categoryParam]);

  // Active Category Steps
  const activeSteps: StepDefinition[] = useMemo(() => {
    if (!currentCategory) return [];
    return currentCategory.steps;
  }, [currentCategory]);

  const currentStepKey = activeSteps[currentStepIndex]?.key || "product";

  // Category change handler
  const handleCategorySelect = (catId: ConfiguratorCategoryId) => {
    setSelectedCategoryId(catId);
    setCurrentStepIndex(0);
    resetWorkingItem(catId);
    setCompatibilityAlert(null);
  };

  // Reset working item when category changes
  const resetWorkingItem = (catId: ConfiguratorCategoryId) => {
    const defaultDimConfig = initialDimensions[catId];
    setSelectedProductType(null);
    setSelectedMaterial(null);
    setSelectedDesign(null);
    setDimensions({
      height: defaultDimConfig?.height?.defaultValue,
      width: defaultDimConfig?.width?.defaultValue,
      length: defaultDimConfig?.length?.defaultValue,
      thickness: defaultDimConfig?.thickness?.defaultValue,
      unit: defaultDimConfig?.defaultUnit || "mm",
    });
    setSpecialRequirements({});
    setQuantity(1);
    setSalesUnit(catId === "timber" ? "cubic feet" : catId === "plywood-mdf" ? "sheets" : "pieces");
    setAdditionalNotes("");
  };

  // Filtered Product Types for active category
  const availableProductTypes = useMemo(() => {
    if (!selectedCategoryId) return [];

    // Special logic for Windows:
    // If Windows, Step 01 is Material (uPVC vs Aluminium). Once selected, filter product types!
    if (selectedCategoryId === "windows" && selectedMaterial) {
      return initialAllProductTypes.filter(
        (p) =>
          p.categoryId === "windows" &&
          p.supportedMaterialIds?.includes(selectedMaterial.id)
      );
    }

    return initialAllProductTypes.filter((p) => p.categoryId === selectedCategoryId);
  }, [selectedCategoryId, selectedMaterial, initialAllProductTypes]);

  // Filtered Materials for active category & selected product type
  const availableMaterials = useMemo(() => {
    if (!selectedCategoryId) return [];

    let list = initialAllMaterials.filter((m) => m.categoryId === selectedCategoryId);

    if (selectedProductType && selectedCategoryId !== "windows") {
      list = list.filter(
        (m) =>
          !m.compatibleProductIds ||
          m.compatibleProductIds.length === 0 ||
          m.compatibleProductIds.includes(selectedProductType.id)
      );
    }

    return list;
  }, [selectedCategoryId, selectedProductType, initialAllMaterials]);

  // Filtered Designs for active category & selected product type & material
  const availableDesigns = useMemo(() => {
    if (!selectedCategoryId) return [];

    let list = initialAllDesigns.filter((d) => d.categoryId === selectedCategoryId);

    if (selectedProductType) {
      list = list.filter(
        (d) =>
          !d.compatibleProductIds ||
          d.compatibleProductIds.length === 0 ||
          d.compatibleProductIds.includes(selectedProductType.id)
      );
    }

    if (selectedMaterial) {
      list = list.filter(
        (d) =>
          !d.compatibleMaterialIds ||
          d.compatibleMaterialIds.length === 0 ||
          d.compatibleMaterialIds.includes(selectedMaterial.id)
      );
    }

    return list;
  }, [selectedCategoryId, selectedProductType, selectedMaterial, initialAllDesigns]);

  // Dimension Config for current category
  const activeDimensionConfig = useMemo(() => {
    if (!selectedCategoryId) return initialDimensions["doors"];
    return initialDimensions[selectedCategoryId] || initialDimensions["doors"];
  }, [selectedCategoryId, initialDimensions]);

  // Selection handlers with downstream compatibility checking (Module 10)
  const handleSelectProductType = (pt: ConfiguratorProductType) => {
    setSelectedProductType(pt);
    setCompatibilityAlert(null);

    // Set default sales unit if configured
    if (pt.defaultSalesUnit) {
      setSalesUnit(pt.defaultSalesUnit);
    }

    // Check if currently selected material is compatible with new product type
    if (selectedMaterial && pt.supportedMaterialIds && pt.supportedMaterialIds.length > 0) {
      if (!pt.supportedMaterialIds.includes(selectedMaterial.id)) {
        setSelectedMaterial(null);
        setSelectedDesign(null);
        setCompatibilityAlert(
          `Notice: Previously chosen material was incompatible with ${pt.name} and has been reset for accurate customisation.`
        );
      }
    }

    // Check if currently selected design is compatible
    if (selectedDesign && pt.supportedDesignIds && pt.supportedDesignIds.length > 0) {
      if (!pt.supportedDesignIds.includes(selectedDesign.id)) {
        setSelectedDesign(null);
      }
    }
  };

  const handleSelectMaterial = (mat: ConfiguratorMaterial) => {
    setSelectedMaterial(mat);
    setCompatibilityAlert(null);

    // If on Windows (where Material comes first):
    if (selectedCategoryId === "windows") {
      if (selectedProductType && !selectedProductType.supportedMaterialIds?.includes(mat.id)) {
        setSelectedProductType(null);
        setSelectedDesign(null);
      }
    }

    // Check if currently selected design is compatible with new material
    if (selectedDesign && selectedDesign.compatibleMaterialIds?.length > 0) {
      if (!selectedDesign.compatibleMaterialIds.includes(mat.id)) {
        setSelectedDesign(null);
        setCompatibilityAlert(
          `Notice: Previously selected design pattern was incompatible with ${mat.name} and has been reset.`
        );
      }
    }
  };

  const handleSelectDesign = (des: ConfiguratorDesign) => {
    setSelectedDesign(des);
    setCompatibilityAlert(null);
  };

  // Determine if the user can proceed from current step
  const canContinue = useMemo(() => {
    if (!selectedCategoryId) return false;

    switch (currentStepKey) {
      case "product":
        return !!selectedProductType;
      case "material":
        return !!selectedMaterial;
      case "design":
        // Some product types may have no specific designs (flush), allow continue
        if (availableDesigns.length === 0) return true;
        return !!selectedDesign;
      case "dimensions":
        return (
          (dimensions.width || dimensions.length || dimensions.height) !== undefined &&
          quantity >= 1
        );
      case "quantity":
        return quantity >= 1;
      case "enquiry":
        return true;
      default:
        return false;
    }
  }, [
    selectedCategoryId,
    currentStepKey,
    selectedProductType,
    selectedMaterial,
    selectedDesign,
    availableDesigns.length,
    dimensions,
    quantity,
  ]);

  // Navigation handlers
  const handleContinue = () => {
    if (currentStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } else {
      // Last step: open submission modal
      setIsSubmissionModalOpen(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } else {
      // Go back to Module 01 Category Selection
      setSelectedCategoryId(null);
    }
  };

  const handleStepClick = (idx: number) => {
    setCurrentStepIndex(idx);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const canNavigateToStep = (idx: number) => {
    // Can jump backwards always
    if (idx <= currentStepIndex) return true;
    // Can jump 1 step forward only if current step is valid
    if (idx === currentStepIndex + 1) return canContinue;
    return false;
  };

  // Build current configured item object
  const currentConfiguredItem: ConfiguredItem = useMemo(() => {
    return {
      id: `cfg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      categoryId: selectedCategoryId || "doors",
      categoryName: currentCategory?.name || "Doors",
      productTypeId: selectedProductType?.id || "default",
      productTypeName: selectedProductType?.name || "Standard Architectural Product",
      productImage: selectedProductType?.image || currentCategory?.image || "",
      materialId: selectedMaterial?.id,
      materialName: selectedMaterial?.name,
      materialImage: selectedMaterial?.image,
      designId: selectedDesign?.id,
      designCode: selectedDesign?.designCode,
      designName: selectedDesign?.name,
      designImage: selectedDesign?.image,
      styleCategory: selectedDesign?.styleCategory,
      finishOption: selectedDesign?.frameFinish || selectedMaterial?.sheen,
      dimensions: {
        ...dimensions,
      },
      specialRequirements: {
        ...specialRequirements,
        additionalNotes,
      },
      quantity,
      salesUnit,
      configuredAt: new Date().toISOString(),
    };
  }, [
    selectedCategoryId,
    currentCategory,
    selectedProductType,
    selectedMaterial,
    selectedDesign,
    dimensions,
    specialRequirements,
    additionalNotes,
    quantity,
    salesUnit,
  ]);

  // Add current item to multi-product schedule
  const handleAddToSchedule = () => {
    if (!canContinue && currentStepIndex < activeSteps.length - 1) return;
    const updated = [...scheduleItems, currentConfiguredItem];
    saveSchedule(updated);
    setIsScheduleOpen(true);
  };

  // Remove item from schedule
  const handleRemoveFromSchedule = (id: string) => {
    const updated = scheduleItems.filter((i) => i.id !== id);
    saveSchedule(updated);
  };

  // Configure another product (resets active selection and goes to Category selection)
  const handleConfigureAnother = () => {
    setSelectedCategoryId(null);
    setCurrentStepIndex(0);
    resetWorkingItem("doors");
    setIsScheduleOpen(false);
  };

  return (
    <div className="bg-transparent min-h-screen flex flex-col">
      {/* Compatibility Alert Banner if triggered */}
      {compatibilityAlert && (
        <div className="bg-sand-300 text-walnut px-4 py-2.5 text-xs flex items-center justify-between border-b border-sand-400">
          <div className="max-w-site mx-auto flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-timber shrink-0" />
            <span>{compatibilityAlert}</span>
          </div>
          <button
            type="button"
            onClick={() => setCompatibilityAlert(null)}
            className="text-walnut/60 hover:text-walnut text-sm font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Dynamic Progress Indicator (Modules 01 to 07) */}
      {selectedCategoryId && currentCategory && (
        <ConfiguratorProgress
          steps={activeSteps}
          currentStepIndex={currentStepIndex}
          onStepClick={handleStepClick}
          canNavigateToStep={canNavigateToStep}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-site mx-auto">
          {/* SCREEN 01: Product-First Selection (Module 01) */}
          {!selectedCategoryId || !currentCategory ? (
            <ProductCategorySelector
              categories={initialCategories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={handleCategorySelect}
            />
          ) : (
            /* Dedicated Configurator Experience for Active Category */
            <div className="space-y-8">
              {/* Top Category Context Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sand-300">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryId(null)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold text-charcoal/70 hover:text-walnut bg-white px-3 py-1.5 rounded-lg border border-sand-300 shadow-sm transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>All Categories</span>
                  </button>

                  <div className="h-4 w-[1px] bg-sand-300" />

                  <span className="text-xs font-semibold text-timber uppercase tracking-wider">
                    {currentCategory.name}
                  </span>
                </div>

                {/* Schedule items counter badge */}
                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200/80 hover:bg-sand-300 text-walnut text-xs font-medium border border-sand-300 self-start sm:self-auto transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-timber" />
                  <span>Enquiry Schedule:</span>
                  <span className="font-bold font-mono text-timber">
                    {scheduleItems.length} items
                  </span>
                </button>
              </div>

              {/* 2-Column Responsive Layout (Module 09) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* LEFT COLUMN: Large Live Preview Image (Desktop Left, Mobile Top) */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
                  <DesignPreview
                    design={selectedDesign}
                    productType={selectedProductType}
                    material={selectedMaterial}
                    categoryName={currentCategory.name}
                  />

                  {/* Quick Helper pill */}
                  <div className="hidden lg:flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-[11px] text-charcoal/70">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-timber" />
                      <span>Shankar Timber Mart Showroom Quality Guarantee</span>
                    </span>
                    <span className="font-mono text-walnut font-semibold">100% Verified</span>
                  </div>
                </div>

                {/* RIGHT COLUMN: Selection & Configuration Panel */}
                <div className="lg:col-span-7 space-y-8">
                  {/* STEP: Product Typology */}
                  {currentStepKey === "product" && (
                    <ProductTypeSelector
                      productTypes={availableProductTypes}
                      selectedProductTypeId={selectedProductType?.id || null}
                      onSelectProductType={handleSelectProductType}
                      title={
                        selectedCategoryId === "doors"
                          ? "Step 01 — Select Door Construction Type"
                          : selectedCategoryId === "wpc"
                          ? "Step 01 — Select WPC Product"
                          : selectedCategoryId === "windows"
                          ? "Step 02 — Select Window Typology & Opening Style"
                          : selectedCategoryId === "timber"
                          ? "Step 01 — Select Timber Wood Species"
                          : selectedCategoryId === "plywood-mdf"
                          ? "Step 01 — Select Panel Construction Type"
                          : "Step 01 — Select Interior Architecture Scope"
                      }
                      subtitle={
                        selectedCategoryId === "doors"
                          ? "Choose from handcrafted natural veneer, laminated, folding, membrane, printed, or solid flush leaves."
                          : selectedCategoryId === "timber"
                          ? "Explore genuine directly imported Hardwood and Softwood species in custom dimensions."
                          : "Select your preferred architectural construction."
                      }
                      categorySlug={selectedCategoryId}
                    />
                  )}

                  {/* STEP: Material & Surface */}
                  {currentStepKey === "material" && (
                    <MaterialSelector
                      materials={availableMaterials}
                      selectedMaterialId={selectedMaterial?.id || null}
                      onSelectMaterial={handleSelectMaterial}
                      title={
                        selectedCategoryId === "windows"
                          ? "Step 01 — Select Window Frame Material"
                          : selectedCategoryId === "doors"
                          ? "Step 02 — Select Genuine Material & Face Texture"
                          : selectedCategoryId === "wpc"
                          ? "Step 02 — Select WPC Coating & Finish"
                          : selectedCategoryId === "timber"
                          ? "Step 02 — Select Timber Machining & Requirement"
                          : selectedCategoryId === "plywood-mdf"
                          ? "Step 02 — Select Calibrated Panel Thickness"
                          : "Step 03 — Select Cabinetry Materials & Finishes"
                      }
                      subtitle={
                        selectedCategoryId === "windows"
                          ? "Choose between multi-chamber acoustic uPVC or slim architectural aluminium."
                          : "Only materials verified compatible with your selected product are displayed."
                      }
                      productName={selectedProductType?.name}
                    />
                  )}

                  {/* STEP: Design Gallery */}
                  {currentStepKey === "design" && (
                    <DesignGallery
                      designs={availableDesigns}
                      selectedDesignId={selectedDesign?.id || null}
                      onSelectDesign={handleSelectDesign}
                      title={
                        selectedCategoryId === "windows"
                          ? "Step 03 — Select Frame Finish & Glazing Specification"
                          : selectedCategoryId === "doors"
                          ? "Step 03 — Select Door Design Pattern"
                          : selectedCategoryId === "wpc"
                          ? "Step 03 — Select WPC Architectural Design"
                          : selectedCategoryId === "modular-interiors"
                          ? "Step 02 — Select Interior Design Aesthetic"
                          : "Step 04 — Select Surface Finish"
                      }
                      subtitle="Every design variation features dedicated architectural photographs and distinct design codes."
                    />
                  )}

                  {/* STEP: Dimensions */}
                  {currentStepKey === "dimensions" && (
                    <DimensionSelector
                      config={activeDimensionConfig}
                      categorySlug={selectedCategoryId}
                      productTypeName={selectedProductType?.name}
                      dimensions={dimensions}
                      specialRequirements={specialRequirements}
                      onChangeDimensions={setDimensions}
                      onChangeSpecialRequirements={setSpecialRequirements}
                    />
                  )}

                  {/* STEP: Quantity */}
                  {currentStepKey === "quantity" && (
                    <QuantitySelector
                      quantity={quantity}
                      salesUnit={salesUnit}
                      additionalNotes={additionalNotes}
                      onChangeQuantity={setQuantity}
                      onChangeSalesUnit={setSalesUnit}
                      onChangeAdditionalNotes={setAdditionalNotes}
                      productTypeName={selectedProductType?.name}
                    />
                  )}

                  {/* STEP: Review & Summary */}
                  {currentStepKey === "enquiry" && (
                    <ConfigurationSummary
                      item={currentConfiguredItem}
                      onEditStep={(stepKey) => {
                        const targetIdx = activeSteps.findIndex((s) => s.key === stepKey);
                        if (targetIdx >= 0) setCurrentStepIndex(targetIdx);
                      }}
                      onAddAnotherProduct={handleConfigureAnother}
                      onSubmitQuote={() => setIsSubmissionModalOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom Navigation Bar (Module 09) */}
      {selectedCategoryId && currentCategory && (
        <ConfiguratorNavigation
          onBack={handleBack}
          onContinue={handleContinue}
          canContinue={canContinue}
          canGoBack={true}
          continueLabel={
            currentStepIndex === activeSteps.length - 1
              ? "Request a Quote"
              : `Next: ${activeSteps[currentStepIndex + 1]?.label || "Continue"}`
          }
          backLabel={
            currentStepIndex === 0 ? "Categories" : "Back"
          }
          isLastStep={currentStepIndex === activeSteps.length - 1}
          itemsInScheduleCount={scheduleItems.length}
          onOpenSchedule={() => setIsScheduleOpen(true)}
          onAddToSchedule={handleAddToSchedule}
          canAddToSchedule={canContinue}
        />
      )}

      {/* Multi-Item Quotation Schedule Drawer (Module 10) */}
      <EnquiryScheduleDrawer
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        items={scheduleItems}
        onRemoveItem={handleRemoveFromSchedule}
        onConfigureNew={handleConfigureAnother}
        onProceedToSubmit={() => {
          setIsScheduleOpen(false);
          setIsSubmissionModalOpen(true);
        }}
      />

      {/* Final Enquiry Submission Modal with Reference ID & WhatsApp (Module 11) */}
      <EnquirySubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        items={
          scheduleItems.length > 0
            ? scheduleItems
            : [currentConfiguredItem]
        }
        onSubmissionSuccess={(ref) => {
          // Clear local storage schedule upon successful submission
          saveSchedule([]);
        }}
      />
    </div>
  );
}
