import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { notes } from '../../data/apiData';

const Notes: React.FC = () => {
  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3, color: '#00487a' }}>
          API Usage Notes
        </Typography>
        
        <Box sx={{ pl: 2, borderLeft: '2px solid #E2E8F0' }}>
          {notes.map((note, index) => (
            <Typography 
              key={index} 
              variant="body1" 
              sx={{ 
                mb: 2, 
                color: 'text.secondary',
                lineHeight: 1.6
              }}
            >
              • {note}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Notes; 