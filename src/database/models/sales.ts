import { Schema, model, Model, Document, Types } from "mongoose";

interface ISaleItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface ISale extends Document {
  userId: Types.ObjectId;
  items: ISaleItem[];
  total: number;
  soldAt: Date;
}

const SaleItemSchema = new Schema<ISaleItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: [true, "The product is required"],
    },
    name: {
      type: String,
      required: [true, "The product name is required"],
    },
    price: {
      type: Number,
      required: [true, "The product price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "The quantity is required"],
    },
  },
  { _id: false }
);

const SaleSchema = new Schema<ISale>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "The user is required"],
  },
  items: {
    type: [SaleItemSchema],
    required: [true, "The items are required"],
  },
  total: {
    type: Number,
    required: [true, "The total is required"],
  },
  soldAt: {
    type: Date,
  },
});

export let Sale: Model<ISale>;
try {
  Sale = model<ISale>("sales");
} catch (error) {
  Sale = model("sales", SaleSchema);
}

export default SaleSchema;