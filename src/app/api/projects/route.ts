import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const projects = await db.projects.getAll();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ success: false, error: "Project title and category are required" }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newProject = await db.projects.create({
      ...body,
      slug,
      featured: Boolean(body.featured),
      published: body.published !== false,
      galleryImages: Array.isArray(body.galleryImages) ? body.galleryImages : [body.coverImage],
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 });
  }
}
