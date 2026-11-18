import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const authCookie = cookies().get("stm_admin_auth");
  const isAuthenticated = authCookie?.value === "true";

  return NextResponse.json({ authenticated: isAuthenticated });
}
