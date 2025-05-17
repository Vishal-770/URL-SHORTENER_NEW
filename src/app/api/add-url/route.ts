import { dbConnect } from "@/database/connection";
import User from "@/database/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import ShortUrl from "@/database/models/shortUrlmodel";

interface reqBody {
  originalUrl: string;
  clerkId: string;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data: reqBody = await request.json();
    const { clerkId, originalUrl } = data;

    if (!originalUrl || !clerkId) {
      return NextResponse.json(
        { message: "All Fields are required", success: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json(
        { message: "No user exists", success: false },
        { status: 404 }
      );
    }

    const slug = nanoid(8);
    const userId = user._id;

    const newUrl = await ShortUrl.create({ originalUrl, slug, userId });

    return NextResponse.json({ success: true, data: newUrl }, { status: 201 });
  } catch (err) {
    console.error("Error occurred:", err);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
