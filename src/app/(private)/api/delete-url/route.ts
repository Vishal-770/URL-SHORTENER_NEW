import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import { ensureLocalUser } from "@/lib/app-user";
import { requireAuthenticatedRequestUser } from "@/lib/request-auth";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

interface ReqBody {
  slug: string;
}

export async function DELETE(req: NextRequest) {
  try {
    const { user: authUser, unauthorizedResponse } =
      await requireAuthenticatedRequestUser(req);

    if (unauthorizedResponse || !authUser) {
      return unauthorizedResponse;
    }

    await dbConnect();

    const localUser = await ensureLocalUser(authUser);

    let data: ReqBody;
    try {
      data = await req.json();
    } catch (err) {
      console.log("Error Occured:", err);
      return NextResponse.json(
        { message: "Invalid JSON body", success: false },
        { status: 400 },
      );
    }

    const { slug } = data;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Valid slug is required", success: false },
        { status: 400 },
      );
    }

    const deletedUrl = await ShortUrl.findOneAndDelete({
      slug: slug.trim(),
      userId: localUser._id,
    });

    if (deletedUrl) {
      // Invalidate Cache
      if (redis) {
        try {
          await redis.del(`slug:${slug.trim()}`);
        } catch (e) {
          console.error("Redis Cache Invalidation Error:", e);
        }
      }
      return NextResponse.json(
        {
          message: "URL deleted successfully",
          success: true,
          data: deletedUrl,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "You are not allowed to delete this URL", success: false },
        { status: 403 },
      );
    }
  } catch (error) {
    console.error("Server error in DELETE /api/shorturl:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 },
    );
  }
}
