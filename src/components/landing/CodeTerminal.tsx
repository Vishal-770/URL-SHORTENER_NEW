"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Terminal, Copy } from "lucide-react";

const CODE_LINES = [
  { delay: 0, text: "$ npm install @linkshorter/sdk" },
  { delay: 0.2, text: "" },
  { delay: 0.4, text: "$ node setup.js" },
  { delay: 0.8, text: "✓ Connected to LinkLayer API" },
  { delay: 1.2, text: "✓ Edge nodes activated: 42" },
  { delay: 1.6, text: "✓ Rate limiting: 10k/sec" },
  { delay: 2.0, text: "" },
  { delay: 2.4, text: '$ const short = await links.create()' },
  { delay: 2.8, text: '> { slug: "xyz123", clicks: 0 }' },
];

interface CodeLineProps {
  text: string;
  delay: number;
  lineIndex: number;
  isError?: boolean;
}

function CodeLine({ text, delay, lineIndex, isError = false }: CodeLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;
    
    const codeTerminal = lineRef.current.closest(".code-terminal");
    if (!codeTerminal) return;

    // Line reveal with clip-path
    gsap.fromTo(
      lineRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
      },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.6,
        ease: "power2.out",
        delay: delay,
        scrollTrigger: {
          trigger: codeTerminal,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      }
    );

    // Text color animation (fade to final color)
    const codeText = lineRef.current.querySelector(".code-text");
    if (codeText) {
      gsap.from(codeText, {
        opacity: 0,
        duration: 0.4,
        delay: delay + 0.2,
        scrollTrigger: {
          trigger: codeTerminal,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    }

    // Blinking cursor
    if (lineIndex === CODE_LINES.length - 1) {
      const cursor = lineRef.current.querySelector(".code-cursor");
      if (cursor) {
        gsap.to(cursor, {
          opacity: 0.2,
          repeat: -1,
          yoyo: true,
          duration: 0.6,
          ease: "sine.inOut",
          delay: delay + 1.2,
        });
      }
    }
  }, { scope: lineRef });

  return (
    <div
      ref={lineRef}
      className={`flex items-center gap-2 font-mono text-xs md:text-sm lg:text-base overflow-hidden ${
        isError ? "text-red-400" : "text-green-400"
      }`}
    >
      <span className="text-muted-foreground/40 flex-shrink-0 w-4">{lineIndex + 1}</span>
      <span className="code-text text-green-400/80">
        {text}
        {lineIndex === CODE_LINES.length - 1 && (
          <span className="code-cursor animate-pulse">▌</span>
        )}
      </span>
    </div>
  );
}

export default function CodeTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Container fade and scale entrance
    gsap.from(containerRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Terminal screen glow pulse
    const glowEl = containerRef.current.querySelector(".terminal-glow");
    if (glowEl) {
      gsap.to(glowEl, {
        boxShadow: "0 0 40px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.1)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }

    // Scan line animation
    const scanEl = containerRef.current.querySelector(".scan-line");
    if (scanEl) {
      gsap.to(scanEl, {
        yPercent: 100,
        repeat: -1,
        duration: 6,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }

    // Section heading
    const headingEl = containerRef.current.querySelector(".terminal-heading");
    if (headingEl) {
      gsap.from(headingEl, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingEl,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-40 lg:py-52 px-4 md:px-6 lg:px-8 border-t border-border/10"
    >
      <div className="max-w-5xl mx-auto space-y-12 md:space-y-16 lg:space-y-20">
        {/* Section Header */}
        <div className="terminal-heading text-center space-y-4 md:space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Terminal className="h-5 md:h-6 w-5 md:w-6 text-primary" />
            <p className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.6em] text-primary">
              Developer Experience
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase italic">
            Simple <span className="text-primary">API.</span> Instant <span className="text-primary">Results.</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Get started in minutes with our developer-friendly SDK. No complexity, just reliable link management.
          </p>
        </div>

        {/* Terminal */}
        <div className="group">
          <div
            ref={terminalRef}
            className="code-terminal terminal-glow relative rounded-2xl md:rounded-3xl overflow-hidden border border-green-500/20 bg-black/60 backdrop-blur-xl"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-green-500/10 bg-black/80">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs md:text-sm font-mono text-green-400/60">
                  ~ LinkLayer Terminal
                </span>
              </div>
              <button
                className="opacity-60 hover:opacity-100 transition-opacity"
                title="Copy"
              >
                <Copy className="h-4 w-4 text-green-400/60" />
              </button>
            </div>

            {/* Terminal Content */}
            <div className="relative p-4 md:p-6 lg:p-8 space-y-2 md:space-y-3 min-h-80 md:min-h-96 lg:min-h-[480px]">
              {CODE_LINES.map((line, i) => (
                <CodeLine
                  key={i}
                  text={line.text}
                  delay={line.delay}
                  lineIndex={i}
                  isError={line.text.startsWith("✗")}
                />
              ))}
            </div>

            {/* Scan line effect */}
            <div className="scan-line absolute inset-x-0 top-0 h-0.5 bg-gradient-to-b from-green-400/50 to-transparent opacity-30 pointer-events-none" />

            {/* Corner accent lights */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-500/20 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-500/20 rounded-tl-3xl" />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            Ready to integrate? Explore our full documentation and start building.
          </p>
          <div className="flex justify-center">
            <button className="px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full bg-primary text-background font-black text-xs md:text-sm uppercase tracking-[0.1em] hover:bg-primary/90 transition-colors">
              View API Docs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
