import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await db.brands.update(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, brand: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ok = await db.brands.delete(params.id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Brand not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
