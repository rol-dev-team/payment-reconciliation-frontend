// // src/components/shared/upload/ServiceUploadSection.jsx
// import React from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Stack,
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import UploadIcon from '@mui/icons-material/FileUploadOutlined';
// import DeleteIcon from '@mui/icons-material/DeleteOutline';

// import SelectDropdownSingle from '../SelectDropdownSingle';
// import DatePickerField from '../DatePickerField';

// /**
//  * ServiceUploadSection Component
//  * Handles the selection of Channel, Wallet, and Date, and allows file uploads (Excel/CSV).
//  */
// export default function ServiceUploadSection({
//   values,
//   channelOptions,
//   walletOptions,
//   serviceFiles,
//   onUpload,
//   onDelete
// }) {
//   return (
//     <Card variant="outlined" sx={{ mb: 3 }}>
//       <CardContent sx={{ p: 4 }}>
//         <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
//           Service Provider Files
//         </Typography>

//         {/* Main control row: Uses alignItems="flex-end" to ensure the button 
//             lines up with the input fields instead of the floating labels.
//         */}
//         <Stack direction="row" spacing={2} alignItems="flex-end">
          
//           {/* Channel Dropdown Selection */}
//           <Box sx={{ flex: 1 }}>
//             <SelectDropdownSingle
//               name="channel"
//               placeholder="Select Channel"
//               fetchOptions={async () => channelOptions}
//               height={42} // Matching the button height
//             />
//           </Box>

//           {/* Wallet Dropdown Selection */}
//           <Box sx={{ flex: 1 }}>
//             <SelectDropdownSingle
//               name="wallet"
//               placeholder="Select Wallet"
//               fetchOptions={async () => walletOptions}
//               height={42} // Matching the button height
//             />
//           </Box>

//           {/* Date Picker Selection */}
//           <Box sx={{ flex: 1 }}>
//             <DatePickerField name="date" label="Select Date" />
//           </Box>

//           {/* Upload Button: Styled with Excel Green and customized 
//               to match the height of sibling input components.
//           */}
//           <Button
//             component="label"
//             variant="contained"
//             startIcon={<UploadIcon />}
//             disabled={!values.date || !values.channel || !values.wallet}
//             sx={{
//                 backgroundColor: '#217346', // Official Excel Green
//                 '&:hover': {
//                 backgroundColor: '#185C37', // Darker Excel Green
//                 },
//                 '&.Mui-disabled': {
//                 backgroundColor: '#A7D7C5',
//                 color: '#ffffff',
//                 opacity: 0.9,
//                 },
//                 height: '42px',
//                 flex: 0.5,
//                 minWidth: '140px',
//                 textTransform: 'none',
//                 borderRadius: '8px',
//                 fontSize: '0.9rem',
//                 fontWeight: 600,
//                 boxShadow: 'none',
//             }}
//             >
//             Excel/CSV
//             <input
//                 hidden
//                 type="file"
//                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                 onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                     onUpload(file, values);
//                 }

//                 // Reset input so same file can be selected again
//                 e.target.value = '';
//                 }}
//             />
//           </Button>
//         </Stack>

//         {/* File List Table: Displayed only when files are available */}
//         {serviceFiles.length > 0 && (
//           <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 'none', border: '1px solid #e2e8f0' }}>
//             <Table size="small">
//               <TableHead sx={{ bgcolor: '#f8fafc' }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 600 }}>File Name</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Channel</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Wallet</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Transactions</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {serviceFiles.map((file) => (
//                   <TableRow key={file.id} hover>
//                     <TableCell>{file.name}</TableCell>
//                     <TableCell>{file.channel}</TableCell>
//                     <TableCell>{file.wallet}</TableCell>
//                     <TableCell>{file.date}</TableCell>
//                     <TableCell>{file.transactions}</TableCell>
//                     <TableCell align="right">
//                       <IconButton
//                         size="small"
//                         color="error"
//                         onClick={() => onDelete(file.id)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


// // src/components/shared/upload/ServiceUploadSection.jsx
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Stack,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/DeleteOutline';
// import { format } from 'date-fns';
// import SelectDropdownSingle from '../../../components/shared/SelectDropdownSingle';
// import DatePickerField from '../../../components/shared/DatePickerField';
// import UploadButton from '../../../components/shared/UploadButton';
// import DateRangePickerPopover from "../components/shared/DateRangePickerPopover";

// export default function ServiceUploadSection({
//   values,
//   channelOptions,
//   walletOptions,
//   serviceFiles,
//   onUpload,
//   onDelete
// }) {
//   // Temporary local state for multiple files
//   const [tempFiles, setTempFiles] = useState([]);
//   const [filterAnchor, setFilterAnchor] = useState(null);
//   const [filterOpen, setFilterOpen] = useState(false);

//   const handleApply = () => {
//     setAppliedRange(pendingRange);
//     setFilterAnchor(null);
//   };

//   const handleReset = () => {
//     setPendingRange({ startDate: null, endDate: null });
//     setAppliedRange({ startDate: null, endDate: null });
//   };

//   // ✅ Handle uploaded files
//   const handleFileChange = (files) => {
//     // 1. Find labels for selected IDs to display in the table
//     const selectedChannel = channelOptions.find(opt => opt.value === values.channel)?.label || 'N/A';
//     const selectedWallet = walletOptions.find(opt => opt.value === values.wallet)?.label || 'N/A';

//     // 2. Format the date safely using date-fns
//     const formattedDate = values.date ? format(new Date(values.date), 'yyyy-MM-dd') : 'No Date';

//     const newFiles = files.map(file => ({
//       id: Date.now() + Math.random(),
//       name: file.name,
//       file,
//       channel: selectedChannel,
//       wallet: selectedWallet,
//       date: formattedDate,
//       transactions: Math.floor(Math.random() * 1000),
//     }));

//     setTempFiles(prev => [...prev, ...newFiles]);

//     // Notify parent component for each file
//     newFiles.forEach(f => {
//       onUpload(f.file, { 
//         channel: values.channel, 
//         wallet: values.wallet, 
//         date: formattedDate 
//       });
//     });
//   };

//   // Delete from temp table
//   const handleDeleteTempFile = (id) => {
//     setTempFiles(prev => prev.filter(f => f.id !== id));
//     onDelete(id); // delete from parent if needed
//   };

//   return (
//     <Card variant="outlined" sx={{ mb: 3 }}>
//       <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
//         <Box
//           sx={{
//             mb: 2,
//             display: 'flex',
//             alignItems: 'center',
//             gap: 2,
//             width: '100%',
//           }}
//         >
//           <Typography
//             variant="subtitle1"
//             sx={{ fontWeight: 700 }}
//           >
//             Select Service Provider
//           </Typography>

//           <Menu
//             anchorEl={filterAnchor}
//             open={filterOpen}
//             onClose={() => setFilterAnchor(null)}
//             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//             transformOrigin={{ vertical: "top", horizontal: "right" }}
//             PaperProps={{ sx: { borderRadius: 2, overflow: "hidden", boxShadow: "0px 8px 24px rgba(0,0,0,0.10)", p: 0 } }}
//             sx={{ width: 200 }}
//           >
//             <DateRangePickerPopover value={pendingRange} onChange={setPendingRange} onApply={handleApply} onReset={handleReset} />
//           </Menu>

//           {/* <DatePickerField
//             name="date"
//             label="Select Date"
//             sx={{ width: 200 }}   // adjust width if needed
//           /> */}
//         </Box>

//         {/* RESPONSIVE INPUTS + UPLOAD */}
//         <Stack 
//           direction={{ xs: 'column', sm: 'row' }} 
//           spacing={2} 
//           alignItems="flex-end"
//         >
//           <Box sx={{ flex: 1, width: '100%' }}>
//             <SelectDropdownSingle
//               name="channel"
//               placeholder="Select Channel"
//               fetchOptions={async () => channelOptions}
//               height={42}
//             />
//           </Box>

//           <Box sx={{ flex: 1, width: '100%' }}>
//             <SelectDropdownSingle
//               name="wallet"
//               placeholder="Select Wallet"
//               fetchOptions={async () => walletOptions}
//               height={42}
//             />
//           </Box>

//           {/* <Box sx={{ flex: 1, width: '100%' }}>
//             <DatePickerField name="date" label="Select Date" />
//           </Box> */}

//           {/* ✅ Reusable UploadButton */}
//           <UploadButton
//             label="Upload Files"
//             multiple
//             onUpload={(files) => handleFileChange(files)}
//             color="#217346"
//             hoverColor="#185C37"
//           />
//         </Stack>

//         {/* TEMPORARY FILE TABLE */}
//         {tempFiles.length > 0 && (
//           <TableContainer
//             component={Paper}
//             sx={{ mt: 4, border: '1px solid #e2e8f0', boxShadow: 'none', overflowX: 'auto' }}
//           >
//             <Table size="small">
//               <TableHead sx={{ bgcolor: '#f8fafc' }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 600 }}>File Name</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Channel</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Wallet</TableCell>
//                   {/* <TableCell sx={{ fontWeight: 600 }}>Date</TableCell> */}
//                   {/* <TableCell sx={{ fontWeight: 600 }}>Transactions</TableCell> */}
//                   <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tempFiles.map(file => (
//                   <TableRow key={file.id} hover>
//                     <TableCell>{file.name}</TableCell>
//                     <TableCell>{file.channel}</TableCell>
//                     <TableCell>{file.wallet}</TableCell>
//                     {/* <TableCell>{file.date}</TableCell> */}
//                     {/* <TableCell>{file.transactions}</TableCell> */}
//                     <TableCell align="right">
//                       <IconButton color="error" size="small" onClick={() => handleDeleteTempFile(file.id)}>
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </CardContent>
//     </Card>
//   );
// }




// // src/components/shared/upload/ServiceUploadSection.jsx
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Stack,
//   Box,
//   IconButton,
//   Paper,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/DeleteOutline';
// import SelectDropdownSingle from '../SelectDropdownSingle';
// import DatePickerField from '../DatePickerField';
// import UploadButton from '../UploadButton';
// import { format } from 'date-fns';

// export default function ServiceUploadSection({
//   values,
//   channelOptions,
//   walletOptions,
//   onUpload,
//   onDelete
// }) {
//   const [filesList, setFilesList] = useState([]);

//   const handleFilesChange = (files) => {
//     const selectedChannel = channelOptions.find(opt => opt.value === values.channel)?.label || 'N/A';
//     const selectedWallet = walletOptions.find(opt => opt.value === values.wallet)?.label || 'N/A';
//     const formattedDate = values.date ? format(new Date(values.date), 'yyyy-MM-dd') : 'No Date';

//     const newFiles = files.map(file => ({
//       id: Date.now() + Math.random(),
//       name: file.name,
//       size: file.size,
//       file,
//       channel: selectedChannel,
//       wallet: selectedWallet,
//       date: formattedDate,
//     }));

//     setFilesList(prev => [...prev, ...newFiles]);
//     newFiles.forEach(f => onUpload(f.file, { channel: values.channel, wallet: values.wallet, date: formattedDate }));
//   };

//   const handleDelete = (id) => {
//     setFilesList(prev => prev.filter(f => f.id !== id));
//     onDelete(id);
//   };

//   return (
//     <Card variant="outlined" sx={{ mb: 4, borderRadius: 3, borderStyle: 'dashed' }}>
//       <CardContent sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
//         <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
//           Upload Service Files
//         </Typography>

//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           spacing={2}
//           alignItems={{ xs: 'stretch', sm: 'flex-end' }}
//           mb={3}
//         >
//           <Box sx={{ flex: 1 }}>
//             <SelectDropdownSingle
//               name="channel"
//               placeholder="Select Service Provider"
//               fetchOptions={async () => channelOptions}
//               height={42}
//             />
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             <SelectDropdownSingle
//               name="wallet"
//               placeholder="Select Wallet"
//               fetchOptions={async () => walletOptions}
//               height={42}
//             />
//           </Box>

//           <Box sx={{ width: { xs: '100%', sm: 180 } }}>
//             <DatePickerField name="date" placeholder="Select Date" height={42} />
//           </Box>

//           <UploadButton
//             label="Upload Files"
//             multiple
//             onUpload={handleFilesChange}
//             color="#217346"
//             hoverColor="#185C37"
//             minWidth={160}
//           />
//         </Stack>

//         {/* Selected Files */}
//         {filesList.length > 0 && (
//           <Stack spacing={2}>
//             {filesList.map(file => (
//               <Paper
//                 key={file.id}
//                 elevation={1}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   alignItems: { xs: 'flex-start', sm: 'center' },
//                   justifyContent: 'space-between',
//                   px: 3,
//                   py: 2,
//                   borderRadius: 2,
//                   gap: 1,
//                 }}
//               >
//                 <Box>
//                   <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                     {file.name}
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     {`Channel: ${file.channel} | Wallet: ${file.wallet} | Date: ${file.date}`}
//                   </Typography>
//                 </Box>
//                 <IconButton size="small" color="error" onClick={() => handleDelete(file.id)}>
//                   <DeleteIcon fontSize="small" />
//                 </IconButton>
//               </Paper>
//             ))}
//           </Stack>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// src/features/upload/pages/ServiceUploadSection.jsx
import React, { useState, useRef } from "react";
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
  const [pendingRange, setPendingRange] = useState({ startDate: null, endDate: null });
  const [appliedRange, setAppliedRange] = useState({ startDate: null, endDate: null });

  /* =========================
     FILE UPLOAD HANDLERS
  ========================== */
  const handleFileChange = (files) => {
    const selectedChannel =
      channelOptions.find((opt) => opt.value === values.channel)?.label || "N/A";
    const selectedWallet =
      walletOptions.find((opt) => opt.value === values.wallet)?.label || "N/A";

    const formattedDate =
      appliedRange.startDate && appliedRange.endDate
        ? `${format(appliedRange.startDate, "yyyy-MM-dd")} - ${format(
            appliedRange.endDate,
            "yyyy-MM-dd"
          )}`
        : "No Date";

    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      file,
      channel: selectedChannel,
      wallet: selectedWallet,
      date: formattedDate,
    }));

    setTempFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((f) => {
      onUpload(f.file, {
        channel: values.channel,
        wallet: values.wallet,
        date: formattedDate,
      });
    });
  };

  const handleDeleteTempFile = (id) => {
    setTempFiles((prev) => prev.filter((f) => f.id !== id));
    onDelete(id);
  };

  /* =========================
     RENDER
  ========================== */
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        {/* HEADER */}
        <Box sx={{ mb: 2, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Select Service Provider
          </Typography>
        </Box>

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

        {/* FILE TABLE */}
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
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tempFiles.map((file) => (
                  <TableRow key={file.id} hover>
                    <TableCell sx={{ wordBreak: "break-word", maxWidth: { xs: 120, sm: "auto" } }}>
                      {file.name}
                    </TableCell>
                    <TableCell sx={{ wordBreak: "break-word" }}>{file.channel}</TableCell>
                    <TableCell sx={{ wordBreak: "break-word" }}>{file.wallet}</TableCell>
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