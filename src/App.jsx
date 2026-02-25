import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/layout/Layout";

// Lazy Loaded Pages
const Login = React.lazy(() => import("./features/auth/pages/Login"));
const UploadPage = React.lazy(() => import("./features/upload/pages/UploadPage"));
const Settings = React.lazy(() => import("./features/settings/pages/Settings"));
const ReportsPage = React.lazy(() => import("./features/reports/pages/ReportsPage"));

// Loading Component
const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <h3>Loading...</h3>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <CssBaseline />

      <Routes>

        {/* Public Route (NO Layout) */}
        <Route path="/login" element={<Login />} />

        {/* Protected / App Routes (WITH Layout) */}
        <Route element={<Layout />}>
          <Route path="/" element={<UploadPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
        
      </Routes>
    </Suspense>
  );
}
