# 🔗 LinkLayer

### Enterprise-Grade URL Infrastructure & Insights

LinkLayer is a high-performance link management platform designed for modern teams. It features sub-millisecond redirections, military-grade security gates, and deep geographic analytics.

[![Status](https://img.shields.io/website?url=https%3A%2F%2Flink-layer.vercel.app)](https://link-layer.vercel.app)
[![Tech](https://img.shields.io/badge/Tech-Next.js%2015-black)](https://nextjs.org)
[![Security](https://img.shields.io/badge/Security-Google%20Safe%20Browsing-blue)](https://safebrowsing.google.com/)

---

## 🚀 Key Features

### ⚡ Performance Redirection
- **Redis Caching**: Powered by Redis Cloud, redirects bypass the primary database for hot links to achieve sub-millisecond resolution.
- **Vercel Edge Ready**: Optimized for global deployment on the Vercel Edge network.

### 🛡️ Cybersecurity First
- **Google Safe Browsing**: Real-time threat detection blocks malicious URLs (malware, phishing) before they are shortened.
- **Fail-Safe Security**: Integrated security gates prevent the platform from serving harmful content.

### 📊 Intelligence & Analytics
- **Geo-Analytics Maps**: Interactive visual maps powered by Mapcn for real-time visitor tracking.
- **Neural Tracking**: Deep insights into device types, operating systems, browsers, and referring domains.
- **Visitor Fingerprinting**: Unique visitor identification without compromising privacy.

### 🎨 Design & Branding
- **Custom QR Engine**: High-fidelity, design-matched QR codes generated server-side.
- **Modern UI**: A premium, responsive dashboard built with Tailwind CSS 4 and shadcn/ui.
- **Dark Mode**: Native, polished dark mode support.

### 🔍 SEO & Discoverability
- **Dynamic Sitemap**: Automated XML sitemap generation for optimal search engine indexing.
- **Robots Management**: Configured crawl patterns to prioritize public visibility while shielding private data.
- **Meta Optimization**: Production-hardened OpenGraph, Twitter, and canonical metadata for professional sharing and high search rankings.
- **Ownership Verification**: Integrated Google Search Console validation.

---

## 🛠️ Infrastructure Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: MongoDB (Persistent Storage)
- **Caching**: Redis Cloud (High-speed Layer)
- **Auth**: Better Auth (Secure Session Management)
- **Security**: Google Safe Browsing API v4
- **Visualization**: Mapcn (MapLibre), Recharts
- **Styling**: Tailwind CSS 4, Framer Motion

---

## ⚙️ Environment Configuration

To run LinkLayer locally or in production, set the following variables in your `.env.local`:

```env
# Database
MONGODB_URL=your_mongodb_url

# Caching (Redis Cloud)
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
REDIS_USERNAME=default

# Authentication (Better Auth)
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

# Security
GOOGLE_SAFE_BROWSING_API_KEY=your_google_ai_key

# Public Config
NEXT_PUBLIC_BASE_URL=https://link-layer.vercel.app
```

---

## 📦 Getting Started

1. **Install Dependencies**: `npm install`
2. **Database Migration**: `npm run auth:migrate`
3. **Run Development**: `npm run dev`
4. **Build Production**: `npm run build`

---

## 🔒 Security Policy
We take security seriously. Every link created is checked against the Google Safe Browsing list to protect our users and their audience.

---

Built with ❤️ by the LinkLayer Engineering Team.
