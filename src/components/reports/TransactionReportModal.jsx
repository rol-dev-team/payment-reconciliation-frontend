import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Box,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Pagination,
} from '@mui/material';
import {
  Close as CloseIcon,
  FileUploadOutlined as ExportIcon,
  Check as CheckIcon,
  Close as CrossIcon,
} from '@mui/icons-material';

// Mock data based on your screenshot
const mockTransactions = Array(10).fill({
  id: 'DBI78EZH5N',
  account: '8801960464133',
  date: '2026-02-18 11:00:35',
  amount: '600.00',
  channel: 'bKash Paybill',
  wallet: '1',
  status: 'Issue',
  ownDb: false,
  sp: true,
});

export default function TransactionReportModal({ open, onClose }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, height: '90vh' } }}
    >
      {/* DIALOG HEADER */}
      <DialogTitle sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Transaction Report</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
        {/* FILTER BAR - Sticky */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', bgcolor: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1.5}>
              <Select size="small" value="All Statuses" sx={{ minWidth: 140, borderRadius: 2 }}>
                <MenuItem value="All Statuses">All Statuses</MenuItem>
              </Select>
              <Select size="small" value="All Channels" sx={{ minWidth: 140, borderRadius: 2 }}>
                <MenuItem value="All Channels">All Channels</MenuItem>
              </Select>
              <Select size="small" value="All Wallets" sx={{ minWidth: 140, borderRadius: 2 }}>
                <MenuItem value="All Wallets">All Wallets</MenuItem>
              </Select>
              <Button 
                variant="outlined" 
                startIcon={<ExportIcon />} 
                sx={{ borderRadius: 2, textTransform: 'none', color: '#4a5568', borderColor: '#e2e8f0' }}
              >
                Export
              </Button>
            </Stack>
            <Typography variant="body2" sx={{ color: '#718096' }}>
              4614 of 4614 transactions
            </Typography>
          </Stack>
        </Box>

        {/* DATA TABLE */}
        <TableContainer sx={{ flexGrow: 1 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {['Transaction Number', 'Account Number', 'Date', 'Amount', 'Channel', 'Wallet', 'Status', 'Own DB', 'SP'].map((head) => (
                  <TableCell key={head} sx={{ bgcolor: '#f8fafc', fontWeight: 600, color: '#718096', py: 1.5 }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTransactions.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(even)': { bgcolor: '#fcfcfc' } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{row.id}</TableCell>
                  <TableCell>{row.account}</TableCell>
                  <TableCell sx={{ color: '#718096' }}>{row.date}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{row.amount}</TableCell>
                  <TableCell>{row.channel}</TableCell>
                  <TableCell>{row.wallet}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} 
                      size="small" 
                      sx={{ bgcolor: '#fed7d7', color: '#c53030', fontWeight: 700, borderRadius: 1.5 }} 
                    />
                  </TableCell>
                  <TableCell align="center">
                    {row.ownDb ? <CheckIcon fontSize="small" color="success" /> : <CrossIcon fontSize="small" sx={{ color: '#e53e3e' }} />}
                  </TableCell>
                  <TableCell align="center">
                    {row.sp ? <CheckIcon fontSize="small" sx={{ color: '#38a169' }} /> : <CrossIcon fontSize="small" color="error" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* FOOTER PAGINATION */}
        <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="textSecondary">Rows per page</Typography>
            <Select size="small" value={10} sx={{ height: 30 }}>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            <Typography variant="body2" color="textSecondary">1–10 of 4614</Typography>
          </Stack>
          <Pagination count={462} size="small" shape="rounded" color="primary" />
        </Box>
      </DialogContent>
    </Dialog>
  );
}