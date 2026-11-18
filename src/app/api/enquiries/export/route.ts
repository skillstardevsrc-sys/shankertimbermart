import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const enquiries = await db.enquiries.getAll();

    // Generate CSV Header
    const headers = [
      "ID",
      "Date",
      "Full Name",
      "Phone",
      "Email",
      "Customer Type",
      "Product Category",
      "Location",
      "Estimated Quantity",
      "Requirement Description",
      "Status",
      "Internal Notes Count",
    ];

    const rows = enquiries.map((e) => [
      `"${e.id}"`,
      `"${new Date(e.createdAt).toISOString()}"`,
      `"${(e.fullName || "").replace(/"/g, '""')}"`,
      `"${(e.phone || "").replace(/"/g, '""')}"`,
      `"${(e.email || "").replace(/"/g, '""')}"`,
      `"${(e.customerType || "").replace(/"/g, '""')}"`,
      `"${(e.productCategory || "").replace(/"/g, '""')}"`,
      `"${(e.projectLocation || "").replace(/"/g, '""')}"`,
      `"${(e.estimatedQuantity || "").replace(/"/g, '""')}"`,
      `"${(e.requirementDescription || "").replace(/"/g, '""')}"`,
      `"${(e.status || "").replace(/"/g, '""')}"`,
      `"${e.internalNotes?.length || 0}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="shankar-timber-mart-leads-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("CSV Export error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate CSV export." },
      { status: 500 }
    );
  }
}
