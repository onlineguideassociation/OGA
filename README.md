# OnlineGuide.io

Tourism Intelligence Infrastructure Layer (TIIL) for Cambodia.

## Mission
OnlineGuide.io is building a **tourism-driven economic operating system** for Cambodia, with deployment focus on:
- Siem Reap
- Phnom Penh
- Angkor Wat

The platform strategy is a sovereign **9-layer coordination architecture** spanning:
1. AI Intelligence
2. Tourism Finance Intelligence
3. Global Visibility
4. Access & Device
5. Travel Search Intelligence
6. Experience Intelligence
7. Tourism Commerce Intelligence
8. Tourism Intelligence Resource Network (TIRN)
9. Nomad Remote Intelligence

## Strategic Documents

- Product blueprint: `docs/onlineguide-sdk-strategy.md`
- System architecture: `docs/system-8-ai-operation-bot-architecture.md`
- TIIL architecture (investor-ready): `docs/tiil-investor-ready-architecture.md`
- Private sector targeting strategy: `docs/private-sector-target-strategy.md`

## Backend Scaffold

A modular backend scaffold is available in `onlineguide-os/` for the Tourism Infrastructure AI Platform.

Key files:
- `onlineguide-os/server.js`
- `onlineguide-os/database.js`
- `onlineguide-os/ai-engine/router.js`
- `onlineguide-os/database/schema.sql`

Run locally:

```bash
cd onlineguide-os
npm install
cp .env.example .env
npm start
```
