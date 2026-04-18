import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthApi = pathname.startsWith("/api/auth");
  const isApi = pathname.startsWith("/api");
  const isPrivatePage = pathname.startsWith("/dashboard");
  const isSigninPage = pathname === "/signin";
  const shouldProtect = isApi || isPrivatePage || isSigninPage;

  if (isAuthApi) {
    return NextResponse.next();
  }

  if (!shouldProtect) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (isSigninPage && session?.user?.id) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session?.user?.id) {
    if (isApi) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-auth-user-id", session.user.id);
  requestHeaders.set("x-auth-user-email", session.user.email || "");
  requestHeaders.set("x-auth-user-name", session.user.name || "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
