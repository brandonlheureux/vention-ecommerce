import { Schema, model } from 'mongoose';

// type
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  avgRating: number;
  ratingCount: number;
  price: number;
}

// mongo blueprint
export const ProductSchema = new Schema<IProduct>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  avgRating: { type: Number, required: true },
  ratingCount: { type: Number, required: true },
  price: { type: Number, required: true },
});

// model to work with
export const Product = model('Product', ProductSchema);
