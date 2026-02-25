// src/features/upload/pages/UploadForm.jsx
import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Paper,
  Popper,
  Typography,
  ClickAwayListener,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { Formik } from "formik";
import { format } from "date-fns";

import ServiceUploadSection from "../components/ServiceUploadSection";
import OwnDatabaseUpload from "../components/OwnDatabaseUpload";
import CompareSection from "../components/CompareSection";
import DateRangePickerPopover from "../../../components/shared/DateRangePickerPopover";

export default function UploadForm() {
  const [serviceFiles, setServiceFiles] = useState([]);
  const [ownFiles, setOwnFiles] = useState([]);

  // ================= Date Range State =================
  const [pendingRange, setPendingRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [appliedRange, setAppliedRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const anchorRef = useRef(null);

  // ================= Static Options =================
  const channelOptions = [
    { value: "bKash Paybill", label: "bKash Paybill" },
    { value: "Nagad Paybill", label: "Nagad Paybill" },
  ];

  const billingPanelOption = [
    { value: "mq", label: "MQ" },
    { value: "maxim orbit", label: "Maxim Orbit" },
    { value: "maxim race", label: "Maxim Race" },
  ];

  const walletOptions = [
    { value: "Wallet 1", label: "Wallet 1" },
    { value: "Wallet 2", label: "Wallet 2" },
  ];

  const handleToggleDatePicker = () =>
    setDatePickerOpen((prev) => !prev);

  const handleApply = () => {
    setAppliedRange(pendingRange);
    setDatePickerOpen(false);
  };

  const handleReset = () => {
    setPendingRange({ startDate: null, endDate: null });
    setAppliedRange({ startDate: null, endDate: null });
  };

  const handleCompare = () => {
    console.log("Comparing", { serviceFiles, ownFiles });
    alert("Files compared successfully!");
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
        py: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Formik initialValues={{ date: null, channel: null, wallet: null }}>
        {({ values, setFieldValue }) => (
          <>
            {/* ================= Header + Date Picker ================= */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 3,
                bgcolor: "#ffffff",
                border: "1px solid #e2e8f0",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 0.5 }}
                >
                  <CachedIcon
                    fontSize="medium"
                    sx={{ mr: 2, color: "#8ac441" }}
                  />
                  Transaction Reconciler
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Upload service provider files by channel & wallet,
                  then compare against your internal database.
                </Typography>
              </Box>

              {/* Date Picker */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                  ref={anchorRef}
                  label="Report Date Range"
                  value={
                    appliedRange.startDate && appliedRange.endDate
                      ? `${format(
                          appliedRange.startDate,
                          "MMM d, yyyy"
                        )} - ${format(
                          appliedRange.endDate,
                          "MMM d, yyyy"
                        )}`
                      : ""
                  }
                  onClick={handleToggleDatePicker}
                  readOnly
                  size="small"
                  sx={{
                    width: 280,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <Popper
                  open={datePickerOpen}
                  anchorEl={anchorRef.current}
                  placement="bottom-start"
                  sx={{ zIndex: 1300 }}
                >
                  <ClickAwayListener
                    onClickAway={() => setDatePickerOpen(false)}
                  >
                    <Paper sx={{ p: 1, mt: 1, borderRadius: 2 }}>
                      <DateRangePickerPopover
                        value={pendingRange}
                        onChange={setPendingRange}
                        onApply={handleApply}
                        onReset={handleReset}
                      />
                    </Paper>
                  </ClickAwayListener>
                </Popper>
              </Box>
            </Paper>

            {/* ================= Upload Sections ================= */}
            <ServiceUploadSection
              values={values}
              setFieldValue={setFieldValue}
              channelOptions={channelOptions}
              walletOptions={walletOptions}
              appliedRange={appliedRange}
              onUpload={(file, val) =>
                setServiceFiles((prev) => [
                  ...prev,
                  { id: Date.now() + Math.random(), ...val, name: file.name },
                ])
              }
              onDelete={(id) =>
                setServiceFiles((prev) => prev.filter((f) => f.id !== id))
              }
            />

            <OwnDatabaseUpload
              values={values}
              setFieldValue={setFieldValue}
              billingPanelOption={billingPanelOption}
              walletOptions={walletOptions}
              appliedRange={appliedRange}
              onUpload={(file, val) =>
                setOwnFiles((prev) => [
                  ...prev,
                  { id: Date.now() + Math.random(), ...val, name: file.name },
                ])
              }
              onDelete={(id) =>
                setOwnFiles((prev) => prev.filter((f) => f.id !== id))
              }
            />

            <CompareSection
              disabled={serviceFiles.length === 0 || ownFiles.length === 0}
              onCompare={handleCompare}
            />
          </>
        )}
      </Formik>
    </Box>
  );
}