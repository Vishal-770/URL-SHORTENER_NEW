import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import { NextRequest, NextResponse } from "next/server";

interface ReqBody {
  slug: string;
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    let data: ReqBody;
    try {
      data = await req.json();
    } catch (err) {
      console.log("Error Occured:", err);
      return NextResponse.json(
        { message: "Invalid JSON body", success: false },
        { status: 400 }
      );
    }

    const { slug } = data;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Valid slug is required", success: false },
        { status: 400 }
      );
    }

    const deletedUrl = await ShortUrl.findOneAndDelete({ slug: slug.trim() });

    if (deletedUrl) {
      return NextResponse.json(
        {
          message: "URL deleted successfully",
          success: true,
          data: deletedUrl,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No URL found for the given slug", success: false },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Server error in DELETE /api/shorturl:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
