"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Plus, Minus, Command, Terminal } from "lucide-react";

const FAQ = [
  { q: "REDIRECTION_LATENCY_QUERY", label: "How fast is the redirection?", a: "Our edge servers ensure resolutions in under 50ms globally by shifting the state logic to the server nearest to the user." },
  { q: "SECURITY_AUDIT_PROTOCOL", label: "Is it secure for sensitive data?", a: "Every link is audited against the Google Safe Browsing database and forced through an RSA-4096 encrypted handshake." },
  { q: "ANALYTICAL_HEURISTICS", label: "Can I track location data?", a: "Yes, we provide real-time geographical distribution, device archetypes, and browser behavior in your dashboard." },
  { q: "INFRASTRUCTURE_RELIABILITY", label: "What is your uptime record?", a: "We maintain a 99.99% uptime via a decentralized Redis-backed node network with automatic failover." }
];

export default function TechnicalAccordion() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-52 space-y-20 relative">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Terminal size={300} />
       </div>

       <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3 text-primary">
             <Command size={16} className="animate-pulse" />
             <p className="text-[10px] font-mono uppercase tracking-[1em]">SUPPORT_LOG_v2.0</p>
          </div>
          <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
            FAQ <span className="text-primary italic">Terminal.</span>
          </h2>
       </div>
       
       <div className="grid gap-4 relative z-10">
          {FAQ.map((item, i) => (
             <AccordionItem 
                key={i} 
                index={i}
                item={item} 
                isOpen={active === i} 
                onClick={() => setActive(active === i ? null : i)} 
             />
          ))}
       </div>

       <div className="pt-20 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/40 italic">
             End of Log -- Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
       </div>
    </div>
  );
}

function AccordionItem({ item, index, isOpen, onClick }: any) {
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      // Dynamic Height Reveal
      gsap.to(contentRef.current, { 
        height: "auto", 
        duration: 0.8, 
        ease: "elastic.out(1, 0.8)", 
        opacity: 1 
      });
      // Character/Line Reveal Effect
      gsap.fromTo(textRef.current, 
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
      // Item Glow
      gsap.to(itemRef.current, { 
        borderColor: "var(--primary)", 
        backgroundColor: "rgba(223, 96, 53, 0.05)",
        duration: 0.4 
      });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.5, ease: "power4.in", opacity: 0 });
      gsap.to(itemRef.current, { 
        borderColor: "rgba(255, 255, 255, 0.1)", 
        backgroundColor: "transparent",
        duration: 0.4 
      });
    }
  }, { dependencies: [isOpen] });

  return (
    <div 
      ref={itemRef}
      className={`border rounded-2xl group cursor-pointer transition-colors overflow-hidden border-border/20`}
      onClick={onClick}
    >
       <div className="w-full flex items-center justify-between p-8 text-left">
          <div className="space-y-2">
             <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40">[{item.q}]</p>
             <h3 className="text-lg md:text-xl font-black uppercase tracking-[0.1em] group-hover:text-primary transition-colors italic">
                {item.label}
             </h3>
          </div>
          <div className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-700 ${isOpen ? 'rotate-[135deg] bg-primary border-primary' : 'border-border/30 group-hover:border-primary group-hover:rotate-90'}`}>
             <Plus className={`h-5 w-5 transition-colors ${isOpen ? 'text-white' : 'group-hover:text-primary text-muted-foreground'}`} />
          </div>
       </div>
       <div ref={contentRef} className="h-0 opacity-0">
          <div className="border-t border-border/10 mx-8 pt-10 pb-12 flex gap-12">
            <div className="w-[2px] shrink-0 bg-primary/30 self-stretch rounded-full" />
            <p ref={textRef} className="text-xl text-muted-foreground font-medium leading-loose italic py-2 max-w-3xl">
               {item.a}
            </p>
          </div>
       </div>
    </div>
  );
}
