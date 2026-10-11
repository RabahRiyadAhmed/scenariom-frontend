import { NextRequest, NextResponse } from "next/server";

const gatewayUrl = process.env.GATEWAY_URL ?? "http://localhost:4000/api";

export async function proxy(request: NextRequest) {
  const authPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register";
  const cookie = request.headers.get("cookie");
  if (!cookie) return authPage ? NextResponse.next() : NextResponse.redirect(new URL("/login", request.url));
  const profile = await fetch(`${gatewayUrl}/auth/me`, { headers: { cookie, "Accept-Language": request.headers.get("accept-language") ?? "en" }, cache: "no-store" }).catch(() => null);
  if (profile?.ok) return authPage ? NextResponse.redirect(new URL("/projects", request.url)) : NextResponse.next();
  if (profile?.status === 401) {
    const refreshed = await fetch(`${gatewayUrl}/auth/web/refresh`, { method: "POST", headers: { cookie, "Accept-Language": request.headers.get("accept-language") ?? "en" }, cache: "no-store" }).catch(() => null);
    if (refreshed?.ok) {
      const response = NextResponse.redirect(new URL(authPage ? "/projects" : request.nextUrl.pathname, request.url));
      for (const value of refreshed.headers.getSetCookie()) response.headers.append("set-cookie", value);
      return response;
    }
  }
  return authPage ? NextResponse.next() : NextResponse.redirect(new URL("/login", request.url));
}

export const config = { matcher: ["/login", "/register", "/projects/:path*", "/organization/:path*", "/editor/:path*"] };
