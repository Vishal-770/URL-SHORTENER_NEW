import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export interface AuthenticatedRequestUser {
  id: string;
  email?: string;
  name?: string;
}

export async function getAuthenticatedRequestUser(
  request: NextRequest,
): Promise<AuthenticatedRequestUser | null> {
  const forwardedUserId = request.headers.get("x-auth-user-id");

  if (forwardedUserId) {
    return {
      id: forwardedUserId,
      email: request.headers.get("x-auth-user-email") || undefined,
      name: request.headers.get("x-auth-user-name") || undefined,
    };
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email || undefined,
    name: session.user.name || undefined,
  };
}

export async function requireAuthenticatedRequestUser(
  request: NextRequest,
): Promise<
  | {
      user: AuthenticatedRequestUser;
      unauthorizedResponse: null;
    }
  | {
      user: null;
      unauthorizedResponse: NextResponse;
    }
> {
  const user = await getAuthenticatedRequestUser(request);

  if (!user) {
    return {
      user: null,
      unauthorizedResponse: NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      ),
    };
  }

  return {
    user,
    unauthorizedResponse: null,
  };
}
