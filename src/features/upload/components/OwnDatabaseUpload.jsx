// // src/components/shared/upload/OwnDatabaseUpload.jsx
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
// import CloudIcon from '@mui/icons-material/CloudUploadOutlined';
// import DeleteIcon from '@mui/icons-material/DeleteOutline';
// import { format } from 'date-fns';
// import SelectDropdownSingle from '../SelectDropdownSingle';
// import DatePickerField from '../DatePickerField';
// import UploadButton from '../UploadButton';

// export default function OwnDatabaseUpload({
//   values,
//   billingPanelOption,
//   walletOptions,
//   serviceFiles,
//   onUpload,
//   onDelete
// }) {

//   // Temporary local state for multiple files
//     const [tempFiles, setTempFiles] = useState([]);
  
//     // ✅ Handle uploaded files
//     const handleFileChange = (files) => {
//       // 1. Find labels for selected IDs to display in the table
//       const selectedChannel = billingPanelOption.find(opt => opt.value === values.channel)?.label || 'N/A';
//       const selectedWallet = walletOptions.find(opt => opt.value === values.wallet)?.label || 'N/A';
  
//       // 2. Format the date safely using date-fns
//       const formattedDate = values.date ? format(new Date(values.date), 'yyyy-MM-dd') : 'No Date';
  
//       const newFiles = files.map(file => ({
//         id: Date.now() + Math.random(),
//         name: file.name,
//         file,
//         channel: selectedChannel,
//         wallet: selectedWallet,
//         date: formattedDate,
//         transactions: Math.floor(Math.random() * 1000),
//       }));
  
//       setTempFiles(prev => [...prev, ...newFiles]);
  
//       // Notify parent component for each file
//       newFiles.forEach(f => {
//         onUpload(f.file, { 
//           channel: values.channel, 
//           wallet: values.wallet, 
//           date: formattedDate 
//         });
//       });
//     };
  
//     // Delete from temp table
//     const handleDeleteTempFile = (id) => {
//       setTempFiles(prev => prev.filter(f => f.id !== id));
//       onDelete(id); // delete from parent if needed
//     };

//   return (
//     <Card variant="outlined" sx={{ mb: 3 }}>
//           <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
//               Select Billing System
//             </Typography>
    
//             {/* RESPONSIVE INPUTS + UPLOAD */}
//             <Stack 
//               direction={{ xs: 'column', sm: 'row' }} 
//               spacing={2} 
//               alignItems="flex-end"
//             >
//               <Box sx={{ flex: 1, width: '100%' }}>
//                 <SelectDropdownSingle
//                   name="channel"
//                   sx={{ flex: 1, width: '50%' }}
//                   placeholder="Select Channel"
//                   fetchOptions={async () => billingPanelOption}
//                   height={42}
//                 />
//               </Box>
    
//               {/* ✅ Reusable UploadButton */}
//               <UploadButton
//                 label="Upload Files"
//                 sx={{ flex: 1, width: '20%' }}
//                 multiple
//                 onUpload={(files) => handleFileChange(files)}
//                 color="#217346"
//                 hoverColor="#185C37"
//               />
//             </Stack>
    
//             {/* TEMPORARY FILE TABLE */}
//             {tempFiles.length > 0 && (
//               <TableContainer
//                 component={Paper}
//                 sx={{ mt: 4, border: '1px solid #e2e8f0', boxShadow: 'none', overflowX: 'auto' }}
//               >
//                 <Table size="small">
//                   <TableHead sx={{ bgcolor: '#f8fafc' }}>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 600 }}>File Name</TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>Channel</TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>Wallet</TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
//                       {/* <TableCell sx={{ fontWeight: 600 }}>Transactions</TableCell> */}
//                       <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {tempFiles.map(file => (
//                       <TableRow key={file.id} hover>
//                         <TableCell>{file.name}</TableCell>
//                         <TableCell>{file.channel}</TableCell>
//                         {/* <TableCell>{file.wallet}</TableCell> */}
//                         {/* <TableCell>{file.date}</TableCell> */}
//                         <TableCell>{file.transactions}</TableCell>
//                         <TableCell align="right">
//                           <IconButton color="error" size="small" onClick={() => handleDeleteTempFile(file.id)}>
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//           </CardContent>
//         </Card>
//   );
// }


// // src/components/shared/upload/OwnDatabaseUpload.jsx
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
// import CloudIcon from '@mui/icons-material/CloudUploadOutlined';
// import DeleteIcon from '@mui/icons-material/DeleteOutline';
// import SelectDropdownSingle from '../../../components/shared/SelectDropdownSingle';
// import DatePickerField from '../../../components/shared/DatePickerField';
// import UploadButton from '../../../components/shared/UploadButton';
// import { format } from 'date-fns';

// export default function OwnDatabaseUpload({
//   values,
//   billingPanelOption,
//   walletOptions,
//   onUpload,
//   onDelete
// }) {
//   const [filesList, setFilesList] = useState([]);

//   const handleFilesChange = (files) => {
//     const selectedChannel = billingPanelOption.find(opt => opt.value === values.channel)?.label || 'N/A';
//     const selectedWallet = walletOptions?.find(opt => opt.value === values.wallet)?.label || 'N/A';
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
//           Upload payment file in from billing panel
//         </Typography>

//         {/* Inputs + Upload */}
//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           spacing={2}
//           alignItems={{ xs: 'stretch', sm: 'flex-end' }}
//           mb={3}
//         >
//           <Box sx={{ flex: 1 }}>
//             <SelectDropdownSingle
//               name="channel"
//               placeholder="Select Billing System"
//               fetchOptions={async () => billingPanelOption}
//               height={42}
//             />
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
//         {filesList.length > 0 ? (
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
//                     {`Channel: ${file.channel} | Date: ${file.date} | Size: ${(file.size/1024).toFixed(2)} KB`}
//                   </Typography>
//                 </Box>
//                 <IconButton size="small" color="error" onClick={() => handleDelete(file.id)}>
//                   <DeleteIcon fontSize="small" />
//                 </IconButton>
//               </Paper>
//             ))}
//           </Stack>
//         ) : (
//           <Box
//             sx={{
//               mt: 4,
//               py: 6,
//               textAlign: 'center',
//               border: '2px dashed #cbd5e1',
//               borderRadius: 2,
//               transition: 'all 0.3s ease',
//               '&:hover': { borderColor: '#38a169', backgroundColor: '#f0fff4' }
//             }}
//           >
//             <CloudIcon sx={{ fontSize: 56, color: '#38a169' }} />
//             <Typography variant="h6" sx={{ mt: 1 }}>
//               Drop CSV or Excel files here
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Or click "Upload Files" button above
//             </Typography>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


// src/features/upload/pages/OwnDatabaseUpload.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CloudIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import SelectDropdownSingle from '../../../components/shared/SelectDropdownSingle';
import UploadButton from '../../../components/shared/UploadButton';
import { format } from 'date-fns';

export default function OwnDatabaseUpload({
  values,
  billingPanelOption,
  walletOptions,
  onUpload,
  onDelete,
  setFieldValue
}) {
  const [filesList, setFilesList] = useState([]);

  const handleFilesChange = (files) => {
    const selectedChannel = billingPanelOption?.find(opt => opt.value === values.channel)?.label || 'N/A';
    const selectedWallet = walletOptions?.find(opt => opt.value === values.wallet)?.label || 'N/A';
    const formattedDate = values.date ? format(new Date(values.date), 'yyyy-MM-dd') : 'N/A';

    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file,
      channel: selectedChannel,
      wallet: selectedWallet,
      date: formattedDate,
    }));

    setFilesList(prev => [...prev, ...newFiles]);
    newFiles.forEach(f => onUpload(f.file, { 
      channel: values.channel, 
      wallet: values.wallet, 
      date: formattedDate 
    }));
  };

  const handleDelete = (id) => {
    setFilesList(prev => prev.filter(f => f.id !== id));
    onDelete(id);
  };

  return (
    <Card variant="outlined" sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ py: { xs: 3, sm: 4 }, px: { xs: 2, sm: 3 } }}>
        {/* HEADER */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Upload payment file from billing panel
        </Typography>

        {/* Inputs + Upload */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          mb={{ xs: 3, sm: 4 }}
        >
          <Box sx={{ flex: 1 }}>
            <SelectDropdownSingle
              name="channel"
              placeholder="Select Billing System"
              fetchOptions={async () => billingPanelOption}
              height={42}
              value={values.channel || null}
              onValueChange={(val) => setFieldValue('channel', val)}
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

        {/* Selected Files Table */}
        {filesList.length > 0 ? (
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              borderRadius: 2,
              overflowX: 'auto',
            }}
          >
            <Table sx={{ minWidth: { xs: '100%', sm: 650 } }} size="small">
              <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>File Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Channel</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Wallet</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filesList.map((file) => (
                  <TableRow key={file.id} hover>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ wordBreak: 'break-word', maxWidth: { xs: 120, sm: 'auto' } }}
                    >
                      {file.name}
                    </TableCell>
                    <TableCell sx={{ wordBreak: 'break-word' }}>{file.channel}</TableCell>
                    <TableCell sx={{ wordBreak: 'break-word' }}>{file.wallet}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        sx={{ color: '#d32f2f' }}
                        onClick={() => handleDelete(file.id)}
                      >
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
            <Typography
              variant="body2"
              fontWeight={500}
              color="textSecondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              No files uploaded yet
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}