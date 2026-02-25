// import React, { useMemo } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Typography,
//   Box,
//   Chip,
//   Stack,
//   Button,
//   Menu,
// } from "@mui/material";
// import { Close as CloseIcon, Check as CheckIcon, Close as CrossIcon } from "@mui/icons-material";
// import { Formik, Form } from "formik";

// import BaseTable from "../../../components/shared/BaseTable";
// import SelectDropdownSingle from "../../../components/shared/SelectDropdownSingle";

// const mockTransactions = Array(10)
//   .fill()
//   .map((_, index) => ({
//     id: index + 1,
//     transactionNumber: "DBI78EZH5N",
//     accountNumber: "8801960464133",
//     date: "2026-02-18",
//     amount: "600.00",
//     channel: index % 2 === 0 ? "bKash Paybill" : "Nagad Paybill",
//     wallet: index % 2 === 0 ? "0171XX" : "0176YY",
//     status: index % 3 === 0 ? "Issue" : "Amount Mismatch",
//     ownDb: false,
//     sp: true,
//   }));

// const columns = [
//   { id: "transactionNumber", label: "Transaction Number", sortable: true },
//   { id: "accountNumber", label: "Account Number", sortable: true },
//   { id: "date", label: "Date", sortable: true },
//   { id: "amount", label: "Amount", sortable: true },
//   { id: "channel", label: "Channel", sortable: true },
//   { id: "wallet", label: "Wallet", sortable: true },
//   { id: "status", label: "Status" },
//   { id: "ownDb", label: "Own DB" },
//   { id: "sp", label: "SP" },
// ];

// const EMPTY_FILTERS = {
//   channelFilter: "",
//   walletFilter: "",
//   statusFilter: "All Status",
// };

// export default function TransactionReportModal({ open, onClose }) {
//   const [filterAnchor, setFilterAnchor] = React.useState(null);
//   const filterOpen = Boolean(filterAnchor);

//   const [draftFilters, setDraftFilters] = React.useState(EMPTY_FILTERS);
//   const [appliedFilters, setAppliedFilters] = React.useState(EMPTY_FILTERS);

//   const handleOpenFilter = (e) => {
//     setDraftFilters(appliedFilters);
//     setFilterAnchor(e.currentTarget);
//   };

//   const handleCloseFilter = () => setFilterAnchor(null);

//   const handleApplyFilters = (values) => {
//     setAppliedFilters(values);
//     handleCloseFilter();
//     // fetchTransactions(values); // 👈 trigger backend API here
//   };

//   const walletOptions = useMemo(() => {
//     if (
//       draftFilters.channelFilter === "bKash Paybill" ||
//       draftFilters.channelFilter === "bKash Payment Gateway"
//     ) {
//       return [
//         { id: "0171XX", label: "0171XX" },
//         { id: "0130XX", label: "0130XX" },
//         { id: "0181XX", label: "0181XX" },
//         { id: "0194XX", label: "0194XX" },
//       ];
//     }
//     if (
//       draftFilters.channelFilter === "Nagad Paybill" ||
//       draftFilters.channelFilter === "Nagad Payment Gateway"
//     ) {
//       return [
//         { id: "0176YY", label: "0176YY" },
//         { id: "0131YY", label: "0131YY" },
//         { id: "0182YY", label: "0182YY" },
//         { id: "0140YY", label: "0140YY" },
//       ];
//     }
//     return [];
//   }, [draftFilters.channelFilter]);

//   const formattedRows = useMemo(
//     () =>
//       mockTransactions.map((row) => ({
//         ...row,
//         status: (
//           <Chip
//             label={row.status}
//             size="small"
//             sx={{ bgcolor: "#fed7d7", color: "#c53030", fontWeight: 700, borderRadius: 1.5 }}
//           />
//         ),
//         ownDb: row.ownDb ? (
//           <CheckIcon fontSize="small" color="success" />
//         ) : (
//           <CrossIcon fontSize="small" sx={{ color: "#e53e3e" }} />
//         ),
//         sp: row.sp ? (
//           <CheckIcon fontSize="small" sx={{ color: "#38a169" }} />
//         ) : (
//           <CrossIcon fontSize="small" color="error" />
//         ),
//       })),
//     []
//   );

//   const filteredRows = useMemo(
//     () =>
//       formattedRows.filter((row) => {
//         const channelMatch = appliedFilters.channelFilter
//           ? row.channel === appliedFilters.channelFilter
//           : true;
//         const walletMatch = appliedFilters.walletFilter
//           ? row.wallet === appliedFilters.walletFilter
//           : true;
//         const statusMatch =
//           appliedFilters.statusFilter !== "All Status"
//             ? row.status.props.label === appliedFilters.statusFilter
//             : true;
//         return channelMatch && walletMatch && statusMatch;
//       }),
//     [formattedRows, appliedFilters]
//   );

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="xl"
//       fullWidth
//       PaperProps={{ sx: { borderRadius: 3, height: "90vh" } }}
//     >
//       {/* ✅ FIX 1: component="span" prevents h2 > h6 nesting */}
//       <DialogTitle
//         sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
//       >
//         <Typography component="span" variant="h6" sx={{ fontWeight: 700 }}>
//           Transaction Report
//         </Typography>
//         <IconButton onClick={onClose} size="small">
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
//         {/* ✅ FIX 2: Formik wraps the Menu so SelectDropdownSingle has context.
//             Formik values mirror draftFilters via initialValues + enableReinitialize.
//             onSubmit commits the values to appliedFilters. */}
//         <Formik
//           initialValues={draftFilters}
//           enableReinitialize // re-syncs when draftFilters updates (menu open)
//           onSubmit={(values) => handleApplyFilters(values)}
//         >
//           {({ values, setFieldValue, handleSubmit, resetForm }) => (
//             <Form>
//               <Menu
//                 anchorEl={filterAnchor}
//                 open={filterOpen}
//                 onClose={handleCloseFilter}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 transformOrigin={{ vertical: "top", horizontal: "right" }}
//                 PaperProps={{ sx: { p: 2, width: 300, borderRadius: 2 } }}
//               >
//                 <Stack spacing={2}>
//                   <SelectDropdownSingle
//                     name="channelFilter"
//                     placeholder="Select Channel"
//                     fetchOptions={async () => [
//                       { id: "bKash Paybill", label: "bKash Paybill" },
//                       { id: "bKash Payment Gateway", label: "bKash Payment Gateway" },
//                       { id: "Nagad Paybill", label: "Nagad Paybill" },
//                       { id: "Nagad Payment Gateway", label: "Nagad Payment Gateway" },
//                     ]}
//                     sx={{ width: "100%" }}
//                     onChange={(val) => {
//                       setFieldValue("channelFilter", val);
//                       setFieldValue("walletFilter", "");
//                       // Keep draftFilters in sync so walletOptions recomputes
//                       setDraftFilters((prev) => ({
//                         ...prev,
//                         channelFilter: val,
//                         walletFilter: "",
//                       }));
//                     }}
//                     value={values.channelFilter}
//                   />

//                  <SelectDropdownSingle
//                       key={values.channelFilter} // ✅ forces remount when channel changes, triggering fresh fetch
//                       name="walletFilter"
//                       placeholder="Select Wallet"
//                       fetchOptions={async () => walletOptions}
//                       sx={{ width: "100%" }}
//                       disabled={!values.channelFilter}
//                       onChange={(val) => setFieldValue("walletFilter", val)}
//                       value={values.walletFilter}
//                     />
//                      <SelectDropdownSingle
//                     name="statusFilter"
//                     placeholder="Select Status"
//                     fetchOptions={async () => [
//                       { id: "All Status", label: "All Status" },
//                       { id: "Issue", label: "Issue" },
//                       { id: "Amount Mismatch", label: "Amount Mismatch" },
//                     ]}
//                     sx={{ width: "100%" }}
//                     onChange={(val) => setFieldValue("statusFilter", val)}
//                     value={values.statusFilter}
//                   />

//                   <Stack direction="row" spacing={1}>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       fullWidth
//                       onClick={() => {
//                         resetForm({ values: EMPTY_FILTERS });
//                         setDraftFilters(EMPTY_FILTERS);
//                       }}
//                     >
//                       Reset
//                     </Button>
//                     <Button
//                       variant="contained"
//                       size="small"
//                       fullWidth
//                       onClick={handleSubmit}
//                     >
//                       Apply
//                     </Button>
//                   </Stack>
//                 </Stack>
//               </Menu>

//               <Box sx={{ flexGrow: 1, px: 2 }}>
//                 <BaseTable
//                   title=""
//                   columns={columns}
//                   rows={filteredRows}
//                   selectable={false}
//                   hasAction={false}
//                   onFilter={handleOpenFilter}
//                 />
//               </Box>
//             </Form>
//           )}
//         </Formik>
//       </DialogContent>
//     </Dialog>
//   );
// }



// src/features/reconciliation/pages/TransactionReportModal.jsx
import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Menu,
} from "@mui/material";
import { Close as CloseIcon, Check as CheckIcon, Close as CrossIcon } from "@mui/icons-material";
import { Formik, Form } from "formik";

import BaseTable from "../../../components/shared/BaseTable";
import SelectDropdownSingle from "../../../components/shared/SelectDropdownSingle";

// =================== MOCK DATA ===================
const mockTransactions = Array(10)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    transactionNumber: "DBI78EZH5N",
    accountNumber: "8801960464133",
    date: "2026-02-18",
    amount: "600.00",
    channel: index % 2 === 0 ? "bKash Paybill" : "Nagad Paybill",
    wallet: index % 2 === 0 ? "0171XX" : "0176YY",
    status: index % 3 === 0 ? "Issue" : "Amount Mismatch",
    ownDb: false,
    sp: true,
  }));

const columns = [
  { id: "transactionNumber", label: "Transaction Number", sortable: true },
  { id: "accountNumber", label: "Account Number", sortable: true },
  { id: "date", label: "Date", sortable: true },
  { id: "amount", label: "Amount", sortable: true },
  { id: "channel", label: "Channel", sortable: true },
  { id: "wallet", label: "Wallet", sortable: true },
  { id: "status", label: "Status" },
  { id: "ownDb", label: "Own DB" },
  { id: "sp", label: "SP" },
];

const EMPTY_FILTERS = {
  channelFilter: "",
  walletFilter: "",
  statusFilter: "All Status",
};

// =================== COMPONENT ===================
export default function TransactionReportModal({ open, onClose }) {
  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const filterOpen = Boolean(filterAnchor);

  const [draftFilters, setDraftFilters] = React.useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = React.useState(EMPTY_FILTERS);

  const handleOpenFilter = (e) => {
    setDraftFilters(appliedFilters); // sync Formik values with last applied filters
    setFilterAnchor(e.currentTarget);
  };

  const handleCloseFilter = () => setFilterAnchor(null);

  const handleApplyFilters = (values) => {
    setAppliedFilters(values); // commit filters to table
    handleCloseFilter();
    console.log("Filters applied:", values);
    // TODO: fetchTransactions(values) for backend
  };

  // =================== FORMATTED ROWS ===================
  const formattedRows = useMemo(
    () =>
      mockTransactions.map((row) => ({
        ...row,
        status: (
          <Chip
            label={row.status}
            size="small"
            sx={{ bgcolor: "#fed7d7", color: "#c53030", fontWeight: 700, borderRadius: 1.5 }}
          />
        ),
        ownDb: row.ownDb ? <CheckIcon fontSize="small" color="success" /> : <CrossIcon fontSize="small" sx={{ color: "#e53e3e" }} />,
        sp: row.sp ? <CheckIcon fontSize="small" sx={{ color: "#38a169" }} /> : <CrossIcon fontSize="small" color="error" />,
      })),
    []
  );

  // =================== FILTERED ROWS ===================
  const filteredRows = useMemo(
    () =>
      formattedRows.filter((row) => {
        const channelMatch = appliedFilters.channelFilter
          ? row.channel === appliedFilters.channelFilter
          : true;
        const walletMatch = appliedFilters.walletFilter
          ? row.wallet === appliedFilters.walletFilter
          : true;
        const statusMatch =
          appliedFilters.statusFilter !== "All Status"
            ? row.status.props.label === appliedFilters.statusFilter
            : true;
        return channelMatch && walletMatch && statusMatch;
      }),
    [formattedRows, appliedFilters]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, height: "90vh" } }}
    >
      <DialogTitle sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography component="span" variant="h6" sx={{ fontWeight: 700 }}>
          Compared Reports
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
        <Formik initialValues={draftFilters} enableReinitialize onSubmit={handleApplyFilters}>
          {({ values, setFieldValue, handleSubmit, resetForm }) => (
            <Form>
              {/* =================== FILTER MENU =================== */}
              <Menu
                anchorEl={filterAnchor}
                open={filterOpen}
                onClose={handleCloseFilter}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ sx: { p: 2, width: 300, borderRadius: 2 } }}
              >
                <Stack spacing={2}>
                  {/* Channel Dropdown */}
                  <SelectDropdownSingle
                    name="channelFilter"
                    placeholder="Select Channel"
                    fetchOptions={async () => [
                      { id: "bKash Paybill", label: "bKash Paybill" },
                      { id: "bKash Payment Gateway", label: "bKash Payment Gateway" },
                      { id: "Nagad Paybill", label: "Nagad Paybill" },
                      { id: "Nagad Payment Gateway", label: "Nagad Payment Gateway" },
                    ]}
                    sx={{ width: "100%" }}
                    value={values.channelFilter}
                  />

                  {/* Wallet Dropdown */}
                  <SelectDropdownSingle
                    key={values.channelFilter} // remount when channel changes
                    name="walletFilter"
                    placeholder="Select Wallet"
                    fetchOptions={async () => {
                      if (
                        values.channelFilter === "bKash Paybill" ||
                        values.channelFilter === "bKash Payment Gateway"
                      ) {
                        return [
                          { id: "0171XX", label: "0171XX" },
                          { id: "0130XX", label: "0130XX" },
                          { id: "0181XX", label: "0181XX" },
                          { id: "0194XX", label: "0194XX" },
                        ];
                      }
                      if (
                        values.channelFilter === "Nagad Paybill" ||
                        values.channelFilter === "Nagad Payment Gateway"
                      ) {
                        return [
                          { id: "0176YY", label: "0176YY" },
                          { id: "0131YY", label: "0131YY" },
                          { id: "0182YY", label: "0182YY" },
                          { id: "0140YY", label: "0140YY" },
                        ];
                      }
                      return [];
                    }}
                    sx={{ width: "100%" }}
                    disabled={!values.channelFilter}
                    value={values.walletFilter}
                  />

                  {/* Status Dropdown */}
                  <SelectDropdownSingle
                    name="statusFilter"
                    placeholder="Select Status"
                    fetchOptions={async () => [
                      { id: "All Status", label: "All Status" },
                      { id: "Issue", label: "Issue" },
                      { id: "Amount Mismatch", label: "Amount Mismatch" },
                    ]}
                    sx={{ width: "100%" }}
                    value={values.statusFilter}
                  />

                  {/* Reset / Apply Buttons */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={() => {
                        resetForm({ values: EMPTY_FILTERS });
                        setDraftFilters(EMPTY_FILTERS);
                      }}
                    >
                      Reset
                    </Button>
                    <Button variant="contained" size="small" fullWidth onClick={handleSubmit}>
                      Apply
                    </Button>
                  </Stack>
                </Stack>
              </Menu>

              {/* =================== TABLE =================== */}
              <Box sx={{ flexGrow: 1, px: 2 }}>
                <BaseTable
                  title=""
                  columns={columns}
                  rows={filteredRows}
                  selectable={false}
                  hasAction={false}
                  onFilter={handleOpenFilter}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}