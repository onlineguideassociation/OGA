# OnlineGuide OS

Operational backend scaffold for:
- AI routing (OpenAI + Gemini)
- Review monitoring
- Visibility scoring
- Messaging tracking
- Investor CRM foundations

## Run locally

```bash
cd onlineguide-os
npm install
cp .env.example .env
npm start
```

## API endpoints
- `GET /` product metadata
- `GET /api/health` API health
- `GET /health/database` PostgreSQL health
- `POST /api/ai/run` run AI task (`seo_blog`, `social_caption`, `review_sentiment`)
