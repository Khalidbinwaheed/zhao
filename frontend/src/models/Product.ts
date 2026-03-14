import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  description?: string;
  stock: number;
  rating: number;
  reviews: number;
  image?: string;
  isNewArrival: boolean;
  isBestSeller: boolean;
  specs?: Map<string, string>;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  specs: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now }
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
