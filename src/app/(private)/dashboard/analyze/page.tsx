import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import AnalyticsCharts from "./AnalyticsCharts";
import AnalyticsRangeToggler from "./AnalyticsRangeToggler";
import Link from "next/link";
import { 
  Activity, 
  MousePointer2, 
  Users, 
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Zap,
  QrCode
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VisitHistoryTable from "./VisitHistoryTable";
import LineChartGraph from "./LineChart";

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
  visitorId?: string;
  referringDomain?: string;
}

interface AnalyticsUrlData {
  _id?: string;
  originalUrl: string;
  slug: string;
  userId: string;
  visitHistory: VisitEntry[];
  createdAt: Date;
  qrCode: string;
  updatedAt: Date;
}

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; range?: string }>;
}) => {
  const { slug, range = "7d" } = await searchParams;
  await dbConnect();
  
  // Optimization: Fetch only needed data for primary metrics
  const Url = await ShortUrl.findOne({ slug }).lean() as AnalyticsUrlData | null;

  // Full History for Lifetime Metrics (Server-side calculation only)
  const fullHistory = Url?.visitHistory || [];
  const totalVisitsLifetime = fullHistory.length;
  
  // Scoped History calculation for line chart
  const now = new Date();
  const startDate = new Date();

  switch (range) {
    case "1m":
      startDate.setMonth(now.getMonth() - 1);
      break;
    case "3m":
      startDate.setMonth(now.getMonth() - 3);
      break;
    case "6m":
      startDate.setMonth(now.getMonth() - 6);
      break;
    case "1y":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default: // 7d
      startDate.setDate(now.getDate() - 7);
  }

  const filteredHistory = fullHistory.filter(
    (v) => new Date(v.timestamp) >= startDate
  );

  // Aggregation for Lifetime Metrics (Performed once on server)
  const osObj: Record<string, number> = {};
  const deviceObj: Record<string, number> = {};
  const browserObj: Record<string, number> = {};
  const countryObj: Record<string, number> = {};
  const cityObj: Record<string, number> = {};
  const regionObj: Record<string, number> = {};
  const referralObj: Record<string, number> = {};
  const languageObj: Record<string, number> = {};
  const trafficTypeObj: Record<string, number> = { Human: 0, Bot: 0 };
  const uniqueVisitorsTotal = new Set<string>();

  for (const i of fullHistory) {
    osObj[i.os || "Unknown"] = (osObj[i.os || "Unknown"] || 0) + 1;
    deviceObj[i.deviceType || "Desktop"] = (deviceObj[i.deviceType || "Desktop"] || 0) + 1;
    browserObj[i.browser || "Unknown"] = (browserObj[i.browser || "Unknown"] || 0) + 1;
    countryObj[i.country || "Unknown"] = (countryObj[i.country || "Unknown"] || 0) + 1;
    cityObj[i.city || "Unknown"] = (cityObj[i.city || "Unknown"] || 0) + 1;
    regionObj[i.region || "Unknown"] = (regionObj[i.region || "Unknown"] || 0) + 1;
    referralObj[i.referringDomain || "Direct"] = (referralObj[i.referringDomain || "Direct"] || 0) + 1;
    languageObj[i.language || "Unknown"] = (languageObj[i.language || "Unknown"] || 0) + 1;
    
    if (i.isBot) trafficTypeObj.Bot++;
    else trafficTypeObj.Human++;

    if (i.visitorId) uniqueVisitorsTotal.add(i.visitorId);
  }

  // Derive Simple Insights
  const getTop = (obj: Record<string, number>) => {
    const sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || "None";
  };

  const topInsight = {
    location: getTop(cityObj),
    device: getTop(deviceObj),
    browser: getTop(browserObj),
    os: getTop(osObj)
  };

  const formatDataForBar = (obj: Record<string, number>, limit = 6) => 
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, value]) => ({ name, value }));

  const deviceMix = Object.entries(deviceObj).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    percentage: totalVisitsLifetime ? Math.round((value / totalVisitsLifetime) * 100) : 0
  }));

  const processDataForLine = () => {
    const dailyData: Record<string, number> = {};
    filteredHistory.forEach((visit) => {
      const vDate = new Date(visit.timestamp);
      const key = vDate.toISOString().split("T")[0];
      dailyData[key] = (dailyData[key] || 0) + 1;
    });

    const completeData = [];
    const dateCursor = new Date(startDate);
    while (dateCursor <= now) {
      const key = dateCursor.toISOString().split("T")[0];
      const label = dateCursor.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      completeData.push({ dayLabel: label, visits: dailyData[key] || 0 });
      dateCursor.setDate(dateCursor.getDate() + 1);
    }
    return completeData;
  };

  const lineChartData = processDataForLine();

  return (
    <div className="space-y-10 pb-24">
      {/* Smart Nav & Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-border/10 pb-10 pt-4">
        <div className="space-y-3">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
          <div className="flex items-center gap-3">
             <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
               {slug ? `/${slug}` : "Select Link"}
             </h1>
             {slug && <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-2 h-5 font-bold uppercase text-[9px] tracking-widest">Live</Badge>}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           {slug && (
              <Button asChild variant="outline" className="h-12 px-6 rounded-2xl border-secondary/20 bg-secondary/5 text-secondary font-black uppercase text-[10px] tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all shadow-lg shadow-secondary/5">
                <Link href={`/dashboard/url/${slug}/qr`} className="flex items-center gap-2">
                   <QrCode className="h-4 w-4" /> Design QR
                </Link>
              </Button>
           )}
           
           {/* Quick Summary Insight */}
           {slug && (
              <div className="hidden lg:flex items-center gap-6 rounded-xl border border-border/5 bg-muted/5 p-4 pr-6">
                 <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary border border-secondary/10">
                    <Sparkles className="h-4.5 w-4.5" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Best Guess Insight</p>
                    <p className="text-xs font-bold text-foreground/90">
                       Mainly <span className="text-secondary">{topInsight.device}</span> users from <span className="text-secondary">{topInsight.location}</span>.
                    </p>
                 </div>
              </div>
           )}
        </div>
      </div>

      {slug ? (
        <div className="space-y-16">
          {/* Dashboard Matrix: Stats & Trends */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
             {/* Left: Quick Stats Matrix */}
             <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
               <MatrixStat label="Total Clicks" value={totalVisitsLifetime} icon={<MousePointer2 />} color="text-secondary" />
               <MatrixStat label="Unique People" value={uniqueVisitorsTotal.size} icon={<Users />} color="text-blue-500" />
               <MatrixStat label="Real Users" value={trafficTypeObj.Human} icon={<ShieldCheck />} color="text-emerald-500" />
               <MatrixStat label="Bots Filtered" value={trafficTypeObj.Bot} icon={<Zap />} color="text-orange-500" />
             </div>

             {/* Center/Right: Click Activity */}
             <div className="lg:col-span-9 space-y-8 rounded-2xl border border-border/10 bg-muted/5 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="space-y-1">
                      <h3 className="text-xs font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                        <Activity className="h-3 w-3 text-secondary" />
                        Click Trends
                      </h3>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Daily performance track</p>
                   </div>
                   <AnalyticsRangeToggler />
                </div>
                <div className="h-[320px] w-full">
                   <LineChartGraph data={lineChartData} title="" description="" />
                </div>
             </div>
          </div>

          {/* Audience Breakdown Matrix */}
          <div className="pt-8">
             <AnalyticsCharts 
               countryData={formatDataForBar(countryObj)} 
               browserData={formatDataForBar(browserObj)} 
               referralData={formatDataForBar(referralObj, 10)}
               osData={formatDataForBar(osObj)}
               cityData={formatDataForBar(cityObj, 8)}
               regionData={formatDataForBar(regionObj, 6)}
               deviceMix={deviceMix}
               languageData={formatDataForBar(languageObj, 5)}
             />
          </div>

          {/* Activity Log - Efficiently Paginated */}
          <div className="space-y-6 border-t border-border/10 pt-16">
             <VisitHistoryTable slug={slug as string} initialTotal={totalVisitsLifetime} />
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border/30 py-32 text-center bg-muted/5">
           <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
             Infrastructure sync required. Select a link.
           </p>
        </div>
      )}
    </div>
  );
};

function MatrixStat({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="relative group overflow-hidden rounded-xl border border-border/10 bg-muted/5 p-5 transition-all hover:bg-muted/10">
      <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 border border-border/5 ${color}`}>
        {icon}
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{label}</p>
      <p className="mt-1 text-4xl font-black tracking-tighter text-foreground tabular-nums leading-none">{value}</p>
      <div className={`absolute bottom-0 left-0 h-1 w-full bg-current opacity-10 transition-all group-hover:opacity-20 ${color}`} />
    </div>
  );
}

export default Page;
