// src/components/layout/Layout.jsx
import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

// Sidebar, Topbar, Footer
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function Layout() {
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Sidebar open={open} />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          width: "100%",
          transition: "all 0.3s ease",
          bgcolor: "#f8fafc",
        }}
      >
        {/* Topbar */}
        <Topbar open={open} handleToggle={handleToggle} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: { xs: 1, sm: 1, md: 1 }, // ✅ smaller horizontal padding
            py: { xs: 1, sm: 1, md: 1 }, // vertical padding remains responsive
            mt: 8, // margin from topbar
            width: "100%",
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
}