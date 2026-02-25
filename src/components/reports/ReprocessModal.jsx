import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Close as CloseIcon,
  FileUploadOutlined as UploadIcon,
} from '@mui/icons-material';

export default function ReprocessModal({ open, onClose }) {
  const [step, setStep] = useState(1); // 1: Choice, 2: Whole Form, 3: Specific Form
  const [reprocessType, setReprocessType] = useState('whole');
  const [selectedChannel, setSelectedChannel] = useState('bKash Paybill');
  const [selectedWallet, setSelectedWallet] = useState('Wallet 1');

  // Reset state when closing
  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleNext = () => {
    if (reprocessType === 'whole') setStep(2);
    else setStep(3);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {step === 1 ? 'Reprocess Comparison' : step === 2 ? 'Reprocess — Upload Files' : `Reprocess — ${selectedChannel} ${selectedWallet}`}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 0 }}>
        {/* STEP 1: INITIAL CHOICE */}
        {step === 1 && (
          <Stack spacing={2}>
            <Typography variant="body2" sx={{ color: '#718096', mb: 1 }}>
              Choose what you want to reprocess.
            </Typography>
            <RadioGroup value={reprocessType} onChange={(e) => setReprocessType(e.target.value)}>
              <FormControlLabel value="whole" control={<Radio size="small" />} label={<Typography sx={{ fontWeight: 600 }}>Reprocess whole data</Typography>} />
              <FormControlLabel value="specific" control={<Radio size="small" />} label={<Typography sx={{ fontWeight: 600 }}>Reprocess specific channel & wallet</Typography>} />
            </RadioGroup>

            {reprocessType === 'specific' && (
              <Stack spacing={1.5} sx={{ mt: 1 }}>
                <Select size="small" value={selectedChannel} onChange={(e) => setSelectedChannel(e.target.value)} fullWidth sx={{ borderRadius: 2 }}>
                  <MenuItem value="bKash Paybill">bKash Paybill</MenuItem>
                  <MenuItem value="Nagad Paybill">Nagad Paybill</MenuItem>
                </Select>
                <Select size="small" value={selectedWallet} onChange={(e) => setSelectedWallet(e.target.value)} fullWidth sx={{ borderRadius: 2 }}>
                  <MenuItem value="Wallet 1">Wallet 1</MenuItem>
                  <MenuItem value="Wallet 7">Wallet 7</MenuItem>
                </Select>
              </Stack>
            )}
            
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}>Cancel</Button>
              <Button onClick={handleNext} variant="contained" sx={{ borderRadius: 2, textTransform: 'none', px: 4 }}>Next</Button>
            </Stack>
          </Stack>
        )}

        {/* STEP 2: WHOLE DATA UPLOAD */}
        {step === 2 && (
          <Stack spacing={3}>
            <Box sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Service Provider Files</Typography>
              <Stack direction="row" spacing={2} alignItems="flex-end">
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#4a5568' }}>Channel</Typography>
                  <Select fullWidth size="small" placeholder="Select channel" sx={{ mt: 0.5 }}><MenuItem value="">Select channel</MenuItem></Select>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#4a5568' }}>Date</Typography>
                  <TextField fullWidth size="small" placeholder="Pick a date" sx={{ mt: 0.5 }} />
                </Box>
                <Button variant="outlined" startIcon={<UploadIcon />} sx={{ height: 40, borderRadius: 2, textTransform: 'none' }}>Upload File</Button>
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Own Database</Typography>
              <RadioGroup defaultValue="existing" row>
                <FormControlLabel value="existing" control={<Radio size="small" />} label={<Typography variant="body2">Use existing data from report</Typography>} />
                <FormControlLabel value="new" control={<Radio size="small" />} label={<Typography variant="body2">Upload new file</Typography>} />
              </RadioGroup>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={() => setStep(1)} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>Back</Button>
              <Button variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>Reprocess</Button>
            </Stack>
          </Stack>
        )}

        {/* STEP 3: SPECIFIC UPLOAD */}
        {step === 3 && (
          <Stack spacing={2}>
            <Typography variant="body2" sx={{ color: '#718096' }}>
              Upload the new service provider file for <strong>{selectedChannel} {selectedWallet}</strong>. It will be compared against the existing mismatched data for this section.
            </Typography>
            <Box sx={{ border: '2px dashed #e2e8f0', borderRadius: 2, p: 4, textAlign: 'center', cursor: 'pointer' }}>
              <UploadIcon sx={{ color: '#cbd5e0', fontSize: 32, mb: 1 }} />
              <Typography variant="body2" sx={{ color: '#718096' }}>Click to upload file</Typography>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button onClick={() => setStep(1)} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>Back</Button>
              <Button variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>Reprocess</Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}