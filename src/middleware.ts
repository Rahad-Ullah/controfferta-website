import { NextResponse } from "next/server";

// Authentication is checked by the client dashboard layout through the
// backend session. Backend HttpOnly cookies are host-only and are not visible
// to this frontend middleware.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
