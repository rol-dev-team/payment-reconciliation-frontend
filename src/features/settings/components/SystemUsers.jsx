// src/features/settings/components/SystemUsers.jsx
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';

export default function SystemUsers({ users, onEdit }) {
  const dummyUsers = users || [
    { name: 'Admin User', user: 'admin', email: 'admin@earth.net.bd', phone: '01844543183', role: 'admin', status: 'Active' },
    { name: 'Management User', user: 'management', email: 'management@earth.net.bd', phone: '013228119020', role: 'management', status: 'Active' },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        System Users
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search by name, employee ID, email..."
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <FormControl size="small" sx={{ width: 200 }}>
          <Select defaultValue="All Roles">
            <MenuItem value="All Roles">All Roles</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#64748b' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyUsers.map((user, index) => (
              <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell>{user.user}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell sx={{ color: '#16a34a', fontWeight: 600 }}>{user.status}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    sx={{
                      border: '1px solid #e2e8f0',
                      borderRadius: 1,
                      color: '#64748b',
                    }}
                    onClick={() => onEdit?.(user)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}