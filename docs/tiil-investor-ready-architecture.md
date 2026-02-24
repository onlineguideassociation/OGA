# TIIL — Tourism Intelligence Infrastructure Layer (Investor-Ready)

## Positioning Statement
**OnlineGuide.io** is positioned as **Cambodia Tourism Intelligence Infrastructure**: secure, API-native, and performance-driven.

This is infrastructure—not a generic SaaS utility.

## 4-Layer System Model

### Layer 1 — Verified Data Intake (Foundation)

**Principle:** API-first, no scraping dependency.

Primary connectors:
- Google Business Profile API
- Google Search Console API
- YouTube Data API
- Meta Graph API
- WhatsApp Business API
- Telegram Bot API
- Weather API
- Currency API

Storage and runtime:
- PostgreSQL as source of truth
- Redis for caching and rate control
- Asynchronous queued ingestion (BullMQ/RabbitMQ pattern)

Why it matters:
- Scales from day one
- Isolates spikes in connector traffic
- Improves reliability and retry control

### Layer 2 — Intelligence Engine (IP Core)

This is not only LLM prompt execution. It combines:
- Structured scoring models
- Predictive tourism patterning
- AI-generated strategic recommendations

Engine split:
1. Reputation Engine
2. Visibility Engine
3. Capital Readiness Engine

#### Visibility Index (Defensible Model)

Use adaptive city-level coefficients instead of static global weights.

```text
VisibilityScore =
f(ReviewVelocity, RatingQuality, ResponseSpeed, ContentFrequency, EngagementTrend)
```

Dynamic weighting examples:
- Siem Reap: review + SEO heavy
- Phnom Penh: social + urban demand heavy
- Angkor Circuit: seasonal sensitivity heavy

This model architecture is intended to be proprietary and difficult to replicate.

#### Capital Readiness Engine (Differentiator)

Computes:
- Revenue stability
- Seasonal volatility
- Booking conversion efficiency
- Reputation consistency
- Market demand growth

Outputs:
- **Tourism Investment Readiness Score (TIRS)** for investor-facing decision support.

### Layer 3 — Action Engine (Controlled Automation)

Security and control boundary:
- No OS-level automation
- No arbitrary system command execution
- No unsafe plugin marketplace

Allowed action patterns:
- API-based publishing
- Structured review reply suggestions
- CRM updates
- Budget efficiency alerts
- Seasonal campaign recommendations

This keeps automation enterprise-acceptable and auditable.

### Layer 4 — Dual Dashboard Model

#### Operator Dashboard
Tracks:
- Visibility Score
- Review Health
- Booking Intent Signals
- Response Speed Ranking
- Demand Forecast (30–60 days)
- AI Suggestions

Primary objective: recurring revenue retention.

#### Investor Dashboard
Tracks:
- City-level tourism performance
- Top 20 performing operators
- Growth stability index
- Capital efficiency ratio
- Guide network expansion rate

Primary objective: capital confidence and allocation decisions.

## Security Architecture (Non-Negotiable)

To remain investable:
- Role-based access control (RBAC)
- Encrypted API keys (KMS or Vault)
- Webhook signature verification
- Audit trail logging
- Model call monitoring
- Rate limiting
- Data partitioning per business tenant
- Strict prevention of cross-client data leakage

## Execution Roadmap

### Phase 1 — Revenue Proof (90 days)
Build only:
- Google Review AI Reply
- Telegram Message Tracking
- Basic Visibility Score
- Operator Dashboard

Target:
- 20 Siem Reap guides paying $29–$49/month.

### Phase 2 — Performance Infrastructure
Add:
- YouTube to SEO automation
- Social publishing engine
- Demand forecasting
- Ad efficiency tracking

Upsell band:
- $99–$199 tier.

### Phase 3 — Capital Layer
Add:
- Tourism Investment Readiness Score (TIRS)
- Investor Dashboard
- Tourism-focused investor database
- Capital matching logic

Outcome:
- Seed-round narrative backed by operating metrics.

## Monetization Strategy

- Tier 1 — Guide Plan: $39/month
- Tier 2 — Operator Plan: $129/month
- Tier 3 — Multi-Branch: $399/month
- Capital success fee: 1–3% on facilitated funding
- Enterprise/Ministry/Association: custom pricing

Revenue mix:
- Recurring subscription
- Performance-linked revenue
- Institutional contracts

## Strategic Insight

The long-term moat is not content generation. It is ownership of the tourism performance data layer across Siem Reap, Phnom Penh, and Angkor.

If OnlineGuide.io owns the data layer, it can compound advantages in visibility optimization and, ultimately, capital allocation intelligence.
