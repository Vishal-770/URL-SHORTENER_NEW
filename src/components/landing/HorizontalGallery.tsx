"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ITEMS = [
  "NEXT.JS", "GSAP", "LENIS", "THREE.JS", "TAILWIND", "REACT", "VERCEL", "REDIS", "EDGE", "NODES"
];

export default function HorizontalGallery() {
  const containerRef = useRef(null); 
  
  const scrollRef = useRef(null);

  useGSAP(() => {
    gsap.to(scrollRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "none",
    });

    gsap.to(".gallery-item", {
       skewX: 10,
       scrollTrigger: {
         trigger: containerRef.current,
         scrub: 0.5
       }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-40 bg-zinc-950 overflow-hidden border-b border-white/5">
      <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-20 text-center">Protocol Integrations</p>
      
      <div className="relative">
        <div ref={scrollRef} className="flex gap-20 whitespace-nowrap w-fit px-10">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div key={i} className="gallery-item group cursor-none">
              <span className="text-8xl md:text-[140px] font-black tracking-tighter text-transparent stroke-white/10 stroke-1 uppercase italic transition-all duration-500 group-hover:text-primary group-hover:stroke-primary">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
