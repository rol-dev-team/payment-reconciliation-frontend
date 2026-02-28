// src/features/upload/pages/UploadForm.jsx
import React, { useState, useRef } from "react";
import {
  Box, TextField, Paper, Popper, Typography, ClickAwayListener,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { Formik } from "formik";
import { format } from "date-fns";

import ServiceUploadSection from "../components/ServiceUploadSection";
import OwnDatabaseUpload from "../components/OwnDatabaseUpload";
import CompareSection from "../components/CompareSection";
import DateRangePickerPopover from "../../../components/shared/DateRangePickerPopover";
import { submitReconciliation } from "../api/uploadApi";

export default function UploadForm() {
  const [serviceFiles, setServiceFiles] = useState([]);  // { id, file, channelId, walletId }
  const [ownFiles, setOwnFiles] = useState([]);           // { id, file, billingSystemId }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [pendingRange, setPendingRange] = useState({ startDate: null, endDate: null });
  const [appliedRange, setAppliedRange] = useState({ startDate: null, endDate: null });
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggleDatePicker = () => setDatePickerOpen((prev) => !prev);

  const handleApply = () => {
    setAppliedRange(pendingRange);
    setDatePickerOpen(false);
  };

  const handleReset = () => {
    setPendingRange({ startDate: null, endDate: null });
    setAppliedRange({ startDate: null, endDate: null });
  };

  const handleCompare = async () => {
    try {
      setIsSubmitting(true);
      const result = await submitReconciliation(serviceFiles, ownFiles, appliedRange);
      console.log("Reconciliation result:", result);
      alert("Files submitted successfully!");
    } catch (err) {
      console.error("Reconciliation failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", py: 4, px: { xs: 2, sm: 3 } }}>
      <Formik initialValues={{ channel: null, wallet: null, billingSystem: null }}>
        {({ values }) => (
          <>
            {/* Header + Date Picker */}
            <Paper
              variant="outlined"
              sx={{ p: 2, mb: 3, borderRadius: 3, bgcolor: "#ffffff", border: "1px solid #e2e8f0" }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  <CachedIcon fontSize="medium" sx={{ mr: 2, color: "#8ac441" }} />
                  Transaction Reconciler
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload service provider files by channel & wallet,
                  then compare against your internal database.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                  ref={anchorRef}
                  label="Report Date Range"
                  value={
                    appliedRange.startDate && appliedRange.endDate
                      ? `${format(appliedRange.startDate, "MMM d, yyyy")} - ${format(appliedRange.endDate, "MMM d, yyyy")}`
                      : ""
                  }
                  onClick={handleToggleDatePicker}
                  readOnly
                  size="small"
                  sx={{ width: 280, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <Popper open={datePickerOpen} anchorEl={anchorRef.current} placement="bottom-start" sx={{ zIndex: 1300 }}>
                  <ClickAwayListener onClickAway={() => setDatePickerOpen(false)}>
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

            {/* Upload Sections */}
            <ServiceUploadSection
              values={values}
              onUpload={(file, meta, id) =>   // ✅ receive id from child
                setServiceFiles((prev) => [
                  ...prev,
                  {
                    id,                        // ✅ use child's id so onDelete can find it
                    file,
                    channelId: meta.channel,
                    walletId: meta.wallet,
                  },
                ])
              }
              onDelete={(id) => setServiceFiles((prev) => prev.filter((f) => f.id !== id))}
            />

          <OwnDatabaseUpload
            values={values}
            onUpload={(file, meta, id) =>   // ✅ receive id from child
              setOwnFiles((prev) => [
                ...prev,
                {
                  id,                        // ✅ use child's id so onDelete can find it
                  file,
                  billingSystemId: meta.billingSystemId,
                },
              ])
            }
            onDelete={(id) => setOwnFiles((prev) => prev.filter((f) => f.id !== id))}
          />

            <CompareSection
              disabled={serviceFiles.length === 0 || ownFiles.length === 0 || isSubmitting}
              onCompare={handleCompare}
            />
          </>
        )}
      </Formik>
    </Box>
  );
}