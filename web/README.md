# GET THAT JOB (web)

Execution scaffold for the GET THAT JOB MVP.

## What is implemented in this phase

- Next.js + TypeScript + Tailwind app scaffold.
- Core route skeletons:
  - `/` Landing
  - `/discover` anonymous discovery cards
  - `/matches` match/message list
  - `/profile` onboarding form
  - `/admin` moderation queue mock
- Initial Prisma schema for users, profiles, swipes, matches, messages, reports, and credit wallet.
- API sanity endpoints:
  - `GET /api/health`
  - `GET /api/discovery`
- `GET /api/matches?userId=...`
- `POST /api/swipes`
- `GET /api/messages?matchId=...`
- `POST /api/messages`
- `POST /api/messages/cleanup`
- Prisma singleton client (`lib/prisma.ts`) and seed script (`prisma/seed.mjs`).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Database setup

1. Create PostgreSQL database.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Generate Prisma client and schema in DB:

```bash
npm run db:generate
npm run db:push
```

4. Seed demo data:

```bash
npm run db:seed
```


## Authentication (implemented)

- Auth route handler: `app/api/auth/[...nextauth]/route.ts`.
- NextAuth (v4) is configured with credentials login and optional Google provider when env vars are present.
- Protected routes: `/matches`, `/profile`, `/admin`.
- Sign in page: `/login`.
- Demo accounts:
  - `helper@getthatjob.dev` / `demo1234`
  - `admin@getthatjob.dev` / `admin1234`

## Notes

- This is execution scaffolding, not final production logic.
- Auth, backend APIs, and message retention jobs are next implementation steps.
- See `NEXT_ACTIONS.md` for the autonomous execution queue.
- Binary assets were replaced with text-based SVG icon files to avoid branch update issues.


### Quick API example flow

```bash
# 1) user A interested in user B
curl -X POST http://localhost:3000/api/swipes \
  -H "content-type: application/json" \
  -d '{"fromUserId":"u1","toUserId":"u2","action":"INTERESTED"}'

# 2) user B interested in user A => match
curl -X POST http://localhost:3000/api/swipes \
  -H "content-type: application/json" \
  -d '{"fromUserId":"u2","toUserId":"u1","action":"INTERESTED"}'

# 3) list matches
curl "http://localhost:3000/api/matches?userId=u1"
```
