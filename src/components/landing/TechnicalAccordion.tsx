"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Plus, Command, Terminal } from "lucide-react";

interface FaqItem {
  q: string;
  label: string;
  a: string;
}

interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onClick: () => void;
}

const FAQ: FaqItem[] = [
  { q: "Speed", label: "How fast are the redirects?", a: "Your links open almost instantly for anyone, anywhere in the world. We make sure there's no noticeable delay." },
  { q: "Safety", label: "Are my links safe to share?", a: "Yes. Every link is automatically checked for harmful or suspicious content before it's made active." },
  { q: "Tracking", label: "Can I see who clicked my link?", a: "Yes, your dashboard shows you click counts, countries, and device types in real time." },
  { q: "Reliability", label: "Will my links always work?", a: "We maintain very high availability. Your links stay online and working around the clock." }
];

export default function TechnicalAccordion() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-20 md:py-40 lg:py-52 space-y-12 md:space-y-16 lg:space-y-20 relative">
       <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 pointer-events-none">
          <Terminal size={150} className="md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px]" />
       </div>

       <div className="space-y-4 md:space-y-6 relative z-10">
          <div className="flex items-center gap-2 md:gap-3 text-primary">
             <Command size={14} className="md:w-4 md:h-4" />
             <p className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.6em] md:tracking-[0.8em] lg:tracking-[1em]">Common Questions</p>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-9xl font-black uppercase italic tracking-tighter leading-tight md:leading-none">
            FAQ <span className="text-primary italic">Section.</span>
          </h2>
       </div>
        
       <div className="grid gap-3 md:gap-4 relative z-10">
          {FAQ.map((item, i) => (
             <AccordionItem 
               key={i}
               item={item} 
               isOpen={active === i} 
               onClick={() => setActive(active === i ? null : i)} 
             />
          ))}
       </div>
    </div>
  );
}

function AccordionItem({ item, isOpen, onClick }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { 
        height: "auto", 
        duration: 0.8, 
        ease: "elastic.out(1, 0.8)", 
        opacity: 1 
      });
      gsap.fromTo(textRef.current, 
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
      gsap.to(itemRef.current, { 
        borderColor: "var(--primary)", 
        backgroundColor: "rgba(223, 96, 53, 0.05)",
        duration: 0.4 
      });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.5, ease: "power4.in", opacity: 0 });
      gsap.to(itemRef.current, { 
        borderColor: "var(--border)",
        backgroundColor: "transparent",
        duration: 0.4 
      });
    }
  }, { dependencies: [isOpen] });

  return (
    <div 
      ref={itemRef}
      className="border rounded-xl md:rounded-2xl group cursor-pointer transition-colors overflow-hidden border-border/20"
      onClick={onClick}
    >
       <div className="w-full flex items-center justify-between p-4 md:p-6 lg:p-8 text-left gap-4">
          <div className="space-y-0.5 md:space-y-1 flex-1 min-w-0">
             <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground/40">{item.q}</p>
             <h3 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-[0.05em] md:tracking-[0.1em] group-hover:text-primary transition-colors italic break-words">
               {item.label}
             </h3>
          </div>
          <div className={`h-10 md:h-12 w-10 md:w-12 rounded-lg md:rounded-xl border flex items-center justify-center transition-all duration-700 flex-shrink-0 ${isOpen ? 'rotate-[135deg] bg-primary border-primary' : 'border-border/30 group-hover:border-primary group-hover:rotate-90'}`}>
             <Plus className={`h-4 md:h-5 w-4 md:w-5 transition-colors ${isOpen ? 'text-white' : 'group-hover:text-primary text-muted-foreground'}`} />
          </div>
       </div>
       <div ref={contentRef} className="h-0 opacity-0">
          <div className="border-t border-border/10 mx-4 md:mx-6 lg:mx-8 pt-6 md:pt-8 lg:pt-10 pb-8 md:pb-10 lg:pb-12 flex gap-4 md:gap-6 lg:gap-12">
            <div className="w-[2px] shrink-0 bg-primary/30 self-stretch rounded-full" />
            <p ref={textRef} className="text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground font-medium leading-relaxed md:leading-loose italic py-2 max-w-3xl">
               {item.a}
            </p>
          </div>
       </div>
    </div>
  );
}
