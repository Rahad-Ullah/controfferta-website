import { NextResponse } from "next/server";
import { clearAuthToken, setAuthToken } from "@/lib/auth-cookie";

const MAX_TOKEN_LENGTH = 4096;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const token =
    typeof body === "object" && body !== null && "token" in body
      ? (body as { token: unknown }).token
      : null;

  if (typeof token !== "string" || token.trim().length === 0 || token.length > MAX_TOKEN_LENGTH) {
    return NextResponse.json({ message: "A valid auth token is required." }, { status: 400 });
  }

  await setAuthToken(token.trim());
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAuthToken();
  return NextResponse.json({ ok: true });
}
