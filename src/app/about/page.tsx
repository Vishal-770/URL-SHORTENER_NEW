"use client";

import {
  Globe2,
  Shield,
  Rocket,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { value: "10M+", label: "Links shortened" },
    { value: "150K+", label: "Active users" },
    { value: "12", label: "Global locations" },
    { value: "99.9%", label: "Uptime" },
  ];

  const values = [
    {
      icon: <Rocket className="h-6 w-6 text-primary" />,
      title: "Innovation",
      description:
        "We constantly push boundaries to deliver cutting-edge link management solutions",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Security",
      description:
        "Your data's safety is our top priority with enterprise-grade protection",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-primary" />,
      title: "Customer Focus",
      description: "We build tools that solve real problems for our users",
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-background/50 to-muted/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Globe2 className="h-4 w-4 mr-2" />
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Building the future of{" "}
              <span className="text-primary">link management</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              LinkShort was founded in 2020 with a simple mission: make link
              sharing smarter, faster, and more powerful for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-muted/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                From garage to global
              </h2>
              <p className="mt-4 text-muted-foreground">
                What started as a side project to solve our own link management
                headaches has grown into a platform trusted by thousands of
                businesses worldwide.
              </p>
              <div className="mt-6 space-y-4">
                <p>
                  Our founders, Alex and Maria, were frustrated with existing
                  link shorteners that lacked proper analytics and security.
                  They built the first version of LinkShort over a weekend, and
                  the rest is history.
                </p>
                <p>
                  Today, we&#39;re a fully remote team spanning 8 countries,
                  united by our passion for building tools that make the web
                  work better.
                </p>
              </div>
              <Button className="mt-8" asChild>
                <Link href="/features">
                  See our features
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="bg-muted rounded-xl p-6 aspect-video flex items-center justify-center">
              <p className="text-muted-foreground">
                Company timeline visualization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Our core values
            </h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow h-full"
              >
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 mb-4">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-primary">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
              Ready to join the future of links?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Thousands of businesses trust LinkShort for their link management
              needs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started for Free
              </Button>
              <Button size="lg" variant="secondary" className="px-8">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
