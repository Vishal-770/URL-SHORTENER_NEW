import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "LinkLayer | Professional URL Shortener & QR Engine",
    template: "%s | LinkLayer",
  },
  description: "Advanced link management platform. Shorten URLs, generate high-resolution custom QR codes, and track audience analytics in real-time.",
  keywords: ["URL Shortener", "QR Code Generator", "Link Analytics", "Branded Links", "Marketing Tools"],
  authors: [{ name: "LinkLayer Team" }],
  creator: "LinkLayer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://link-layer.vercel.app",
    title: "LinkLayer | Professional URL Shortener",
    description: "Lightning-fast URL redirection and custom QR code design for modern teams.",
    siteName: "LinkLayer",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkLayer | Professional URL Shortener",
    description: "Lightning-fast URL redirection and custom QR code design for modern teams.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-secondary/30 selection:text-secondary`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
