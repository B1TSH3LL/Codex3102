import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/sessions", "/settings"];
const publicRoutes = [
  "/",
  "/signup",
  "/confirm-account",
  "/forgot-password",
  "/reset-password",
  "/verify-mfa",
];

export default async function middleware(req: NextRequest) {
  const paths = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(paths);
  const isPublicRoute = publicRoutes.includes(paths);

  const accessToken = req.cookies.get("accessToken")?.value;

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
