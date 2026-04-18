"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: { dayLabel: string; visits: number }[];
  title: string;
  description: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-xl ring-1 ring-black/5">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-secondary" />
          <p className="text-xl font-black text-foreground tabular-nums">{payload[0].value}</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase self-end mb-1">Clicks</p>
        </div>
      </div>
    );
  }
  return null;
};

const LineChartGraph = ({ data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid 
          vertical={false} 
          strokeDasharray="3 3" 
          stroke="var(--border)" 
          opacity={0.15} 
        />
        <XAxis
          dataKey="dayLabel"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 9, fontWeight: 700, fill: "var(--muted-foreground)" }}
          dy={10}
          interval="preserveStartEnd"
          minTickGap={30}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 9, fontWeight: 700, fill: "var(--muted-foreground)" }}
          dx={-10}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="visits"
          stroke="var(--secondary)"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorVisits)"
          animationDuration={1500}
          activeDot={{ r: 5, strokeWidth: 0, fill: "var(--secondary)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
