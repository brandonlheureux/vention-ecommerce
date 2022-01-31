import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Shop from '../pages/shop/shop';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h2>home</h2>} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
