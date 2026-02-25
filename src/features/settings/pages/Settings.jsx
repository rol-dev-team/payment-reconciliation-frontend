import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAddAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CreateSystemUser from '../components/CreateSystemUser';
import SystemUsers from '../components/SystemUsers';

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <Box 
      sx={{ 
        width: '100%', 
        mx: 'auto', 
        py: { xs: 2, md: 4 }, // Reduced padding on mobile
        px: { xs: 1, sm: 3 } 
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 700, 
          mb: 3,
          px: { xs: 1, sm: 0 } // Align header with paper on mobile
        }}
      >
        Settings
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: { xs: 1, sm: 3 }, // Softer corners on desktop, tighter on mobile
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          bgcolor: '#ffffff',
        }}
      >
        <Box 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            bgcolor: '#f8fafc', 
            px: { xs: 0, sm: 2 }, // Remove padding on mobile to let tabs touch edges
            pt: 1 
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable" // Allows tabs to scroll on small screens
            scrollButtons="auto" // Shows arrows if content overflows
            allowScrollButtonsMobile
            sx={{
              minHeight: 48,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                minWidth: { xs: 'auto', sm: 160 }, // Auto width on mobile for better fit
                flex: { xs: 1, sm: 'none' }, // Evenly distribute space on mobile
                px: 2,
              },
            }}
          >
            <Tab 
              icon={<PersonAddIcon sx={{ fontSize: 20 }} />} 
              iconPosition="start" 
              label="Create System User" 
            />
            <Tab 
              icon={<ListAltIcon sx={{ fontSize: 20 }} />} 
              iconPosition="start" 
              label="User List" 
            />
          </Tabs>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          {activeTab === 0 && <CreateSystemUser />}
          {activeTab === 1 && <SystemUsers />}
        </Box>
      </Paper>
    </Box>
  );
}