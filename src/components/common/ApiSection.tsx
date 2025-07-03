import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { apiData, ApiEndpoint } from '../../data/apiData';
import EndpointDetails from '../endpoints/EndpointDetails';
import DocumentManagement from '../endpoints/DocumentManagement';

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

  // If this section has contexts (Document Management), use the DocumentManagement component
  if (section.contexts && section.contexts.length > 0) {
    // If we have a specific endpoint ID, show that endpoint with context switching
    if (endpointId) {
      return (
        <DocumentManagement 
          contexts={section.contexts} 
          sectionId={sectionId}
          selectedEndpoint={endpointId}
        />
      );
    }
    
    // If no specific endpoint, show the first endpoint (Create Document) by default
    return (
      <DocumentManagement 
        contexts={section.contexts} 
        sectionId={sectionId}
        selectedEndpoint="create-document"
      />
    );
  }

  // Function to find an endpoint recursively by ID
  const findEndpointById = (endpoints: ApiEndpoint[], id: string): ApiEndpoint | undefined => {
    // Try to find the endpoint directly in this array
    const endpoint = endpoints.find(e => 
      e.title.toLowerCase().replace(/\s+/g, '-') === id
    );
    
    if (endpoint) return endpoint;
    
    // If not found, search in nested endpoints
    for (const ep of endpoints) {
      if (ep.endpoints) {
        const nestedEndpoint = ep.endpoints.find(ne => 
          ne.title.toLowerCase().replace(/\s+/g, '-') === id
        );
        
        if (nestedEndpoint) return nestedEndpoint;
      }
    }
    
    return undefined;
  };

  // If we have an endpointId, show only that endpoint
  if (endpointId) {
    const endpoint = findEndpointById(section.endpoints, endpointId);

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