// // src/components/layout/Sidebar.jsx
// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   useTheme,
//   Box,
// } from "@mui/material";
// import {
//   DashboardOutlined as DashboardIcon,
//   FileUploadOutlined as UploadIcon,
//   CompareArrowsOutlined as MatchingIcon,
//   AssessmentOutlined as ResultsIcon,
//   SettingsOutlined as SettingsIcon,
// } from "@mui/icons-material";
// import { Link, useLocation } from "react-router-dom";

// const drawerWidth = 240;
// const collapsedWidth = 70; // Slightly wider for a cleaner look

// // Updated to match your App.jsx routes
// const menuItems = [

//   { text: "Upload Files", icon: <UploadIcon />, path: "/upload" },
//   { text: "Reports", icon: <ResultsIcon />, path: "/reports" },
// ];

// const bottomMenuItems = [
//   { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
// ];

// export default function Sidebar({ open }) {
//   const theme = useTheme();
//   const location = useLocation();

//   const renderList = (items) => (
//     <List sx={{ px: 1.5 }}>
//       {items.map((item) => {
//         const isSelected = location.pathname === item.path;
        
//         return (
//           <ListItemButton
//             key={item.text}
//             component={Link}
//             to={item.path}
//             selected={isSelected}
//             sx={{
//               minHeight: 48,
//               justifyContent: open ? "initial" : "center",
//               px: 2.5,
//               borderRadius: "8px", // Rounded items like modern dashboards
//               mb: 0.5,
//               "&.Mui-selected": {
//                 bgcolor: "#e3f2fd", // Light blue active background
//                 color: "#1976d2",
//                 "&:hover": {
//                   bgcolor: "#bbdefb",
//                 },
//               },
//               "&.Mui-selected .MuiListItemIcon-root": {
//                 color: "#1976d2",
//               },
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 minWidth: 0,
//                 mr: open ? 2 : "auto",
//                 justifyContent: "center",
//                 color: isSelected ? "#1976d2" : "#64748b",
//               }}
//             >
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={item.text}
//               sx={{
//                 opacity: open ? 1 : 0,
//                 "& .MuiTypography-root": {
//                   fontWeight: isSelected ? 600 : 500,
//                   fontSize: "0.875rem",
//                 },
//               }}
//             />
//           </ListItemButton>
//         );
//       })}
//     </List>
//   );

//   return (
//     <Drawer
//       variant="permanent"
//       open={open}
//       sx={{
//         width: open ? drawerWidth : collapsedWidth,
//         flexShrink: 0,
//         whiteSpace: "nowrap",
//         boxSizing: "border-box",
//         "& .MuiDrawer-paper": {
//           width: open ? drawerWidth : collapsedWidth,
//           transition: theme.transitions.create("width", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//           overflowX: "hidden",
//           borderRight: "1px solid #e2e8f0",
//           bgcolor: "#ffffff",
//         },
//       }}
//     >
//       <Toolbar /> {/* Spacer for Topbar */}
      
//       <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', pb: 2 }}>
//         <Box>
//           {renderList(menuItems)}
//         </Box>

//         <Box>
//           {renderList(bottomMenuItems)}
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }


// src/components/layout/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme, Box } from "@mui/material";
import { FileUploadOutlined as UploadIcon, AssessmentOutlined as ResultsIcon, SettingsOutlined as SettingsIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

// 1. Import Logo here
import LogoImg from '../../assets/orbit.png';

const drawerWidth = 240;
const collapsedWidth = 70;

const menuItems = [
  { text: "Upload Files", icon: <UploadIcon />, path: "/upload" },
  { text: "Reports", icon: <ResultsIcon />, path: "/reports" },
];

const bottomMenuItems = [
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

export default function Sidebar({ open }) {
  const theme = useTheme();
  const location = useLocation();

  const renderList = (items) => (
    <List sx={{ px: 1.5 }}>
      {items.map((item) => {
        const isSelected = location.pathname === item.path;
        return (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={isSelected}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              borderRadius: "8px",
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "#e3f2fd",
                color: "#1976d2",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: isSelected ? "#1976d2" : "#64748b" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        );
      })}
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: theme.transitions.create("width", { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
          overflowX: "hidden",
          borderRight: "1px solid #e2e8f0",
        },
      }}
    >
      {/* 2. ADD LOGO HEADER HERE */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 3,
        // justifyContent: open ? 'flex-start' : 'center', 
        px: 2, 
        width: '100%',
        height: 84 // Matches Topbar height
      }}>
        <Box
          component="img"
          src={LogoImg}
          alt="LOGO"
          sx={{
            height: 32,
            width: "auto",
            transition: 'all 0.3s'
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', pb: 2 }}>
        <Box>{renderList(menuItems)}</Box>
        <Box>{renderList(bottomMenuItems)}</Box>
      </Box>
    </Drawer>
  );
}