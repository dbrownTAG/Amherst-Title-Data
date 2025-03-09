import React from 'react';
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

  // We're removing the scroll handling logic here since it's now handled by the ScrollToTop component

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