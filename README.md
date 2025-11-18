# Flex Living – Reviews Dashboard

A small Next.js app for managing and displaying property reviews from the Hostaway sandbox API (mocked).  
Managers can review performance, approve reviews for public display, and see how each property is doing.

Live demo: https://basic-task-three.vercel.app/

---

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **UI**: React + Tailwind CSS
- **Data fetching**: TanStack Query (client side)
- **State / storage**: Zustand with `localStorage` (approvals are stored per browser)
- **Backend**: Next.js Route Handlers (`/api/*`) for fetching normalized reviews

> Note: The Hostaway sandbox returns no data, so the app uses a mocked JSON dataset and normalizes it to a common `NormalizedReview` shape.

---

## Setup & Run

```bash
# install dependencies
npm install

# dev
npm run dev
