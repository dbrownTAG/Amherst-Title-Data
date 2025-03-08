# Amherst Title Data API Documentation

This project contains the documentation for the Amherst Title Data API, built with React, TypeScript, and Material-UI.

## Features

- Interactive documentation for all API endpoints
- Syntax-highlighted code examples
- Responsive design for desktop and mobile viewing
- Easy navigation between API sections
- Version history tracking

## Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- npm (v9.x or later recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dbrownTAG/Amherst-Title-Data.git
   cd Amherst-Title-Data
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building for Production

To build the app for production:

```bash
npm run build
```

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment

### Automatic Deployment

To deploy to GitHub Pages:

```bash
npm run deploy
```

This will build the app and push it to the `gh-pages` branch of your repository.

### Manual Deployment

Alternatively, you can use the provided scripts:

1. Build for GitHub Pages:
   ```bash
   ./build-for-github.sh
   ```

2. Deploy to GitHub Pages:
   ```bash
   ./deploy.sh
   ```

## Project Structure

- `src/components/` - React components
  - `common/` - Shared components like Header, Sidebar, etc.
- `src/data/` - API data and configuration
- `public/` - Static assets

## Technologies Used

- React
- TypeScript
- Material-UI
- React Router
- React Syntax Highlighter
- GitHub Pages (for deployment)

## License

This project is proprietary and confidential.

## Contact

For questions or support, please contact the development team.
