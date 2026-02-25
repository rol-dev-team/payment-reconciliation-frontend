import { Grid, Paper, Typography } from "@mui/material";

const SummaryCards = ({ summary }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Matched</Typography>
          <Typography variant="h4" color="success.main">
            {summary.matched}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Unmatched</Typography>
          <Typography variant="h4" color="error.main">
            {summary.unmatched}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h4">
            {summary.total}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SummaryCards;
