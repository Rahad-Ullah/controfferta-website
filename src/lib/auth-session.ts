"use client";

/** Store the API session tokens in same-origin HttpOnly cookies through our route handler. */
export async function persistAuthToken(
  accessToken: string | undefined,
  refreshToken?: string,
) {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      accessToken ? { token: accessToken, refreshToken } : {},
    ),
  });

  if (!response.ok) throw new Error("Could not establish the authenticated session.");
}
