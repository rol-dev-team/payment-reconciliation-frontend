import { Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Total Files</Typography>
          <Typography variant="h4">0</Typography>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Matched Transactions</Typography>
          <Typography variant="h4">0</Typography>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Unmatched</Typography>
          <Typography variant="h4">0</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
