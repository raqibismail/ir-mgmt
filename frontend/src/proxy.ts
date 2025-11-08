// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Public routes that don't need auth
  const publicPaths = ["/", "/login", "/signup"];

  const isPublic = publicPaths.includes(pathname);

  // Protected browser routes
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

  // 1️⃣ If user tries to access protected page without cookie → redirect
  if (isProtected && !token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // 2️⃣ If user is logged in and goes to login/signup → redirect to dashboard
  if (isPublic && token && (pathname === "/login" || pathname === "/signup")) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  // 3️⃣ Allow everything else to continue
  return NextResponse.next();
}

// Run middleware only on these routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/signup", "/"],
};
