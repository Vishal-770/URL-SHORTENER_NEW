import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import User from "@/database/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const clerkId = url.searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json(
        { message: "Missing clerkId", success: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const shortUrls = await ShortUrl.find({ userId: user._id });

    return NextResponse.json(
      { success: true, data: shortUrls },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching short URLs:", error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
