# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flya is a travel planning application that helps users plan trips based on their budget. The application consists of:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Styled Components
- **Backend**: NestJS + TypeScript + Supabase

The app uses AI (via Groq API) to generate personalized travel suggestions including destinations, accommodations, transportation, and activities based on user preferences and budget.

## Development Commands

### Initial Setup
```bash
# Install dependencies for both frontend and backend
npm run start

# Or install separately
npm install                    # Frontend dependencies
npm run install:backend        # Backend dependencies
npm run install:all           # Both frontend and backend
```

### Running the Application
```bash
# Run both frontend and backend concurrently
npm run dev:all

# Run frontend only (runs on http://localhost:5173)
npm run dev:frontend
# or
npm run dev

# Run backend only (runs on http://localhost:3000)
npm run dev:backend
```

### Backend-Specific Commands
```bash
cd backend

# Development with hot-reload
npm run start:dev

# Production build and run
npm run build
npm run start:prod

# Debug mode
npm run start:debug

# Testing
npm run test              # Run tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run test:e2e          # Run end-to-end tests

# Code quality
npm run lint              # Lint and auto-fix TypeScript files
npm run format            # Format code with Prettier
```

### Frontend-Specific Commands
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint frontend code
npm run lint
```

## Environment Configuration

Before running the backend, create a `.env` file in the `backend/` directory based on `.env.example`:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GROQ_API_KEY=your_groq_api_key
```

## Architecture

### Frontend Structure

**Routing Architecture**:
- The app uses React Router v7 with a nested routing structure
- Main layout (`MainLayout`) wraps most routes and includes `Header` and `Footer`
- Authentication state is managed at the App level and passed down to components
- Routes are split into public (Landing, Terms, Privacy, About) and protected (Dashboard, Planning, Trips, Profile, Bag)
- Token-based authentication with JWT stored in localStorage

**Key Pages**:
- `/` - Landing page (public)
- `/auth` - Authentication page (no layout, login/register forms)
- `/Dashboard` - User dashboard (protected)
- `/Planejamento` - Trip planning wizard (protected, multi-step form)
- `/Minhas-Viagens` - User's saved trips (protected)
- `/Minha-Mala` - Packing checklist (protected)
- `/Perfil` - User profile and settings (protected)

**State Management**:
- Redux Toolkit for global state (currently only bag/checklist slice)
- Local component state for forms and UI
- Auth state managed in App.tsx and passed via props

**Multi-Step Planning Form**:
The planning form (`PlanningFormPage`) is a wizard with multiple steps:
1. Step 1: Destination and budget
2. Step 2: Travel dates and preferences
3. Step 3: Activities and interests
4. Step 4: Review and confirmation
5. Final Step: AI-generated itinerary display

Each step is a separate component in `src/components/PlanningForm/`.

**Styling**:
- Combination of Tailwind CSS utilities and Styled Components
- Global theme defined in `src/lib/theme`
- Most components have a `styles.ts` file with styled-components definitions
- Component structure: `ComponentName/index.tsx` + `ComponentName/styles.ts`

**Services Layer**:
All backend API calls are abstracted into service files:
- `authService.ts` - Authentication (login, register, validate token)
- `tripsService.ts` - Trip CRUD operations
- `profileService.ts` - User profile management
- `bagsService.ts` - Packing checklist operations

API base URL: `http://localhost:3000`

### Backend Structure

**NestJS Modules**:
- `AuthModule` - User authentication (JWT-based)
- `PlanningModule` - Trip planning and itinerary generation
- `TripsModule` - Trip management (CRUD)
- `AiModule` - AI integration with Groq for travel suggestions
- `SupabaseModule` - Database integration with Supabase
- Additional modules: `CurrencyModule`, `EventsModule`, `MapsModule`, `PhotosModule`, `WeatherModule`

**AI Integration**:
- Uses Groq SDK with `llama-3.3-70b-versatile` model
- AI service generates personalized travel plans based on user input
- Prompt engineering in `AiService.generatePlan()`

**Database**:
- Supabase (PostgreSQL) for data persistence
- Models: Users, Trips, Planning, Bags/Checklists

**API Structure**:
- RESTful endpoints
- Controllers use DTOs (Data Transfer Objects) for validation
- Global validation pipe enabled in `main.ts`
- CORS enabled for frontend communication

## Important Notes

### Authentication Flow
1. User logs in via `/auth` page
2. Backend validates credentials and returns JWT token + user data
3. Frontend stores token in localStorage
4. Token is validated on app load via `authService.validateToken()`
5. Protected routes check for `currentUser` state and redirect to `/auth` if not authenticated

### Path Aliasing
- Frontend uses `@/` alias pointing to `src/` directory (configured in `vite.config.js`)

### Component Export Pattern
Components are exported through `src/components/index.tsx` barrel file for cleaner imports.

### Testing
The backend has Jest configured for unit and e2e testing. Frontend tests are not yet implemented.

### Future Integrations
The README mentions planned API integrations (Skyscanner, Booking, GetYourGuide) that are not yet implemented.
