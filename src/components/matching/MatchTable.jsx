import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const MatchTable = ({ rows }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "transaction_id", headerName: "Transaction ID", width: 180 },
    { field: "amount1", headerName: "File 1 Amount", width: 150 },
    { field: "amount2", headerName: "File 2 Amount", width: 150 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "date_diff", headerName: "Date Difference", width: 150 },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%", p: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
      />
    </Paper>
  );
};

export default MatchTable;
