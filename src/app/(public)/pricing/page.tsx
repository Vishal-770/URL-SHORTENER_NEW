"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Wallet } from "lucide-react";

const pricing = {
  monthly: [
    {
      name: "Starter",
      price: "$0",
      description: "A simple entry point for personal use.",
      features: ["Create short links", "Basic analytics", "QR access"],
    },
    {
      name: "Pro",
      price: "$15",
      description: "A balanced plan for teams and creators.",
      features: [
        "Advanced analytics",
        "Dashboard workspace",
        "Priority support",
      ],
      highlighted: true,
    },
    {
      name: "Scale",
      price: "Custom",
      description: "For larger volumes and custom operating needs.",
      features: ["Custom limits", "Dedicated help", "Flexible rollout"],
    },
  ],
  annual: [
    {
      name: "Starter",
      price: "$0",
      description: "A simple entry point for personal use.",
      features: ["Create short links", "Basic analytics", "QR access"],
    },
    {
      name: "Pro",
      price: "$144",
      description: "A balanced plan for teams and creators.",
      features: [
        "Advanced analytics",
        "Dashboard workspace",
        "Priority support",
      ],
      highlighted: true,
    },
    {
      name: "Scale",
      price: "Custom",
      description: "For larger volumes and custom operating needs.",
      features: ["Custom limits", "Dedicated help", "Flexible rollout"],
    },
  ],
};

export default function PricingPage() {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <main className="page-shell py-12 sm:py-16">
      <section className="rounded-[2rem] border bg-card/70 p-6 sm:p-10">
        <Badge variant="secondary" className="rounded-full px-4 py-1.5">
          <Wallet className="mr-2 h-4 w-4" />
          Pricing
        </Badge>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Straightforward pricing with a calmer product experience.
            </h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Keep the product simple at the front door and more capable inside
              the workspace. Choose the billing cycle that fits how your team
              buys software.
            </p>
          </div>

          <Tabs
            value={cycle}
            onValueChange={(value) => setCycle(value as "monthly" | "annual")}
          >
            <TabsList className="grid w-[220px] grid-cols-2 rounded-full">
              <TabsTrigger value="monthly" className="rounded-full">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="annual" className="rounded-full">
                Annual
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      <section className="grid gap-6 py-10 lg:grid-cols-3">
        {pricing[cycle].map((plan) => (
          <Card
            key={plan.name}
            className={`rounded-3xl border ${
              plan.highlighted ? "border-primary bg-card shadow-sm" : "bg-card/80"
            }`}
          >
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {plan.highlighted ? (
                  <Badge className="rounded-full px-3 py-1">Recommended</Badge>
                ) : null}
              </div>
              <div>
                <p className="text-4xl font-semibold">{plan.price}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
              <Button className="w-full rounded-xl" variant={plan.highlighted ? "default" : "outline"}>
                {plan.price === "Custom" ? "Talk to sales" : "Choose plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
