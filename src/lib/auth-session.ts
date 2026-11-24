"use client";

/** Store the API access token in a same-origin HttpOnly cookie through our route handler. */
export async function persistAuthToken(token: string | undefined) {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(token ? { token } : {}),
  });

  if (!response.ok) throw new Error("Could not establish the authenticated session.");
}
