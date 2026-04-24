"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function GsapConfig() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Store the ticker callback so we can remove it cleanly
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      const skew = velocity * 0.005;
      gsap.to(".skew-velocity", {
        skewY: skew,
        overwrite: true,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    gsap.ticker.lagSmoothing(0);

    gsap.defaults({
      ease: "power3.out",
      duration: 1,
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return null;
}
