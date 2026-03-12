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
      index.tsx       - Main KnowledgeGraphMap: 6-tab sidebar across 6 groups
      booking-section.tsx        - Book & Reserve (live API: tours, hotels, restaurants, itineraries)
      hero-section.tsx           - Hero search with live platform stats
      intelligence-flow-section.tsx - Intelligence flow
      dashboard-section.tsx          - Guiding Intelligence Dashboard
      forecasting-rdtb-section.tsx   - Forecasting & RDTB with What If? Planner
      scenario-planner-section.tsx   - What If? Scenario Planner
      tourism-flow-section.tsx      - Tourism flow
      creator-flow-section.tsx      - Creator flow
      community-flow-section.tsx    - Community flow
      management-flow-section.tsx   - Management flow
    dashboard/        - Dashboard with analytics, AI tools
    ...               - Other standalone module pages
  components/         - Shared components (layout with live newsletter API, ui)
  hooks/              - Custom hooks (use-toast, use-mobile)
server/               - Express backend
  index.ts            - Server entry point
  routes.ts           - All API routes (/api/*)
  storage.ts          - Database storage layer (IStorage interface)
shared/
  schema.ts           - Drizzle ORM schemas & Zod validation (13 tables)
db/
  index.ts            - Database connection (pg pool + drizzle)
  seed.ts             - Database seed script (all entities including 12 tours, 10 reviews)
```

## Unified Knowledge Hub (6 Sidebar Tabs)
The `/map` route hosts the unified "All in One" page with a dark sidebar navigator:
- **Intelligence**: Dashboard, Tourism Map, Graph Explorer, Forecasting & RDTB
- **Tourism**: Travel OS, Hotels, Dining & Loyalty, Conferences
- **Book & Reserve**: Split-view booking (45% cards / 55% map) with live API data
- **Creator**: Content Generator, Cultural Cinema
- **Community**: Trust Network & API, GuideFund, OGA, Global Vision, AI Guide Book, Digital Postcards
- **Management**: ERP/CRM, Hospitality PMS, Community Hub, Freelance Network, Sustainability & ESG, WebOS IDE

## Database Tables (13)
- `users` - User accounts
- `products` - Marketplace products with categories, pricing, commissions
- `hotels` - Hotel listings with amenities, ratings, eco-certification
- `restaurants` - Restaurant listings with cuisine types, features
- `itineraries` - AI-guided travel itineraries with sites
- `events` - Industry events & conferences
- `freelance_gigs` - Freelance job postings
- `community_posts` - Community forum posts with likes
- `bookings` - Unified bookings (hotels, restaurants, events, tours)
- `contact_messages` - Contact form submissions
- `tours` - Tour listings with GPS coords, guides, features, badges, languages
- `reviews` - User reviews for any entity (tour/hotel/restaurant) with verified status
- `newsletter_subscribers` - Newsletter email subscriptions with source tracking

## API Routes (27 endpoints)
All routes prefixed with `/api/`:
- `GET/POST /api/products` - Product CRUD + search
- `GET/POST /api/hotels` - Hotel listings + filtering by location/type
- `GET/POST /api/restaurants` - Restaurant listings + location filtering
- `GET/POST /api/itineraries` - Travel itinerary listings
- `GET/POST /api/events` - Event listings + category filtering
- `GET/POST /api/freelance-gigs` - Freelance job postings
- `GET/POST /api/community-posts` - Community posts + `POST /:id/like`
- `GET/POST /api/bookings` - Booking CRUD with user filtering
- `GET/POST /api/tours` - Tour CRUD + search by name/location
- `GET /api/reviews/:entityType/:entityId` - Reviews per entity
- `POST /api/reviews` - Submit review + `POST /:id/helpful`
- `POST /api/newsletter/subscribe` - Newsletter subscription (unique email)
- `GET /api/search?q=` - Global cross-entity search (tours, hotels, restaurants, products, events, itineraries)
- `GET /api/stats` - Live platform statistics (counts for all entities)
- `GET /api/health` - Health check with service status
- `GET /api/trust/network` - Trust network API data
- `POST /api/contact` - Contact form

## Live Frontend Connections
- **Booking Section**: Fetches tours, hotels, restaurants, itineraries via API; creates real bookings
- **Hero Section**: Displays live platform stats from `/api/stats`
- **Footer Newsletter**: Subscribes via `/api/newsletter/subscribe` with duplicate handling
- **Dashboard**: Live data from products, hotels, restaurants, bookings, community posts, events, gigs
- **Tourism Flow**: Hotels, restaurants, events, itineraries from API
- **Community Flow**: Community posts, trust network from API
- **Management Flow**: Freelance gigs, bookings from API

## Running
- `npm run dev` - Start full-stack dev server (port 5000)
- `npm run db:push` - Push schema to database
- `npx tsx db/seed.ts` - Seed database with sample data
