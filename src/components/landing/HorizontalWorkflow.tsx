"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HorizontalWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(containerRef.current, {
      xPercent: -66.666,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
      }
    });

    // Animate the numbers inside
    gsap.from(".workflow-step h2", {
       opacity: 0,
       x: 200,
       stagger: 0.5,
       scrollTrigger: {
         trigger: sectionRef.current,
         start: "top top",
         end: "+=3000",
         scrub: true
       }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-screen bg-foreground text-background overflow-hidden border-y border-border/10">
      <div ref={containerRef} className="h-full flex items-center px-4 md:px-6 lg:px-[5%] w-[300%]">
        {/* Step 1 */}
        <div className="workflow-step w-screen shrink-0 flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-12 px-4 md:px-8 lg:px-12">
          <h2 className="text-4xl md:text-6xl lg:text-8xl 2xl:text-[220px] font-black tracking-tighter uppercase italic leading-none opacity-10">01. PASTE.</h2>
          <div className="max-w-3xl space-y-4 md:space-y-6 lg:space-y-8">
            <p className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tight leading-tight uppercase italic underline decoration-primary decoration-[6px] md:decoration-[8px] lg:decoration-[12px] underline-offset-2 md:underline-offset-3 lg:underline-offset-[16px]">
              Drop your long URL.
            </p>
            <p className="text-base md:text-xl lg:text-2xl text-background/40 font-medium italic leading-relaxed">
              Our engine starts mapping the resolution path in real-time.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="workflow-step w-screen shrink-0 flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-12 px-4 md:px-8 lg:px-12">
          <h2 className="text-4xl md:text-6xl lg:text-8xl 2xl:text-[220px] font-black tracking-tighter uppercase italic leading-none opacity-10">02. CUSTOM.</h2>
          <div className="max-w-3xl space-y-4 md:space-y-6 lg:space-y-8">
            <p className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tight leading-tight uppercase italic underline decoration-primary decoration-[6px] md:decoration-[8px] lg:decoration-[12px] underline-offset-2 md:underline-offset-3 lg:underline-offset-[16px]">
              Brand your ID.
            </p>
            <p className="text-base md:text-xl lg:text-2xl text-background/40 font-medium italic leading-relaxed">
              Create a custom slug that your audience trusts and recognizes instantly.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="workflow-step w-screen shrink-0 flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-12 px-4 md:px-8 lg:px-12">
          <h2 className="text-4xl md:text-6xl lg:text-8xl 2xl:text-[220px] font-black tracking-tighter uppercase italic leading-none opacity-10">03. SCALE.</h2>
          <div className="max-w-3xl space-y-4 md:space-y-6 lg:space-y-8">
            <p className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tight leading-tight uppercase italic underline decoration-primary decoration-[6px] md:decoration-[8px] lg:decoration-[12px] underline-offset-2 md:underline-offset-3 lg:underline-offset-[16px]">
              Track globally.
            </p>
            <p className="text-base md:text-xl lg:text-2xl text-background/40 font-medium italic leading-relaxed">
              Experience the power of live analytics across our entire edge network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
