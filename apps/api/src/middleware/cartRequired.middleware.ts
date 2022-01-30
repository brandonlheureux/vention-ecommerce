import { randomUUID } from 'crypto';
import { RequestHandler } from 'express';

export const cartRequired: RequestHandler = async (req, res, next) => {
  if (req.session.cart) {
    next();
  } else {
    req.session.cart = {
      _id: randomUUID(),
      list: {},
    };
    res
      .status(500)
      .json({ error: 'Cart no longer valid. Creating new cart...' });
  }
};
