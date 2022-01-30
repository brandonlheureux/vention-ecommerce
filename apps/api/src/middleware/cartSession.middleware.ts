import { randomUUID } from 'crypto';
import { RequestHandler } from 'express';

export const cartSession: RequestHandler = async (req, _, next) => {
  const { cart = null } = req.session;
  // carts should be stored in the server
  // this is not a requirement yet, so we will be storing them in
  // the default memory session storage
  if (!cart) {
    console.log('no cart. creating now...');
    req.session.cart = {
      _id: randomUUID(),
      list: {},
    };
  }
  next();
};
