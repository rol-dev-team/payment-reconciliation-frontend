import ReportsSummaryTable from "../components/ReportsSummaryTable";
import { useState } from "react";
import { Box } from "@mui/material";
import TransactionReportModal from "../components/TransactionReportModal";
import ReprocessModal from "../../../components/reports/ReprocessModal";

const reportData = [
  {
    id: 1,
    date: "2026-02-18",
    transactions: 4614,
    matched: 586,
    mismatched: {
      bkashPGW: 0,
      bkashPaybill: 0,
      nagadPGW: 0,
      nagadPaybill: 0,
      ownDB: 130,
      total: 4028,
    },
  },
];

export default function ReportsPage() {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reprocessModalOpen, setReprocessModalOpen] = useState(false);

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', py: 4, px: { xs: 2, sm: 3 } }}>
      {/* ... FILTERS FORMIK CODE ... */}

      <ReportsSummaryTable
        data={reportData}
        onView={() => setReportModalOpen(true)}
        onReprocess={() => setReprocessModalOpen(true)}
      />

      <TransactionReportModal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <ReprocessModal
        open={reprocessModalOpen}
        onClose={() => setReprocessModalOpen(false)}
      />
    </Box>
  );
}