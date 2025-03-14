import React from 'react';
import { Typography, Paper, Box, Divider, Chip, Stack, Tooltip } from '@mui/material';
import { versionHistory } from '../../data/apiData';

const VersionHistory: React.FC = () => {
  // Helper function to determine if a change item is a section header
  const isSectionHeader = (text: string) => {
    return text.includes(':') && !text.includes('-') && !text.includes('.');
  };

  // Helper function to render change items with proper indentation
  const renderChangeItems = (changes: string[]) => {
    return changes.map((change, index) => {
      // Check if this is a section header
      if (isSectionHeader(change)) {
        return (
          <Typography 
            key={index} 
            variant="body2" 
            sx={{ 
              mb: 1.5, 
              color: 'text.secondary',
              lineHeight: 1.6,
              fontWeight: 500
            }}
          >
            • {change}
          </Typography>
        );
      } 
      // Check if this is a double-indented sub-item (starts with '- - ')
      else if (change.startsWith('- - ')) {
        return (
          <Typography 
            key={index} 
            variant="body2" 
            sx={{ 
              mb: 1.5, 
              color: 'text.secondary',
              lineHeight: 1.6,
              pl: 6 // Double indent
            }}
          >
            • {change.substring(4)} {/* Remove the '- - ' prefix */}
          </Typography>
        );
      }
      // Check if this is a single-indented sub-item (starts with '- ')
      else if (change.startsWith('- ')) {
        return (
          <Typography 
            key={index} 
            variant="body2" 
            sx={{ 
              mb: 1.5, 
              color: 'text.secondary',
              lineHeight: 1.6,
              pl: 3 // Single indent
            }}
          >
            • {change.substring(2)} {/* Remove the '- ' prefix */}
          </Typography>
        );
      } 
      // Regular item
      else {
        return (
          <Typography 
            key={index} 
            variant="body2" 
            sx={{ 
              mb: 1.5, 
              color: 'text.secondary',
              lineHeight: 1.6
            }}
          >
            • {change}
          </Typography>
        );
      }
    });
  };

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3, color: '#00487a' }}>
          Version History
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 3, fontStyle: 'italic' }}>
          This page shows all API versions and their deployment status across environments.
        </Typography>
        
        <Box sx={{ mb: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#00487a', fontWeight: 600 }}>
            Current Environment Versions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 500, minWidth: '120px' }}>
                QA:
              </Typography>
              <Chip 
                label={versionHistory.find(v => v.environments?.qa)?.version || 'Unknown'}
                color="info"
                sx={{ fontWeight: 500 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 500, minWidth: '120px' }}>
                Production:
              </Typography>
              <Chip 
                label={versionHistory.find(v => v.environments?.prod)?.version || 'Unknown'}
                color="success"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          </Box>
        </Box>
        
        {versionHistory.map((version, vIndex) => (
          <Box key={vIndex} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mr: 2, color: '#00487a' }}>
                {version.version}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip 
                  label={version.date} 
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(80, 70, 229, 0.1)',
                    color: 'secondary.main',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
                
                {version.environments && (
                  <>
                    {version.environments.qa && (
                      <Tooltip title="Available in QA environment" arrow>
                        <Chip 
                          label="QA" 
                          size="small"
                          color="info"
                          variant="outlined"
                          sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                        />
                      </Tooltip>
                    )}
                    
                    {version.environments.prod && (
                      <Tooltip title="Available in Production environment" arrow>
                        <Chip 
                          label="PROD" 
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                        />
                      </Tooltip>
                    )}
                  </>
                )}
              </Stack>
            </Box>
            
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.secondary', 
                mb: 2,
                fontWeight: 500
              }}
            >
              Author: {version.author}
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '2px solid #E2E8F0' }}>
              {renderChangeItems(version.changes)}
            </Box>
            
            {vIndex < versionHistory.length - 1 && <Divider sx={{ mt: 4 }} />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default VersionHistory; 