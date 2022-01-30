import { IProduct } from '@ecommerce/models';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    axios
      .get('/api/products/286660a2-7ae6-49a6-aa97-e6e2f58be9de')
      .then((res) => res.data)
      .then((data) => {
        setProduct(data);
        console.log(data);
      });
  }, []);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>Name: {product.name}</div>
      <div>Description: {product.description}</div>
      <div>Rating: {product.avgRating}</div>
    </>
  );
};

export default App;
