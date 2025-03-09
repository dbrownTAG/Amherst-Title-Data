import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Home from './components/common/Home';
import ApiSection from './components/common/ApiSection';
import VersionHistory from './components/common/VersionHistory';
import Authentication from './components/common/Authentication';
import Notes from './components/common/Notes';
import ResponseCodes from './components/common/ResponseCodes';
import ScrollToTop from './components/common/ScrollToTop';

import { apiData } from './data/apiData';

// Define custom colors for consistent use throughout the app
const WARM_OFFWHITE = '#faf9f5';
const WARM_OFFWHITE_DARKER = '#f5f2e8';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b172a', // Dark blue like Anthropic
      light: '#2d3748',
    },
    secondary: {
      main: '#5046e5', // Purple accent like Anthropic
    },
    background: {
      default: WARM_OFFWHITE, // Warm off-white background
      paper: '#ffffff', // Keep paper as pure white for contrast
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#00487a', // Specific blue color
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#00487a', // Specific blue color
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#00487a', // Specific blue color
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#00487a', // Specific blue color
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#00487a', // Specific blue color
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#00487a', // Specific blue color
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e2e8f0',
          backgroundColor: '#faf9f5', // Warm off-white background for all paper components
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e2e8f0',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: WARM_OFFWHITE_DARKER,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 72, 122, 0.08)',
            color: '#00487a',
            '&:hover': {
              backgroundColor: 'rgba(0, 72, 122, 0.12)',
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Header />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: { xs: 2, md: 4 },
              marginTop: '64px',
              backgroundColor: 'background.default',
            }}
          >
            <Container maxWidth="lg">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/version-history" element={<VersionHistory />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/response-codes" element={<ResponseCodes />} />
                {apiData.map((section) => (
                  <Route
                    key={section.id}
                    path={`/${section.id}`}
                    element={<ApiSection sectionId={section.id} />}
                  />
                ))}
              </Routes>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
