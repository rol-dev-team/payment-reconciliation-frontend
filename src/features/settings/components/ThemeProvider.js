import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    // 1. Change Font Family Globally
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    
    // 2. Change Base Font Size
    fontSize: 14, 
    
    h5: {
      fontWeight: 800,
      fontSize: '1.5rem',
    },
    caption: {
      fontSize: '0.75rem',
    }
  },
  components: {
    // 3. Control all Icons globally
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem', // Sets default size for all icons
        },
      },
    },
    // 4. Control all Buttons globally
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Removes default uppercase
          borderRadius: '8px',
        },
      },
    },
  },
});