// Material
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const CustomTheme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    custom: {
      light: grey[100],
      main: grey[400],
      dark: grey[700],
      contrastText: grey[50],
    },
  },
  components: {
    MuiCardActionArea: {
      styleOverrides: {
        root:{
          "&:hover ": {
            opacity: '0.5'
          }
        },
        focusHighlight: {
          opacity: '0',

        },
      }
    }
  }
});

export default CustomTheme