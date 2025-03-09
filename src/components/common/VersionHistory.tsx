import React from 'react';
import { Typography, Paper, Box, Divider, Chip } from '@mui/material';
import { versionHistory } from '../../data/apiData';

const VersionHistory: React.FC = () => {
  // Helper function to determine if a change item is a section header
  const isSectionHeader = (text: string) => {
    return text.includes(':') && !text.includes('-') && !text.includes('.');
  };

  // Helper function to render change items with proper indentation
  const renderChangeItems = (changes: string[]) => {
    let currentSection = '';
    
    return changes.map((change, index) => {
      // Check if this is a section header
      if (isSectionHeader(change)) {
        currentSection = change;
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
      // Check if this is a sub-item (starts with '- ')
      else if (change.startsWith('- ')) {
        return (
          <Typography 
            key={index} 
            variant="body2" 
            sx={{ 
              mb: 1.5, 
              color: 'text.secondary',
              lineHeight: 1.6,
              pl: 3 // Indent sub-items
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
        
        {versionHistory.map((version, vIndex) => (
          <Box key={vIndex} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mr: 2, color: '#00487a' }}>
                {version.version}
              </Typography>
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