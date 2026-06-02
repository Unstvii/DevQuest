import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];

function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    if (!payload) return true;

    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8"),
    );

    if (!decoded.exp) return false;
    const bufferSeconds = 30;
    return decoded.exp < Math.floor(Date.now() / 1000) + bufferSeconds;
  } catch {
    return true;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const hasValidToken = token && !isTokenExpired(token);

  if (isPublic && hasValidToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (isPublic) {
    return NextResponse.next();
  }

  if (!hasValidToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    if (token) {
      response.cookies.delete("accessToken");
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
