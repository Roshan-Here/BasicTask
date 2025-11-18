# Next.js + Bun Starter Template

This repo is my personal starter template for new projects.  
It comes preconfigured with:

- **Next.js** (App Router)
- **Bun** (package manager & dev runner)
- **Tailwind CSS v4**
- **shadcn/ui** (prebuilt headless UI components)
- **@tanstack/react-query** (server state & data fetching)
- **@tanstack/react-virtual** (virtualized lists)
- **axios** (HTTP client)
- **framer-motion** (animations)
- **lucide-react** (icons)

---

## Getting Started

### 1. Install dependencies

```bash
bun install
```
### 2. Run the development server
```
bun dev
```


#### Available Commands
```
bun dev       # Start dev server
bun build     # Create production build
bun start     # Start production server (after build)
bun lint      # Run linting (if configured)
````

#### UI Components (shadcn/ui)

shadcn/ui is already initialized:

- Config: components.json

- Base utils: lib/utils.ts

- Example components:
    - components/ui/button.tsx
    - components/ui/card.tsx

To add more components:
```
bunx --bun shadcn@latest add <component-name>
# example:
# bunx --bun shadcn@latest add input
```

### Tech Stack

Framework: Next.js

Runtime / Package Manager: Bun

Styling: Tailwind CSS v4

UI Library: shadcn/ui + lucide-react

Data Fetching: @tanstack/react-query + axios

Lists / Tables: @tanstack/react-virtual

Animations: framer-motion