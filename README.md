# 🔗 URL Shortener

A modern, full-stack URL shortening service built with Next.js 15, featuring analytics, QR code generation, and user authentication.

## ✨ Features

### Core Functionality
- **URL Shortening**: Convert long URLs into short, shareable links with auto-generated slugs
- **QR Code Generation**: Automatic QR code creation for each shortened URL
- **Custom Redirects**: Track and redirect users seamlessly
- **User Authentication**: Secure authentication powered by Clerk

### Analytics & Tracking
- **Comprehensive Analytics**: Track clicks, locations, devices, and browsers
- **Visit History**: Detailed tracking of each visit with timestamps
- **Device Detection**: Identify desktop, mobile, and tablet users
- **Browser & OS Detection**: Track user agents and operating systems
- **Referrer Tracking**: See where your traffic is coming from
- **IP Address Logging**: Record visitor IP addresses for analytics

### Dashboard Features
- **Personal Dashboard**: Manage all your shortened URLs in one place
- **Real-time Statistics**: View click counts and visit history
- **Visual Analytics**: Charts and graphs for data visualization
  - Line charts for temporal analysis
  - Pie charts for distribution analysis
  - Visit history tables
- **URL Management**: Easy creation and deletion of short links
- **QR Code Download**: Download QR codes for offline use

### UI/UX
- **Modern Design**: Beautiful UI built with Tailwind CSS and shadcn/ui
- **Dark Mode**: Full dark mode support with theme toggle
- **Responsive Design**: Works seamlessly on all devices
- **Smooth Animations**: Powered by Framer Motion
- **Loading States**: NProgress integration for better UX
- **Toast Notifications**: User-friendly feedback with Sonner

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **Icons**: Lucide React

### Backend
- **API Routes**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **QR Code**: qrcode library
- **URL Generation**: nanoid
- **Analytics**: 
  - UA Parser JS (user agent parsing)
  - geoip-lite (geolocation)
  - request-ip (IP detection)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **HTTP Client**: Axios

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud)
- Clerk account for authentication

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vishal-770/URL-SHORTENER_NEW.git
cd URL-SHORTENER_NEW
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB Connection
MONGODB_URL=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BASE_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### 5. Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
URL-SHORTENER_NEW/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── about/               # About page
│   │   ├── api/                 # API routes
│   │   │   ├── add-url/        # Create short URL
│   │   │   ├── create-user/    # User creation
│   │   │   ├── delete-url/     # Delete URL
│   │   │   └── get-url/        # Fetch URLs
│   │   ├── dashboard/           # User dashboard
│   │   │   ├── analyze/        # Analytics page
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── URLInput.tsx
│   │   │   ├── URLCard.tsx
│   │   │   └── DeleteButton.tsx
│   │   ├── features/            # Features showcase
│   │   ├── pricing/             # Pricing page
│   │   ├── redirect/[slug]/     # Dynamic redirect handler
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── NavBar.tsx          # Navigation
│   │   ├── Footer.tsx          # Footer
│   │   ├── Layout.tsx          # Layout wrapper
│   │   └── theme-provider.tsx  # Theme management
│   ├── database/                # Database layer
│   │   ├── connection.js       # MongoDB connection
│   │   └── models/             # Mongoose models
│   │       ├── usermodel.ts
│   │       └── shortUrlmodel.ts
│   ├── services/                # API services
│   │   └── service.ts          # API client functions
│   ├── lib/                     # Utilities
│   │   └── utils.ts
│   └── middleware.ts            # Clerk middleware
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── next.config.ts              # Next.js config
└── README.md                   # Documentation
```

## 🔌 API Routes

### POST `/api/create-user`
Create a new user in the database.

**Request Body:**
```json
{
  "clerkId": "string",
  "firstName": "string",
  "lastName": "string"
}
```

### POST `/api/add-url`
Create a new shortened URL.

**Request Body:**
```json
{
  "originalUrl": "string",
  "clerkId": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "originalUrl": "string",
    "slug": "string",
    "qrCode": "string",
    "userId": "string",
    "visitHistory": [],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### GET `/api/get-url?clerkId={clerkId}`
Get all URLs for a specific user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "originalUrl": "string",
      "slug": "string",
      "qrCode": "string",
      "visitHistory": [],
      "createdAt": "date"
    }
  ]
}
```

### DELETE `/api/delete-url`
Delete a shortened URL.

**Request Body:**
```json
{
  "slug": "string"
}
```

### GET `/redirect/[slug]`
Redirect to the original URL and track analytics.

## 🎨 Key Pages

- **Home (`/`)**: Landing page with features and pricing overview
- **Features (`/features`)**: Detailed feature showcase with animations
- **Pricing (`/pricing`)**: Pricing plans and comparison
- **About (`/about`)**: Company information and values
- **Dashboard (`/dashboard`)**: User's personal dashboard
- **Analytics (`/dashboard/analyze/[id]`)**: Detailed analytics for a specific URL

## 🔒 Authentication

This project uses [Clerk](https://clerk.com/) for authentication. Users must sign in to:
- Create shortened URLs
- Access their dashboard
- View analytics
- Manage their links

Public routes are configured in `src/middleware.ts`.

## 📊 Database Schema

### User Model
```typescript
{
  clerkId: string (unique, required),
  firstName: string,
  lastName: string
}
```

### ShortUrl Model
```typescript
{
  originalUrl: string (required),
  slug: string (unique, required),
  userId: ObjectId (ref: User, required),
  qrCode: string (required),
  visitHistory: [
    {
      timestamp: Date,
      ip: string,
      deviceType: string,
      os: string,
      browser: string,
      referrer: string,
      userAgent: string
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Features Highlights

### Lightning Fast
- Links shorten in milliseconds with global CDN
- Optimized with Next.js 15 and server-side rendering

### Secure Links
- Military-grade encryption for all shortened links
- Secure authentication with Clerk

### Detailed Analytics
- Track clicks, locations, and devices in real-time
- Visual representations with charts and graphs

### Global Reach
- MongoDB for scalable data storage
- Designed for worldwide accessibility

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Clerk](https://clerk.com) - Authentication platform
- [shadcn/ui](https://ui.shadcn.com) - UI component library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Next.js 15
