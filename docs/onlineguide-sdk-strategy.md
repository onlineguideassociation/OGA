# OnlineGuide.io SDK Strategy & Product Blueprint

## Positioning

**OnlineGuide.io – The All-in-One Digital Marketing SDK for Tourism & Local Businesses**

OnlineGuide.io should be built as:
- **API + SDK platform**
- **Mobile-first digital marketing toolkit**
- **White-label solution** for tour guides, drivers, and local tourism businesses

---

## 1) Core Structure Recommendation

### A. Platform Architecture

#### Backend
- Node.js (Fastify or Express)
- PostgreSQL (primary relational database)
- Redis (cache + queue)
- Stripe (billing)
- Hosting: AWS / DigitalOcean / Vercel (choose based on cost + scaling stage)

#### Frontend Dashboard
- Next.js (SEO + performance)
- TailwindCSS
- shadcn/ui

#### SDK & Integration Layer
- JavaScript SDK
- WordPress plugin
- Shopify app
- Public API access

---

## 2) Recommended SDK Modules

### 1. Booking & Lead SDK (MVP Priority)

Embed snippet example:

```html
<script src="https://onlineguide.io/sdk.js"></script>
<script>
  OnlineGuide.init({
    businessId: "12345",
    theme: "dark",
    language: "en"
  });
</script>
```

Features:
- Instant booking form
- WhatsApp auto-connect
- Telegram auto-connect
- Email lead capture
- CRM dashboard sync

Primary users:
- Siem Reap drivers
- Angkor Wat guides
- Phnom Penh tour agencies

### 2. AI Content Generator SDK

Inspired by workflows similar to Jasper/Canva, but tourism-specific:
- AI tour description generator
- AI Facebook ad copy
- AI TikTok caption generator
- AI SEO blog writer

Example prompt:
- “Generate Angkor Wat sunrise description” → high-converting output

### 3. Social Media Auto Poster SDK

Integrations:
- Facebook Pages
- Instagram
- TikTok
- YouTube Shorts

Automation:
- Post scheduling
- AI hashtag generation
- Caption optimization

### 4. Google Map Ranking Booster SDK

Tourism/local business features:
- Google Business profile setup checklist
- Review request flows
- QR review generator
- Follow-up automation for review reminders

---

## 3) Monetization Model

### Freemium Pricing

| Plan | Price | Features |
|---|---:|---|
| Free | $0 | Basic booking + 10 leads |
| Pro | $19/month | AI + CRM + auto posting |
| Agency | $49/month | White-label + multi-account |

Scale example:
- 1,000 users × $19 = **$19,000 MRR**

---

## 4) Market Expansion Strategy

### Phase 1
- Cambodia tourism businesses

### Phase 2
- Thailand
- Vietnam
- Indonesia

### Phase 3
- Global local businesses

---

## 5) Unique Competitive Advantage

OnlineGuide.io should be:
- Built for tour guides and drivers first
- WhatsApp-first for local conversion behavior
- Low-cost and practical for Southeast Asia
- English-speaking market ready
- SEO-focused for tourism discovery

Founder-led authenticity (tour guide + digital marketing expertise) is a strong differentiator.

---

## 6) Lean MVP Stack (Budget-Conscious)

If starting lean:
- Backend: Supabase
- Frontend: Next.js
- AI: OpenAI API
- Payments: Stripe
- Hosting: Vercel
- Email: Resend
- Auth: Clerk

Expected MVP timeline:
- **60–90 days**

---

## 7) Brand & Messaging

Domain:
- **OnlineGuide.io**

Tagline options:
- “Digital Marketing Engine for Tour Guides”
- “From Local Guide to Global Brand”
- “Turn Your Tour Business Digital”

---

## 8) Long-Term Vision

Position OnlineGuide.io as:
- “Shopify for Tourism Guides”
- “HubSpot for tourism marketing”

Focused on:
- Tour guides
- Drivers
- Local experiences operators

---

## 9) AI App Recommendation (Practical MVP)

### Positioning

**AI Digital Marketing Assistant for Tour Guides & Tourism Businesses**

Not general AI. Tourism-specialized AI with local-market workflows.

### Core AI Features (Ship First)

1. **AI Tour Description Generator**
   - Angkor Wat sunrise pages
   - Private driver services
   - Cambodia itinerary pages
   - Hotel/tour landing copy

2. **AI Facebook & TikTok Ad Generator**
   - Multiple ad variations
   - CTA suggestions
   - Hashtag strategy

3. **AI Review Reply Assistant**
   - Google review responses
   - TripAdvisor comment replies
   - Negative review recovery templates

4. **AI WhatsApp Booking Assistant**
   - Auto-reply templates for pricing and package questions
   - Structured, conversion-friendly responses

### Simple Product UX

Homepage actions:
- Generate tour description
- Create Facebook ad
- Reply to review
- Create itinerary

Dashboard:
- Saved projects
- Basic analytics
- Lead capture

Keep UX minimal and mobile-first for non-technical users.

---

## 10) Execution Order (Do Not Build Everything at Once)

1. Booking + WhatsApp SDK
2. AI Content Generator (Tour + Ads)
3. CRM Dashboard foundations
4. White-label multi-account expansion

Practical milestone:
- Reach first 100 paid users in Cambodia
- Then regional expansion (Thailand, Vietnam)
