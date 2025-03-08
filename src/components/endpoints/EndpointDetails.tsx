import React from 'react';
import { Typography, Paper, Box, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { ApiEndpoint } from '../../data/apiData';
import CodeBlock from '../common/CodeBlock';

interface EndpointDetailsProps {
  endpoint: ApiEndpoint;
}

const EndpointDetails: React.FC<EndpointDetailsProps> = ({ endpoint }) => {
  const theme = useTheme();
  const endpointId = endpoint.title.toLowerCase().replace(/\s+/g, '-');

  const methodColors = {
    GET: '#10B981', // green
    POST: '#3B82F6', // blue
    PATCH: '#F59E0B', // amber
    DELETE: '#EF4444', // red
    PUT: '#8B5CF6', // purple
  };

  const getMethodColor = (method: string) => {
    return methodColors[method as keyof typeof methodColors] || theme.palette.grey[500];
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 2,
        scrollMarginTop: '100px',
      }}
      id={endpointId}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ mr: 2, fontWeight: 600 }}>
          {endpoint.title}
        </Typography>
        <Chip
          label={endpoint.method}
          sx={{
            fontWeight: 600,
            backgroundColor: `${getMethodColor(endpoint.method)}20`,
            color: getMethodColor(endpoint.method),
            borderRadius: '6px',
            height: '28px',
          }}
        />
      </Box>

      <Box sx={{ mb: 3, p: 2, backgroundColor: '#F8FAFC', borderRadius: 1, fontFamily: 'monospace' }}>
        <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
          {endpoint.method} {endpoint.path}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        {endpoint.description.map((desc, index) => (
          <Typography key={index} variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            {desc}
          </Typography>
        ))}
      </Box>

      {endpoint.requestHeaders && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Request Headers
          </Typography>
          <CodeBlock code={endpoint.requestHeaders} language="http" />
        </Box>
      )}

      {endpoint.pathParams && endpoint.pathParams.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Path Parameters
          </Typography>
          <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 1 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Required</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {endpoint.pathParams.map((param, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{param.name}</TableCell>
                    <TableCell>{param.type}</TableCell>
                    <TableCell>
                      <Chip 
                        label={param.required ? 'Required' : 'Optional'} 
                        size="small"
                        sx={{ 
                          backgroundColor: param.required ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                          color: param.required ? '#EF4444' : '#10B981',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    </TableCell>
                    <TableCell>{param.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {endpoint.queryParams && endpoint.queryParams.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Query Parameters
          </Typography>
          <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 1 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Required</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {endpoint.queryParams.map((param, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{param.name}</TableCell>
                    <TableCell>{param.type}</TableCell>
                    <TableCell>
                      <Chip 
                        label={param.required ? 'Required' : 'Optional'} 
                        size="small"
                        sx={{ 
                          backgroundColor: param.required ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                          color: param.required ? '#EF4444' : '#10B981',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    </TableCell>
                    <TableCell>{param.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {endpoint.requestBody && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Request Body
          </Typography>
          <CodeBlock code={endpoint.requestBody} language="json" />
        </Box>
      )}

      {endpoint.validationRules && endpoint.validationRules.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Validation Rules
          </Typography>
          <Box sx={{ pl: 2, borderLeft: '2px solid #E2E8F0' }}>
            {endpoint.validationRules.map((rule, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                • {rule}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Response Example
        </Typography>
        <CodeBlock code={endpoint.responseExample} language="json" showLineNumbers />
      </Box>
    </Paper>
  );
};

export default EndpointDetails; 