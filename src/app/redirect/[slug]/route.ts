import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    console.log(req);

    const shortUrl = await ShortUrl.findOne({ slug: slug });

    if (!shortUrl) {
      return NextResponse.json(
        { message: "Short URL not found", success: false },
        { status: 404 }
      );
    }

    shortUrl.visitHistory.push(new Date());
    await shortUrl.save();

    return NextResponse.redirect(shortUrl.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
