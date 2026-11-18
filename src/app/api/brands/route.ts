import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const brands = await db.brands.getAll();
    return NextResponse.json({ success: true, brands });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch brands" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: "Brand name is required" }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newBrand = await db.brands.create({
      ...body,
      slug,
      featured: body.featured !== false,
      published: body.published !== false,
    });

    return NextResponse.json({ success: true, brand: newBrand }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create brand" }, { status: 500 });
  }
}
