import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';

interface PropertyFieldsMatrixProps {
  type: 'financing-transactions';
}

const PropertyFieldsMatrix: React.FC<PropertyFieldsMatrixProps> = ({ type }) => {
  if (type !== 'financing-transactions') {
    return null;
  }

  const propertyFields = [
    {
      field: 'Properties',
      description: 'All active Property record IDs currently associated with this financing transaction'
    },
    {
      field: 'PropertiesWithDocs',
      description: 'Property IDs that have at least one title document (excludes API-uploaded documents)'
    },
    {
      field: 'PropertiesWithRecentDocs',
      description: 'Property IDs with title documents created within the last 12 hours'
    },
    {
      field: 'RecentlyAddedProperties',
      description: 'Property IDs added to the transaction within the last 12 hours'
    },
    {
      field: 'RecentlyRemovedProperties',
      description: 'Property IDs removed from the transaction within the last 12 hours'
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Property Summary Fields
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2, mb: 2 }}>
        The following fields contain arrays of 18-character Property record IDs:
      </Typography>
      
      <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 2, mb: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f2e8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, width: '30%' }}>Field</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '70%' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propertyFields.map((field, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 500 }}>{field.field}</TableCell>
                <TableCell>{field.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PropertyFieldsMatrix;