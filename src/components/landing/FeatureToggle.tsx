"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Zap, Shield, TrendingUp, Globe, Lock, Zap as ZapIcon } from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  shortDesc: string;
  fullDesc: string;
}

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    shortDesc: "Instant Redirects",
    fullDesc: "Users experience millisecond redirects. Built on edge infrastructure for maximum speed.",
  },
  {
    icon: Shield,
    title: "Rock Solid",
    shortDesc: "Link Protection",
    fullDesc: "Every link is verified for safety before activation. Malware protection included.",
  },
  {
    icon: TrendingUp,
    title: "Data Driven",
    shortDesc: "Real Analytics",
    fullDesc: "Track clicks, geography, devices, and trends in real-time with our comprehensive dashboard.",
  },
  {
    icon: Globe,
    title: "Globally Connected",
    shortDesc: "Always Available",
    fullDesc: "99.99% uptime across 42+ edge locations. Your links work everywhere, always.",
  },
  {
    icon: Lock,
    title: "Enterprise Grade",
    shortDesc: "Secure Links",
    fullDesc: "End-to-end encryption, compliance certifications, and audit logs for enterprise peace of mind.",
  },
  {
    icon: ZapIcon,
    title: "Developer Friendly",
    shortDesc: "Easy Integration",
    fullDesc: "Simple REST API with SDKs for all major languages. Get started in minutes.",
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
  isFlipped: boolean;
  onToggle: () => void;
}

function FeatureCard({ feature, index, isFlipped, onToggle }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !frontRef.current || !backRef.current) return;

    if (isFlipped) {
      // Flip to back (180 degrees)
      gsap.to(cardRef.current, {
        rotationY: 180,
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(frontRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(backRef.current, { opacity: 1, duration: 0.3, delay: 0.3 });
    } else {
      // Flip to front (0 degrees)
      gsap.to(cardRef.current, {
        rotationY: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(frontRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(backRef.current, { opacity: 0, duration: 0.3, delay: 0.3 });
    }
  }, { dependencies: [isFlipped] });

  useGSAP(() => {
    // Initial entrance animation
    gsap.from(cardRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: index * 0.08,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Stagger rotation on entrance
    gsap.from(cardRef.current, {
      rotationX: -20,
      duration: 0.6,
      ease: "power2.out",
      delay: index * 0.08 + 0.1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      onClick={onToggle}
      className="feature-card h-full cursor-pointer preserve-3d"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Front */}
      <div
        ref={frontRef}
        className="absolute inset-0 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm opacity-100 transition-opacity duration-300 flex flex-col justify-between"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="space-y-4 md:space-y-6">
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <feature.icon className="h-6 md:h-7 lg:h-8 w-6 md:w-7 lg:w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl lg:text-2xl font-black text-foreground uppercase italic">
              {feature.title}
            </h3>
            <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
              {feature.shortDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest text-muted-foreground/60">
            Click to learn more
          </p>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/20 flex items-center justify-center">
            <span className="text-primary font-black text-sm">→</span>
          </div>
        </div>
      </div>

      {/* Back */}
      <div
        ref={backRef}
        className="absolute inset-0 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 backdrop-blur-sm opacity-0 transition-opacity duration-300 flex flex-col justify-between"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <div className="space-y-4">
          <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed font-medium">
            {feature.fullDesc}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest text-muted-foreground/60">
            Click to close
          </p>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/20 flex items-center justify-center">
            <span className="text-primary font-black text-sm">←</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureToggle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  useGSAP(() => {
    // Section heading entrance
    gsap.from(".feature-toggle-heading", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".feature-toggle-heading",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

  const toggleFlip = (index: number) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-40 lg:py-52 px-4 md:px-6 lg:px-8 border-t border-b border-border/10 bg-gradient-to-b from-background via-background to-primary/5"
    >
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-20 lg:space-y-24">
        {/* Section Header */}
        <div className="feature-toggle-heading text-center space-y-4 md:space-y-6">
          <p className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.6em] text-primary">
            Feature Deep Dive
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase italic">
            What Makes Us <span className="text-primary">Different?</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Click any card to discover what powers our platform. Built for speed, security, and simplicity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 auto-rows-[300px] md:auto-rows-[320px] lg:auto-rows-[360px]">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="relative"
              style={{
                perspective: "1000px",
              }}
            >
              <FeatureCard
                feature={feature}
                index={i}
                isFlipped={!!flipped[i]}
                onToggle={() => toggleFlip(i)}
              />
            </div>
          ))}
        </div>

        {/* Interactive hint */}
        <div className="text-center pt-8 md:pt-12">
          <p className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/60">
            💡 Interactive cards — hover and click to explore
          </p>
        </div>
      </div>
    </section>
  );
}
