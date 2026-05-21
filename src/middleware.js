import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  
  if (!token && request.nextUrl.pathname.startsWith("/my-tutors")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/booked-sessions")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/add-tutor")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/my-tutors", "/my-tutors/:path*", "/booked-sessions", "/booked-sessions/:path*", "/add-tutor", "/add-tutor/:path*"]
};
