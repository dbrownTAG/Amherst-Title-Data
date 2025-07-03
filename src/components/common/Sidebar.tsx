import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';

import { apiData } from '../../data/apiData';
import styles from './MethodLabel.module.css';

const drawerWidth = 320;

// Helper function to get HTTP method for document endpoints
const getMethodForEndpoint = (endpointTitle: string): string => {
  switch (endpointTitle) {
    case 'Create Document':
      return 'POST';
    case 'Update Document':
      return 'PATCH';
    case 'Get Upload URL':
    case 'List Documents':
    case 'Get Document by ID':
    case 'Get Amherst Documents':
      return 'GET';
    default:
      return 'GET';
  }
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleSectionToggle = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));

    // Find the section data
    const sectionData = apiData.find(s => s.id === section);
    if (sectionData && sectionData.endpoints.length > 0) {
      // Get the first endpoint
      const firstEndpoint = sectionData.endpoints[0];
      // Navigate to the first endpoint
      navigate(`/${section}/${firstEndpoint.title.toLowerCase().replace(/\s+/g, '-')}`);
    }
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
            <ExpandMore sx={{ color: '#00487a' }} /> : 
            <ChevronRight sx={{ color: '#00487a' }} />
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
                      pl: 2, 
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 72, 122, 0.04)'
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
                      <ExpandMore fontSize="small" sx={{ color: '#00487a' }} /> : 
                      <ChevronRight fontSize="small" sx={{ color: '#00487a' }} />
                    }
                  </ListItemButton>
                  
                  <Collapse in={openSections[section.id] || false} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {/* Handle sections with contexts (like Document Management) */}
                      {section.contexts ? (
                        // Show individual document endpoints for context-based sections
                        ['Create Document', 'Get Upload URL', 'Update Document', 'List Documents', 'Get Document by ID', 'Get Amherst Documents'].map((endpointTitle, endpointIndex) => (
                          <ListItemButton
                            key={`${section.id}-${endpointIndex}`}
                            component={Link}
                            to={`/${section.id}/${endpointTitle.toLowerCase().replace(/\s+/g, '-')}`}
                            selected={location.pathname === `/${section.id}/${endpointTitle.toLowerCase().replace(/\s+/g, '-')}`}
                            sx={{ 
                              pl: 2,
                              pr: 2,
                              py: 0.25,
                              mb: 0.25,
                              minHeight: '32px'
                            }}
                          >
                            <Chip
                              label={getMethodForEndpoint(endpointTitle)}
                              size="small"
                              className={`${styles.methodLabel} ${styles[getMethodForEndpoint(endpointTitle).toLowerCase()]}`}
                              sx={{
                                height: '20px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                borderRadius: '4px',
                                '& .MuiChip-label': {
                                  px: 1
                                }
                              }}
                            />
                            <ListItemText 
                              primary={endpointTitle} 
                              primaryTypographyProps={{ 
                                fontSize: '0.85rem',
                                fontWeight: location.pathname === `/${section.id}/${endpointTitle.toLowerCase().replace(/\s+/g, '-')}` ? 600 : 400,
                                color: location.pathname === `/${section.id}/${endpointTitle.toLowerCase().replace(/\s+/g, '-')}` ? '#00487a' : 'text.secondary'
                              }} 
                            />
                          </ListItemButton>
                        ))
                      ) : (
                        section.endpoints.map((endpoint, index) => {
                        // Check if this is a parent endpoint with nested endpoints
                        const hasNestedEndpoints = endpoint.endpoints && endpoint.endpoints.length > 0;
                        const isDocumentSection = endpoint.title === 'Documents' && hasNestedEndpoints;
                        
                        // For document sections, we'll render a group header and then all child endpoints
                        if (isDocumentSection) {
                          return (
                            <React.Fragment key={`${section.id}-${index}`}>
                              {/* Document Section Header */}
                              <ListItemButton
                                sx={{ 
                                  pl: 3, 
                                  pr: 2,
                                  py: 0.5,
                                  mb: 0.25,
                                  bgcolor: 'rgba(0, 72, 122, 0.04)'
                                }}
                              >
                                <ListItemText 
                                  primary="Documents" 
                                  primaryTypographyProps={{ 
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#00487a'
                                  }} 
                                />
                              </ListItemButton>
                              
                              {/* Document Child Endpoints */}
                              {endpoint.endpoints?.map((childEndpoint, childIndex) => (
                                <ListItemButton
                                  key={`${section.id}-${index}-${childIndex}`}
                                  component={Link}
                                  to={`/${section.id}/${childEndpoint.title.toLowerCase().replace(/\s+/g, '-')}`}
                                  selected={location.pathname === `/${section.id}/${childEndpoint.title.toLowerCase().replace(/\s+/g, '-')}`}
                                  sx={{ 
                                    pl: 2.5,
                                    pr: 2,
                                    py: 0.25,
                                    mb: 0.25,
                                    minHeight: '32px'
                                  }}
                                >
                                  <Chip
                                    label={childEndpoint.method}
                                    size="small"
                                    className={`${styles.methodLabel} ${styles[childEndpoint.method.toLowerCase()]}`}
                                    sx={{
                                      height: '20px',
                                      fontSize: '0.7rem',
                                      fontWeight: 600,
                                      borderRadius: '4px',
                                      '& .MuiChip-label': {
                                        px: 1
                                      }
                                    }}
                                  />
                                  <ListItemText 
                                    primary={childEndpoint.title} 
                                    primaryTypographyProps={{ 
                                      fontSize: '0.85rem',
                                      fontWeight: location.pathname === `/${section.id}/${childEndpoint.title.toLowerCase().replace(/\s+/g, '-')}` ? 600 : 400,
                                      color: location.pathname === `/${section.id}/${childEndpoint.title.toLowerCase().replace(/\s+/g, '-')}` ? '#00487a' : 'text.secondary'
                                    }} 
                                  />
                                </ListItemButton>
                              ))}
                            </React.Fragment>
                          );
                        }
                        
                        // Regular endpoint without nesting
                        return (
                          <ListItemButton
                            key={`${section.id}-${index}`}
                            component={Link}
                            to={`/${section.id}/${endpoint.title.toLowerCase().replace(/\s+/g, '-')}`}
                            selected={location.pathname === `/${section.id}/${endpoint.title.toLowerCase().replace(/\s+/g, '-')}`}
                            sx={{ 
                              pl: 2,
                              pr: 2,
                              py: 0.25,
                              mb: 0.25,
                              minHeight: '32px'
                            }}
                          >
                            <Chip
                              label={endpoint.method}
                              size="small"
                              className={`${styles.methodLabel} ${styles[endpoint.method.toLowerCase()]}`}
                              sx={{
                                height: '20px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                borderRadius: '4px',
                                '& .MuiChip-label': {
                                  px: 1
                                }
                              }}
                            />
                            <ListItemText 
                              primary={endpoint.title} 
                              primaryTypographyProps={{ 
                                fontSize: '0.85rem',
                                fontWeight: location.pathname === `/${section.id}/${endpoint.title.toLowerCase().replace(/\s+/g, '-')}` ? 600 : 400,
                                color: location.pathname === `/${section.id}/${endpoint.title.toLowerCase().replace(/\s+/g, '-')}` ? '#00487a' : 'text.secondary'
                              }} 
                            />
                          </ListItemButton>
                        );
                      }))}
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