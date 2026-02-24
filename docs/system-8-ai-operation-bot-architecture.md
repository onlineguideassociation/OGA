# SYSTEM 8 — AI Operation Bot Architecture (OnlineGuide.io)

## Strategic Position
OnlineGuide.io is positioned as national tourism infrastructure technology for Cambodia, with initial operational focus on:
- Siem Reap
- Phnom Penh
- Angkor Wat

## Core Infrastructure Stack

### Backend
- Node.js + Express (current scaffold)
- Replit for MVP deployment
- Cloud/VPS migration path for scale

### Database
- PostgreSQL as source-of-truth database
- Supabase-compatible schema and SQL
- Optional Firebase for real-time messaging analytics

### Authentication
- JWT for API auth/session exchange
- OAuth pathways (Google/Facebook) for user onboarding

### Integrations
- OpenAI API
- Google Gemini API
- Google Search Console API
- Google Ads API
- Meta Marketing API
- YouTube Data API
- WhatsApp Business API
- Telegram Bot API
- TripAdvisor data provider (white-hat compliant)

## Monorepo Module Layout

```text
/onlineguide-os
  /api
  /ai-engine
  /publishing
  /ads-intelligence
  /review-monitor
  /visibility-score
  /messaging-tracker
  /investor-crm
  server.js
  database.js
```

## AI Router Pattern
- `seo_blog` tasks route to OpenAI for long-form and structured output.
- `social_caption` tasks route to Gemini for concise social formats.
- `review_sentiment` tasks route to OpenAI with JSON output normalization.

## Tourism Intelligence Data Model
Implemented in `onlineguide-os/database/schema.sql`:
- `users`
- `reviews`
- `visibility_scores`
- `messaging_tracking`
- `investors`

Visibility scoring (Phase 1):

```text
final_score =
  (google_rank * 0.25)
+ (tripadvisor_rating * 0.25)
+ (engagement_score * 0.15)
+ (ad_efficiency * 0.15)
+ (response_time * 0.20)
```

## Execution Phases

### Phase 1 (MVP — 60 days)
- Keyword tracking foundation
- Review AI reply assistant
- Basic visibility score
- Telegram message tracking

### Phase 2
- YouTube transcript-to-SEO workflow
- Social analytics dashboard
- WhatsApp tracking depth
- Ad waste detection

### Phase 3
- Cross-platform auto-publishing
- Competitor tracking
- White-label agency dashboard
- Investor CRM automation

## Compliance Framework
- No fake reviews
- No spam automation
- API-native integrations only
- White-hat growth and platform-compliant behavior
