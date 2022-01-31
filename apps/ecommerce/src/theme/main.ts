import { createTheme } from '@mui/material/styles';
// import { red } from '@mui/material/colors';

// A custom theme for this app
const main = createTheme({
  palette: {
    // type: 'light',
    primary: {
      main: '#8e5c1c',
    },
    secondary: {
      main: '#7e57c2',
    },
  },

  // make sure we have access to full size when using percentages
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          width: '100%',
          height: '100%',
        },
        html: {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
      },
    },
  },
});

export default main;
