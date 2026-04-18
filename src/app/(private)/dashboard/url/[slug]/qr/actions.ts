"use server";

import { dbConnect } from "@/database/connection";
import ShortUrl, { IQROptions } from "@/database/models/shortUrlmodel";
import { revalidatePath } from "next/cache";

export async function saveQrOptions(slug: string, options: IQROptions, qrCodeData?: string) {
  try {
    await dbConnect();
    
    // Define strict interface for updates
    const update: { qrOptions: IQROptions; qrCode?: string } = { qrOptions: options };
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
