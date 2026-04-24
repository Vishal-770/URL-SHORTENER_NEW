"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface StickyImageMaskProps {
  src: string;
  title: string;
  subtitle: string;
}

export default function StickyImageMask({ src, title, subtitle }: StickyImageMaskProps) {
  const containerRef = useRef(null);
  const maskRef = useRef(null);

  useGSAP(() => {
    gsap.to(maskRef.current, {
      clipPath: "circle(75% at 50% 50%)",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        scrub: true,
        pin: true,
      }
    });

    gsap.from(".mask-text", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    // bg-foreground = #1a1a1a in dark, #333 in light — both look dark for contrast
    <div ref={containerRef} className="relative h-screen bg-foreground overflow-hidden border-y border-border/10">
      <div
        ref={maskRef}
        className="absolute inset-0 z-0 bg-primary"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      >
        <Image src={src} alt={title} fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6 space-y-8">
        <h3 className="mask-text text-[10px] font-mono uppercase tracking-[0.8em] text-primary">{subtitle}</h3>
        {/* text-background inverts correctly in both modes */}
        <h2 className="mask-text text-6xl md:text-9xl font-black tracking-tighter text-background uppercase italic leading-none">
          {title}
        </h2>
        <div className="mask-text w-[2px] h-24 bg-background/20 mt-12 animate-pulse" />
      </div>
    </div>
  );
}
