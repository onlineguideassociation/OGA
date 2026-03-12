# OnlineGuide.io - AI Tourism & Creator Super-App

## Overview
OnlineGuide.io is a comprehensive AI-powered platform for Cambodia/Southeast Asia spanning travel, commerce, hospitality, crypto, and community modules. It represents the Online Guide Association (OGA) and integrates numerous interconnected modules into a single unified application.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter (frontend), Express (backend)
- **State Management**: TanStack Query (React Query)
- **Charts**: Recharts (BarChart, PieChart)
- **Branding**: OnlineGuide.io with colors #C1121F (red) and #0081C9 (blue)

## Architecture
```
client/src/           - React frontend
  pages/
    map/              - **UNIFIED KNOWLEDGE HUB** (All-in-One page)
      index.tsx       - Main KnowledgeGraphMap: 4-tab sidebar across 4 groups
      intelligence-flow-section.tsx - Intelligence flow (Map, Graph, AutoBot, Forecasting)
      tourism-flow-section.tsx      - Tourism flow (Travel OS, Hotels, Dining, Conferences)
      creator-flow-section.tsx      - Creator flow (Content Generator, Cultural Cinema)
      community-flow-section.tsx    - Community flow (Trust Network & API, GuideFund, OGA)
    dashboard/        - Dashboard with analytics, AI tools
    ...               - Other standalone module pages
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

## Unified Knowledge Hub (4 Sidebar Tabs, 4 Groups)
The `/map` route hosts the unified "All in One" page with a dark sidebar navigator:
- **Intelligence**: Tourism Map, Graph Explorer, AI AutoBot & RDTB, Forecasting Engine (pill sub-tabs)
- **Tourism**: Travel OS, Hotels, Dining & Loyalty, Conferences (pill sub-tabs)
- **Creator**: Content Generator, Cultural Cinema (pill sub-tabs)
- **Community**: Trust Network & API, GuideFund, OGA (pill sub-tabs)

Routes `/hotels`, `/restaurants`, `/travel`, `/events`, `/cinema`, `/autobot`, `/rdtb`, `/media`, `/finance`, `/fundraising`, `/association` all redirect to KnowledgeGraphMap.

## One Flow API
Unified REST API endpoint catalog at `GET /api/trust/network` returns live network health, guide counts, regional status, and trust metrics. The Global Trust Section provides an interactive API explorer showing all 20 endpoints across modules.

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
- `GET/POST /api/bookings` - Booking CRUD
- `POST /api/contact` - Contact form

## Key Features
- **Knowledge Graph Map** (`/map`): Interactive SVG-based Cambodia map with nodes for airports, cities, temples, markets, hotels, restaurants. Filterable sidebar, connection polylines, AI recommendations panel, and node detail popups.
- **Dashboard** (`/dashboard`): Real-time analytics pulling live API data. Revenue charts, module health status, AI insights, community activity feed, pie chart revenue split.
- **Travel OS, Marketplace, Hotels, Restaurants**: Data-driven, API-connected modules with booking/purchase flows
- **Community Hub, Freelance Network, Events**: Data-driven, API-connected with social features
- **Crypto/DeFi, Connectivity, HR, Autobot**: Prototype/display pages
- **Finance, Media, Sustainability, Cinema, IDE, ERP, Hospitality PMS**: Additional module pages

## Running
- `npm run dev` - Start full-stack dev server (port 5000)
- `npm run db:push` - Push schema to database
- `npx tsx db/seed.ts` - Seed database with sample data
