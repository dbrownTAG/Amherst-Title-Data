import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Green color from favicon.ico
  const greenColor = '#006341'; // Amherst green color

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        backgroundColor: greenColor,
        color: 'white',
        zIndex: theme.zIndex.drawer + 1,
        width: '100%',
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          padding: { xs: '0 16px', md: '0 24px' },
          minHeight: '64px',
          width: '100%',
          margin: 0
        }}
        disableGutters
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          ml: isMobile ? '48px' : 0 // Add left margin in mobile view to make room for hamburger menu
        }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <Box 
              sx={{ 
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img 
                src={`${process.env.PUBLIC_URL}/amherst-logo@2x.png`}
                alt="Amherst Logo" 
                style={{ 
                  height: '40px',
                  width: 'auto'
                }} 
              />
            </Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 600,
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: 'white'
              }}
            >
              Title Data API
            </Typography>
          </Link>
        </Box>
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              py: 0.5,
              px: 1.5,
              borderRadius: '16px',
              fontWeight: 500
            }}
          >
            v1.4.5
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 