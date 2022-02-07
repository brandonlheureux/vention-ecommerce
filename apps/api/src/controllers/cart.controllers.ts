import { RequestHandler } from 'express';

/*
  cart endpoints.
  all transaction will occur with the in-memory session storage from
  express sessions.
  operations: 
  get cart - GET /
  add item to cart - PUT / {...Product}
  remove item from cart - DELETE /:id?count
  update cart (item count) - PATCH /:id?newCount
*/

// just get the session cart
export const getCart: RequestHandler = async (req, res) => {
  try {
    res.status(200).json(req.session.cart);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// adding an item to the cart
export const addItem: RequestHandler = async (req, res) => {
  const { product } = req.body;
  const cart = req.session.cart.list;
  try {
    if (product._id in cart) {
      cart[product._id].count++;
    } else {
      cart[product._id] = { ...product, count: 1 };
    }
    res.status(200).json({ message: 'successfully added item to cart' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// delete item completely
export const removeItem: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const cart = req.session.cart.list;
  if (!id) {
    return res.status(400).json({ error: 'No item id provided' });
  }
  try {
    if (id in cart) {
      delete cart[id];
      res
        .status(200)
        .json({ message: 'successfully removed product: ' + id.toString() });
    } else {
      res.status(404).json({ error: 'product not in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// update single item count
export const updateItem: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { newCount } = req.query;
  const count = parseInt(newCount.toString());
  const cart = req.session.cart.list;
  if (!id) {
    return res.status(400).json({ error: 'No item id provided' });
  }
  try {
    if (!(count >= 0)) {
      res.status(400).json({ error: 'No valid newCount provided' });
    } else if (id in cart) {
      if (count === 0) {
        delete cart[id];
      } else {
        cart[id].count = count;
      }
      res.status(200).json({ message: 'successfully updated item count' });
    } else {
      res.status(404).json({ error: 'Item not in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
