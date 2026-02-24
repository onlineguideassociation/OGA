# OnlineGuide.io

Tourism Intelligence Infrastructure Layer (TIIL) for Cambodia.

## Strategic Documents

- Product blueprint: `docs/onlineguide-sdk-strategy.md`
- System architecture: `docs/system-8-ai-operation-bot-architecture.md`

## Backend Scaffold

A modular backend scaffold is available in `onlineguide-os/` for the Tourism Infrastructure AI Platform.

Key files:
- `onlineguide-os/server.js`
- `onlineguide-os/database.js`
- `onlineguide-os/ai-core/router.js`
- `onlineguide-os/database/schema.sql`

Run locally:

```bash
cd onlineguide-os
npm install
cp .env.example .env
npm start
```
