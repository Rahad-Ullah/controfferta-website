import { NextResponse } from "next/server";
import { clearAuthToken } from "@/lib/authCookie";

export async function POST() {
  await clearAuthToken();
  return NextResponse.json({ ok: true });
}
