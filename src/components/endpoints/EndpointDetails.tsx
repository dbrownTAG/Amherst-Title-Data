import React from 'react';
import { Typography, Paper, Box, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, Breadcrumbs } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ApiEndpoint } from '../../data/apiData';
import CodeBlock from '../common/CodeBlock';
import StatusMatrix from '../common/StatusMatrix';

interface EndpointDetailsProps {
  endpoint: ApiEndpoint;
  sectionId?: string;
}

const EndpointDetails: React.FC<EndpointDetailsProps> = ({ endpoint, sectionId }) => {
  const theme = useTheme();
  const location = useLocation();
  const isListEndpoint = endpoint.title.startsWith('List');
  const hasNestedEndpoints = endpoint.endpoints && endpoint.endpoints.length > 0;
  const isDocumentEndpoint = location.pathname.includes('document') && 
                            !location.pathname.includes('document-management');

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

  const renderEndpoint = (ep: ApiEndpoint) => {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 2
        }}
        id={ep.title.toLowerCase().replace(/\s+/g, '-')}
        key={ep.title}
      >
        {/* Add breadcrumbs for document endpoints */}
        {isDocumentEndpoint && sectionId && (
          <Box sx={{ mb: 3 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <RouterLink to={`/${sectionId}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                <Typography variant="body2">
                  {sectionId === 'cash-acquisitions' ? 'Cash Acquisitions' : 'Retail Sales'}
                </Typography>
              </RouterLink>
              <Typography variant="body2" color="text.secondary">Documents</Typography>
              <Typography variant="body2" color="text.primary">{ep.title}</Typography>
            </Breadcrumbs>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ mr: 2, fontWeight: 600, color: '#00487a' }}>
            {ep.title}
          </Typography>
          {ep.method && (
            <Chip
              label={ep.method}
              sx={{
                fontWeight: 600,
                backgroundColor: `${getMethodColor(ep.method)}20`,
                color: getMethodColor(ep.method),
                borderRadius: '6px',
                height: '28px',
              }}
            />
          )}
        </Box>

        <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
          {ep.description.map((paragraph, index) => <React.Fragment key={index}>{paragraph}<br /><br /></React.Fragment>)}
        </Typography>

        {ep.path && (
          <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f2e8', borderRadius: 1, fontFamily: 'monospace' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'monospace', 
                fontWeight: 500,
                whiteSpace: 'pre-wrap'
              }}
            >
              {`${ep.method} ${ep.path}`}
            </Typography>
          </Box>
        )}

        {ep.requestHeaders && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Request Headers
            </Typography>
            <CodeBlock code={ep.requestHeaders} language="http" />
          </Box>
        )}

        {ep.pathParams && ep.pathParams.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Path Parameters
            </Typography>
            <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 1 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f2e8' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Required</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ep.pathParams.map((param, index) => (
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

        {ep.queryParams && ep.queryParams.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Query Parameters
            </Typography>
            <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 1 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f2e8' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Required</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ep.queryParams.map((param, index) => (
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
        
        {(isListEndpoint && sectionId && !hasNestedEndpoints && !ep.title.toLowerCase().includes('document')) && (
          <Box sx={{ mb: 4 }}>
            <StatusMatrix type={sectionId as 'cash-acquisitions' | 'retail-sales' | 'bulk-portfolio'} />
          </Box>
        )}

        {ep.method === 'PATCH' && ep.requestBody && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Request Body Fields
            </Typography>
            <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 1 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f2e8' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Field</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Required</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ep.title.includes('Cash Acquisition') && (
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>ClosedAndFunded</TableCell>
                      <TableCell>boolean</TableCell>
                      <TableCell>
                        <Chip 
                          label="Required" 
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                      </TableCell>
                      <TableCell>When set to true, marks the transaction as closed and funded. Requires ReadyToClose and ReadyToFund to already be true.</TableCell>
                    </TableRow>
                  )}
                  {ep.title.includes('Retail Sale') && (
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>ClosedAndFunded</TableCell>
                      <TableCell>boolean</TableCell>
                      <TableCell>
                        <Chip 
                          label="Required" 
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                      </TableCell>
                      <TableCell>When set to true, marks the transaction as closed and funded. Requires ReadyToClose and ReadyToFund to already be true.</TableCell>
                    </TableRow>
                  )}
                  {ep.title.includes('Document') && (
                    <>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>Status</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>
                          <Chip 
                            label="Optional" 
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
                              color: '#10B981',
                              fontWeight: 500,
                              fontSize: '0.75rem'
                            }}
                          />
                        </TableCell>
                        <TableCell>Error message or status information for the document</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>OrderedDate</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>
                          <Chip 
                            label="Optional" 
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
                              color: '#10B981',
                              fontWeight: 500,
                              fontSize: '0.75rem'
                            }}
                          />
                        </TableCell>
                        <TableCell>ISO 8601 timestamp when the document was ordered</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>ConfirmUpload</TableCell>
                        <TableCell>boolean</TableCell>
                        <TableCell>
                          <Chip 
                            label="Optional" 
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
                              color: '#10B981',
                              fontWeight: 500,
                              fontSize: '0.75rem'
                            }}
                          />
                        </TableCell>
                        <TableCell>When set to true, will set the UploadDate to the current date and time</TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {ep.validationRules && ep.validationRules.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Validation Rules
            </Typography>
            <Box sx={{ pl: 2, borderLeft: '2px solid #E2E8F0' }}>
              {ep.validationRules.map((rule, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  • {rule}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        {ep.requestBody && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Request Body Example
            </Typography>
            <CodeBlock code={ep.requestBody} language="json" />
          </Box>
        )}

        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Response Example
          </Typography>
          <CodeBlock code={ep.responseExample} language="json" showLineNumbers />
        </Box>

        {ep.interfaceDefinition && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              TypeScript Interface
            </Typography>
            <Typography variant="body2" paragraph sx={{ color: 'text.secondary', mb: 2 }}>
              The following TypeScript interfaces define the data structure for this endpoint:
            </Typography>
            <CodeBlock code={ep.interfaceDefinition} language="typescript" showLineNumbers />
          </Box>
        )}
      </Paper>
    );
  };

  // Display document endpoints individually without the container
  if (isDocumentEndpoint) {
    return renderEndpoint(endpoint);
  }

  // If this endpoint has nested endpoints, render the parent first, then the children
  if (hasNestedEndpoints) {
    return (
      <Box>
        {renderEndpoint(endpoint)}
        <Box sx={{ ml: 4 }}>
          {endpoint.endpoints?.map(nestedEndpoint => (
            <React.Fragment key={nestedEndpoint.title}>
              {renderEndpoint(nestedEndpoint)}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    );
  }

  // Otherwise, just render the endpoint
  return renderEndpoint(endpoint);
};

export default EndpointDetails; 