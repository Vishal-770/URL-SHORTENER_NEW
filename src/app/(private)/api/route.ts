import { dbConnect } from "@/database/connection";
import { requireAuthenticatedRequestUser } from "@/lib/request-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { unauthorizedResponse } = await requireAuthenticatedRequestUser(req);

  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  await dbConnect();

  return NextResponse.json({ message: "DB connected!", success: true });
}
