import React, { useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { apiData } from '../../data/apiData';
import EndpointDetails from '../endpoints/EndpointDetails';

interface ApiSectionProps {
  sectionId: string;
}

const ApiSection: React.FC<ApiSectionProps> = ({ sectionId }) => {
  const location = useLocation();
  const section = apiData.find((s) => s.id === sectionId);

  // Handle scrolling when the component mounts or sectionId changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Add a slight delay to ensure the element is rendered
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }, 100);
      }
    } else {
      // Scroll to top when changing sections
      window.scrollTo(0, 0);
    }
  }, [sectionId, location.hash]);

  if (!section) {
    return (
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
          Section not found
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {section.endpoints.map((endpoint, index) => (
        <EndpointDetails key={index} endpoint={endpoint} />
      ))}
    </Box>
  );
};

export default ApiSection; 