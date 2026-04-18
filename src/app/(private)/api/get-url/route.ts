import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import { ensureLocalUser } from "@/lib/app-user";
import { requireAuthenticatedRequestUser } from "@/lib/request-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { user: authUser, unauthorizedResponse } =
      await requireAuthenticatedRequestUser(request);

    if (unauthorizedResponse || !authUser) {
      return unauthorizedResponse;
    }

    await dbConnect();

    const user = await ensureLocalUser(authUser);

    const shortUrls = await ShortUrl.find({ userId: user._id });

    return NextResponse.json(
      { success: true, data: shortUrls },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching short URLs:", error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 },
    );
  }
}
