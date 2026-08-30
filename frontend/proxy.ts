import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register", "/"];

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

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.accessToken as string;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log("MIDDLEWARE PATH:", request.nextUrl.pathname);
  console.log("ACCESS TOKEN:", token);
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  let hasValidToken = Boolean(token) && !isTokenExpired(token!);
  let newAccessToken: string | null = null;

  if (!hasValidToken && refreshToken) {
    newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      hasValidToken = true;
    }
  }

  if (isPublic && hasValidToken && pathname !== "/") {
    const response = NextResponse.redirect(new URL("/profile", request.url));
    if (newAccessToken) {
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60,
      });
    }
    return response;
  }

  if (isPublic) {
    const response = NextResponse.next();

    if (newAccessToken) {
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60,
      });
    }

    return response;
  }

  if (!hasValidToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  const response = NextResponse.next();
  if (newAccessToken) {
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60,
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
