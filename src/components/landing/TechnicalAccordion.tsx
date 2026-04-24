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
    <div className="max-w-5xl mx-auto px-6 py-52 space-y-20 relative">
       <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Terminal size={300} />
       </div>

       <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3 text-primary">
             <Command size={16} />
             <p className="text-[10px] font-mono uppercase tracking-[1em]">Common Questions</p>
          </div>
          <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
            FAQ <span className="text-primary italic">Section.</span>
          </h2>
       </div>
       
       <div className="grid gap-4 relative z-10">
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
      className="border rounded-2xl group cursor-pointer transition-colors overflow-hidden border-border/20"
      onClick={onClick}
    >
       <div className="w-full flex items-center justify-between p-8 text-left">
          <div className="space-y-1">
             <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40">{item.q}</p>
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
