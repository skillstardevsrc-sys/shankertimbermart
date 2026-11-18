import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { LeadStatus } from "@/lib/types";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (body.status) {
      const updated = await db.enquiries.updateStatus(id, body.status as LeadStatus);
      if (!updated) {
        return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, enquiry: updated });
    }

    if (body.note) {
      const updated = await db.enquiries.addNote(id, body.note, body.author || "Admin");
      if (!updated) {
        return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, enquiry: updated });
    }

    return NextResponse.json({ success: false, error: "No update parameters provided" }, { status: 400 });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const ok = await db.enquiries.delete(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
