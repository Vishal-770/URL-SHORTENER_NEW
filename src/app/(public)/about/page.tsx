import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2, ShieldCheck, Users2 } from "lucide-react";

const values = [
  {
    title: "Clarity over clutter",
    description:
      "We prefer a product that feels useful and deliberate rather than overloaded with noise.",
    icon: Globe2,
  },
  {
    title: "Trustworthy sharing",
    description:
      "Short links should feel credible and easy to understand in both public and private contexts.",
    icon: ShieldCheck,
  },
  {
    title: "Tools for real teams",
    description:
      "The dashboard is designed to help daily operators move quickly without getting lost.",
    icon: Users2,
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell py-12 sm:py-16">
      <section className="rounded-[2rem] border bg-card/70 p-6 sm:p-10">
        <Badge variant="secondary" className="rounded-full px-4 py-1.5">
          About LinkLayer
        </Badge>
        <div className="mt-6 max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            A calmer, more professional way to manage links.
          </h1>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            LinkLayer is focused on the parts of link management that teams
            actually care about: clean public presentation, dependable
            redirects, and analytics that help you make decisions.
          </p>
        </div>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <Card key={value.title} className="rounded-3xl border bg-card/80">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="pt-4 text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
