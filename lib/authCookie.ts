import { cookies } from "next/headers";

export const AUTH_COOKIE = "auth_token";

const WEEK_SECONDS = 60 * 60 * 24 * 7;

function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: WEEK_SECONDS,
  };
}

export async function setAuthToken(token: string) {
  const jar = await cookies();
  jar.set(AUTH_COOKIE, token, authCookieOptions());
}

export async function getAuthToken() {
  const jar = await cookies();
  return jar.get(AUTH_COOKIE)?.value ?? null;
}

export async function clearAuthToken() {
  const jar = await cookies();
  jar.delete(AUTH_COOKIE);
}
