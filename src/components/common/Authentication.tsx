import React from 'react';
import { Typography, Paper, Box, Divider, Alert } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { apiData, baseUrls } from '../../data/apiData';
import CodeBlock from './CodeBlock';

const Authentication: React.FC = () => {
  const authSection = apiData.find((section) => section.id === 'authentication');
  const authEndpoint = authSection?.endpoints[0];

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#00487a', mb: 3 }}>
          Authentication
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
          {authSection?.description || 'The API uses OAuth 2.0 client credentials flow for authentication. You must obtain an access token before accessing any endpoints.'}
        </Typography>
        
        <Alert 
          severity="info" 
          icon={<InfoIcon />}
          sx={{ 
            mb: 4, 
            borderRadius: 2,
            '& .MuiAlert-message': {
              color: 'text.secondary'
            }
          }}
        >
          Client credentials will be provided separately. Contact Amherst support if you need access.
        </Alert>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2, color: '#00487a' }}>
            Base URLs
          </Typography>
          <Box sx={{ 
            p: 3, 
            backgroundColor: '#f5f2e8', 
            borderRadius: 2, 
            border: '1px solid #E2E8F0'
          }}>
            <Typography variant="body1" sx={{ fontFamily: 'monospace', mb: 1 }}>
              <strong>QA:</strong> {baseUrls.qa}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
              <strong>PROD:</strong> {baseUrls.prod}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Obtaining an Access Token
          </Typography>
          
          <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f2e8', borderRadius: 1, fontFamily: 'monospace' }}>
            <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
              POST {authEndpoint?.path || '{amherst-api-base}/auth/token'}
            </Typography>
          </Box>
          
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
            Request Headers
          </Typography>
          <CodeBlock 
            code={authEndpoint?.requestHeaders || 'Content-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64(client_id:client_secret)}'}
            language="http"
          />
          
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
            Request Body
          </Typography>
          <CodeBlock 
            code={authEndpoint?.requestBody || 'grant_type=client_credentials'}
            language="http"
          />
          
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
            Response
          </Typography>
          <CodeBlock 
            code={authEndpoint?.responseExample || `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": "2024-03-15T14:30:00.000Z",
  "token_type": "Bearer"
}`}
            language="json"
          />
        </Box>
      </Paper>
      
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Using the Token
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
          Include the token in all API requests:
        </Typography>
        
        <CodeBlock 
          code={`Authorization: Bearer {access_token}`}
          language="http"
        />
        
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
          Important Notes
        </Typography>
        
        <Box sx={{ pl: 2, borderLeft: '2px solid #E2E8F0' }}>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            • Tokens expire after the duration specified in <code>expires_at</code> (unix time)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            • Your application should implement token refresh before expiration
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            • Client credentials will be provided separately
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Authentication; 