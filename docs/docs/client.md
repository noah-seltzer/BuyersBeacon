# Client (Frontend)

## Overview

The `client` directory contains the Next.js application that serves as the user interface for BuyersBeacon. It handles user interactions, displays data fetched from the backend API, manages client-side state, and integrates with Clerk for authentication and SignalR for real-time features like chat.

## Key Technologies

- Next.js 15+ (App Router)
- React 19+
- TypeScript
- Tailwind CSS
- shadcn/ui & Radix UI
- Redux Toolkit
- Formik
- Clerk (@clerk/nextjs)
- @microsoft/signalr

## Directory Structure (`client/src/`)

```
client/src/
├── app/                     # Next.js App Router routes
│   ├── about/               # About page
│   ├── accessibility/       # Accessibility page
│   ├── auth/                # Authentication pages
│   ├── beacons/             # Beacon-related pages
│   │   ├── [id]/            # Individual beacon page
│   │   ├── browse/          # Browse beacons page
│   │   ├── create/          # Create beacon page
│   │   ├── drafts/          # User's draft beacons page
│   │   └── edit/[id]/       # Edit beacon page
│   ├── cookies/             # Cookies policy page
│   ├── help/                # Help page
│   ├── privacy/             # Privacy policy page
│   ├── profile/[id]/        # User profile pages
│   ├── terms/               # Terms of service page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # 404 page
│   └── page.tsx             # Home page
├── components/              # UI components (Atomic Design)
│   ├── atoms/               # Basic building blocks
│   ├── molecules/           # More complex components
│   ├── organisms/           # Large sections of UI
│   ├── templates/           # Page templates
│   ├── ui/                  # shadcn/ui components
│   ├── providers.tsx        # Context providers wrapper
│   └── navbar.tsx           # Global navigation
├── helpers/                 # Helper functions
├── lib/                     # Utility libraries
├── redux/                   # Redux store configuration
│   ├── api.ts               # RTK Query API
│   ├── auth-slice.ts        # Authentication state slice
│   └── store.ts             # Redux store setup
├── services/                # Service layer
└── types/                   # TypeScript type definitions
```

## Core Concepts

### Routing

- Uses the Next.js App Router (`src/app/`).
- Directory structure defines routes (e.g., `src/app/beacons/browse/page.tsx` maps to `/beacons/browse`).
- Dynamic routes use square brackets (e.g., `src/app/beacons/[id]/page.tsx` maps to `/beacons/:id`).
- `layout.tsx` defines shared UI for segments. `page.tsx` defines the unique UI for a route.
- `loading.tsx` and `error.tsx` (if present) handle loading and error states within segments.
- `not-found.tsx` provides a custom 404 page.
- `middleware.ts` intercepts requests, likely used for protecting routes based on authentication status via Clerk.

### State Management (Redux)

- Uses Redux Toolkit (`@reduxjs/toolkit`) for managing global application state.
- The store is configured in `src/redux/store.ts`.
- State is organized into slices (e.g., `auth-slice.ts`).
- RTK Query might be used for data fetching and caching via `src/redux/api.ts`.
- The `<Providers>` component in `src/components/providers.tsx` likely wraps the application with the Redux Provider.

### UI Components (shadcn/ui & Radix)

- Leverages `shadcn/ui` (configured in `components.json`), which provides styled components built upon Radix UI primitives.
- Components are organized following an Atomic Design pattern (`atoms`, `molecules`, `organisms`, `templates`) within `src/components/`.
- `atoms/` contains basic building blocks (Button, Input, Badge).
- `molecules/` combines atoms into more complex units (StarRating, UserCard).
- `organisms/` are larger sections of the UI (Forms, BeaconPreview).
- `templates/` define the structure for specific page types.
- Tailwind CSS is used for styling, configured in `tailwind.config.ts`. `clsx` and `tailwind-merge` (via `lib/utils.ts`) handle conditional and merged class names.

### Authentication (Clerk)

- Uses `@clerk/nextjs` for user authentication and management.
- Clerk components (`<SignIn>`, `<SignUp>`, `<UserButton>`) are likely used within the auth routes (`src/app/auth/`) and the navbar (`src/components/navbar.tsx`).
- The `<ClerkProvider>` is likely included in `src/components/providers.tsx` or the root layout.
- `middleware.ts` probably integrates with Clerk's `authMiddleware` to protect routes.
- Client fetches user information using Clerk hooks (`useUser`, `useAuth`).
- Authentication state might also be reflected in the Redux store (`auth-slice.ts`).

### Real-time Communication (SignalR)

- The `@microsoft/signalr` client library is used to connect to the backend SignalR hub (likely `ChatHub`).
- Connection logic and event handling are likely managed within `src/services/chat.ts` and potentially wrapped in a context provider (`src/components/providers/chat-provider.tsx`).
- Chat components (`src/components/molecules/chat/`) interact with this service/provider to send and receive messages.

## Configuration

- `next.config.ts`: Next.js configuration (environment variables, image domains, build options).
- `tailwind.config.ts`: Tailwind CSS configuration (themes, plugins like `tailwindcss-animate`).
- `postcss.config.mjs`: PostCSS configuration (usually includes Tailwind).
- `tsconfig.json`: TypeScript configuration.
- `components.json`: shadcn/ui configuration.
- `.env.local` (not committed): Stores environment variables like API URLs and Clerk public keys (based on `example.env`).
- `eslint.config.mjs`: ESLint configuration for code linting.

## Available Scripts

- `pnpm dev`: Starts the Next.js development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server (requires `pnpm build` first).
- `pnpm lint`: Runs ESLint to check for code style issues.