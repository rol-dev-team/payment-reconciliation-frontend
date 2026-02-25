import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { Formik, Form } from "formik";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Description as FileIcon,
} from "@mui/icons-material";
import SelectDropdownSingle from "../../../components/shared/SelectDropdownSingle";

const ReprocessReport = ({ open, onClose, reportDate = "2026-02-18" }) => {
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const [spFiles, setSpFiles] = useState([]);
  const [dbFiles, setDbFiles] = useState([]);

  const fileInputRef = useRef(null);
  const dbInputRef = useRef(null);

  const fetchChannels = async () => [
    { id: "bKash Paybill", label: "bKash Paybill" },
    { id: "bKash Payment Gateway", label: "bKash Payment Gateway" },
  ];

  const fetchWallets = async () => [
    { id: "Wallet 3", label: "Wallet 3" },
    { id: "Wallet 4", label: "Wallet 4" },
  ];

  const fetchDatabases = async () => [
    { id: "Transaction_DB", label: "Transaction_DB" },
  ];

  const handleFileChange = (event, category, values) => {
    const files = Array.from(event.target.files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      fileName: file.name,
      channel: category === "db" ? "Internal DB" : values.channel || "N/A",
      wallet: category === "db" ? "N/A" : values.wallet || "N/A",
      rawFile: file,
    }));

    if (category === "sp") setSpFiles((prev) => [...prev, ...files]);
    else setDbFiles((prev) => [...prev, ...files]);

    event.target.value = null;
  };

  const removeFile = (id, category) => {
    if (category === "sp")
      setSpFiles((prev) => prev.filter((f) => f.id !== id));
    else setDbFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const TempTable = ({ files, category }) => (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ mt: 2, maxHeight: 180, borderRadius: 2 }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>File</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Channel</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Wallet</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FileIcon fontSize="small" color="action" />
                  <Typography variant="body2">{file.fileName}</Typography>
                </Box>
              </TableCell>
              <TableCell>{file.channel}</TableCell>
              <TableCell>{file.wallet}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removeFile(file.id, category)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={step === 1 ? "xs" : "md"}
      fullWidth
    >
      <Formik
        initialValues={{ channel: "", wallet: "", database: "" }}
        onSubmit={(values) => {
          console.log("Submitting:", { spFiles, dbFiles, values });
          onClose();
        }}
      >
        {({ values }) => (
          <Form>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 1,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                {step === 1 ? "Reprocess Data" : "Reprocess Report"}
              </Typography>
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              {step === 1 ? (
                <Typography color="text.secondary">
                  Are you sure you want to reprocess this report? The existing
                  data will be moved to history.
                </Typography>
              ) : (
                <>
                  <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    variant="fullWidth"
                    sx={{
                      mb: 3,
                      borderBottom: 1,
                      borderColor: "divider",
                      "& .MuiTab-root": {
                        textTransform: "none",
                        fontWeight: 600,
                      },
                    }}
                  >
                    <Tab label="Entire Data" />
                    <Tab label="Specific Channel" />
                  </Tabs>

                  {activeTab === 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color="text.secondary"
                      >
                        Report Date
                      </Typography>
                      <TextField
                        value={reportDate}
                        disabled
                        fullWidth
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    multiple
                    accept=".csv,.xlsx"
                    onChange={(e) => handleFileChange(e, "sp", values)}
                  />

                  <input
                    type="file"
                    ref={dbInputRef}
                    hidden
                    accept=".csv,.xlsx"
                    onChange={(e) => handleFileChange(e, "db", values)}
                  />

                  {/* Service Provider Section */}
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      mb: 3,
                      borderRadius: 3,
                      borderColor: "grey.300",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      Service Provider Files
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <SelectDropdownSingle
                          name="channel"
                          placeholder="Channel"
                          fetchOptions={fetchChannels}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <SelectDropdownSingle
                          name="wallet"
                          placeholder="Wallet"
                          fetchOptions={fetchWallets}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Button
                          variant="outlined"
                          startIcon={<UploadIcon />}
                          onClick={() => fileInputRef.current.click()}
                          sx={{
                            height: 45,
                            borderRadius: 2,
                          }}
                        >
                          Upload File
                        </Button>
                      </Grid>
                    </Grid>

                    {spFiles.length > 0 && (
                      <TempTable files={spFiles} category="sp" />
                    )}
                  </Paper>

                  {/* Own Database */}
                  {activeTab === 0 && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        borderColor: "grey.300",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 2, fontWeight: 600 }}
                      >
                        Own Database
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <SelectDropdownSingle
                            name="database"
                            placeholder="Select Database"
                            fetchOptions={fetchDatabases}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<UploadIcon />}
                            onClick={() => dbInputRef.current.click()}
                            sx={{
                              height: 45,
                              borderRadius: 2,
                            }}
                          >
                            Upload File
                          </Button>
                        </Grid>
                      </Grid>

                      {dbFiles.length > 0 && (
                        <TempTable files={dbFiles} category="db" />
                      )}
                    </Paper>
                  )}
                </>
              )}
            </DialogContent>

            <DialogActions sx={{ p: 2.5 }}>
              <Button
                onClick={onClose}
                variant="outlined"
                color="inherit"
                sx={{ borderRadius: 2 }}
              >
                Cancel
              </Button>

              {step === 1 ? (
                <Button
                  onClick={() => setStep(2)}
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                >
                  Yes, Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                  disabled={spFiles.length === 0 && dbFiles.length === 0}
                >
                  Reprocess
                </Button>
              )}
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ReprocessReport;