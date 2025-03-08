import React from 'react';
import { Typography, Paper, Box, Divider, Chip } from '@mui/material';
import { versionHistory } from '../../data/apiData';

const VersionHistory: React.FC = () => {
  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Version History
        </Typography>
        
        {versionHistory.map((version, vIndex) => (
          <Box key={vIndex} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mr: 2 }}>
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
              {version.changes.map((change, cIndex) => (
                <Typography 
                  key={cIndex} 
                  variant="body2" 
                  sx={{ 
                    mb: 1.5, 
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  • {change}
                </Typography>
              ))}
            </Box>
            
            {vIndex < versionHistory.length - 1 && <Divider sx={{ mt: 4 }} />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default VersionHistory; 