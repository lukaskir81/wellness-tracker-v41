# Fitness Performance Tracking Application

## Overview

This is a comprehensive fitness and wellness tracking application built for GPC Performance, focusing on athlete recovery monitoring, strength tracking, and performance analytics. The application serves as a digital companion for athletes to log their wellness data, track strength progress, monitor recovery metrics, and receive AI-powered insights.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router for client-side navigation
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and purple gradient theme
- **State Management**: React Query for server state management
- **Charts**: Recharts for data visualization

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Hot reloading with Vite middleware integration
- **Storage**: In-memory storage implementation with interface for future database integration

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Current Storage**: MemStorage class implementing IStorage interface
- **Database Provider**: Neon Database (PostgreSQL) with connection pooling
- **Migration Tool**: Drizzle Kit for database schema management

## Key Components

### Core Features
1. **Dashboard**: Central hub with quick access to all application features
2. **Wellness Entry**: Daily wellness metrics logging (sleep, energy, mood, stress, soreness)
3. **Recovery Assessment**: Comprehensive recovery scoring system with actionable recommendations
4. **Strength Tracker**: Exercise logging with 1RM calculations and progress visualization
5. **Fitness Tests**: Performance testing with standardized metrics (power, fitness, speed tests)
6. **Smart Recovery Coach**: AI-powered journaling with personalized insights
7. **Trends Analysis**: Historical data visualization and pattern recognition
8. **Education Hub**: Access to performance guides and training resources

### AI Integration
- **Service**: Google Gemini 2.0 Flash for intelligent analysis
- **Capabilities**: Wellness data interpretation, recovery recommendations, journal entry analysis
- **Features**: Contextual insights, trend identification, personalized coaching advice

### User Interface Components
- **Design System**: Custom purple gradient theme with glassmorphism effects
- **Component Library**: shadcn/ui with extensive Radix UI integration
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **Navigation**: Intuitive back navigation and contextual action buttons

## Data Flow

### Wellness Data Flow
1. User inputs daily wellness metrics via slider interfaces
2. Data stored with timestamp and optional notes
3. AI analysis provides immediate insights and recommendations
4. Historical data aggregated for trend visualization
5. Recovery scores calculated and logged for monitoring

### Strength Training Flow
1. User selects exercise category and specific movement
2. Sets, reps, and load data entered with RIR (Reps in Reserve)
3. 1RM calculations performed using Epley formula
4. Progress tracked with visual charts and performance metrics
5. Relative strength ratings provided based on bodyweight ratios

### Assessment Flow
1. User completes recovery assessment checklist
2. Points tallied based on evidence-based recovery practices
3. Total score categorized (Poor: <60, Average: 60-89, Good: 90-119, Excellent: 120+)
4. Historical assessment data stored for trend analysis

## External Dependencies

### AI Services
- **Google Gemini API**: Real-time analysis of wellness and recovery data
- **API Integration**: RESTful calls with error handling and response truncation

### UI Libraries
- **Radix UI**: Comprehensive component primitives for accessibility
- **Lucide React**: Icon library for consistent visual elements
- **React Hook Form**: Form state management with validation
- **Date-fns**: Date manipulation and formatting utilities

### Development Tools
- **ESBuild**: Fast JavaScript bundling for production builds
- **TSX**: TypeScript execution for development server
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite middleware integration with Express server
- **Port Configuration**: Express server with Vite development middleware
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Development Server**: Combined frontend/backend serving on single port

### Production Build
- **Frontend**: Vite build to `dist/public` directory
- **Backend**: ESBuild compilation to `dist/index.js`
- **Static Serving**: Express serves built React application
- **Database**: PostgreSQL with Drizzle ORM for production data persistence

### Configuration Management
- **Database**: Drizzle configuration with PostgreSQL dialect
- **Build Scripts**: Separate development and production workflows
- **TypeScript**: Strict mode with path aliases for clean imports

## Changelog

```
Changelog:
- July 06, 2025. Firebase integration with authentication and Firestore data storage
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```