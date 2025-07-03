# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based API documentation website for the Amherst Title Data API. The application provides interactive documentation with syntax-highlighted code examples, responsive design, and easy navigation between API sections.

## Key Development Commands

### Development
- `npm start` - Start development server (runs on http://localhost:3000)
- `npm install` - Install dependencies

### Building & Testing
- `npm run build` - Build for production
- `npm test` - Run tests with react-scripts

### Deployment
- `npm run deploy` - Deploy to GitHub Pages (builds and pushes to gh-pages branch)
- `./build-for-github.sh` - Alternative build script for GitHub Pages
- `./deploy.sh` - Alternative deployment script

## Architecture & Structure

### Component Organization
- **src/components/common/** - Shared components (Header, Sidebar, Authentication, etc.)
- **src/components/endpoints/** - Endpoint-specific components
- **src/data/apiData.ts** - Central data store containing all API documentation data

### Data-Driven Documentation
The entire documentation is driven by the `apiData` array in `src/data/apiData.ts`. This file contains:
- API sections and endpoints
- TypeScript interface definitions
- Request/response examples
- Validation rules and notes

### Routing & Navigation
- Uses React Router with HashRouter for GitHub Pages compatibility
- Dynamic routes generated from apiData structure
- Sidebar navigation with collapsible sections for API endpoints
- Supports nested endpoints (e.g., document management under each transaction type)

### Theming & Design
- Material-UI (MUI) with custom theme
- Warm off-white color scheme (#faf9f5 background)
- Consistent typography hierarchy with specific blue (#00487a) for headings
- Custom method labels with color-coded HTTP methods (GET, POST, PATCH, etc.)

### Key Technical Patterns
- TypeScript interfaces defined alongside API data for type safety
- Responsive design with mobile-first approach
- Collapsible navigation sections that auto-expand based on current route
- Code syntax highlighting for API examples
- Method label styling system using CSS modules

### State Management
- Component-level state using React hooks
- Navigation state managed in Sidebar component
- No global state management library (Redux, Zustand, etc.)

## Project-Specific Notes

- Built for GitHub Pages deployment with HashRouter
- API documentation is version-controlled in code (not externally managed)
- Material-UI components extensively customized for brand consistency
- Mobile-responsive with drawer navigation on smaller screens