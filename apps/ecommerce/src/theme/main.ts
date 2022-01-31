import { createTheme } from '@mui/material/styles';
// import { red } from '@mui/material/colors';

// A custom theme for this app
const main = createTheme({
  palette: {
    // primary: {
    //   main: '#556cd6',
    // },
    // secondary: {
    //   main: '#19857b',
    // },
    // error: {
    //   main: red.A400,
    // },
  },

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
