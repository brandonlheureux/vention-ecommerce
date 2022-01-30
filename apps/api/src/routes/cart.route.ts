import { Router } from 'express';
import {
  addItem,
  getCart,
  removeItem,
  updateItem,
} from '../controllers/cart.controllers';
import { cartRequired } from '../middleware/cartRequired.middleware';

const cartRouter = Router();

cartRouter.use(cartRequired);
cartRouter.get('/', getCart);
cartRouter.put('/', addItem);
cartRouter.delete('/:id', removeItem);
cartRouter.patch('/:id', updateItem);

export default cartRouter;
