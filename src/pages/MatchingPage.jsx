import { Button, Paper, Typography } from "@mui/material";
import api from "../api/axios";

const MatchingPage = () => {

  const runMatching = async () => {
    await api.post("/match");
    alert("Matching Completed");
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Run Reconciliation
      </Typography>

      <Button variant="contained" onClick={runMatching}>
        Start Matching
      </Button>
    </Paper>
  );
};

export default MatchingPage;
