import React from "react";
import { dbConnect } from "@/database/connection";
import ShortUrl from "@/database/models/shortUrlmodel";
import PieChartComponent from "./Piechart";
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
}

interface URL {
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
  searchParams: Promise<{ slug?: string }>;
}) => {
  const { slug } = await searchParams;
  await dbConnect();
  const Url: URL | null = await ShortUrl.findOne({ slug });

  const osObj: Record<string, number> = {};
  const deviceObj: Record<string, number> = {};
  const browserObj: Record<string, number> = {};
  const ip: string[] = [];

  if (Url?.visitHistory) {
    for (const i of Url.visitHistory) {
      osObj[i.os] = (osObj[i.os] || 0) + 1;
      deviceObj[i.deviceType] = (deviceObj[i.deviceType] || 0) + 1;
      browserObj[i.browser] = (browserObj[i.browser] || 0) + 1;
      ip.push(i.ip);
    }
  }

  const osChartData = Object.entries(osObj).map(([key, value], index) => ({
    os: key,
    visitors: value,
    fill: `var(--color-os-${(index % 5) + 1})`,
  }));

  const deviceChartData = Object.entries(deviceObj).map(
    ([key, value], index) => ({
      device: key,
      visitors: value,
      fill: `var(--color-device-${(index % 5) + 1})`,
    })
  );

  const browserChartData = Object.entries(browserObj).map(
    ([key, value], index) => ({
      browser: key,
      visitors: value,
      fill: `var(--color-browser-${(index % 5) + 1})`,
    })
  );
  const data: VisitEntry[] | undefined = Url?.visitHistory;
  const processData = () => {
    const now = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(now.getDate() - 9); // 9 days ago + today = 10 days total

    // Filter visits from last 10 days
    const recentVisits = (data ?? []).filter((visit) => {
      const visitDate = new Date(visit.timestamp);
      return visitDate >= tenDaysAgo && visitDate <= now;
    });

    // Group by day and count visits
    const dailyData: Record<string, number> = {};

    recentVisits.forEach((visit) => {
      const visitDate = new Date(visit.timestamp);
      // Format as YYYY-MM-DD for consistent key
      const dateKey = visitDate.toISOString().split("T")[0];
      dailyData[dateKey] = (dailyData[dateKey] || 0) + 1;
    });

    // Create array for all 10 days, including those with 0 visits
    const completeData = [];
    const date = new Date(tenDaysAgo);

    while (date <= now) {
      const dateKey = date.toISOString().split("T")[0];
      const dayLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      completeData.push({
        date: dateKey,
        dayLabel,
        visits: dailyData[dateKey] || 0,
      });

      date.setDate(date.getDate() + 1);
    }

    return completeData;
  };
  const LineChartData = processData();
  // console.log(LineChartData);

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-6 md:space-y-8">
      {/* Chart Grid - Responsive Columns */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Your PieChartComponents remain the same */}
        <PieChartComponent
          chartData={browserChartData}
          dataKeyName="browser"
          title="Browser Details"
          footerText="Breakdown of users by browser"
        />
        <PieChartComponent
          chartData={deviceChartData}
          dataKeyName="device"
          title="Device Types"
          footerText="Breakdown of users by device"
        />
        <PieChartComponent
          chartData={osChartData}
          dataKeyName="os"
          title="Operating Systems"
          footerText="Breakdown of users by OS"
        />
      </div>

      {/* Scrollable Line Chart Container */}
      <div className="rounded-lg border bg-background p-2 shadow-sm overflow-x-auto">
        <div className="min-w-[600px]">
          {" "}
          {/* Set minimum width for scrollable area */}
          <LineChartGraph data={LineChartData} />
        </div>
      </div>

      {/* Table Section - Responsive Container */}
      <div className="rounded-lg border bg-background p-2 sm:p-3 md:p-4 shadow-sm overflow-x-auto">
        <VisitHistoryTable data={Url?.visitHistory ?? []} />
      </div>
    </div>
  );
};

export default Page;
