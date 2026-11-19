import { NextRequest, NextResponse } from "next/server";
import { configuratorDb } from "@/lib/configurator/dbConfigurator";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");
    const productTypeId = searchParams.get("productType");
    const materialId = searchParams.get("material");
    const full = searchParams.get("full");

    if (full === "true") {
      const fullCatalog = await configuratorDb.getFullCatalog();
      return NextResponse.json({ success: true, data: fullCatalog });
    }

    if (categoryId) {
      const [category, productTypes, materials, designs, dimensions] = await Promise.all([
        configuratorDb.getCategoryById(categoryId),
        configuratorDb.getProductTypes(categoryId),
        configuratorDb.getMaterials(categoryId, productTypeId || undefined),
        configuratorDb.getDesigns(categoryId, productTypeId || undefined, materialId || undefined),
        configuratorDb.getDimensionConfig(categoryId),
      ]);

      return NextResponse.json({
        success: true,
        data: {
          category,
          productTypes,
          materials,
          designs,
          dimensions,
        },
      });
    }

    const categories = await configuratorDb.getCategories();
    return NextResponse.json({ success: true, data: { categories } });
  } catch (error: any) {
    console.error("Configurator catalog error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load configurator catalog" },
      { status: 500 }
    );
  }
}
