"use client";

import {
  ArrowRight,
  Check,
  CheckCircle,
  Rocket,
  Sparkles,
  Zap,
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
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [activeTab, setActiveTab] = useState<
    "individual" | "team" | "enterprise"
  >("individual");

  const pricingPlans = {
    individual: [
      {
        name: "Free",
        price: billingCycle === "annual" ? "$0" : "$0",
        description: "Perfect for personal use and getting started",
        features: [
          "1,000 links/month",
          "Basic analytics",
          "Custom short domains",
          "QR code generation",
          "30-day click history",
        ],
        cta: "Get Started",
        popular: false,
      },
      {
        name: "Pro",
        price: billingCycle === "annual" ? "$12" : "$15",
        description: "For professionals and content creators",
        features: [
          "10,000 links/month",
          "Advanced analytics",
          "Custom branding",
          "Team members (3)",
          "1-year click history",
          "API access",
        ],
        cta: "Start Free Trial",
        popular: true,
      },
      {
        name: "Agency",
        price: billingCycle === "annual" ? "$36" : "$40",
        description: "For agencies and growing businesses",
        features: [
          "50,000 links/month",
          "White-label solutions",
          "Team members (10)",
          "Priority support",
          "Unlimited click history",
          "Advanced API",
        ],
        cta: "Contact Sales",
        popular: false,
      },
    ],
    team: [
      {
        name: "Starter",
        price: billingCycle === "annual" ? "$60" : "$75",
        description: "For small teams getting started",
        features: [
          "5 team members",
          "50,000 links/month",
          "Shared link library",
          "Team analytics",
          "Custom roles",
        ],
        cta: "Start Free Trial",
        popular: false,
      },
      {
        name: "Business",
        price: billingCycle === "annual" ? "$150" : "$180",
        description: "For growing organizations",
        features: [
          "15 team members",
          "200,000 links/month",
          "Advanced permissions",
          "Audit logs",
          "Single sign-on (SSO)",
        ],
        cta: "Start Free Trial",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations",
        features: [
          "Unlimited team members",
          "Custom link volume",
          "Dedicated support",
          "SLA guarantees",
          "Custom integrations",
        ],
        cta: "Contact Sales",
        popular: false,
      },
    ],
    enterprise: [
      {
        name: "Basic",
        price: "Custom",
        description: "Essential enterprise features",
        features: [
          "100,000+ links/month",
          "Dedicated account manager",
          "99.9% uptime SLA",
          "Advanced security",
          "Custom reporting",
        ],
        cta: "Contact Sales",
        popular: false,
      },
      {
        name: "Premium",
        price: "Custom",
        description: "Full enterprise solution",
        features: [
          "Unlimited links",
          "24/7 priority support",
          "Private infrastructure",
          "Compliance assistance",
          "Training & onboarding",
        ],
        cta: "Contact Sales",
        popular: true,
      },
    ],
  };

  const featuresComparison = [
    {
      feature: "Link shortening",
      free: true,
      pro: true,
      agency: true,
    },
    {
      feature: "Custom domains",
      free: "1 domain",
      pro: "5 domains",
      agency: "Unlimited domains",
    },
    {
      feature: "QR code generation",
      free: true,
      pro: true,
      agency: true,
    },
    {
      feature: "Basic analytics",
      free: true,
      pro: true,
      agency: true,
    },
    {
      feature: "Advanced analytics",
      free: false,
      pro: true,
      agency: true,
    },
    {
      feature: "API access",
      free: false,
      pro: "Limited",
      agency: "Full access",
    },
    {
      feature: "Team members",
      free: false,
      pro: "Up to 3",
      agency: "Up to 10",
    },
    {
      feature: "White-labeling",
      free: false,
      pro: false,
      agency: true,
    },
    {
      feature: "Priority support",
      free: false,
      pro: false,
      agency: true,
    },
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated accordingly.",
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer:
        "We offer 25% off for registered non-profit organizations. Contact our sales team with proof of non-profit status.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans.",
    },
    {
      question: "Is there a limit on click tracking?",
      answer:
        "No, all plans include unlimited click tracking. Only the link creation volume is limited based on your plan.",
    },
    {
      question: "How does the free trial work?",
      answer:
        "The free trial gives you full access to Pro features for 14 days. No credit card required until you decide to continue.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.",
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-background/50 to-muted/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4">
                <Rocket className="h-4 w-4 mr-2" />
                Simple, transparent pricing
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Pricing that <span className="text-primary">scales</span> with you
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Choose the perfect plan for your needs. Start for free, upgrade as
              you grow.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="w-full py-12 bg-muted/50">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <span className="font-medium text-sm sm:text-base">Monthly</span>

              <Button
                variant="outline"
                size="sm"
                className="relative overflow-hidden rounded-full border border-primary px-0 w-40 h-8"
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "annual" : "monthly"
                  )
                }
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-7 w-1/2 rounded-full bg-primary transition-transform duration-300 ease-in-out ${
                    billingCycle === "annual"
                      ? "translate-x-full"
                      : "translate-x-0"
                  }`}
                />
                <div className="relative z-10 flex w-full justify-between text-sm font-medium">
                  <span
                    className={`w-1/2 text-center transition-colors ${
                      billingCycle === "monthly"
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Monthly
                  </span>
                  <span
                    className={`w-1/2 text-center transition-colors ${
                      billingCycle === "annual"
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Annual
                  </span>
                </div>
              </Button>

              <span className="font-medium text-sm sm:text-base">Annual</span>

              <Badge
                variant="secondary"
                className="ml-0 sm:ml-2 flex items-center space-x-1 px-2 py-1"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold">Save 20%</span>
              </Badge>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Switch between monthly and annual billing
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="w-full py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "individual" | "team" | "enterprise")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
              <TabsTrigger value="individual">Individuals</TabsTrigger>
              <TabsTrigger value="team">Teams</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.individual.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className={`h-full transition-all hover:shadow-lg ${
                        plan.popular ? "ring-2 ring-primary" : ""
                      }`}
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
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                          {plan.price !== "$0" && plan.price !== "Custom" && (
                            <span className="text-muted-foreground">
                              /{billingCycle === "annual" ? "year" : "month"}
                            </span>
                          )}
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
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
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.team.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className={`h-full transition-all hover:shadow-lg ${
                        plan.popular ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge variant="default" className="px-3 py-1">
                            Best Value
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                          {plan.price !== "Custom" && (
                            <span className="text-muted-foreground">
                              /{billingCycle === "annual" ? "year" : "month"}
                            </span>
                          )}
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
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
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="enterprise" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {pricingPlans.enterprise.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className={`h-full transition-all hover:shadow-lg ${
                        plan.popular ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge variant="default" className="px-3 py-1">
                            Recommended
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
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
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="w-full py-20 bg-muted/50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Plan comparison
            </h2>
            <p className="mt-4 text-muted-foreground">
              See how our plans stack up against each other
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left pb-4 pr-6">Feature</th>
                  <th className="text-center pb-4 px-6">Free</th>
                  <th className="text-center pb-4 px-6">Pro</th>
                  <th className="text-center pb-4 pl-6">Agency</th>
                </tr>
              </thead>
              <tbody className="[&_tr:not(:last-child)]:border-b">
                {featuresComparison.map((feature, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 pr-6 font-medium">{feature.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      ) : (
                        <span>{feature.free}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      ) : (
                        <span>{feature.pro}</span>
                      )}
                    </td>
                    <td className="py-4 pl-6 text-center">
                      {typeof feature.agency === "boolean" ? (
                        feature.agency ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      ) : (
                        <span>{feature.agency}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="w-full py-20 bg-primary/10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-background border rounded-xl p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Zap className="h-4 w-4 mr-2" />
                Enterprise
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Need custom solutions?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our enterprise plans offer custom pricing, volume discounts, and
                dedicated support for large organizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Contact Sales
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 bg-primary">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
              Ready to optimize your links?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Join thousands of businesses using our platform to shorten, track,
              and analyze their links.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started for Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="secondary" className="px-8">
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
