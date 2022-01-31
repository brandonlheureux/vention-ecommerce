import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Shop from '../pages/shop/shop';
import Home from '../pages/home/home';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
