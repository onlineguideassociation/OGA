# SYSTEM 8 — Tourism Intelligence Infrastructure Layer (TIIL)

## Strategic Position
OnlineGuide.io is positioned as a **Tourism Infrastructure AI Platform** for Cambodia operators, licensed guides, and ecosystem investors.

## Core Architecture Model

### Layer 1 — Data Collection Layer
API-native ingestion only (no scraping-heavy dependency in early phases):
- Google Reviews API
- Google Search Console API
- YouTube Data API
- Meta Graph API
- WhatsApp Business API
- Telegram Bot API
- Weather API
- Currency API

All inbound data is normalized and stored in PostgreSQL.

### Layer 2 — Intelligence Processing Layer
Modular AI core with provider routing and prompt packs:

```text
/onlineguide-os
  /ai-core
    router.js
    /providers
      openai.js
      gemini.js
    /prompts
      reviewReply.js
      seoArticle.js
      investorEmail.js
```

Routing is task-based (`seo_longform`, `review_reply`, `social_short`, `sentiment`, `financial_analysis`, `investor_email`) to keep model selection and cost governance explicit.

### Layer 3 — Action & Automation Layer
Action engine responsibilities:
- Publish content via verified platform APIs
- Update CRM timelines and operator records
- Send replies and alerts
- Trigger ad budget recommendations
- Notify human operators for escalations

### Layer 4 — Visibility & Capital Layer
Dual dashboard strategy:
- **Tourism Operator Dashboard**: visibility score, review health, booking response speed, revenue estimate, seasonal demand prediction
- **Investor Dashboard**: city tourism growth, operator performance index, guide network growth, revenue per temple circuit, capital efficiency score

## Database Strategy
Grouped schema design for operational clarity.

### Core Tables
- `users`
- `business_profiles`
- `reviews`
- `seo_metrics`
- `engagement_metrics`
- `messages`
- `visibility_scores`
- `tour_packages`
- `cities`

### Investor Layer
- `investors`
- `startup_profiles`
- `funding_rounds`
- `outreach_logs`
- `capital_scores`

## Defensible Visibility Models
Three region-specific scoring models:
- Siem Reap Tourism Index
- Phnom Penh Urban Travel Index
- Angkor Temple Circuit Index

Each index uses dynamic weighting by city and season, creating proprietary tourism-performance IP.

## Security Architecture Baseline
- Role-based access control (RBAC)
- Encrypted environment variable management
- API rate limiting
- Webhook signature validation
- Immutable audit logs
- Model usage tracking
- Prompt logging for abuse detection
- **No direct system command execution from model outputs**

## Execution Plan

### Phase 1 — Tourism Visibility Engine (60–90 days)
- Google Review AI Reply
- Telegram bot tracking
- Basic visibility score
- Operator dashboard

**Goal:** prove measurable visibility uplift for Siem Reap operators.

### Phase 2 — Multi-Platform Intelligence
- YouTube to SEO pipeline
- Social publishing orchestration
- Ad efficiency tracking
- Demand forecasting

### Phase 3 — National Tourism Data Layer
- City tourism analytics
- Temple circuit heatmaps
- Guide performance benchmarking
- Investor CRM
- White-label association deployments

## Investor Narrative
OnlineGuide.io is positioned as:
- Vertical SaaS for tourism operators
- Data intelligence network for Cambodia tourism
- Tourism performance index engine
- Visibility and capital bridge

Commercial readiness starts with recurring plans (guide, operator, multi-branch) and expands into infrastructure-grade analytics.
