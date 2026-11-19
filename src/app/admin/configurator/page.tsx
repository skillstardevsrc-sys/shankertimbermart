import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProductConfiguratorAdmin } from "@/components/admin/ProductConfiguratorAdmin";
import { configuratorDb } from "@/lib/configurator/dbConfigurator";

export const revalidate = 0;

export default async function AdminConfiguratorPage() {
  const [categories, productTypes, materials, designs, fullCatalog] =
    await Promise.all([
      configuratorDb.getCategories(),
      configuratorDb.getProductTypes(),
      configuratorDb.getMaterials(),
      configuratorDb.getDesigns(),
      configuratorDb.getFullCatalog(),
    ]);

  return (
    <div className="flex bg-ivory-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <ProductConfiguratorAdmin
            initialCategories={categories}
            initialProductTypes={productTypes}
            initialMaterials={materials}
            initialDesigns={designs}
            initialDimensions={fullCatalog.dimensions}
          />
        </div>
      </main>
    </div>
  );
}
