# Autonomous execution plan (next 3 implementation pushes)

## Push 1 (current): foundation hardening
- [x] Remove binary favicon blocker and use text-based SVG icon.
- [x] Add API sanity endpoints:
  - `GET /api/health`
  - `GET /api/discovery`
- [x] Centralize credit model in code (`lib/credit-policy.ts`).

## Push 2: auth + DB wiring
- [x] Add Prisma client setup and seed script.
- [x] Implement NextAuth with email/password + Google-ready provider config.
- [x] Add protected routes for `/matches`, `/profile`, `/admin`.

## Push 3: matching workflow backend
- [x] Add route handlers for swipes and match creation.
- [ ] Add persistence-backed discovery query (replace mock data in API) and swap runtime store to Prisma persistence.
- [x] Add message CRUD routes and 60-day cleanup endpoint (`POST /api/messages/cleanup`).

## What you can run right now
```bash
cd web
npm install
npm run dev
```

Then check:
- `http://localhost:3000`
- `http://localhost:3000/login`
- `http://localhost:3000/api/health`
- `http://localhost:3000/api/discovery`
