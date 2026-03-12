# OnlineGuide.io - AI Tourism & Creator Super-App

## Overview
OnlineGuide.io is a comprehensive AI-powered platform for Cambodia/Southeast Asia spanning travel, commerce, hospitality, crypto, and community modules. It represents the Online Guide Association (OGA) and integrates numerous interconnected modules into a single unified application.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter (frontend), Express (backend)
- **State Management**: TanStack Query (React Query)
- **Branding**: OnlineGuide.io with colors #C1121F (red) and #0081C9 (blue)

## Architecture
```
client/src/           - React frontend
  pages/              - All module pages (35+ routes)
  components/         - Shared components (layout, ui)
  hooks/              - Custom hooks (use-toast, use-mobile)
server/               - Express backend
  index.ts            - Server entry point
  routes.ts           - All API routes (/api/*)
  storage.ts          - Database storage layer (IStorage interface)
shared/
  schema.ts           - Drizzle ORM schemas & Zod validation
db/
  index.ts            - Database connection (pg pool + drizzle)
  seed.ts             - Database seed script
```

## Database Tables
- `users` - User accounts
- `products` - Marketplace products with categories, pricing, commissions
- `hotels` - Hotel listings with amenities, ratings, eco-certification
- `restaurants` - Restaurant listings with cuisine types, features
- `itineraries` - AI-guided travel itineraries with sites
- `events` - Industry events & conferences
- `freelance_gigs` - Freelance job postings
- `community_posts` - Community forum posts with likes
- `bookings` - Unified bookings (hotels, restaurants, events, itineraries)
- `contact_messages` - Contact form submissions

## API Routes
All routes prefixed with `/api/`:
- `GET/POST /api/products` - Product CRUD + search
- `GET/POST /api/hotels` - Hotel listings + filtering
- `GET/POST /api/restaurants` - Restaurant listings
- `GET/POST /api/itineraries` - Travel itinerary listings
- `GET/POST /api/events` - Event listings + registration
- `GET/POST /api/freelance-gigs` - Freelance job postings
- `GET/POST /api/community-posts` - Community posts + likes
- `POST /api/bookings` - Unified booking creation
- `POST /api/contact` - Contact form

## Key Modules
- Travel OS, Marketplace, Hotels, Restaurants (data-driven, API-connected)
- Community Hub, Freelance Network, Events (data-driven, API-connected)
- Crypto/DeFi, Connectivity, HR, Autobot (prototype/display pages)
- Dashboard, Finance, Media, Sustainability, Cinema, IDE, ERP, Hospitality PMS

## Running
- `npm run dev` - Start full-stack dev server (port 5000)
- `npm run db:push` - Push schema to database
- `npx tsx db/seed.ts` - Seed database with sample data
