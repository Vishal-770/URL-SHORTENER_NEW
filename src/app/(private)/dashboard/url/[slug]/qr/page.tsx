import { dbConnect } from "@/database/connection";
import ShortUrl, { IShortUrl } from "@/database/models/shortUrlmodel";
import { notFound } from "next/navigation";
import QRDesigner from "./QRDesigner";
import { QrCode, ExternalLink } from "lucide-react";
import { BackButton } from "./BackButton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await dbConnect();

  const urlData = (await ShortUrl.findOne({ slug }).lean()) as IShortUrl | null;

  if (!urlData) {
    notFound();
  }

  const targetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;
  const hasCustomDesign = !!urlData.qrOptions;

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="border-b border-border/10 pb-8 pt-4 space-y-6">
        <BackButton fallbackHref={`/dashboard/analyze?slug=${slug}`} />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <QrCode className="h-5 w-5 text-secondary" />
              <h1 className="text-2xl font-black tracking-tight text-foreground">
                QR Designer
              </h1>
              {hasCustomDesign && (
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border">
                  Custom
                </Badge>
              )}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 pl-8">
              /{slug}
            </p>
          </div>

          {/* Right: Link info */}
          <div className="flex flex-col gap-2 text-right sm:items-end">
            <Link
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold text-secondary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              {targetUrl}
            </Link>
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">
              {hasCustomDesign ? "Custom design saved" : "Default QR — start designing below"}
            </p>
          </div>
        </div>
      </div>

      {/* Designer */}
      <QRDesigner
        slug={slug}
        targetUrl={targetUrl}
        initialOptions={urlData.qrOptions || null}
        currentQrCode={urlData.qrCode}
      />
    </div>
  );
}
