import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Shop from '../pages/shop/shop';
import Home from '../pages/home/home';
import { Grow } from '@mui/material';

export const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2500}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
