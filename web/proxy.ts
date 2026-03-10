import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isProtected = ["/matches", "/profile", "/admin"].some((route) => pathname.startsWith(route));

  if (!isProtected) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/discover", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/matches/:path*", "/profile/:path*", "/admin/:path*"],
};
