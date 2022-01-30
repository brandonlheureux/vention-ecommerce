import { Router } from 'express';
import cartRouter from './cart.route';
import productsRouter from './products.route';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/cart', cartRouter);

export default routes;
