"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  History, 
  MapPin, 
  Link2, 
  ChevronLeft, 
  ChevronRight,
  Loader2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { getPaginatedHistory } from "./actions";
import { toast } from "sonner";

interface VisitEntry {
  timestamp: Date;
  ip: string;
  deviceType: string;
  os: string;
  browser: string;
  referrer: string;
  userAgent: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  isBot?: boolean;
  language?: string;
}

const VisitHistoryTable = ({ slug, initialTotal }: { slug: string; initialTotal: number }) => {
  const [data, setData] = useState<VisitEntry[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 10));
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(initialTotal);

  const fetchPage = useCallback(async (pageNum: number) => {
    try {
      setIsLoading(true);
      const result = await getPaginatedHistory(slug, pageNum, 10);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      setData(result.data);
      setTotalPages(result.pages);
      setTotal(result.total);
    } catch {
      toast.error("Failed to load activity");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPage(page);
  }, [page, fetchPage]);

  if (!isLoading && data.length === 0) {
    return (
      <div className="py-24 text-center text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-40 border-t border-border/10 mt-12">
        Awaiting visitors... Listening for activity.
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <History className="w-4 h-4 text-secondary" />
              Recent Activity
            </h3>
            <p className="text-[10px] text-muted-foreground font-bold uppercase opacity-50">Full log of recent link visits</p>
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase text-muted-foreground/60 tabular-nums">
              Page {page} of {totalPages || 1}
            </span>
            <div className="flex items-center gap-1">
               <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-md border-border/10 bg-muted/5 transition-all disabled:opacity-20"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1 || isLoading}
               >
                  <ChevronLeft className="h-4 w-4" />
               </Button>
               <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-md border-border/10 bg-muted/5 transition-all disabled:opacity-20"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || isLoading}
               >
                  <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
          </div>
        </div>

        <div className="w-full relative min-h-[400px]">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/20 backdrop-blur-[1px]">
               <Loader2 className="h-6 w-6 animate-spin text-secondary" />
            </div>
          )}
          
          <Table>
            <TableHeader className="border-y border-border/10 bg-muted/5">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="h-10 text-[10px] font-black uppercase tracking-widest text-foreground/70">Visitor</TableHead>
                <TableHead className="h-10 text-[10px] font-black uppercase tracking-widest text-foreground/70 min-w-[140px]">Location</TableHead>
                <TableHead className="h-10 text-[10px] font-black uppercase tracking-widest text-foreground/70">Device</TableHead>
                <TableHead className="h-10 text-[10px] font-black uppercase tracking-widest text-foreground/70">Referrer</TableHead>
                <TableHead className="h-10 text-[10px] font-black uppercase tracking-widest text-foreground/70">Technical Info</TableHead>
                <TableHead className="h-10 text-[10px] font-black uppercase tracking-widest text-foreground/70 text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow key={index} className="transition-colors hover:bg-muted/20 border-b border-border/5 group">
                  <TableCell className="py-4">
                    {entry.isBot ? (
                      <Badge variant="outline" className="rounded-md border-orange-500/20 bg-orange-500/5 text-[9px] font-black uppercase tracking-widest text-orange-500 px-2 h-5 shadow-none">
                         Bot
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="rounded-md border-secondary/20 bg-secondary/5 text-[9px] font-black uppercase tracking-widest text-secondary px-2 h-5 shadow-none">
                         Human
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-bold tracking-tight text-foreground/90">
                         {entry.country || "Unknown"}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40 flex items-center gap-1">
                         <MapPin className="h-2.5 w-2.5" />
                         {entry.city || "Direct"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-bold text-foreground/80 tracking-tight">{entry.browser}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">{entry.os} / {entry.deviceType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                      <Tooltip>
                        <TooltipTrigger className="text-left">
                          <div className="flex items-center gap-2 bg-muted/20 rounded-md px-2 py-1 border border-border/5 transition-colors group-hover:bg-muted/40">
                             <Link2 className="h-3 w-3 text-secondary/50" />
                             <span className="text-[10px] font-bold text-muted-foreground/80 truncate max-w-[100px]">{entry.referrer === "unknown" ? "Direct" : entry.referrer}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px] break-all text-[10px] font-bold p-3 bg-card shadow-xl border-border/20">
                           {entry.referrer}
                        </TooltipContent>
                      </Tooltip>
                  </TableCell>
                  <TableCell className="py-4">
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-muted-foreground opacity-70 leading-none">{entry.ip}</span>
                        <Tooltip>
                          <TooltipTrigger className="text-left">
                            <span className="text-[9px] font-bold text-muted-foreground/30 truncate max-w-[140px] block cursor-help italic">
                               {entry.userAgent}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[400px] break-all text-[10px] font-bold p-3 bg-card border-border shadow-2xl">
                             {entry.userAgent}
                          </TooltipContent>
                        </Tooltip>
                     </div>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <span className="text-[11px] font-black text-muted-foreground/60 tabular-nums">
                      {new Date(entry.timestamp).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: false
                      })}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="pt-8 text-center">
             <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30">
                End of current synchronization set • Total records: {total}
             </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default VisitHistoryTable;
