import { NextResponse } from "next/server";
import { ApiError, nextFetch } from "@/lib/api/fetcher";
import {
  clearAuthToken,
  getAuthRefreshToken,
  setAuthTokens,
} from "@/lib/auth-cookie";

type RefreshResponse = {
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

export async function POST() {
  const refreshToken = await getAuthRefreshToken();

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token is missing." },
      { status: 401 },
    );
  }

  try {
    const response = await nextFetch<RefreshResponse>({
      url: "/auth/refresh-token",
      method: "POST",
      payload: { refreshToken },
    });
    const accessToken = response.data?.accessToken;
    const nextRefreshToken = response.data?.refreshToken;

    if (!accessToken || !nextRefreshToken) {
      throw new Error(
        "The refresh response did not include a complete session.",
      );
    }

    await setAuthTokens(accessToken, nextRefreshToken);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ApiError && error.status >= 400) {
      await clearAuthToken();
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Could not refresh the session." },
      { status: 500 },
    );
  }
}
