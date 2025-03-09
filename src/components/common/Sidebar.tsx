import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
  Collapse,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { apiData } from '../../data/apiData';

const drawerWidth = 280;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [endpointsOpen, setEndpointsOpen] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleEndpointsToggle = () => {
    setEndpointsOpen(!endpointsOpen);
  };

  const handleSectionToggle = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Initialize section open state based on current path
  React.useEffect(() => {
    const currentSection = apiData.find(section => 
      location.pathname === `/${section.id}` || 
      location.pathname.startsWith(`/${section.id}/`)
    );
    
    if (currentSection) {
      setOpenSections(prev => ({
        ...prev,
        [currentSection.id]: true
      }));
    }
  }, [location.pathname]);

  const drawer = (
    <Box sx={{ overflow: 'auto', height: '100%', pt: 1 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon sx={{ color: '#00487a' }} />
          </IconButton>
        </Box>
      )}
      
      <List sx={{ px: 2 }}>
        <ListItemButton
          component={Link}
          to="/"
          selected={location.pathname === '/'}
          sx={{ mb: 0.5 }}
        >
          <ListItemText 
            primary="Home" 
            primaryTypographyProps={{ 
              fontSize: '0.95rem',
              fontWeight: location.pathname === '/' ? 600 : 400,
              color: location.pathname === '/' ? '#00487a' : 'inherit'
            }} 
          />
        </ListItemButton>
        
        <ListItemButton
          component={Link}
          to="/authentication"
          selected={location.pathname === '/authentication'}
          sx={{ mb: 0.5 }}
        >
          <ListItemText 
            primary="Authentication" 
            primaryTypographyProps={{ 
              fontSize: '0.95rem',
              fontWeight: location.pathname === '/authentication' ? 600 : 400,
              color: location.pathname === '/authentication' ? '#00487a' : 'inherit'
            }} 
          />
        </ListItemButton>
      </List>
      
      <Divider sx={{ my: 1.5 }} />
      
      <List sx={{ px: 2 }}>
        <ListItemButton onClick={handleEndpointsToggle} sx={{ mb: 0.5 }}>
          <ListItemText 
            primary="API Endpoints" 
            primaryTypographyProps={{ 
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#00487a'
            }} 
          />
          {endpointsOpen ? 
            <ExpandLess sx={{ color: '#00487a' }} /> : 
            <ExpandMore sx={{ color: '#00487a' }} />
          }
        </ListItemButton>
        
        <Collapse in={endpointsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {apiData
              .filter(section => section.id !== 'authentication')
              .map((section) => (
                <React.Fragment key={section.id}>
                  <ListItemButton
                    onClick={() => handleSectionToggle(section.id)}
                    sx={{ 
                      pl: 4, 
                      mb: 0.5,
                      backgroundColor: '#f5f2e8',
                      '&:hover': {
                        backgroundColor: '#efe9d9',
                      }
                    }}
                  >
                    <ListItemText 
                      primary={section.title} 
                      primaryTypographyProps={{ 
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#00487a'
                      }} 
                    />
                    {openSections[section.id] ? 
                      <ExpandLess fontSize="small" sx={{ color: '#00487a' }} /> : 
                      <ExpandMore fontSize="small" sx={{ color: '#00487a' }} />
                    }
                  </ListItemButton>
                  
                  <Collapse in={openSections[section.id] || false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {section.endpoints.map((endpoint, index) => (
                        <ListItemButton
                          key={`${section.id}-${index}`}
                          component={Link}
                          to={`/${section.id}#${endpoint.title.toLowerCase().replace(/\s+/g, '-')}`}
                          selected={location.pathname === `/${section.id}` && location.hash === `#${endpoint.title.toLowerCase().replace(/\s+/g, '-')}`}
                          sx={{ pl: 6, mb: 0.5, py: 0.5 }}
                        >
                          <ListItemText 
                            primary={endpoint.title} 
                            primaryTypographyProps={{ 
                              fontSize: '0.85rem',
                              fontWeight: (location.pathname === `/${section.id}` && 
                                location.hash === `#${endpoint.title.toLowerCase().replace(/\s+/g, '-')}`) ? 600 : 400,
                              color: (location.pathname === `/${section.id}` && 
                                location.hash === `#${endpoint.title.toLowerCase().replace(/\s+/g, '-')}`) ? '#00487a' : 'text.secondary'
                            }} 
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
          </List>
        </Collapse>
      </List>
      
      <Divider sx={{ my: 1.5 }} />
      
      <List sx={{ px: 2 }}>
        <ListItemButton
          component={Link}
          to="/version-history"
          selected={location.pathname === '/version-history'}
          sx={{ mb: 0.5 }}
        >
          <ListItemText 
            primary="Version History" 
            primaryTypographyProps={{ 
              fontSize: '0.95rem',
              fontWeight: location.pathname === '/version-history' ? 600 : 400,
              color: location.pathname === '/version-history' ? '#00487a' : 'inherit'
            }} 
          />
        </ListItemButton>
        
        <ListItemButton
          component={Link}
          to="/notes"
          selected={location.pathname === '/notes'}
          sx={{ mb: 0.5 }}
        >
          <ListItemText 
            primary="Notes" 
            primaryTypographyProps={{ 
              fontSize: '0.95rem',
              fontWeight: location.pathname === '/notes' ? 600 : 400,
              color: location.pathname === '/notes' ? '#00487a' : 'inherit'
            }} 
          />
        </ListItemButton>
        
        <ListItemButton
          component={Link}
          to="/response-codes"
          selected={location.pathname === '/response-codes'}
          sx={{ mb: 0.5 }}
        >
          <ListItemText 
            primary="Response Codes" 
            primaryTypographyProps={{ 
              fontSize: '0.95rem',
              fontWeight: location.pathname === '/response-codes' ? 600 : 400,
              color: location.pathname === '/response-codes' ? '#00487a' : 'inherit'
            }} 
          />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            position: 'fixed', 
            left: 16, 
            top: 16, 
            zIndex: theme.zIndex.drawer + 2,
            color: 'white'
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: isMobile ? 0 : '64px',
            height: isMobile ? '100%' : 'calc(100% - 64px)',
            borderRight: '1px solid #e2e8f0',
            boxShadow: isMobile ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
            backgroundColor: '#faf9f5',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar; 