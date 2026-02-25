import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import api from "../api/axios";

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/results").then((res) => {
      setResults(res.data);
    });
  }, []);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Reconciliation Results
      </Typography>

      <pre>{JSON.stringify(results, null, 2)}</pre>
    </Paper>
  );
};

export default ResultsPage;
