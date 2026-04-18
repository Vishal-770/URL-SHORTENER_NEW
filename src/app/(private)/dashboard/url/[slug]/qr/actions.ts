"use server";

import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import { revalidatePath } from "next/cache";

export async function saveQrOptions(slug: string, options: any, qrCodeData?: string) {
  try {
    await dbConnect();
    
    const update: any = { qrOptions: options };
    if (qrCodeData) {
      update.qrCode = qrCodeData;
    }

    const result = await ShortUrl.findOneAndUpdate(
      { slug },
      update,
      { new: true }
    );

    if (!result) {
      return { error: "Link not found" };
    }

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/url/${slug}/qr`);
    revalidatePath("/dashboard/analyze");
    return { success: true, data: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    console.error("Save QR Options Error:", error);
    return { error: "Failed to save design" };
  }
}
