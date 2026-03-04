// src/api/reportsApi.js
import api from '../../../api/axios';


export const fetchReconciliationSummary = (startDate, endDate) => {
  return api.post("/reconciliation-summary", {
    start_date: startDate,
    end_date: endDate,
  });
};

export const fetchComparisonDetails = (batchId, processNo, page = 1, perPage = 50, filters = {}) => {
  return api.get("/comparisons", {
    params: {
      batch_id: batchId,
      process_no: processNo,
      page,
      per_page: perPage,
      ...(filters.status && { status: filters.status }),
      ...(filters.channel_id && { channel_id: filters.channel_id }),
      ...(filters.wallet_id && { wallet_id: filters.wallet_id }),
    },
  });
};