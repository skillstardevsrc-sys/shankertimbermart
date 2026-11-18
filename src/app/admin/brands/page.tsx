import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { BrandManager } from "@/components/admin/BrandManager";

export const revalidate = 0;

export default async function AdminBrandsPage() {
  const brands = await db.brands.getAll();

  return (
    <div className="flex bg-ivory-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="border-b border-sand-300 pb-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-timber">
              Associated Brands Management
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-walnut">
              Brochure Brand Directory
            </h1>
          </div>

          <BrandManager initialBrands={brands} />
        </div>
      </main>
    </div>
  );
}
