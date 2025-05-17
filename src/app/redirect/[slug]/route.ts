import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { slug } = await params;
  const Url = await ShortUrl.findOne({ slug });
  if (!Url)
    return NextResponse.json({
      message: "no matching shortid",
      success: false,
    });
  return NextResponse.json({ Url });
}
