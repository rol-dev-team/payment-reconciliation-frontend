import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Stack, Box, IconButton,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
} from '@mui/material';
import * as XLSX from "xlsx";
import CloudIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import SelectDropdownSingle from '../../../components/shared/SelectDropdownSingle';
import UploadButton from '../../../components/shared/UploadButton';
import { fetchBillingSystem } from '../api/uploadApi';

export default function OwnDatabaseUpload({ values, onUpload, onDelete }) {
  const [billingOptions, setBillingOptions] = useState([]);
  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    fetchBillingSystem().then(setBillingOptions).catch(console.error);
  }, []);

  const handleFilesChange = (files) => {
    const billingLabel = billingOptions.find((b) => b.id === values.billingSystem)?.label || 'N/A';

    files.forEach((file) => {
      const tempFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        file,
        billingSystem: billingLabel,
        transactions: 0,
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        let transactionCount = 0;

        if (/\.csv$/i.test(file.name)) {
          const lines = data.split(/\r\n|\n/);
          transactionCount = lines.length > 1 ? lines.length - 1 : 0;
        } else if (/\.(xls|xlsx)$/i.test(file.name)) {
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          transactionCount = json.length > 1 ? json.length - 1 : 0;
        }

        setFilesList((prev) =>
          prev.map((f) => (f.id === tempFile.id ? { ...f, transactions: transactionCount } : f))
        );
      };

      setFilesList((prev) => [...prev, tempFile]);
      onUpload(file, { billingSystemId: values.billingSystem });

      if (/\.csv$/i.test(file.name)) reader.readAsText(file);
      else reader.readAsArrayBuffer(file);
    });
  };

  const handleDelete = (id) => {
    setFilesList((prev) => prev.filter((f) => f.id !== id));
    onDelete(id);
  };

  return (
    <Card variant="outlined" sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ py: { xs: 3, sm: 4 }, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: { xs: 2, sm: 3 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          Upload payment file from billing panel
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          mb={{ xs: 3, sm: 4 }}
        >
          <Box sx={{ flex: 1 }}>
            <SelectDropdownSingle
              name="billingSystem"
              placeholder="Select Billing System"
              fetchOptions={async () => billingOptions}
              height={42}
            />
          </Box>

          <Box sx={{ flexShrink: 0 }}>
            <UploadButton
              label="Upload Files"
              multiple
              onUpload={handleFilesChange}
              color="#217346"
              hoverColor="#185C37"
              minWidth={160}
            />
          </Box>
        </Stack>

        {filesList.length > 0 ? (
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ borderRadius: 2, overflowX: 'auto' }}
          >
            <Table sx={{ minWidth: { xs: '100%', sm: 650 } }} size="small">
              <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>File Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Billing System</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Transactions</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filesList.map((f) => (
                  <TableRow key={f.id} hover>
                    <TableCell sx={{ wordBreak: 'break-word' }}>{f.name}</TableCell>
                    <TableCell sx={{ wordBreak: 'break-word' }}>{f.billingSystem}</TableCell>
                    <TableCell>{f.transactions}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="error" onClick={() => handleDelete(f.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              mt: 2,
              py: { xs: 4, sm: 6 },
              textAlign: 'center',
              border: '2px dashed #cbd5e1',
              borderRadius: 2,
              backgroundColor: '#f8fafc',
            }}
          >
            <CloudIcon sx={{ fontSize: { xs: 36, sm: 48 }, color: '#94a3b8', mb: 1 }} />
            <Typography variant="body2" fontWeight={500} color="textSecondary">
              No files uploaded yet
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}