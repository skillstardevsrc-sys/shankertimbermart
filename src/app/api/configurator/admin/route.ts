import { NextRequest, NextResponse } from "next/server";
import { configuratorDb } from "@/lib/configurator/dbConfigurator";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { action, payload } = await request.json();

    switch (action) {
      case "saveProductType": {
        const saved = await configuratorDb.saveProductType(payload);
        return NextResponse.json({ success: true, data: saved });
      }
      case "deleteProductType": {
        const deleted = await configuratorDb.deleteProductType(payload.id);
        return NextResponse.json({ success: true, deleted });
      }
      case "saveMaterial": {
        const saved = await configuratorDb.saveMaterial(payload);
        return NextResponse.json({ success: true, data: saved });
      }
      case "deleteMaterial": {
        const deleted = await configuratorDb.deleteMaterial(payload.id);
        return NextResponse.json({ success: true, deleted });
      }
      case "saveDesign": {
        const saved = await configuratorDb.saveDesign(payload);
        return NextResponse.json({ success: true, data: saved });
      }
      case "deleteDesign": {
        const deleted = await configuratorDb.deleteDesign(payload.id);
        return NextResponse.json({ success: true, deleted });
      }
      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Admin configurator error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process admin action" },
      { status: 500 }
    );
  }
}
