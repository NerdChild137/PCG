# Peters Consulting Group Website

## Overview

This is a full-stack web application for Peters Consulting Group (PCG Transit), a consulting firm specializing in Civil Rights Compliance, Small Business Outreach, and Workforce Development for transit projects. The application features a public-facing marketing website with an admin dashboard for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Authentication**: Passport.js with local strategy, session-based auth using express-session
- **Password Security**: scrypt hashing with timing-safe comparison
- **API Design**: RESTful endpoints under `/api/*` prefix

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (provisioned via Replit)
- **Schema Location**: `shared/schema.ts` - shared between client and server
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### Key Data Models
- **Users**: Admin authentication
- **SiteContent**: CMS content for hero, about, services, leadership sections
- **SiteTheme**: Customizable primary and accent colors (HSL format)
- **Resources**: External links and resources displayed on dedicated page

### Project Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/   # UI and section components
│   │   ├── pages/        # Route pages (Home, Admin, Auth, Resources)
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/          # Express backend
│   ├── routes.ts    # API route definitions
│   ├── storage.ts   # Database access layer
│   ├── auth.ts      # Authentication setup
│   └── db.ts        # Database connection
├── shared/          # Shared code
│   └── schema.ts    # Drizzle schema definitions
└── migrations/      # Database migrations
```

### Build System
- Development: Vite dev server with HMR, Express serves API
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Key dependencies are bundled to reduce cold start times

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Schema migrations via `npm run db:push`

### Authentication
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store
- **passport / passport-local**: Authentication strategy

### UI/Styling
- **@radix-ui/***: Accessible UI primitives (dialog, dropdown, tabs, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development
- **@replit/vite-plugin-***: Replit-specific development tooling
- **tsx**: TypeScript execution for development