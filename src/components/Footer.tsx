import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MessageSquare,
  Globe,
  Pen,
  Code,
  Book,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        {
          name: "Features",
          href: "/features",
          icon: <MessageSquare className="h-4 w-4 mr-2" />,
        },
        { name: "Pricing", href: "/pricing", icon: null },
        { name: "API", href: "/api", icon: <Code className="h-4 w-4 mr-2" /> },
        { name: "Integrations", href: "/integrations", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", icon: null },
        { name: "Blog", href: "/blog", icon: <Pen className="h-4 w-4 mr-2" /> },
        { name: "Careers", href: "/careers", icon: null },
        {
          name: "Contact",
          href: "/contact",
          icon: <Mail className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "/help", icon: null },
        {
          name: "Documentation",
          href: "/docs",
          icon: <Book className="h-4 w-4 mr-2" />,
        },
        { name: "Community", href: "/community", icon: null },
        {
          name: "Status",
          href: "/status",
          icon: <Globe className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy", icon: null },
        { name: "Terms of Service", href: "/terms", icon: null },
        { name: "Cookie Policy", href: "/cookies", icon: null },
        { name: "GDPR", href: "/gdpr", icon: null },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", name: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", name: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", name: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", name: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, href: "#", name: "GitHub" },
  ];

  return (
    <footer className="bg-background border-t mt-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          {/* Newsletter Subscription */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-lg">
                  LS
                </span>
              </div>
              <span className="text-2xl font-bold">LinkShort</span>
            </div>
            <p className="text-muted-foreground text-lg">
              The fastest way to shorten your links and track their performance.
            </p>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">
                Subscribe to our newsletter
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-muted/50 border-border"
                />
                <Button type="submit">Subscribe</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                We will never share your email. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-border/50" />

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} LinkShort. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
                asChild
                aria-label={social.name}
              >
                <Link href={social.href}>{social.icon}</Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
