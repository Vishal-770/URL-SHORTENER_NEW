import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import { isbot } from "isbot";
import crypto from "node:crypto";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const referrer = req.headers.get("referer") || "unknown";
    const language = req.headers.get("accept-language")?.split(",")[0] || "unknown";

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

    // Safely collect analytics
    try {
      // Enhanced Analytics
      const geo = geoip.lookup(ip);
      const botStatus = isbot(userAgent);
      
      // Clean Referring Domain
      let referringDomain = "Direct";
      if (referrer !== "unknown") {
        try {
          const url = new URL(referrer);
          referringDomain = url.hostname.replace("www.", "");
        } catch {
          referringDomain = "External";
        }
      }

      // Unique Visitor ID (IP + UserAgent Hash)
      const visitorId = crypto
        .createHash("sha256")
        .update(`${ip}-${userAgent}`)
        .digest("hex")
        .substring(0, 16);

      shortUrl.visitHistory.push({
        timestamp: new Date(),
        ip,
        deviceType,
        os,
        browser,
        referrer,
        userAgent,
        country: geo?.country || "unknown",
        city: geo?.city || "unknown",
        region: geo?.region || "unknown",
        timezone: geo?.timezone || "unknown",
        isBot: botStatus,
        language,
        visitorId,
        referringDomain,
      });
      await shortUrl.save();
    } catch (error) {
      console.error("Analytics Error:", error);
      // Fail silently for analytics - don't block the redirect
    }

    return NextResponse.redirect(shortUrl.originalUrl);
  } catch {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
