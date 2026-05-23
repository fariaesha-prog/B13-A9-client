import { NextResponse } from "next/server";

export function middleware(request) {
  // Auth is now handled by PrivateRoute component
  // Middleware no longer redirects to prevent conflicts with client-side routing
  return NextResponse.next();
}

export const config = {
  matcher: []
};
