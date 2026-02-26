import api from "../../../api/axios";

export const fetchChannels = async () => {
  const res = await api.get("/payment-channels");
  return res.data.data.map((c) => ({
    id: c.id,
    label: c.channel_name,
  }));
};

export const fetchWallets = async () => {
  const res = await api.get("/wallets");
  return res.data.data.map((w) => ({
    id: w.id,
    label: w.wallet_number,
    channelId: w.payment_channel.id,
  }));
};

export const fetchBillingSystem = async () => {
  const res = await api.get("/billing-systems");
  return res.data.data.map((b) => ({
    id: b.id,
    label: b.billing_name,
  }));
};