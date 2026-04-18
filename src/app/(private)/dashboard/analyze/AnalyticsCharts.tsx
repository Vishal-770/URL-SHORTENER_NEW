"use client";

import { 
  Chrome, 
  MousePointer2,
  Monitor,
  Smartphone,
  Navigation,
  Cpu,
  Activity,
  AppWindow,
  Terminal,
  SmartphoneIcon
} from "lucide-react";

interface AnalyticsChartsProps {
  countryData: { name: string; value: number }[];
  browserData: { name: string; value: number }[];
  referralData: { name: string; value: number }[];
  osData: { name: string; value: number }[];
  cityData: { name: string; value: number }[];
  regionData: { name: string; value: number }[];
  deviceMix: { name: string; value: number; percentage: number }[];
  languageData: { name: string; value: number }[];
}

export default function AnalyticsCharts({ 
  countryData, 
  browserData, 
  referralData,
  osData,
  cityData,
  regionData,
  deviceMix,
  languageData
}: AnalyticsChartsProps) {
  // Simple Icon Map
  const getOSIcon = (os: string) => {
    const low = os.toLowerCase();
    if (low.includes("win")) return <AppWindow className="h-3.5 w-3.5" />;
    if (low.includes("mac") || low.includes("ios")) return <Activity className="h-3.5 w-3.5" />;
    if (low.includes("linux") || low.includes("ubuntu")) return <Terminal className="h-3.5 w-3.5" />;
    if (low.includes("android")) return <SmartphoneIcon className="h-3.5 w-3.5" />;
    return <Cpu className="h-3.5 w-3.5" />;
  };

  return (
    <div className="space-y-20">
      {/* Devices & Browsers */}
      <div className="space-y-12">
        <div className="flex items-center gap-3">
           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary border border-secondary/10">
              <Cpu className="h-4.5 w-4.5" />
           </div>
           <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Audience Details</h2>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter opacity-50">Devices, Operating Systems, and Browsers</p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 items-start">
          {/* OS */}
          <div className="space-y-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-border/10 pb-4">Operating Systems</p>
            <div className="space-y-6">
              {osData.map((os) => (
                <div key={os.name} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <span className="text-secondary/60">{getOSIcon(os.name)}</span>
                    <span className="text-xs font-bold text-foreground/80 truncate">{os.name}</span>
                  </div>
                  <div className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary/50 rounded-full" 
                      style={{ width: `${Math.min(100, (os.value / (osData[0]?.value || 1)) * 100)}%` }} 
                    />
                  </div>
                  <span className="text-[10px] font-black text-secondary tabular-nums opacity-60 min-w-[20px] text-right">{os.value}</span>
                </div>
              ))}
              {osData.length === 0 && <p className="text-[10px] uppercase font-bold text-muted-foreground opacity-30">No OS data</p>}
            </div>
          </div>

          {/* Browser */}
          <div className="space-y-8 lg:px-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-border/10 pb-4">Browsers</p>
            <div className="space-y-6">
              {browserData.map((browser) => (
                <div key={browser.name} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Chrome className="h-3.5 w-3.5 text-secondary/60" />
                    <span className="text-xs font-bold text-foreground/80 truncate">{browser.name}</span>
                  </div>
                  <div className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary/50 rounded-full" 
                      style={{ width: `${Math.min(100, (browser.value / (browserData[0]?.value || 1)) * 100)}%` }} 
                    />
                  </div>
                  <span className="text-[10px] font-black text-secondary tabular-nums opacity-60 min-w-[20px] text-right">{browser.value}</span>
                </div>
              ))}
              {browserData.length === 0 && <p className="text-[10px] uppercase font-bold text-muted-foreground opacity-30">No Browser data</p>}
            </div>
          </div>

          {/* Device Mix */}
          <div className="space-y-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-border/10 pb-4">Device Types</p>
            <div className="space-y-6">
                {deviceMix.map((device) => (
                  <div key={device.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/30 border border-border/5">
                             {device.name === "Mobile" ? <Smartphone className="h-4.5 w-4.5 text-secondary" /> : <Monitor className="h-4.5 w-4.5 text-secondary" />}
                          </div>
                          <div>
                             <span className="text-xs font-black uppercase tracking-tighter block leading-none mb-1">{device.name}</span>
                             <span className="text-[9px] text-muted-foreground font-bold uppercase opacity-40">{device.value} visits</span>
                          </div>
                       </div>
                       <span className="text-xs font-black text-secondary tabular-nums">{device.percentage}%</span>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-secondary transition-all duration-1000 ease-out" 
                         style={{ width: `${device.percentage}%` }} 
                       />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Visitor Locations */}
      <div className="space-y-12 border-t border-border/10 pt-16">
        <div className="flex items-center gap-3">
           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary border border-secondary/10">
              <Navigation className="h-4.5 w-4.5" />
           </div>
           <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Visitor Locations</h2>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter opacity-50">Top Cities, Regions, and Countries</p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 items-start">
           {/* Cities */}
           <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-border/10 pb-4">Top Cities</p>
              <div className="space-y-1.5">
                 {cityData.map((city, idx) => (
                   <div key={city.name} className="flex items-center justify-between p-3 border border-border/5 rounded-lg bg-muted/5 transition-colors hover:bg-muted/10">
                      <div className="flex items-center gap-3 truncate">
                         <span className="text-[9px] font-black text-muted-foreground/20 tabular-nums">{idx + 1}</span>
                         <span className="text-xs font-bold truncate uppercase tracking-tight">{city.name}</span>
                      </div>
                      <span className="text-xs font-black text-secondary tabular-nums opacity-60">{city.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Regions */}
           <div className="space-y-6 lg:px-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-border/10 pb-4">Top Regions</p>
              <div className="space-y-1.5">
                 {regionData.map((region, idx) => (
                   <div key={region.name} className="flex items-center justify-between p-3 border border-border/5 rounded-lg bg-muted/5 transition-colors hover:bg-muted/10">
                      <div className="flex items-center gap-3 truncate">
                         <span className="text-[9px] font-black text-muted-foreground/20 tabular-nums">{idx + 1}</span>
                         <span className="text-xs font-bold truncate uppercase tracking-tight">{region.name}</span>
                      </div>
                      <span className="text-xs font-black text-secondary tabular-nums opacity-60">{region.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Countries */}
           <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-border/10 pb-4">Top Countries</p>
              <div className="grid grid-cols-2 gap-3">
                 {countryData.map((country) => (
                   <div key={country.name} className="flex flex-col p-4 border border-border/5 rounded-lg bg-muted/5">
                      <span className="text-xs font-black truncate uppercase mb-4 tracking-tight">{country.name}</span>
                      <div className="flex items-center justify-between pt-3 border-t border-border/5 text-[10px] font-black text-secondary tabular-nums">
                         <span>{country.value} visits</span>
                         <div className="h-1.5 w-1.5 bg-secondary rounded-full shadow-[0_0_8px_rgba(var(--secondary),0.5)]" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="space-y-12 border-t border-border/10 pt-16">
        <div className="flex items-center gap-3">
           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary border border-secondary/10">
              <MousePointer2 className="h-4.5 w-4.5" />
           </div>
           <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Traffic Sources</h2>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter opacity-50">Referrers and Languages</p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
           {/* Languages */}
           <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-border/10 pb-4">Top Languages</p>
              <div className="grid grid-cols-1 gap-1.5">
                {languageData.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between py-3.5 px-4 border border-border/5 rounded-md bg-muted/5 transition-all hover:bg-muted/10 group">
                     <span className="text-xs font-bold uppercase tracking-tighter text-foreground/80">{lang.name}</span>
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-secondary tabular-nums opacity-60">{lang.value}</span>
                        <div className="h-1 w-10 bg-muted/40 rounded-full overflow-hidden">
                           <div className="h-full bg-secondary/40 transition-all group-hover:bg-secondary" style={{width: `${Math.min(100, (lang.value / (languageData[0]?.value || 1)) * 100)}%`}} />
                        </div>
                     </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Referrers */}
           <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b border-border/10 pb-4">Referral Sites</p>
              <div className="grid grid-cols-1 gap-1.5">
                {referralData.map((ref, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 border border-border/5 rounded-md bg-muted/5 transition-all hover:bg-muted/10">
                    <div className="flex items-center gap-4 truncate">
                       <span className="text-[9px] font-black text-muted-foreground/20 tabular-nums">{idx + 1}</span>
                       <span className="text-xs font-bold tracking-tight lowercase text-foreground/80 truncate">{ref.name}</span>
                    </div>
                    <span className="text-xs font-black text-secondary tabular-nums opacity-70">{ref.value}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
