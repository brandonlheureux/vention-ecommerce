import { Product } from '@ecommerce/models';
import { randomUUID } from 'crypto';
import { RequestHandler } from 'express';

/*
  Products endpoint
  operations:
  Create single product - POST {IProduct}
  Get single product - GET /:id
  Get paginated products - GET ?limit&skip
  Add review - PUT /:id
*/

export const getProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });

    res.status(product ? 200 : 404).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getProducts: RequestHandler = async (req, res) => {
  const { limit = 20, skip = 0 } = req.query;
  try {
    const products = await Product.find({})
      .skip(parseInt(skip.toString()) || 0)
      .limit(parseInt(limit.toString()) || 20);

    res.status(products.length > 0 ? 200 : 404).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// this should not be exposed to the public
export const createProduct: RequestHandler = async (req, res) => {
  // here we wouldn't need to accept rating info. should default to 0;
  const { name, description, imageUrl, price } = req.body;

  try {
    const result = await Product.create({
      _id: randomUUID(),
      name,
      description,
      imageUrl,
      avgRating: 0,
      ratingCount: 0,
      price,
    });

    if (!result) {
      throw new Error('Could not create document');
    }

    res.status(200).json({ status: 'success', code: 201 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', code: 500, error });
  }
};

export const addReview: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const rating = parseFloat(req.body.rating);
  if (!rating || rating < 0 || rating > 5) {
    throw new Error('Rating must be a number between 0 and 5');
  }
  let status = 500;
  try {
    const documents = await Product.aggregate([
      { $match: { _id: id } },
      {
        $set: {
          avgRating: {
            $divide: [
              { $add: [{ $multiply: ['$avgRating', '$ratingCount'] }, rating] },
              { $add: ['$ratingCount', 1] },
            ],
          },
          ratingCount: { $add: ['$ratingCount', 1] },
        },
      },
    ]);

    if (documents.length !== 1) {
      status = 404;
      throw new Error('Could not find document');
    }

    const result = await Product.updateOne({ _id: id }, documents[0]);

    if (!result) {
      throw new Error('Could not update document');
    }

    console.log(result);

    res.status(201).json({ message: 'rating added successfully' });
  } catch (error) {
    res.status(status).json({ error: error });
  }
};

export const getPages: RequestHandler = async (_, res) => {
  try {
    const result = await Product.countDocuments();
    if (result && result > 0) {
      res.status(200).json({ pages: Math.ceil(result / 20) });
    } else {
      res.status(404).json({ error: 'Could not find any products' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
