import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import App from './app/app';
import main from './theme/main';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={main}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
