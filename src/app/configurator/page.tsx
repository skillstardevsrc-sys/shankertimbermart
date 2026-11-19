import { Suspense } from "react";
import { Metadata } from "next";
import { configuratorDb } from "@/lib/configurator/dbConfigurator";
import { ConfiguratorMain } from "@/components/configurator/ConfiguratorMain";

export const metadata: Metadata = {
  title: "Customise Your Product | Advanced Product Configurator",
  description:
    "Visually configure your architectural doors, WPC composite doors, acoustic uPVC & aluminium windows, imported timber lumber, calibrated plywood, and turnkey modular interiors with Shankar Timber Mart.",
};

export const revalidate = 0; // Dynamic data loading

export default async function ConfiguratorPage() {
  const [categories, productTypes, materials, designs, dimensionsStore] =
    await Promise.all([
      configuratorDb.getCategories(),
      configuratorDb.getProductTypes(),
      configuratorDb.getMaterials(),
      configuratorDb.getDesigns(),
      configuratorDb.getFullCatalog().then((c) => c.dimensions),
    ]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-timber border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-lg text-walnut">
              Loading Product Configurator...
            </p>
          </div>
        </div>
      }
    >
      <ConfiguratorMain
        initialCategories={categories}
        initialAllProductTypes={productTypes}
        initialAllMaterials={materials}
        initialAllDesigns={designs}
        initialDimensions={dimensionsStore}
      />
    </Suspense>
  );
}
