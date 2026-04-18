"use client";

import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  QrCode,
  Link2,
  Activity,
  ShieldCheck,
  Zap,
  Check,
  Palette,
  Layers,
  ChevronDown,
  Quote,
  Star,
  Lock,
  Cpu,
  RefreshCw,
  Server,
  Cloud,
  Database
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ── Components & Helpers ──

const FloatingOrb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.1, 1],
      y: [0, -20, 0]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    className={`absolute -z-10 blur-[100px] rounded-full ${className}`}
  />
);

const FeatureCard = ({ item }: { item: typeof features[0] }) => {
  const Icon = item.icon;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col p-8 rounded-3xl bg-card border border-border/40 shadow-xl shadow-black/5 overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="mb-6 h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 flex border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
          <Icon className="h-7 w-7 text-secondary group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-xl font-black mb-4 tracking-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-8 flex-1">
          {item.description}
        </p>
        
        <ul className="space-y-3 border-t border-border/10 pt-6">
          {item.highlights.map((highlight, i) => (
            <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-foreground/80">
              <Check className="h-4 w-4 text-emerald-500" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-sm font-bold tracking-tight text-foreground/90">{question}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-xs font-medium leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Data ──

const features = [
  {
    title: "Secure URL Shortener",
    description: "Experience the pinnacle of link shortening security. Our platform provides lightning-fast, secure URL redirection that prioritizes user safety above all else. Every generated link is processed through high-speed Redis caching, ensuring that your branded short links resolve instantly while being protected by advanced security protocols.",
    icon: Link2,
    highlights: ["Custom branded slugs", "Redis cache-accelerated", "Enterprise-grade uptime"]
  },
  {
    title: "Branded Links & Identity",
    description: "Transform generic URLs into powerful branding assets. Our branded link management system allows you to maintain total control over your digital identity. By utilizing custom domains and slugs, you can ensure that every touchpoint with your audience reinforces your brand trust and authority, all while benefiting from our lightning-fast infrastructure.",
    icon: Palette,
    highlights: ["Complete brand control", "Custom domain logic", "Consistent visual ID"]
  },
  {
    title: "Link Analytics & Insights",
    description: "Stop flying blind with your distribution. Our detailed link analytics suite gives you deep insights into exactly who is clicking your links and how they are engaging. Monitor global regions, device distributions, and browser types with neural-grade precision, allowing you to optimize your campaigns in real-time based on high-fidelity geographic data.",
    icon: BarChart3,
    highlights: ["Interactive map tracking", "Neural visitor tracking", "High-fidelity data"]
  },
];

const partners = [
  { name: "SafeBrowsing", icon: ShieldCheck },
  { name: "RedisCloud", icon: Cpu },
  { name: "VercelEdge", icon: Zap },
  { name: "BetterAuth", icon: Lock },
  { name: "MapLibre", icon: Globe2 },
  { name: "Realtime", icon: Activity }
];

const testimonials = [
  {
    quote: "The redirection speed is unmatched. With Redis caching, our marketing links resolve before the user can even notice the transition.",
    author: "Sarah Chen",
    role: "Lead Infrastructure @ CloudNine",
    avatar: "SC"
  },
  {
    quote: "The QR engine's ability to handle high-resolution SVG exports saved us weeks of design time for our physical retail rollout.",
    author: "Marcello Rossi",
    role: "Brand Director @ Vertigo",
    avatar: "MR"
  },
  {
    quote: "Security was our #1 concern. Having Google Safe Browsing built directly into the shortening flow is a game changer for our trust.",
    author: "Elena Fisher",
    role: "CTO @ SecurLink",
    avatar: "EF"
  }
];

const faqs = [
  {
    question: "How secure are my shortened links?",
    answer: "Every link created on our platform is scanned in real-time using the Google Safe Browsing API v4. This enterprise-grade security gate blocks malicious destinations including malware and phishing sites before a user can ever be redirected. We prioritize a 'Secure URL Shortener' philosophy to ensure your audience remains safe."
  },
  {
    question: "What makes LinkLayer faster than traditional shorteners?",
    answer: "Most URL shorteners rely purely on database lookups, which introduce latency. LinkLayer utilizes a high-performance Redis Cloud caching layer. When a hot link is clicked, the redirection logic executes entirely in-memory at the Vercel Edge, resulting in sub-50ms resolution times globally."
  },
  {
    question: "Can I use custom branded links for my business?",
    answer: "Absolutely. Branded links are a core feature of our infrastructure. You can configure custom slugs and domains that align with your corporate identity, ensuring that every shortened link you share looks professional and trustworthy to your end users."
  }
];

// -- Animation Variants --
const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const containerRef = useRef(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="relative overflow-hidden selection:bg-primary/20 bg-background">
      {/* ── Background Elements ── */}
      <FloatingOrb className="w-[500px] h-[500px] bg-primary/20 left-[-10%] top-[5%]" delay={0} />
      <FloatingOrb className="w-[400px] h-[400px] bg-secondary/10 right-[-5%] top-[15%]" delay={2} />
      <FloatingOrb className="w-[600px] h-[600px] bg-primary/10 left-[20%] bottom-[-10%]" delay={4} />

      {/* ── Hero Section ── */}
      <section className="relative pt-16 pb-24 lg:pt-20 lg:pb-40 page-shell">
        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <motion.div 
          className="flex flex-col items-center text-center space-y-12"
          initial="hidden"
          animate="show"
          variants={STAGGER}
        >
          <motion.div variants={FADE_UP}>
            <div className="relative inline-flex group cursor-default">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <Badge variant="outline" className="relative rounded-full px-5 py-2 font-black bg-background border-border/40 shadow-none uppercase tracking-[0.2em] text-[10px]">
                <Activity className="mr-2 h-3 w-3 inline text-secondary animate-pulse" />
                Next-Gen Infrastructure
              </Badge>
            </div>
          </motion.div>
          
          <motion.div variants={FADE_UP} title="LinkLayer URL Infrastructure" className="space-y-8">
            <h1 className="max-w-5xl text-6xl font-black tracking-tighter sm:text-9xl text-foreground !leading-[1]">
              Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">URL Shortener</span>, <br className="hidden sm:block" /> Branded Links, and Analytics.
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed">
               Enterprise-grade link management platform uniting high-speed Redis redirection, real-time analytics, and a professional branded infrastructure.
            </p>
          </motion.div>

          <motion.div variants={FADE_UP} className="flex flex-col gap-6 sm:flex-row pt-6">
            <Button asChild size="lg" className="h-16 rounded-2xl px-12 font-black text-[14px] uppercase tracking-widest shadow-2xl shadow-primary/30 active:scale-95 transition-all">
              <Link href="/signin">
                Start for Free
                <ArrowRight className="ml-4 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="h-16 rounded-2xl px-12 font-black text-[14px] uppercase tracking-widest border-border/40 hover:bg-muted/50 transition-all">
              <Link href="/features">View Features</Link>
            </Button>
          </motion.div>

          <motion.div 
            variants={FADE_UP}
            className="flex items-center gap-8 pt-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          >
             {partners.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                   <p className="text-[11px] font-black uppercase tracking-tighter">{p.name}</p>
                </div>
             ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Feature Grid ── */}
      <section className="py-24 lg:py-32 page-shell relative" id="features">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10 rounded-[100px] blur-3xl" />
        <motion.div 
          className="space-y-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
        >
          <motion.div variants={FADE_UP} className="text-center space-y-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter decoration-primary/20 decoration-8 underline-offset-8">The All-in-One Link Infrastructure.</h2>
            <p className="text-muted-foreground font-medium max-w-3xl mx-auto text-lg leading-relaxed">
               Build secure routes, monitor global traffic, and ship high-fidelity branded assets from a single synchronized dashboard. Our platform is engineered to handle massive scale while maintaining the speed and security your business requires for successful link management.
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-3 pt-8">
            {features.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Technical Deep-Dive Implementation ── */}
      <section className="py-24 lg:py-40 bg-muted/5 border-y border-border/10 relative">
        <div className="page-shell">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                 <Badge variant="outline" className="rounded-lg px-4 py-1.5 font-black uppercase tracking-widest text-[9px]">Architected for Performance</Badge>
                 <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight italic">
                    Why our <span className="text-primary italic">Secure URL Shortener</span> is different.
                 </h2>
                 <div className="space-y-8 text-muted-foreground font-medium text-lg leading-relaxed">
                    <p>
                       Most URL shortening services are built on top of traditional relational databases that struggle under the weight of high-concurrency traffic. This leads to slow redirections and a poor user experience. Our infrastructure is fundamentally different. We&apos;ve optimized every millisecond of the transit.
                    </p>
                    <p>
                       By leveraging a **Cache-Aside architectural pattern** with Redis Cloud, we ensure that as soon as a link is shortened, its resolution path is primed for the Edge. This means whether you&apos;re clicking a link in New York or Tokyo, the redirection happens at the closest possible node to the user.
                    </p>
                    <p>
                       Furthermore, our branded links aren&apos;t just aesthetically pleasing—they are functionally superior. By integrating custom domain routing and strict SSL enforcement, we provide a level of link management that satisfies even the most rigorous enterprise security standards.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="p-6 rounded-2xl bg-card border border-border/40">
                       <Server className="h-6 w-6 text-primary mb-4" />
                       <h4 className="text-sm font-black uppercase tracking-widest mb-2">Redis Acceleration</h4>
                       <p className="text-xs text-muted-foreground leading-relaxed">Sub-50ms redirection via global in-memory caching layers.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border/40">
                       <Cloud className="h-6 w-6 text-secondary mb-4" />
                       <h4 className="text-sm font-black uppercase tracking-widest mb-2">Edge Computation</h4>
                       <p className="text-xs text-muted-foreground leading-relaxed">Distributed resolution nodes powered by Vercel Edge Runtime.</p>
                    </div>
                 </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-[60px] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/5 p-12 overflow-hidden shadow-2xl"
              >
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
                 <div className="relative z-10 h-full w-full rounded-[40px] bg-card border border-border/40 shadow-inner flex flex-col p-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-border/10 pb-6">
                       <div className="flex gap-2">
                          <span className="h-3 w-3 rounded-full bg-red-500/50" />
                          <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
                          <span className="h-3 w-3 rounded-full bg-green-500/50" />
                       </div>
                       <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-emerald-500/20">LIVE_INFRA</Badge>
                    </div>
                    <div className="flex-1 space-y-6">
                       <div className="h-8 w-[60%] bg-muted rounded-lg animate-pulse" />
                       <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 rounded-xl bg-primary/5 flex flex-col items-center justify-center gap-2 border border-primary/10">
                             <Database className="h-5 w-5 text-primary" />
                             <span className="text-[10px] font-black uppercase">Mongo Store</span>
                          </div>
                          <div className="h-24 rounded-xl bg-secondary/5 flex flex-col items-center justify-center gap-2 border border-secondary/10">
                             <Zap className="h-5 w-5 text-secondary" />
                             <span className="text-[10px] font-black uppercase">Redis Cluster</span>
                          </div>
                       </div>
                       <div className="h-32 w-full rounded-2xl border border-border/10 bg-muted/20 flex flex-col p-6 items-center justify-center text-center">
                          <p className="text-[10px] font-black uppercase tracking-widest mb-4">Traffic Inbound</p>
                          <div className="flex items-end gap-1.5 h-12 w-full">
                             {[40, 70, 50, 90, 60, 100, 80, 55, 75, 95].map((h, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.1, repeatType: "reverse" }}
                                  className="flex-1 bg-secondary rounded-full" 
                                />
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── Security & Trust Philosophy ── */}
      <section className="py-24 lg:py-40 page-shell">
         <div className="text-center space-y-6 mb-24 max-w-4xl mx-auto">
            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/10 border-secondary/20">SECURITY_FIRST</Badge>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter">The anatomy of our <span className="text-secondary italic">Secure Infrastructure.</span></h2>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
               Trust is the most valuable currency on the internet. As a professional URL shortener, we understand that every link you generate represents your digital reputation. That&apos;s why we&apos;ve built the most comprehensive security gate in the link management ecosystem.
            </p>
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
               {
                  t: "Active Scanning",
                  d: "Every destination URL is scanned against the Google Safe Browsing dataset before shortening.",
                  i: ShieldCheck
               },
               {
                  t: "SSL Enforcement",
                  d: "We force HTTPS across all redirection paths, ensuring end-to-end encryption for every visitor.",
                  i: Lock
               },
               {
                  t: "Link Sanitization",
                  d: "We strip malicious query parameters and tracking scripts that compromise user privacy.",
                  i: RefreshCw
               },
               {
                  t: "Phishing Shield",
                  d: "Automated detection of impersonation attempts to block phishing campaigns in their tracks.",
                  i: ShieldCheck
               }
            ].map((s, i) => (
               <div key={i} className="p-8 rounded-[32px] bg-card border border-border/40 shadow-xl space-y-6 hover:border-secondary/20 transition-colors group">
                  <div className="h-12 w-12 rounded-xl bg-secondary/5 border border-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <s.i className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="text-lg font-black tracking-tight">{s.t}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">{s.d}</p>
               </div>
            ))}
         </div>

         <div className="mt-24 p-12 lg:p-20 rounded-[50px] bg-primary text-primary-foreground relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_0.05px,transparent_0)] bg-[size:32px_32px] opacity-10" />
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:items-center">
               <div className="lg:w-1/2 space-y-8">
                  <h3 className="text-3xl sm:text-5xl font-black tracking-tighter leading-none italic">
                     Branded links <br className="hidden sm:block" /> are <span className="text-secondary underline decoration-secondary/50 underline-offset-8 italic">Secure Links.</span>
                  </h3>
                  <div className="space-y-6 text-primary-foreground/80 font-medium leading-relaxed italic">
                     <p>
                        In a digital world where phishing and malware are rampant, your audience deserves clarity. Generic short links often hide the true destination, creating hesitation and reducing click-through rates. By using our branded links infrastructure, you provide a clear, identifiable signpost for your users.
                     </p>
                     <p>
                        Our link management platform empowers you to wrap your secure shortened URLs in a package that screams professional integrity. Whether it&apos;s for marketing, internal operations, or physical assets like QR codes, branding provides the psychological security that users need to click with confidence.
                     </p>
                  </div>
               </div>
               <div className="lg:w-1/2 flex justify-center lg:justify-end">
                  <div className="relative">
                     <div className="absolute -inset-4 bg-secondary/20 blur-3xl opacity-50group-hover:opacity-100 transition-opacity" />
                     <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-[40px] bg-white text-black p-10 flex flex-col items-center justify-center text-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                        <QrCode className="h-32 w-32 mb-8" strokeWidth={1.5} />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Scanned Securely</p>
                        <div className="mt-4 flex gap-1">
                           {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-black" />)}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ── Detail Feature: QR Designer Spotlight ── */}
      <section className="py-32 page-shell">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="group relative rounded-[40px] border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
           <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-24 flex flex-col justify-center space-y-10 border-b lg:border-b-0 lg:border-r border-border/10 relative overflow-hidden">
                 <QrCode className="absolute -right-32 -bottom-32 w-[600px] h-[600px] text-primary/[0.03] -rotate-12 group-hover:rotate-0 transition-transform duration-[2s]" />
                 
                 <div className="relative z-10 space-y-10">
                    <Badge variant="outline" className="w-fit rounded-lg bg-primary/10 text-primary border-primary/20 px-4 py-1.5 uppercase tracking-[0.25em] text-[10px] font-black">
                       Engineered for Print
                    </Badge>
                    <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
                       High-Resolution <br/> <span className="text-muted-foreground/30 text-6xl">QR Engine.</span>
                    </h2>
                    <p className="text-muted-foreground font-medium leading-relaxed max-w-md text-lg italic">
                       Merge database state directly into high-fidelity physical assets. Add center logos, change dot patterns, and download directly in 4K resolution.
                    </p>
                    <div className="grid grid-cols-2 gap-y-8 pt-4">
                       {[
                         { l: "Brand Colors", i: Palette },
                         { l: "Logo Inserts", i: ShieldCheck },
                         { l: "Custom Typo", i: Activity },
                         { l: "4K SVG Export", i: Layers }
                       ].map((Feature, i) => (
                         <div key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-foreground/80">
                            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-inner">
                               <Feature.i className="h-5 w-5 text-secondary" />
                            </div>
                            {Feature.l}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="p-12 lg:p-24 flex items-center justify-center bg-muted/20 relative group-hover:bg-muted/30 transition-colors duration-1000">
                 <motion.div 
                   whileHover={{ scale: 1.05, rotate: -2 }}
                   className="w-full max-w-md rounded-[32px] border border-border/40 bg-background p-10 space-y-10 shadow-2xl relative z-10"
                 >
                    <div className="flex gap-3 border-b border-border/10 pb-6">
                       <span className="h-3 w-16 rounded-full bg-secondary/30" />
                       <span className="h-3 w-10 rounded-full bg-border/20" />
                       <span className="h-3 w-12 rounded-full bg-border/20" />
                    </div>
                    <div className="aspect-square bg-white rounded-3xl border border-border/10 p-12 flex items-center justify-center relative overflow-hidden group/qr shadow-inner">
                       <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,black_1px,transparent_0)] bg-[size:24px_24px]" />
                       <QrCode className="h-48 w-48 text-foreground relative z-10 group-hover/qr:scale-110 transition-transform duration-700" strokeWidth={1} />
                       <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-14 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center text-[10px] font-black uppercase tracking-widest cursor-pointer hover:brightness-110 active:scale-95 transition-all">Download SVG</div>
                       <div className="h-14 rounded-2xl border border-border/40 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer hover:bg-muted active:scale-95 transition-all">Save Preset</div>
                    </div>
                 </motion.div>
              </div>
           </div>
        </motion.div>
      </section>

      {/* ── Bento Testimonials ── */}
      <section className="py-24 page-shell">
         <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10 p-12 lg:p-20 rounded-[40px] bg-secondary text-secondary-foreground relative overflow-hidden shadow-2xl">
               <Quote className="absolute -top-10 -left-10 w-48 h-48 text-secondary-foreground/5 opacity-40 rotate-12" />
               <div className="relative z-10 max-w-2xl">
                  <div className="flex gap-1 mb-8">
                     {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight mb-10 italic">
                     &quot;The redirection speed is unmatched. With <span className="underline decoration-primary/50 underline-offset-[10px]">Redis acceleration</span>, our marketing links resolve before users even notice.&quot;
                  </h3>
                  <div className="flex items-center gap-5">
                     <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-black border border-white/20">SC</div>
                     <div>
                        <p className="text-lg font-black tracking-tight">Sarah Chen</p>
                        <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Lead Infrastructure • CloudNine</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-8">
               {testimonials.slice(1).map((t, i) => (
                  <div key={i} className="p-10 rounded-[40px] bg-card border border-border/40 shadow-xl flex-1 flex flex-col justify-between italic">
                     <p className="text-lg font-black tracking-tighter leading-snug mb-8">
                        &quot;{t.quote}&quot;
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-sm font-black border border-secondary/20">{t.avatar}</div>
                        <div>
                           <p className="text-sm font-black">{t.author}</p>
                           <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{t.role}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── Big Analytics Visual Counter ── */}
      <section className="py-24 lg:py-40 bg-foreground text-background overflow-hidden relative">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_0.02px,transparent_0)] bg-[size:40px_40px] opacity-10" />
         <div className="page-shell relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <p className="text-sm font-black uppercase tracking-[0.5em] text-primary">Global Transit Stats</p>
               <h2 className="text-6xl sm:text-[140px] font-black tracking-tighter leading-none italic">
                  800M+ <br/> <span className="text-background/20 italic">Resolutions.</span>
               </h2>
               <p className="text-xl text-background/60 leading-relaxed font-medium italic">
                  Our link management infrastructure is built to process massive throughput. With integrated analytics mapping every transit, we provide the bird&apos;s eye view your engineering and marketing teams need to scale with confidence.
               </p>
               <div className="flex flex-wrap justify-center gap-12 pt-12 italic">
                  {[
                     { l: "Sub-50ms Latency", i: Zap },
                     { l: "99.99% Availability", i: Check },
                     { l: "Real-time Delta", i: Activity }
                  ].map((s, i) => (
                     <div key={i} className="flex items-center gap-3 border border-background/10 rounded-full px-6 py-3">
                        <s.i className="h-4 w-4 text-primary" />
                        <span className="text-xs font-black uppercase tracking-widest">{s.l}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-24 lg:py-40 page-shell">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 space-y-8 italic">
            <Badge variant="outline" className="rounded-lg bg-muted border-border/40 px-4 py-1.5 uppercase tracking-widest text-[9px] font-black">
              F.A.Q
            </Badge>
            <h2 className="text-5xl font-black tracking-tighter leading-none italic">Frequently <br/> <span className="text-muted-foreground/30 italic">Asked Questions.</span></h2>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
               Everything you need to know about our secure link infrastructure and analytics platform. We believe in total transparency when it comes to your data.
            </p>
            <Button variant="link" className="p-0 h-auto font-black uppercase tracking-widest text-[11px] text-primary italic">
               Contact Support <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </div>
          <div className="lg:col-span-7 bg-card border border-border/40 rounded-[32px] p-10 lg:p-14 shadow-2xl italic">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA Section ── */}
      <section className="pt-24 pb-20 page-shell">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[50px] bg-card border border-border p-16 md:p-32 text-center space-y-12 max-w-6xl mx-auto border-t-[10px] border-t-primary shadow-2xl overflow-hidden group"
        >
           {/* Abstract grid background for CTA */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
           
           <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse" />

           <div className="relative z-10 space-y-8 italic">
              <h2 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.9] italic">Start Scaling <br/> Your <span className="text-primary italic">Links.</span></h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
                 Join innovative teams building faster, safer, and better-branded link infrastructure. Provision your workspace in seconds.
              </p>
           </div>
           
           <div className="relative z-10 flex flex-col items-center gap-10 pt-6">
              <Button size="lg" asChild className="h-20 rounded-[28px] px-16 font-black text-[16px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all outline-none">
                 <Link href="/signin">Get Started Free</Link>
              </Button>
              <div className="flex flex-wrap justify-center gap-10 items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">
                 <div className="flex items-center gap-3"><Lock className="h-4 w-4 text-emerald-500/50" /> Secure Encryption</div>
                 <div className="flex items-center gap-3"><RefreshCw className="h-4 w-4 text-emerald-500/50" /> Instant Setup</div>
                 <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-emerald-500/50" /> Safe Browsing</div>
              </div>
           </div>
        </motion.div>
      </section>

      {/* ── Footer Link ── */}
      <section className="pb-24 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30 italic">
            LinkLayer • Built for the modern web • 2026
         </p>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </main>
  );
}
