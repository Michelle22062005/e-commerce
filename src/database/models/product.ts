import { Schema, model, Model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  specs: Map<string, string>;
  stock: number;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  slug: {
    type: String,
    required: [true, "The slug is required"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "The image URL is required"],
  },
  shortDescription: {
    type: String,
    required: [true, "The short description is required"],
  },
  longDescription: {
    type: String,
    required: [true, "The long description is required"],
  },
  specs: {
    type: Map,
    of: String,
  },
  stock: {
    type: Number,
    required: [true, "The stock is required"],
  },
  createdAt: {
    type: Date,
  },
});

export let Product: Model<IProduct>;
try {
  Product = model<IProduct>("products");
} catch (error) {
  Product = model("products", ProductSchema);
}

export default ProductSchema;