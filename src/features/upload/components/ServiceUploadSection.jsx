import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { format } from "date-fns";
import * as XLSX from "xlsx";

import SelectDropdownSingle from "../../../components/shared/SelectDropdownSingle";
import UploadButton from "../../../components/shared/UploadButton";

export default function ServiceUploadSection({
  values,
  channelOptions,
  walletOptions,
  serviceFiles,
  onUpload,
  onDelete,
}) {
  const [tempFiles, setTempFiles] = useState([]);

  // =========================
  // FILE UPLOAD HANDLER
  // =========================
  const handleFileChange = (files) => {
    const selectedChannel =
      channelOptions.find((opt) => opt.value === values.channel)?.label || "N/A";
    const selectedWallet =
      walletOptions.find((opt) => opt.value === values.wallet)?.label || "N/A";

    const newFiles = files.map((file) => {
      let transactionCount = 0;

      // Read CSV or Excel
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;

        if (/\.csv$/i.test(file.name)) {
          const lines = data.split(/\r\n|\n/);
          transactionCount = lines.length > 1 ? lines.length - 1 : 0; // exclude header
        } else if (/\.(xls|xlsx)$/i.test(file.name)) {
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          transactionCount = json.length > 1 ? json.length - 1 : 0; // exclude header
        }

        setTempFiles((prev) =>
          prev.map((f) =>
            f.id === tempFile.id ? { ...f, transactions: transactionCount } : f
          )
        );
      };

      const tempFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        file,
        channel: selectedChannel,
        wallet: selectedWallet,
        transactions: 0,
      };

      setTempFiles((prev) => [...prev, tempFile]);

      // Call parent upload
      onUpload(file, { channel: values.channel, wallet: values.wallet });

      if (/\.csv$/i.test(file.name)) reader.readAsText(file);
      else reader.readAsArrayBuffer(file);

      return tempFile;
    });
  };

  const handleDeleteTempFile = (id) => {
    setTempFiles((prev) => prev.filter((f) => f.id !== id));
    onDelete(id);
  };

  // =========================
  // RENDER
  // =========================
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        {/* HEADER */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Select Service Provider
        </Typography>

        {/* INPUTS + UPLOAD */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "flex-end" }}
        >
          <Box sx={{ flex: 1 }}>
            <SelectDropdownSingle
              name="channel"
              placeholder="Select Channel"
              fetchOptions={async () => channelOptions}
              height={42}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <SelectDropdownSingle
              name="wallet"
              placeholder="Select Wallet"
              fetchOptions={async () => walletOptions}
              height={42}
            />
          </Box>

          <Box sx={{ flexShrink: 0 }}>
            <UploadButton
              label="Upload Files"
              multiple
              onUpload={handleFileChange}
              color="#217346"
              hoverColor="#185C37"
            />
          </Box>
        </Stack>

        {/* TEMPORARY FILE TABLE */}
        {tempFiles.length > 0 && (
          <TableContainer
            component={Paper}
            sx={{
              mt: 4,
              border: "1px solid #e2e8f0",
              boxShadow: "none",
              overflowX: "auto",
            }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>File Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Channel</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Wallet</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Transactions</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tempFiles.map((file) => (
                  <TableRow key={file.id} hover>
                    <TableCell sx={{ wordBreak: "break-word" }}>{file.name}</TableCell>
                    <TableCell sx={{ wordBreak: "break-word" }}>{file.channel}</TableCell>
                    <TableCell sx={{ wordBreak: "break-word" }}>{file.wallet}</TableCell>
                    <TableCell sx={{ wordBreak: "break-word" }}>{file.transactions}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteTempFile(file.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}
