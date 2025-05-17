import {
  ArrowRight,
  Rocket,
  BarChart2,
  Lock,
  Zap,
  Globe,
  CheckCircle,
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

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Lightning Fast",
      description: "Links shorten in milliseconds with our global CDN",
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      title: "Detailed Analytics",
      description: "Track clicks, locations, and devices in real-time",
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "Secure Links",
      description: "Military-grade encryption for all your shortened links",
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Global Reach",
      description: "Servers in 12 countries for instant access worldwide",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "LinkShort increased our campaign CTR by 32% with their powerful analytics.",
      avatar: "/avatars/sarah.jpg",
    },
    {
      name: "Michael Chen",
      role: "Growth Lead",
      company: "StartUp Inc.",
      content:
        "The API integration saved our team hundreds of hours each quarter.",
      avatar: "/avatars/michael.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Content Creator",
      company: "Self-Employed",
      content:
        "Finally a link shortener that doesn't look spammy! My audience loves it.",
      avatar: "/avatars/emma.jpg",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for individuals getting started",
      features: [
        "1,000 links/month",
        "Basic analytics",
        "Custom domains",
        "24h support",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$15",
      description: "For growing businesses and professionals",
      features: [
        "10,000 links/month",
        "Advanced analytics",
        "Team members",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with custom needs",
      features: [
        "Unlimited links",
        "API access",
        "Dedicated account manager",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Rocket className="h-4 w-4 mr-2" />
              Introducing v3.0 — More powerful than ever
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Shorten, Share, and <span className="text-primary">Track</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              The most powerful URL shortener with enterprise-grade analytics,
              custom domains, and API access.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Started for Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              "TechCorp",
              "StartUp Inc",
              "Digital Agency",
              "CloudNine",
              "WebScale",
            ].map((company) => (
              <div key={company} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{company[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to optimize your links
            </h2>
            <p className="mt-4 text-muted-foreground">
              Powerful features designed to help you understand and grow your
              audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Real-time analytics that matter
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our dashboard gives you instant insights into who's clicking
                your links and where they're coming from.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  { label: "Total Clicks", value: 85, max: 100 },
                  { label: "Unique Visitors", value: 72, max: 100 },
                  { label: "Conversion Rate", value: 45, max: 100 },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{stat.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {stat.value}%
                      </span>
                    </div>
                    <Progress value={stat.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background border rounded-xl p-6 shadow-sm">
              <Tabs defaultValue="clicks">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="clicks">Clicks</TabsTrigger>
                  <TabsTrigger value="locations">Locations</TabsTrigger>
                  <TabsTrigger value="devices">Devices</TabsTrigger>
                </TabsList>
                <TabsContent value="clicks" className="mt-6">
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Clicks chart visualization
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="locations" className="mt-6">
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Locations map visualization
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="devices" className="mt-6">
                  <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Devices breakdown visualization
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Loved by marketers worldwide
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of satisfied customers who trust LinkShort for
              their link management needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="italic">"{testimonial.content}"</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose the plan that fits your needs. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={
                  plan.popular ? "ring-2 ring-primary relative" : "relative"
                }
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default" className="px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "$0" && plan.price !== "Custom" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
              Ready to transform your links?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Join thousands of businesses using LinkShort to optimize their
              links and track performance.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started for Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="secondary" className="px-8 ">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
