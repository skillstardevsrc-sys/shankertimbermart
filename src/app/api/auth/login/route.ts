import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const isValid = await db.auth.verifyAdmin(password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid administrative credentials." },
        { status: 401 }
      );
    }

    // Set authenticated cookie
    cookies().set("stm_admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  cookies().delete("stm_admin_auth");
  return NextResponse.json({ success: true });
}
