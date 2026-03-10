# GET THAT JOB — MVP Product & Technical Blueprint

## 1) Product summary

**Working name:** GET THAT JOB

GET THAT JOB is a web-first matching platform for:
- **Job seekers** who want practical help getting jobs.
- **Helpers/referrers** (people already inside companies or experienced candidates) who want to guide seekers and optionally earn referral/commission arrangements **outside** the platform.

The product is intentionally positioned as a community-first, low-pretension, modern network: “LinkedIn but relaxed.”

## 2) MVP scope (Phase 1)

You selected **A) Referral marketplace** as the initial focus.

### Core MVP goals
1. Let users create accounts and profiles as seeker, helper, or both.
2. Let seekers and helpers discover and match with each other quickly ("Tinder-like" directional matching).
3. Keep users public-anonymous until mutual match; reveal handle/username after match.
4. Allow profile details useful for matching (resume upload + LinkedIn URL).
5. Include moderation/admin review workflows.
6. Auto-delete user-to-user chat/messages after 60 days.

### Not in MVP
- No payment processing/escrow/marketplace payments inside the app.
- No platform-managed commissions.

## 3) Roles and permissions

## Roles
- **User**
  - Can be seeker, helper, or both in one account.
- **Admin**
  - Moderates users/content, handles reports, monitors safety and growth metrics.

### User permissions
- Register/login via email+password or Google OAuth.
- Create/edit profile.
- Upload resume and add LinkedIn URL.
- Browse/recommend/pass on candidate/helper cards.
- Match and message on mutual interest.
- Delete own account and all associated data.

### Admin permissions
- Review flagged users/profiles.
- Suspend/ban users.
- Review reported messages.
- View analytics dashboard.
- Manage basic site settings (trial limits, posting limits, moderation thresholds).

## 4) Feature set

## 4.1 Authentication
- Email/password authentication.
- Google OAuth sign-in.
- Password reset flow.

## 4.2 Profiles
- Fields:
  - Display name (can be pseudonym)
  - Public anonymous mode toggle
  - Role mode: seeker, helper, both
  - Location (country/timezone)
  - Skills/industry tags
  - Target companies/roles (seeker)
  - Company/current role/referral capacity (helper)
  - LinkedIn URL
  - Resume upload

## 4.3 Discovery and matching
- Swipe/card or list-based discovery.
- Filters: role, industry, geography/timezone, company tags.
- Actions: Interested / Pass.
- **Mutual interest => match created**.
- Identity reveal behavior:
  - Before match: anonymous card identity.
  - After match: username/handle revealed.

## 4.4 Messaging
- In-app direct messaging for matched users only.
- Optional canned prompts to reduce empty chats.
- Retention policy: auto-delete messages older than **60 days**.

## 4.5 Trust & safety
- Report user/report message.
- Basic abuse detection (rate limits + keyword flags).
- Admin review queue.

## 4.6 Growth and communication
- Transactional emails:
  - Welcome
  - Match notification
  - Unread message reminders
  - Trial/credits reminders
- SEO indexable public pages:
  - Home
  - How it works
  - FAQ
  - Community guidelines

## 4.7 Monetization (MVP-compatible)
- Platform monetization should **not** mediate user-to-user payments.
- Implement either:
  1. **Subscription** for premium capabilities, or
  2. **Credit system** (credits to initiate chats/post interest above free limits)
- Include free trial constraints (e.g., X matches/messages per month free).

## 5) Recommended technical stack (fast + low-cost + Vercel-friendly)

## Frontend / Full-stack framework
- **Next.js (App Router) + TypeScript**
  - Fast development
  - SSR/SEO support
  - Easy Vercel deployment

## UI
- **Tailwind CSS** + component primitives (shadcn/ui or similar)

## Database
- **PostgreSQL** (Neon/Supabase/Postgres provider)

## ORM
- **Prisma** (fast schema iteration + migrations)

## Auth
- **Auth.js (NextAuth)** with
  - Email/password credentials
  - Google provider

## File storage
- **S3-compatible storage** (or Supabase Storage) for resumes

## Background jobs / scheduled cleanup
- Vercel Cron (or server cron worker) for:
  - Message cleanup >60 days
  - Digest/reminder emails

## Email
- Resend / Postmark for transactional emails

## Analytics
- PostHog or Plausible for product analytics + admin reporting

## Admin panel
- Internal `/admin` routes protected by role

## Why this stack
- Low complexity for solo/founder execution.
- Strong developer ecosystem.
- Global-ready deployment.
- Fast MVP iteration without overengineering.

## 6) Data model (high-level)

Core tables/entities:
- `users`
- `profiles`
- `user_roles` (seeker/helper flags)
- `skills_tags`
- `profile_tags`
- `swipes` (interest/pass actions)
- `matches`
- `messages`
- `reports`
- `moderation_actions`
- `subscriptions` or `credits`
- `audit_logs`

Retention rules:
- `messages`: delete content older than 60 days.
- user deletion: hard delete or anonymize+delete by policy (full deletion requested by user).

## 7) Security and privacy requirements

- Public anonymity by default; reveal handle after mutual match.
- Role-based access control (user/admin).
- Rate-limiting on auth, messaging, and matching actions.
- File upload scanning/validation for resume uploads.
- Full account deletion flow including profile, matches, and messages data handling.
- Clear privacy policy and terms before launch.

## 8) Delivery roadmap

## Phase 0 — Setup (Week 1)
- Repo bootstrap (Next.js + TS + Prisma + Auth)
- CI checks (lint + typecheck + tests)
- Base layouts and design system

## Phase 1 — Core MVP (Weeks 2–4)
- Auth (email + Google)
- Profiles and resume upload
- Discovery + match engine (mutual interest)
- Messaging
- Basic admin moderation

## Phase 2 — Growth/monetization (Weeks 5–6)
- Free trial + subscription/credits
- Email automation
- Analytics dashboard
- SEO pages

## Phase 3 — Hardening (Week 7)
- Security review
- Performance optimization
- Launch checklist + production observability

## 9) Practical next build tasks (what to implement first)

1. Initialize Next.js app and CI.
2. Implement auth + role model.
3. Build profile onboarding flow.
4. Implement swipe/match backend and UI.
5. Implement matched-user messaging + 60-day purge job.
6. Add admin moderation queue.
7. Add SEO pages + analytics + transactional emails.

## 10) Open decisions for you (short answers needed before coding starts)

1. Subscription vs credits for MVP monetization?
2. What is included in free tier limits?
3. Should matched users reveal full profile or only username initially?
4. Should resume be visible before match or only after?
5. Preferred legal base country for Terms/Privacy template?

---

This document is the implementation contract for the first build iteration.
