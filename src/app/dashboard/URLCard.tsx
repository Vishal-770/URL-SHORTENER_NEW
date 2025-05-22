import { Card } from "@/components/ui/card";

import {
  BarChart2,
  ChartSpline,
  Check,
  Copy,
  ExternalLink,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import DeleteButton from "./DeleteButton";

import Qrcode from "./Qrcode";
import { Button } from "@/components/ui/button";

interface URL {
  _id: string;
  originalUrl: string;
  slug: string;
  qrCode: string;
  visitHistory?: { date: string }[];
  createdAt: string;
}

const URLCard = ({ url }: { url: URL }) => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(text);
    setTimeout(() => setCopiedSlug(null), 2000);
    toast.success("Copied to clipboard", {
      className: "bg-success text-success-foreground border-border",
    });
  };

  return (
    <Card className="p-5 group hover:border-primary/50 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2.5 flex-1 min-w-0">
          {/* existing URL info */}
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <a
              href={url.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline truncate"
              title={url.originalUrl}
            >
              {url.originalUrl}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Link
              href={`/redirect/${url.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline text-primary truncate"
              prefetch={false}
            >
              {`${process.env.NEXT_PUBLIC_BASE_URL}/redirect/${url.slug}`}
            </Link>
            <button
              onClick={() =>
                copyToClipboard(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/redirect/${url.slug}`
                )
              }
              className="ml-2 p-1 rounded hover:bg-accent transition-colors"
              aria-label="Copy to clipboard"
            >
              {copiedSlug ===
              `${process.env.NEXT_PUBLIC_BASE_URL}/redirect/${url.slug}` ? (
                <Check className="h-3 w-3 text-green-600" />
              ) : (
                <Copy className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <BarChart2 className="h-3 w-3" />
              {url.visitHistory?.length || 0} clicks
            </span>
            <span className="text-xs text-muted-foreground">
              Created: {new Date(url.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Right section with QR, Analyze, Delete */}
        <div className="flex flex-row flex-wrap items-center justify-start gap-2">
          <Qrcode qrCode={url.qrCode} />

          <Link href={`dashboard/analyze?slug=${url.slug}`}>
            <Button variant="outline" className="text-sm whitespace-nowrap">
              <ChartSpline className="mr-2 h-4 w-4" />
              Analyze
            </Button>
          </Link>

          <DeleteButton slug={url.slug} />
        </div>
      </div>
    </Card>
  );
};

export default URLCard;
