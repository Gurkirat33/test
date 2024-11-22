import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/signin") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/backend")) {
    const accessToken = request.cookies.get("accessToken");

    if (!accessToken) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(accessToken.value, secret);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("X-User-Id", payload.userId);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      const response = NextResponse.redirect(
        new URL("/backend/signin", request.url),
      );
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/backend/((?!signin).*)", "/backend"],
};
