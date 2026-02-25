# OnlineGuide OS

Operational backend scaffold for the Tourism Intelligence Infrastructure Layer (TIIL):
- API-native tourism data ingestion
- Modular AI core routing (OpenAI + Gemini)
- Action-ready review and messaging workflows
- Visibility and investor intelligence foundations
- Security telemetry tables (audit/model/prompt logs)

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
- `POST /api/ai/run` run AI task using payload:

```json
{
  "task": {
    "type": "review_reply",
    "priority": "normal",
    "payload": {
      "reviewText": "Amazing Angkor Wat sunrise tour!"
    }
  }
}
```
