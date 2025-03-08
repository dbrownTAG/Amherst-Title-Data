import React from 'react';
import { Typography, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { responseCodes } from '../../data/apiData';

const ResponseCodes: React.FC = () => {
  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return '#10B981'; // success/green
    if (code >= 300 && code < 400) return '#3B82F6'; // info/blue
    if (code >= 400 && code < 500) return '#F59E0B'; // warning/amber
    if (code >= 500) return '#EF4444'; // error/red
    return '#718096'; // default gray
  };

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Response Codes
        </Typography>
        
        <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 1 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: '150px' }}>Status Code</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responseCodes.map((code, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Chip 
                      label={code.code} 
                      size="small"
                      sx={{ 
                        backgroundColor: `${getStatusColor(code.code)}20`,
                        color: getStatusColor(code.code),
                        fontWeight: 600,
                        minWidth: '60px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{code.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ResponseCodes; 