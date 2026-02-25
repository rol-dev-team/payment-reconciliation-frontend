// src/components/shared/UploadButton.jsx
import React from 'react';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/FileUploadOutlined';

export default function UploadButton({
  label = 'Upload',
  onUpload,
  multiple = false,
  disabled = false,
  accept = '.csv,.xlsx',
  color = '#217346',
  hoverColor = '#185C37',
  minWidth = 140,
  height = 42,
  flex = 0.5,
}) {
  return (
    <Button
      component="label"       // ✅ Must be label to trigger hidden input
      variant="contained"
      startIcon={<UploadIcon />}
      disabled={disabled}
      sx={{
        backgroundColor: disabled ? '#A7D7C5' : color,
        '&:hover': { backgroundColor: disabled ? '#A7D7C5' : hoverColor },
        minWidth,
        height,
        textTransform: 'none',
        borderRadius: 2,
        fontWeight: 600,
        boxShadow: 'none',
        color: '#fff',
        flex: { xs: 1, sm: flex },     // ✅ full width on mobile, half on desktop
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {label}
      {/* ✅ Hidden file input */}
      <input
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        onClick={(e) => e.stopPropagation()} // prevent parent Stack from blocking
        onChange={(e) => {
          if (e.target.files && onUpload) {
            onUpload(Array.from(e.target.files));
          }
          e.target.value = ''; // reset to allow re-select same file
        }}
      />
    </Button>
  );
}