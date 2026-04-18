"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useMemo } from "react";

interface HeatmapData {
  day: string;
  hour: number;
  value: number;
}

interface HeatmapChartProps {
  data: HeatmapData[];
}

export default function HeatmapChart({ data }: HeatmapChartProps) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);

  const getIntensity = (val: number) => {
    if (val === 0) return "bg-muted/10";
    const ratio = val / maxValue;
    if (ratio < 0.25) return "bg-secondary/20";
    if (ratio < 0.5) return "bg-secondary/40";
    if (ratio < 0.75) return "bg-secondary/70";
    return "bg-secondary";
  };

  return (
    <div className="space-y-8 rounded-2xl border border-border/10 bg-muted/5 p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xs font-black uppercase tracking-widest text-foreground flex items-center gap-2">
            <Clock className="h-3 w-3 text-secondary" />
            Engagement Heatmap
          </h3>
          <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Hourly click density across the week</p>
        </div>
        
        <div className="flex items-center gap-2">
           <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Intensity</span>
           <div className="flex gap-1">
              <div className="h-2 w-2 rounded-sm bg-muted/20" />
              <div className="h-2 w-2 rounded-sm bg-secondary/20" />
              <div className="h-2 w-2 rounded-sm bg-secondary/70" />
              <div className="h-2 w-2 rounded-sm bg-secondary" />
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-x-auto pb-4 custom-scrollbar lg:overflow-x-visible">
        <div className="flex min-w-[600px] lg:min-w-0">
          {/* Hour Labels */}
          <div className="w-10 shrink-0" />
          <div className="grid grid-cols-24 flex-1">
            {hours.map(h => (
              <span key={h} className="text-[8px] font-black text-muted-foreground/40 text-center select-none">
                {h === 0 || h === 12 ? `${h === 0 ? 12 : 12} ${h < 12 ? 'AM' : 'PM'}` : ''}
              </span>
            ))}
          </div>
        </div>

        {days.map((day, dIdx) => (
          <div key={day} className="flex min-w-[600px] items-center gap-2 lg:min-w-0">
            {/* Day Label */}
            <span className="w-10 shrink-0 text-[10px] font-black text-muted-foreground/60 select-none">{day}</span>
            
            <div className="grid grid-cols-24 flex-1 gap-1">
              {hours.map(h => {
                const cell = data.find(item => item.day === day && item.hour === h);
                const val = cell?.value || 0;
                return (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (dIdx * 0.05) + (h * 0.01) }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    title={`${day} ${h}:00 - ${val} clicks`}
                    className={`aspect-square rounded-[4px] cursor-help transition-colors duration-300 ${getIntensity(val)}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border/5 flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Traffic Mapping</span>
            </div>
         </div>
         <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] italic">LinkLayer Infrastructure v4.2</p>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--secondary), 0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--secondary), 0.3);
        }
        .grid-cols-24 {
          grid-template-columns: repeat(24, minmax(0, 1fr));
        }
      `}</style>
    </div>
  );
}
