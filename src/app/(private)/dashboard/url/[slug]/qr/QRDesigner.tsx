"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { 
  Palette, 
  Shapes, 
  ImageIcon, 
  Type, 
  Download, 
  RotateCcw, 
  Save,
  Layers,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { saveQrOptions } from "./actions";
import { IQROptions } from "@/database/models/shortUrlmodel";

interface QRCodeInstance {
  download: (name: string) => void;
}

const DEFAULT_OPTIONS = {
  width: 1024,
  height: 1024,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: 2,
  dotScale: 1.0,
  dotScaleTiming: 1.0,
  dotScaleA: 1.0,
  quietZone: 10,
  quietZoneColor: "rgba(0,0,0,0)",
  logo: undefined as string | undefined,
  logoWidth: undefined as number | undefined,
  logoHeight: undefined as number | undefined,
  logoBackgroundTransparent: true,
  logoBackgroundColor: "#ffffff",
  backgroundImage: undefined as string | undefined,
  backgroundImageAlpha: 1.0,
  PO: undefined as string | undefined,
  PI: undefined as string | undefined,
  AO: undefined as string | undefined,
  AI: undefined as string | undefined,
  timing: undefined as string | undefined,
  title: "",
  titleFont: "bold 32px Outfit, sans-serif",
  titleColor: "#000000",
  titleBackgroundColor: "#ffffff",
  titleHeight: 0,
  titleTop: 40,
  titleSize: 32,
  titleWeight: "bold",
  titleFamily: "Outfit, sans-serif",
  subTitle: "",
  subTitleFont: "14px Outfit, sans-serif",
  subTitleColor: "#4F4F4F",
  subTitleTop: 60,
  subTitleSize: 14,
  subTitleWeight: "400",
  subTitleFamily: "Outfit, sans-serif",
  drawer: "canvas",
} as const;

type QRDesignerOptions = typeof DEFAULT_OPTIONS & Record<string, unknown>;

interface QRDesignerProps {
  slug: string;
  targetUrl: string;
  initialOptions: IQROptions | null;
  currentQrCode: string;
}

export default function QRDesigner({ slug, targetUrl, initialOptions, currentQrCode }: QRDesignerProps) {
  const [options, setOptions] = useState<QRDesignerOptions>(() => {
    if (initialOptions) {
      return { ...DEFAULT_OPTIONS, ...initialOptions, text: targetUrl };
    }
    return { ...DEFAULT_OPTIONS, text: targetUrl };
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastRenderedData, setLastRenderedData] = useState<string>(currentQrCode || "");
  const [useDesignEngine, setUseDesignEngine] = useState(!!initialOptions);
  const qrcodeContainer = useRef<HTMLDivElement>(null);
  const qrcodeInstance = useRef<QRCodeInstance | null>(null);

  const renderQRCode = useCallback(async () => {
    if (!qrcodeContainer.current || !useDesignEngine) return;
    qrcodeContainer.current.innerHTML = "";
    try {
      const QRCode = (await import("easyqrcodejs")).default;
      const titleFont = `${options.titleWeight || "bold"} ${options.titleSize || 32}px ${options.titleFamily || "Outfit, sans-serif"}`;
      const subTitleFont = `${options.subTitleWeight || "400"} ${options.subTitleSize || 14}px ${options.subTitleFamily || "Outfit, sans-serif"}`;
      const renderOptions = {
        ...options,
        text: targetUrl,
        titleFont,
        subTitleFont,
        width: 1024,
        height: 1024,
         onRenderingEnd: (_qrOptions: unknown, dataURL: string) => {
          setLastRenderedData(dataURL);
        },
      };
      qrcodeInstance.current = new QRCode(qrcodeContainer.current, renderOptions);
      const el = qrcodeContainer.current.querySelector("canvas, svg") as HTMLElement;
      if (el) {
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.maxWidth = "100%";
        el.style.display = "block";
      }
    } catch (error) {
      console.error("QR Render Error:", error);
    }
  }, [options, targetUrl, useDesignEngine]);

  useEffect(() => {
    if (!useDesignEngine) return;
    const timer = setTimeout(() => { renderQRCode(); }, 150);
    return () => clearTimeout(timer);
  }, [renderQRCode, useDesignEngine]);

  const updateOption = (key: string, value: unknown) => {
    if (!useDesignEngine) setUseDesignEngine(true);
    setOptions((prev: QRDesignerOptions) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await saveQrOptions(slug, options, lastRenderedData);
    setIsSaving(false);
    if (result.success) {
      toast.success("Design saved successfully");
    } else {
      toast.error(result.error || "Failed to save");
    }
  };

  const handleDownload = () => {
    if (qrcodeInstance.current) {
      qrcodeInstance.current.download(`${slug}-qr`);
      toast.success("Downloading QR code...");
    } else if (lastRenderedData) {
      const a = document.createElement("a");
      a.href = lastRenderedData;
      a.download = `${slug}-qr.png`;
      a.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 512 * 1024) {
      toast.error("File exceeds 500KB limit");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => { updateOption(key, event.target?.result); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
      
      {/* ── Left: Settings Panel ── */}
      <div className="lg:col-span-7">
        <Tabs defaultValue="colors" className="w-full">
          {/* Tab Bar */}
          <TabsList className="w-full grid grid-cols-4 h-10 bg-muted/10 border border-border/10 rounded-lg p-0.5 mb-6">
            {[
              { value: "colors", icon: Palette, label: "Colors" },
              { value: "style",  icon: Shapes,  label: "Style"  },
              { value: "branding", icon: ImageIcon, label: "Brand" },
              { value: "text",   icon: Type,    label: "Text"   },
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-1.5 h-full rounded-md text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                <Icon className="h-3 w-3" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Panels */}
          <div className="border border-border/10 rounded-lg">

            {/* ── COLORS ── */}
            <TabsContent value="colors" className="m-0 p-6 space-y-6 focus-visible:outline-none">
              <SectionLabel>Dots & Background</SectionLabel>
              <div className="grid grid-cols-2 gap-4">
                <ColorControl label="Dot Color" sub="Main dots" value={options.colorDark}  onChange={(v) => updateOption("colorDark",  v)} />
                <ColorControl label="Background" sub="Background color" value={options.colorLight} onChange={(v) => updateOption("colorLight", v)} />
              </div>

              <Separator className="bg-border/10" />

              <SectionLabel>Corner Patterns</SectionLabel>
              <div className="grid grid-cols-2 gap-4">
                <ColorControl label="Outer Square"  sub="Corner outline" value={options.PO || options.colorDark} onChange={(v) => updateOption("PO", v)} />
                <ColorControl label="Inner Square"   sub="Corner center" value={options.PI || options.colorDark} onChange={(v) => updateOption("PI", v)} />
                <ColorControl label="Small Square" sub="Inner dot" value={options.AO || options.colorDark} onChange={(v) => updateOption("AO", v)} />
                <ColorControl label="Connecting Lines"     sub="Lines between corners"  value={options.timing || options.colorDark} onChange={(v) => updateOption("timing", v)} />
              </div>
            </TabsContent>

            {/* ── STYLE ── */}
            <TabsContent value="style" className="m-0 p-6 space-y-4 focus-visible:outline-none">
              <SectionLabel>Dot Sizes</SectionLabel>
              <SliderControl label="Main Dots"     sub="Size of main dots"       min={0.1} max={1} step={0.05} value={options.dotScale}       onChange={(v) => updateOption("dotScale",       v[0])} />
              <SliderControl label="Connecting Lines"     sub="Size of lines"      min={0.1} max={1} step={0.05} value={options.dotScaleTiming} onChange={(v) => updateOption("dotScaleTiming", v[0])} />
              <SliderControl label="Small Squares"  sub="Size of small squares"      min={0.1} max={1} step={0.05} value={options.dotScaleA}      onChange={(v) => updateOption("dotScaleA",      v[0])} />
              
              <Separator className="bg-border/10" />
              
              <SectionLabel>Spacing</SectionLabel>
              <SliderControl label="Border Space" sub="Empty space around QR" min={0} max={100} step={1} value={options.quietZone} onChange={(v) => updateOption("quietZone", v[0])} />
            </TabsContent>

            {/* ── BRANDING ── */}
            <TabsContent value="branding" className="m-0 p-6 space-y-6 focus-visible:outline-none">
              {/* Logo */}
              <SectionLabel icon={<ImageIcon className="h-3.5 w-3.5" />}>Center Logo</SectionLabel>
              <div className="space-y-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "logo")}
                  className="bg-background border-border/10 rounded-md text-[11px] font-medium"
                />
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-1 rounded-md border-border/20 font-black uppercase text-[9px] tracking-widest",
                      options.logoBackgroundTransparent && "border-secondary/30 bg-secondary/5 text-secondary"
                    )}
                    onClick={() => updateOption("logoBackgroundTransparent", !options.logoBackgroundTransparent)}
                  >
                    Transparent BG: {options.logoBackgroundTransparent ? "On" : "Off"}
                  </Button>
                  {!options.logoBackgroundTransparent && (
                    <div className="flex-1">
                      <ColorControl label="Logo BG" sub="Fill color" value={options.logoBackgroundColor} onChange={(v) => updateOption("logoBackgroundColor", v)} />
                    </div>
                  )}
                </div>
              </div>

              <Separator className="bg-border/10" />

              {/* Background Layer */}
              <SectionLabel icon={<Layers className="h-3.5 w-3.5" />}>Background Layer</SectionLabel>
              <div className="space-y-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "backgroundImage")}
                  className="bg-background border-border/10 rounded-md text-[11px] font-medium"
                />
                <SliderControl
                  label="Layer Opacity"
                  sub="Background alpha"
                  value={options.backgroundImageAlpha}
                  onChange={(v) => updateOption("backgroundImageAlpha", v[0])}
                />
              </div>
            </TabsContent>

            {/* ── TEXT ── */}
            <TabsContent value="text" className="m-0 p-6 space-y-6 focus-visible:outline-none">
              {/* Heading */}
              <SectionLabel icon={<Type className="h-3.5 w-3.5" />}>Top Text</SectionLabel>
              <Input
                placeholder="Enter text here"
                value={options.title}
                onChange={(e) => updateOption("title", e.target.value)}
                className="bg-background border-border/10 rounded-md font-medium"
              />
              <div className="grid grid-cols-2 gap-4">
                <ColorControl label="Color" sub="Text color" value={options.titleColor} onChange={(v) => updateOption("titleColor", v)} />
                <div className="space-y-2 p-3 border border-border/10 rounded-md bg-background">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Weight</Label>
                  <div className="flex gap-1.5">
                    {["normal", "bold", "900"].map((w) => (
                      <button
                        key={w}
                        onClick={() => updateOption("titleWeight", w)}
                        className={cn(
                          "flex-1 py-1 rounded text-[8px] font-black uppercase tracking-tight border transition-colors",
                          options.titleWeight === w
                            ? "bg-secondary border-secondary text-secondary-foreground"
                            : "border-border/20 text-muted-foreground"
                        )}
                      >
                        {w === "900" ? "Black" : w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SliderControl label="Font Size" sub="px" min={8} max={200} step={1} value={options.titleSize} onChange={(v) => updateOption("titleSize", v[0])} />
                <SliderControl label="Y-Position" sub="Top offset" min={0} max={1000} step={1} value={options.titleTop} onChange={(v) => updateOption("titleTop", v[0])} />
              </div>
              <div className="space-y-2 p-3 border border-border/10 rounded-md bg-background">
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Font Family</Label>
                <select
                  value={options.titleFamily}
                  onChange={(e) => updateOption("titleFamily", e.target.value)}
                  className="w-full bg-transparent text-[11px] font-bold border-none outline-none cursor-pointer text-foreground"
                >
                  <option value="Outfit, sans-serif">Outfit (Sans)</option>
                  <option value="Inter, Arial, sans-serif">Inter (Sans)</option>
                  <option value="'Courier New', Courier, monospace">Monospace</option>
                  <option value="Georgia, serif">Georgia (Serif)</option>
                </select>
              </div>

              <Separator className="bg-border/10" />

              {/* Subtitle */}
              <SectionLabel icon={<Search className="h-3.5 w-3.5" />}>Bottom Text</SectionLabel>
              <Input
                placeholder="Enter small text"
                value={options.subTitle}
                onChange={(e) => updateOption("subTitle", e.target.value)}
                className="bg-background border-border/10 rounded-md font-medium"
              />
              <div className="grid grid-cols-2 gap-4">
                <ColorControl label="Color" sub="Text color" value={options.subTitleColor} onChange={(v) => updateOption("subTitleColor", v)} />
                <div className="space-y-2 p-3 border border-border/10 rounded-md bg-background">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Family</Label>
                  <select
                    value={options.subTitleFamily}
                    onChange={(e) => updateOption("subTitleFamily", e.target.value)}
                    className="w-full bg-transparent text-[11px] font-bold border-none outline-none cursor-pointer text-foreground"
                  >
                    <option value="Outfit, sans-serif">Outfit (Sans)</option>
                    <option value="Inter, Arial, sans-serif">Inter (Sans)</option>
                    <option value="'Courier New', Courier, monospace">Monospace</option>
                    <option value="Georgia, serif">Georgia (Serif)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SliderControl label="Font Size" sub="px" min={8} max={200} step={1} value={options.subTitleSize} onChange={(v) => updateOption("subTitleSize", v[0])} />
                <SliderControl label="Y-Position" sub="Top offset" min={0} max={1000} step={1} value={options.subTitleTop} onChange={(v) => updateOption("subTitleTop", v[0])} />
              </div>
            </TabsContent>

          </div>
        </Tabs>
      </div>

      {/* ── Right: Preview & Actions ── */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Preview</p>
          <Badge
            variant="outline"
            className={cn(
              "border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-widest",
              useDesignEngine
                ? "bg-primary/10 text-primary"
                : "bg-emerald-500/10 text-emerald-500"
            )}
          >
            {useDesignEngine ? "Editing" : "Saved"}
          </Badge>
        </div>

        {/* QR Preview */}
        <div className="border border-border/10 rounded-lg bg-background p-6">
          <div className="aspect-square w-full bg-white rounded-md flex items-center justify-center overflow-hidden">
            {/* Show saved dashboard QR until user starts editing */}
            {!useDesignEngine && currentQrCode && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentQrCode}
                alt="Current QR Code"
                className="w-full h-full object-contain"
              />
            )}
            <div
              ref={qrcodeContainer}
              className={cn(
                "w-full h-full flex items-center justify-center",
                !useDesignEngine && "hidden"
              )}
            />
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 px-1">
          <span>1024 × 1024 px</span>
          <span>Error Correction: Medium</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-10 rounded-md border-border/20 font-black uppercase text-[10px] tracking-widest"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            className="h-10 rounded-md bg-secondary text-secondary-foreground font-black uppercase text-[10px] tracking-widest"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className={cn("mr-2 h-4 w-4", isSaving && "animate-spin")} />
            {isSaving ? "Saving..." : "Save Design"}
          </Button>
        </div>

        {/* Reset */}
        <div className="flex items-center justify-center gap-6 border-t border-border/10 pt-4">
          <button
            onClick={() => {
              setOptions({ ...DEFAULT_OPTIONS, text: targetUrl });
              setUseDesignEngine(false);
              toast.success("Reset to saved design");
            }}
            className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset to Saved
          </button>
          <span className="h-3 w-px bg-border/20" />
          <button
            onClick={() => {
              setOptions({ ...DEFAULT_OPTIONS, text: targetUrl });
              setUseDesignEngine(true);
              toast.success("Reset to default QR");
            }}
            className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function SectionLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-secondary">{icon}</span>}
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/60">{children}</p>
    </div>
  );
}

interface ColorControlProps {
  label: string;
  sub: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorControl({ label, sub, value, onChange }: ColorControlProps) {
  return (
    <div className="flex items-center justify-between p-3 border border-border/10 rounded-md bg-background">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/80">{label}</p>
        <p className="text-[9px] font-medium text-muted-foreground/50 uppercase">{sub}</p>
      </div>
      <div className="relative">
        <div
          className="h-7 w-7 rounded border border-border/20 cursor-pointer"
          style={{ backgroundColor: value }}
        />
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
    </div>
  );
}

interface SliderControlProps {
  label: string;
  sub: string;
  value: number;
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

function SliderControl({ label, sub, value, onChange, min = 0, max = 1, step = 0.05 }: SliderControlProps) {
  return (
    <div className="space-y-3 p-3 border border-border/10 rounded-md bg-background">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-foreground/80">{label}</p>
          <p className="text-[9px] font-medium text-muted-foreground/50 uppercase">{sub}</p>
        </div>
        <Badge variant="outline" className="bg-secondary/5 border-secondary/20 text-secondary font-black text-[10px] tabular-nums px-2">
          {value}
        </Badge>
      </div>
      <Slider
        value={[value]}
        max={max}
        min={min}
        step={step}
        onValueChange={onChange}
        className="cursor-pointer"
      />
    </div>
  );
}
