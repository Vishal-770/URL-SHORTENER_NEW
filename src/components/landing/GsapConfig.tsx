"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function GsapConfig() {
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Velocity Skewing Logic
      lenis.on('scroll', ({ velocity }: { velocity: number }) => {
        const skew = velocity * 0.005;
        gsap.to(".skew-velocity", {
          skewY: skew,
          overwrite: true,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      gsap.ticker.lagSmoothing(0);

      gsap.defaults({
        ease: "power3.out",
        duration: 1
      });

      return () => {
        lenis.destroy();
        gsap.ticker.remove(lenis.raf);
      };
    }
  }, []);

  return null;
}
