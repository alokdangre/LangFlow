# LangFlow

A modern AI workflow automation app built with Next.js 15, React 19, Prisma, and PostgreSQL. Design and run workflows, manage triggers and actions, and monitor executions with a beautiful, responsive UI.

Stripe billing has been disabled and fully removed from the frontend. Paid plan UI remains for demonstration and links to Contact Sales.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Prisma ORM (PostgreSQL)
- NextAuth for authentication
- Tailwind CSS 4
- Radix UI components

## Monorepo Layout
```
LangFlow/
├─ frontend/                  # Next.js app
│  ├─ prisma/                 # Prisma schema & migrations (frontend DB)
│  ├─ src/
│  │  ├─ app/                 # Next.js app router routes
│  │  │  ├─ api/              # API routes
│  │  │  │  ├─ actions/       # Example action endpoints
│  │  │  │  ├─ hooks/         # Webhook catch endpoints
│  │  │  │  ├─ stripe/        # Stubbed billing endpoints (disabled)
│  │  │  │  └─ workflows/     # Workflow APIs
│  │  │  ├─ (pages...)        # UI routes (dashboard, pricing, etc.)
│  │  ├─ components/          # UI components
│  │  ├─ lib/                 # Server-side utilities (auth, prisma, etc.)
│  │  └─ styles/              # Global styles
│  ├─ package.json
│  └─ tsconfig.json
└─ hooks/                     # Server-side workflow engine package
   ├─ prisma/                 # Prisma schema & migrations (hooks DB)
   ├─ src/
   │  ├─ workflow-engine.ts   # Core engine
   │  └─ index.ts             # Exports
   ├─ package.json
   └─ tsconfig.json
```

## Prerequisites
- Node.js 18+
- PostgreSQL database

## Environment Variables
Create a `.env` file under `frontend/` with:
```
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-strong-random-secret

# App
APP_URL=http://localhost:3000
```

Stripe keys are not needed because billing is disabled.

## Getting Started
1. Install dependencies
```
# From repo root (recommended)
npm install --workspaces

# Or install inside each package
cd frontend && npm install
cd ../hooks && npm install
```

2. Generate Prisma client and run migrations
```
# Frontend database
cd frontend
npm run prisma:generate  # or `npx prisma generate`
npx prisma migrate deploy
```

3. Seed (optional)
```
npm run seed
```

4. Run the dev server
```
npm run dev
# App at http://localhost:3000
```

## Useful Scripts (frontend/package.json)
- dev: start Next.js dev server
- build: prisma generate + next build
- start: start Next.js in production mode
- lint: next lint
- seed: run `prisma/seed.ts`
- vercel-build: prisma generate + prisma migrate deploy + next build

## Database & Prisma
- Prisma schema: `frontend/prisma/schema.prisma`
- Generate client: `npx prisma generate`
- Migrate (prod): `npx prisma migrate deploy`
- Migrate (dev): `npx prisma migrate dev --name <migration_name>`

The `hooks/` package also has a Prisma schema for workflow engine–related data. If you use that package separately, configure its `.env` and migrations similarly.

## Authentication
- NextAuth is configured in `frontend/src/lib/auth.ts` and `app/api/auth/[...nextauth]/route.ts`
- Default providers include email/password (via custom endpoints) and can be extended

## API Routes Overview
- `app/api/workflows` and `app/api/workflows/[id]` manage workflows
- `app/api/actions/send-gmail` demonstrates a sample action
- `app/api/hooks/catch/[userId]/[workflowId]` receives workflow events
- `app/api/stripe/*` are stubs returning disabled responses

## Billing (Disabled)
- All Stripe client code is removed/stubbed.
- Pricing page shows "Contact Sales" for paid plans.
- To re-enable billing later, reintroduce the Stripe SDK, API routes, and environment variables.

## Development Notes
- React Server Components (RSC) + App Router are used; keep server-only code in `src/lib/` and API routes.
- Components that use hooks like `useSession` must be client components (`'use client'`).
- Keep Prisma client as a singleton to avoid hot-reload issues (see `src/lib/prisma.ts`).

## Deployment
- The project is ready for platforms like Vercel.
- On deploy, ensure the following are set:
  - `DATABASE_URL`
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`
  - `APP_URL`
- Billing keys (Stripe) are not required.

## Troubleshooting
- Migration errors: ensure your `DATABASE_URL` is correct and the database is reachable.
- TypeScript build failures: check for stale imports after enabling/disabling features.
- NextAuth callback URLs: ensure `NEXTAUTH_URL` matches your deployed origin.

Made with love by Alok Dangre
