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
      default: '#ffffff',
      paper: '#ffffff',
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
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(80, 70, 229, 0.08)',
            color: '#5046e5',
            '&:hover': {
              backgroundColor: 'rgba(80, 70, 229, 0.12)',
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
