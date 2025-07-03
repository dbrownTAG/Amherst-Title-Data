import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';

interface StatusMatrixProps {
  type: 'cash-acquisitions' | 'retail-sales' | 'financing-transactions' | 'financing-property';
}

const StatusMatrix: React.FC<StatusMatrixProps> = ({ type }) => {
  // Define different status matrix configurations based on type
  const getMatrixConfig = () => {
    switch (type) {
      case 'cash-acquisitions':
        return {
          title: 'Available Statuses',
          description: 'This table shows which transaction statuses are returned by the List Cash Acquisitions endpoint:',
          statuses: [
            { name: 'Open', returned: 'always' },
            { name: 'On-Hold', returned: 'always' },
            { name: 'Closed', returned: '24hours' },
            { name: 'Cancelled', returned: '24hours' }
          ]
        };
      case 'retail-sales':
        return {
          title: 'Available Statuses',
          description: 'This table shows which transaction statuses are returned by the List Retail Sales endpoint:',
          statuses: [
            { name: 'Open', returned: 'always' },
            { name: 'Cancelled', returned: '24hours' }
          ]
        };
      case 'financing-transactions':
        return {
          title: 'Available Statuses',
          description: 'This table shows which statuses are returned by the List Financing Transactions endpoint:',
          statuses: [
            { name: 'Open', returned: 'always' },
            { name: 'In Progress', returned: 'always' },
            { name: 'Funded', returned: 'always' },
            { name: 'Closed', returned: 'never' }
          ]
        };
      case 'financing-property':
      default:
        return {
          title: 'Available Statuses',
          description: 'This table shows which statuses are returned by the Get Financing Property endpoint:',
          statuses: [
            { name: 'All', returned: 'always' }
          ]
        };
    }
  };

  const matrixConfig = getMatrixConfig();

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00487a' }}>
        {matrixConfig.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        {matrixConfig.description}
      </Typography>
      <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 2, mb: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f2e8' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, width: '50%' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '50%' }}>Returned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matrixConfig.statuses.map((status, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 500 }}>{status.name}</TableCell>
                <TableCell>
                  {status.returned === 'always' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon sx={{ color: 'success.main', mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Always</Typography>
                    </Box>
                  ) : status.returned === '24hours' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ color: 'info.main', mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Last 24 hours only</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CloseIcon sx={{ color: 'error.main', mr: 1, fontSize: '1rem' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Never</Typography>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StatusMatrix; 