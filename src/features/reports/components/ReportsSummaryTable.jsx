import React, { useState, useMemo } from "react";
import { IconButton, Stack, Typography, Menu, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { VisibilityOutlined as ViewIcon, CachedOutlined as RefreshIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // For page redirect
import ReprocessReport from "./ReprocessReportDialog";
import BaseTable from "../../../components/shared/BaseTable";
import DateRangePickerPopover from "../../../components/shared/DateRangePickerPopover";

export default function ReportsSummaryTable({ data, onView }) {
  const navigate = useNavigate(); // For redirect

  // --- Filter menu anchor ---
  const [filterAnchor, setFilterAnchor] = useState(null);
  const filterOpen = Boolean(filterAnchor);

  // --- Pending & Applied Date Range ---
  const [pendingRange, setPendingRange] = useState({ startDate: null, endDate: null });
  const [appliedRange, setAppliedRange] = useState({ startDate: null, endDate: null });

  // --- Reprocess confirmation modal state ---
  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleApply = () => {
    setAppliedRange(pendingRange);
    setFilterAnchor(null);
  };

  const handleReset = () => {
    setPendingRange({ startDate: null, endDate: null });
    setAppliedRange({ startDate: null, endDate: null });
  };

  // --- Filter rows by applied date range ---
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      if (!appliedRange.startDate && !appliedRange.endDate) return true;
      const rowDate = new Date(row.date);
      if (appliedRange.startDate && rowDate < new Date(appliedRange.startDate)) return false;
      if (appliedRange.endDate && rowDate > new Date(appliedRange.endDate)) return false;
      return true;
    });
  }, [data, appliedRange]);

  // --- Map filtered data to BaseTable rows ---
  const rows = filteredData.map((row) => ({
    id: row.id,
    date: row.date,
    transactions: <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>{row.transactions}</Typography>,
    matched: <Typography sx={{ fontWeight: 600, color: "#10b981" }}>{row.matched}</Typography>,
    bkashPGW: row.mismatched.bkashPGW,
    bkashPaybill: row.mismatched.bkashPaybill,
    nagadPGW: row.mismatched.nagadPGW,
    nagadPaybill: row.mismatched.nagadPaybill,
    ownDB: <Typography sx={{ fontWeight: 700 }}>{row.mismatched.ownDB}</Typography>,
    total: <Typography sx={{ fontWeight: 600, color: "#ef4444" }}>{row.mismatched.total}</Typography>,
    actions: (
      <Stack direction="row" justifyContent="center" spacing={1}>
        <IconButton size="small" onClick={() => onView?.(row)}>
          <ViewIcon fontSize="small" sx={{ color: "#64748b" }} />
        </IconButton>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRow(row);
            setWorkflowOpen(true); // open confirmation modal
          }}
        >
          <RefreshIcon fontSize="small" sx={{ color: "#64748b" }} />
        </IconButton>
      </Stack>
    ),
  }));

  const columns = [
    { id: "date", label: "Date", sortable: true },
    { id: "transactions", label: "Transactions", sortable: true },
    { id: "matched", label: "Matched", sortable: true },
    {
      id: "mismatched_group",
      label: "Mismatched",
      align: "center",
      colSpan: 6,
      children: [
        { id: "bkashPGW", label: "bKash PGW" },
        { id: "bkashPaybill", label: "bKash Paybill" },
        { id: "nagadPGW", label: "Nagad PGW" },
        { id: "nagadPaybill", label: "Nagad Paybill" },
        { id: "ownDB", label: "Own DB" },
        { id: "total", label: "Total" },
      ],
    },
  ];

  return (
    <>
      {/* Date Range Picker Menu */}
      <Menu
        anchorEl={filterAnchor}
        open={filterOpen}
        onClose={() => setFilterAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { borderRadius: 2, overflow: "hidden", boxShadow: "0px 8px 24px rgba(0,0,0,0.10)", p: 0 } }}
      >
        <DateRangePickerPopover value={pendingRange} onChange={setPendingRange} onApply={handleApply} onReset={handleReset} />
      </Menu>

      <BaseTable
        title="Reports"
        columns={columns}
        rows={rows}
        hasAction={true}
        selectable={false}
        showExport={false}
        onFilter={(e) => setFilterAnchor(e.currentTarget)}
      />

      {/* Confirmation Dialog */}
   {workflowOpen && (
        <ReprocessReport
          open={workflowOpen}
          onClose={() => {
            setWorkflowOpen(false);
            setSelectedRow(null);
          }}
          reportDate={selectedRow?.date}
          reportId={selectedRow?.id}
        />
      )}
    </>
  );
}