import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { apiData } from '../../data/apiData';
import EndpointDetails from '../endpoints/EndpointDetails';

interface ApiSectionProps {
  sectionId: string;
}

const ApiSection: React.FC<ApiSectionProps> = ({ sectionId }) => {
  const { endpointId } = useParams();
  const section = apiData.find((s) => s.id === sectionId);

  if (!section) {
    return (
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
          Section not found
        </Typography>
      </Paper>
    );
  }

  // If we have an endpointId, show only that endpoint
  if (endpointId) {
    const endpoint = section.endpoints.find(
      e => e.title.toLowerCase().replace(/\s+/g, '-') === endpointId
    );

    if (!endpoint) {
      return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
            Endpoint not found
          </Typography>
        </Paper>
      );
    }
    
    return (
      <Box>
        <EndpointDetails endpoint={endpoint} sectionId={sectionId} />
      </Box>
    );
  }

  // If no endpointId is specified, show the first endpoint (List)
  const firstEndpoint = section.endpoints[0];

  return (
    <Box>
      <EndpointDetails endpoint={firstEndpoint} sectionId={sectionId} />
    </Box>
  );
};

export default ApiSection; 