import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const referrer = req.headers.get("referer") || "unknown";

    const parser = new UAParser(userAgent);
    const deviceType = parser.getDevice().type || "desktop";
    const browser = parser.getBrowser().name || "unknown";
    const os = parser.getOS().name || "unknown";

    const shortUrl = await ShortUrl.findOne({ slug });

    if (!shortUrl) {
      return NextResponse.json(
        { message: "Short URL not found", success: false },
        { status: 404 }
      );
    }

    try {
      shortUrl.visitHistory.push({
        timestamp: new Date(),
        ip,
        deviceType,
        os,
        browser,
        referrer,
        userAgent,
      });
      await shortUrl.save();
    } catch {
      // Ignore analytics saving failure, continue redirecting
    }

    return NextResponse.redirect(shortUrl.originalUrl);
  } catch {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
