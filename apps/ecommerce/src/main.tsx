import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import App from './app/app';
import main from './theme/main';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider theme={main}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
