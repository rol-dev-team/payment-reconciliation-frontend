// src/components/layout/Topbar.jsx
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/api/authApi";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation } from "react-router-dom";

export default function Topbar({ open, handleToggle }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  // Notification Menu State
  const [anchorNotif, setAnchorNotif] = useState(null);
  const openNotif = Boolean(anchorNotif);

  // Avatar Menu State
  const [anchorAvatar, setAnchorAvatar] = useState(null);
  const openAvatar = Boolean(anchorAvatar);


   const handleLogout = async () => {
    try {
      await logoutUser();      // calls API and clears localStorage
      navigate("/login");      // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Handlers
  const handleNotifOpen = (event) => setAnchorNotif(event.currentTarget);
  const handleNotifClose = () => setAnchorNotif(null);

  const handleAvatarOpen = (event) => setAnchorAvatar(event.currentTarget);
  const handleAvatarClose = () => setAnchorAvatar(null);

  const pageTitle =
    location.pathname.replace("/", "").toUpperCase() || "DASHBOARD";

  const storedUser = localStorage.getItem("authUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <AppBar
      position="fixed"
      sx={{
        // zIndex: theme.zIndex.drawer + 1,
        zIndex: (theme) => theme.zIndex.appBar,
        width: `calc(100% - ${open ? 240 : 60}px)`,
        ml: `${open ? 240 : 60}px`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        bgcolor: "#f9fafb",
        color: "#111",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar>
        {/* Sidebar Toggle */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleToggle}
          sx={{
            mr: 2,
            "&:focus": { outline: "none", boxShadow: "none" },
          }}
        >
          {open ? <FormatIndentDecreaseIcon /> : <MenuIcon />}
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {/* 🔔 Notification Icon */}
        {/* <IconButton
          color="inherit"
          onClick={handleNotifOpen}
          sx={{ "&:focus": { outline: "none", boxShadow: "none" } }}
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}

        {/* Notification Dropdown */}
        <Menu
          anchorEl={anchorNotif}
          open={openNotif}
          onClose={handleNotifClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem>📩 New message from Admin</MenuItem>
          <MenuItem>✅ Task completed</MenuItem>
          <MenuItem>⚠️ Server warning</MenuItem>
          <Divider />
          <MenuItem sx={{ justifyContent: "center", fontWeight: 600 }}>
            View All Notifications
          </MenuItem>
        </Menu>

        {/* 👤 Avatar */}
        <IconButton
          onClick={handleAvatarOpen}
          sx={{ ml: 1, "&:focus": { outline: "none", boxShadow: "none" } }}
        >
          <Avatar sx={{ bgcolor: "#2563eb", width: 36, height: 36 }}>U</Avatar>
        </IconButton>

        {/* Avatar Dropdown */}
        <Menu
          anchorEl={anchorAvatar}
          open={openAvatar}
          onClose={handleAvatarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              width: 260,
              p: 1,
            },
          }}
        >
          {/* Profile Info */}
       <Box sx={{ px: 2, py: 1 }}>
          <Typography fontWeight={600}>
            {user?.full_name || "User"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            📧 {user?.email || "No email"}
          </Typography>
        </Box>


          <Divider />

      
     

  

       {/* Logout */}
          <MenuItem sx={{ color: "red" }} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: "red" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
