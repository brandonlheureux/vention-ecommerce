import { Router } from 'express';
import {
  addReview,
  createProduct,
  getPages,
  getProduct,
  getProducts,
} from '../controllers/product.controllers';

const productsRouter = Router();

productsRouter.get('/pages', getPages);
productsRouter.get('/:id', getProduct);
productsRouter.get('/', getProducts);
productsRouter.post('/', createProduct);
productsRouter.put('/:id', addReview);

export default productsRouter;
