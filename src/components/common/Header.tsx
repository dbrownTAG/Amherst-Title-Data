import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e2e8f0',
        color: 'text.primary',
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                backgroundColor: 'primary.main', 
                borderRadius: '8px',
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              A
            </Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 600,
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: 'primary.main'
              }}
            >
              Amherst Title Data API
            </Typography>
          </Link>
        </Box>
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              backgroundColor: 'rgba(80, 70, 229, 0.1)', 
              color: 'secondary.main',
              py: 0.5,
              px: 1.5,
              borderRadius: '16px',
              fontWeight: 500
            }}
          >
            v2.0.0
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 