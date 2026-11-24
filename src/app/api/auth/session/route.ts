import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearAuthToken, setAuthToken, setAuthTokens } from "@/lib/auth-cookie";

const MAX_TOKEN_LENGTH = 4096;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const bodyToken =
    typeof body === "object" && body !== null && "token" in body
      ? (body as { token: unknown }).token
      : null;
  const bodyRefreshToken =
    typeof body === "object" && body !== null && "refreshToken" in body
      ? (body as { refreshToken: unknown }).refreshToken
      : null;
  const apiCookieToken = (await cookies()).get("accessToken")?.value;
  const apiCookieRefreshToken = (await cookies()).get("refreshToken")?.value;
  const token =
    typeof bodyToken === "string" && bodyToken.trim().length > 0
      ? bodyToken
      : apiCookieToken;

  if (
    typeof token !== "string" ||
    token.trim().length === 0 ||
    token.length > MAX_TOKEN_LENGTH
  ) {
    return NextResponse.json(
      { message: "A valid auth token is required." },
      { status: 400 },
    );
  }

  const refreshToken =
    typeof bodyRefreshToken === "string" && bodyRefreshToken.trim().length > 0
      ? bodyRefreshToken.trim()
      : apiCookieRefreshToken;

  if (refreshToken) {
    await setAuthTokens(token.trim(), refreshToken);
  } else {
    await setAuthToken(token.trim());
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAuthToken();
  return NextResponse.json({ ok: true });
}
