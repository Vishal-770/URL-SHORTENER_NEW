"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Activity, Users, TrendingUp, Shield } from "lucide-react";

const STATS = [
  { icon: Activity, value: 50, label: "Million+", desc: "Links Created", suffix: "M" },
  { icon: Users, value: 100, label: "Thousand+", desc: "Active Users", suffix: "K" },
  { icon: TrendingUp, value: 99, label: "Point", desc: "Uptime SLA", suffix: "%" },
  { icon: Shield, value: 24, label: "Hour", desc: "Support Response", suffix: "/7" },
];

interface CounterProps {
  icon: React.ComponentType<{ className: string }>;
  value: number;
  label: string;
  desc: string;
  suffix: string;
}

function Counter({ icon: Icon, value, label, desc, suffix }: CounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Count up animation
    const counter = { count: 0 };
    gsap.to(counter, {
      count: value,
      snap: { count: 1 },
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function () {
        if (numberRef.current) {
          numberRef.current.textContent = Math.round(counter.count).toString();
        }
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Rotating background shape
    const spinnerEl = containerRef.current?.querySelector(".stat-spinner");
    if (spinnerEl) {
      gsap.to(spinnerEl, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }

    // Container entrance
    gsap.from(containerRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Icon scale pulse
    const iconEl = containerRef.current?.querySelector(".stat-icon");
    if (iconEl) {
      gsap.from(iconEl, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative p-6 md:p-8 lg:p-10 rounded-2xl border border-border/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden group"
    >
      {/* Animated background shape */}
      <div
        className="stat-spinner absolute -top-12 -right-12 w-48 h-48 rounded-full border border-primary/10 opacity-20"
      />
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-primary/10 opacity-10 animate-pulse"
      />

      <div className="relative z-10 space-y-4 md:space-y-6">
        {/* Icon */}
        <div className="stat-icon w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="h-6 md:h-7 lg:h-8 w-6 md:w-7 lg:w-8 text-primary" />
        </div>

        {/* Counter */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-1">
            <span
              ref={numberRef}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tabular-nums"
            >
              0
            </span>
            <span className="text-xl md:text-2xl lg:text-3xl font-black text-foreground/60">
              {suffix}
            </span>
          </div>
          <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            {label}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground font-medium">
          {desc}
        </p>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      </div>
    </div>
  );
}

export default function StatCounters() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Section entrance
    gsap.from(".stat-section-heading", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".stat-section-heading",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-40 lg:py-52 px-4 md:px-6 lg:px-8 border-t border-b border-border/10 bg-gradient-to-b from-background via-primary/5 to-background"
    >
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-20 lg:space-y-24">
        {/* Section Header */}
        <div className="stat-section-heading text-center space-y-4 md:space-y-6">
          <p className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.6em] text-primary">
            By The Numbers
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase italic">
            Our <span className="text-primary">Impact</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Trusted by millions to deliver fast, reliable link shortening at scale.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {STATS.map((stat, i) => (
            <Counter
              key={i}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              desc={stat.desc}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
