# Flex Living – Reviews Dashboard

A small Next.js app for managing and displaying property reviews from the Hostaway sandbox API (mocked).  
Managers can review performance, approve reviews for public display, and see how each property is doing.

---

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **UI**: React + Tailwind CSS
- **Data fetching**: TanStack Query (client side)
- **Backend**: Next.js Route Handlers (`/api/*`)
- **Storage**: Zustand Storage

---

## Setup & Run

```bash
# install dependencies
npm install

# dev
npm run dev

```

## API Routes
```
GET /api/reviews/hostaway
POST /api/reviews/approve
```