"use server";

import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";

export async function getPaginatedHistory(slug: string, page: number = 1, limit: number = 10) {
  try {
    await dbConnect();
    
    // We need to fetch the total count to calculate pagination
    const urlDoc = await ShortUrl.findOne({ slug }).select("visitHistory");
    if (!urlDoc) return { data: [], total: 0, pages: 0 };

    const total = urlDoc.visitHistory.length;
    const pages = Math.ceil(total / limit);
    
    // Calculate slice indices (MongoDB $slice is [skip, limit])
    // Since we want the LATEST visits first, we reverse the logic or use negative indices
    // To get the latest 10: slice: [-10, 10]
    // To get the next 10 (11-20): slice: [-20, 10]
    
    const skip = page * limit;
    const paginatedDoc = await ShortUrl.findOne({ slug }).select({
      visitHistory: { $slice: [-skip, limit] }
    });

    // Note: slice returns them in chronological order. 
    // We want the latest first in the UI, so we reverse the result.
    const data = paginatedDoc ? [...paginatedDoc.visitHistory].reverse() : [];

    return {
      data: JSON.parse(JSON.stringify(data)),
      total,
      pages,
      currentPage: page
    };
  } catch (error) {
    console.error("Pagination fetch error:", error);
    return { data: [], total: 0, pages: 0, error: "Failed to fetch activity" };
  }
}
