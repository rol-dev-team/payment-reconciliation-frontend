import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const MatchControls = ({ onRun }) => {
  const [amountTolerance, setAmountTolerance] = useState(0);
  const [dateTolerance, setDateTolerance] = useState(0);
  const [matchType, setMatchType] = useState("exact");

  const handleSubmit = () => {
    onRun({
      amountTolerance,
      dateTolerance,
      matchType,
    });
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" mb={3}>
        Matching Configuration
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Amount Tolerance"
            type="number"
            value={amountTolerance}
            onChange={(e) => setAmountTolerance(e.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Date Tolerance (days)"
            type="number"
            value={dateTolerance}
            onChange={(e) => setDateTolerance(e.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            select
            fullWidth
            label="Match Type"
            value={matchType}
            onChange={(e) => setMatchType(e.target.value)}
          >
            <MenuItem value="exact">Exact Match</MenuItem>
            <MenuItem value="tolerance">Tolerance Match</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Button
        sx={{ mt: 3 }}
        variant="contained"
        onClick={handleSubmit}
      >
        Run Matching
      </Button>
    </Paper>
  );
};

export default MatchControls;
