"use client";

import {
  ArrowRight,
  Rocket,
  BarChart2,
  Lock,
  Zap,
  Globe,
  CheckCircle,
  Link as LinkIcon,
  QrCode,
  Gauge,
  Cpu,
  Shield,
  Calendar,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Clock,
  User,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      title: "Instant URL Shortening",
      description:
        "Create short links in milliseconds with our lightning-fast API",
      highlight: "Supports bulk URL shortening",
    },
    {
      icon: <QrCode className="h-6 w-6 text-primary" />,
      title: "Dynamic QR Codes",
      description: "Generate QR codes for every shortened link automatically",
      highlight: "Customizable QR colors and patterns",
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      title: "Advanced Analytics",
      description: "Real-time tracking of every click with detailed metrics",
      highlight: "Export data to CSV/JSON",
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "Link Management",
      description: "Edit, disable, or delete links anytime from your dashboard",
      highlight: "Password protection available",
    },
  ];

  const analyticsFeatures = [
    {
      title: "Geographic Data",
      icon: <MapPin className="h-5 w-5 text-primary" />,
      description:
        "See where your clicks are coming from with country and city-level data",
    },
    {
      title: "Device Breakdown",
      icon: <Smartphone className="h-5 w-5 text-primary" />,
      description: "Mobile vs desktop vs tablet with specific device models",
    },
    {
      title: "Browser & OS",
      icon: <Monitor className="h-5 w-5 text-primary" />,
      description: "Detailed information about browsers and operating systems",
    },
    {
      title: "Time Analysis",
      icon: <Clock className="h-5 w-5 text-primary" />,
      description: "Track performance by hour, day, or custom date ranges",
    },
    {
      title: "Referral Sources",
      icon: <Globe className="h-5 w-5 text-primary" />,
      description: "Identify which websites are driving traffic to your links",
    },
    {
      title: "Unique Visitors",
      icon: <User className="h-5 w-5 text-primary" />,
      description: "Distinguish between new and returning visitors",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "LinkShort increased our campaign CTR by 32% with their powerful analytics. The geographic data helped us optimize our ad spend.",
      avatar: "/avatars/sarah.jpg",
      stats: [
        { label: "Links Created", value: "1,240" },
        { label: "Avg CTR", value: "18.7%" },
      ],
    },
    {
      name: "Michael Chen",
      role: "Growth Lead",
      company: "StartUp Inc.",
      content:
        "The API integration saved our team hundreds of hours each quarter. We've automated all our link management workflows.",
      avatar: "/avatars/michael.jpg",
      stats: [
        { label: "API Calls", value: "24k/mo" },
        { label: "Success Rate", value: "99.98%" },
      ],
    },
    {
      name: "Emma Rodriguez",
      role: "Content Creator",
      company: "Self-Employed",
      content:
        "Finally a link shortener that doesn't look spammy! My audience loves the branded short domains and QR codes.",
      avatar: "/avatars/emma.jpg",
      stats: [
        { label: "Followers", value: "420k" },
        { label: "Monthly Clicks", value: "85k" },
      ],
    },
  ];

  const platforms = [
    { name: "Chrome", value: 58 },
    { name: "Safari", value: 22 },
    { name: "Firefox", value: 12 },
    { name: "Edge", value: 6 },
    { name: "Other", value: 2 },
  ];

  const devices = [
    { name: "Mobile", value: 62, icon: <Smartphone className="h-4 w-4" /> },
    { name: "Desktop", value: 34, icon: <Monitor className="h-4 w-4" /> },
    { name: "Tablet", value: 4, icon: <Tablet className="h-4 w-4" /> },
  ];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-background/50 to-muted/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Rocket className="h-4 w-4 mr-2" />
                Enterprise-grade URL management
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Powerful Features for{" "}
              <span className="text-primary">Link Management</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to shorten, track, and optimize your links
              with enterprise-grade analytics and security.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <Button size="lg" className="px-8">
                  Get Started for Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8">
                Explore Analytics
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="w-full py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Comprehensive Link Management
            </h2>
            <p className="mt-4 text-muted-foreground">
              All the tools you need to create, manage, and track your shortened
              URLs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all h-full group hover:border-primary">
                  <CardHeader>
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {feature.highlight}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Demo */}
      <section className="w-full py-20 bg-muted/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="px-4 sm:px-0">
              <h2 className="text-3xl font-bold tracking-tight">
                Deep Dive Analytics
              </h2>
              <p className="mt-4 text-muted-foreground">
                Understand your audience with comprehensive click tracking
                across multiple dimensions.
              </p>

              <div className="mt-8 space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Total Clicks</span>
                    <span className="text-sm text-muted-foreground">
                      24,589
                    </span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Platform Distribution
                  </h3>
                  <div className="space-y-2">
                    {platforms.map((platform, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-24 text-sm text-muted-foreground">
                          {platform.name}
                        </span>
                        <Progress
                          value={platform.value}
                          className="h-2 flex-1"
                        />
                        <span className="w-10 text-right text-sm font-medium">
                          {platform.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Device Types</h3>
                  <div className="flex gap-4">
                    {devices.map((device, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex flex-col items-center">
                              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 mb-1">
                                {device.icon}
                              </div>
                              <span className="text-xs">{device.value}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{device.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background border rounded-xl p-6 shadow-sm">
              <Tabs defaultValue="geo">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="geo">Geography</TabsTrigger>
                  <TabsTrigger value="time">Time Series</TabsTrigger>
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                </TabsList>
                <TabsContent value="geo" className="mt-6">
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <Image
                      src="/analytics-map.png"
                      width={500}
                      height={300}
                      alt="Geographic analytics map"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["United States", "United Kingdom", "India"].map(
                      (country, i) => (
                        <div key={i} className="text-center">
                          <p className="text-sm font-medium">{country}</p>
                          <p className="text-xs text-muted-foreground">
                            {[42, 23, 12][i]}% of traffic
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="time" className="mt-6">
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <Image
                      src="/time-series.png"
                      width={500}
                      height={300}
                      alt="Time series analytics"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Peak Time</p>
                      <p className="text-xs text-muted-foreground">
                        2:00 PM - 4:00 PM
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Best Day</p>
                      <p className="text-xs text-muted-foreground">Wednesday</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="sources" className="mt-6">
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <Image
                      src="/referral-sources.png"
                      width={500}
                      height={300}
                      alt="Referral sources"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Top Source</p>
                    <p className="text-xs text-muted-foreground">
                      Social Media (68%)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Feature */}
      <section className="w-full py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-background border rounded-xl p-8 shadow-sm flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <Image
                    src="/qr-code-demo.png"
                    width={200}
                    height={200}
                    alt="QR Code Example"
                    className="w-40 h-40"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-mono text-muted-foreground">
                    lnkshrt.co/demo123
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 px-4 sm:px-0">
              <Badge variant="outline" className="mb-4">
                <QrCode className="h-3 w-3 mr-2" />
                New Feature
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Dynamic QR Codes for Every Link
              </h2>
              <p className="mt-4 text-muted-foreground">
                Generate customizable QR codes automatically for each shortened
                URL. Perfect for print materials, business cards, and offline
                marketing.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Custom Branding</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add your logo and customize colors to match your brand
                      identity
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">
                    <Gauge className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Performance Tracking</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track scans separately from clicks with detailed analytics
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dynamic Redirects</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Update the destination URL without changing the QR code
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8" variant="outline">
                Learn More About QR Codes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Features */}
      <section className="w-full py-20 bg-muted/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Comprehensive Click Analytics
            </h2>
            <p className="mt-4 text-muted-foreground">
              Understand your audience with detailed insights across multiple
              dimensions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
            {analyticsFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all h-full">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                      <Image
                        src={`/analytics-${feature.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}.png`}
                        width={200}
                        height={120}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Trusted by marketers worldwide
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of satisfied customers who rely on our platform for
              their link management needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <p className="italic">&quot;{testimonial.content}&quot;</p>
                  </CardContent>
                  <CardFooter className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                      <Separator className="my-3" />
                      <div className="grid grid-cols-2 gap-2">
                        {testimonial.stats.map((stat, i) => (
                          <div key={i}>
                            <p className="text-xs text-muted-foreground">
                              {stat.label}
                            </p>
                            <p className="text-sm font-medium">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-primary">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-primary-foreground"
            >
              Ready to optimize your links?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 text-lg text-primary-foreground/90"
            >
              Get started today and join thousands of businesses using our
              platform to shorten, track, and analyze their links.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="px-8">
                  Get Started for Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="px-8">
                Request Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
