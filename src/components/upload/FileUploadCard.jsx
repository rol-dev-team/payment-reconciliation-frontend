import { Paper, Typography, Button, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";

const FileUploadCard = ({ label, onFileSelect }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        border: "2px dashed #ccc",
        cursor: "pointer",
      }}
    >
      <UploadFileIcon sx={{ fontSize: 50, color: "primary.main" }} />
      <Typography variant="h6" mt={2}>
        {label}
      </Typography>

      <Typography variant="body2" color="text.secondary" mt={1}>
        {fileName || "Click to select file"}
      </Typography>

      <Box mt={2}>
        <Button variant="contained" component="label">
          Browse File
          <input hidden type="file" onChange={handleChange} />
        </Button>
      </Box>
    </Paper>
  );
};

export default FileUploadCard;
