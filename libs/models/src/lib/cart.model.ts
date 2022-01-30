import { IProduct } from './product.model';

export interface ICartItem extends IProduct {
  count: number;
}

export interface ICart {
  _id: string;
  list: {
    [productId: string]: ICartItem;
  };
}
