import { Schema, model, Model, Document, Types } from "mongoose";

export interface ICart extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  addedAt: Date;
}

const CartSchema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "The user is required"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: [true, "The product is required"],
  },
  quantity: {
    type: Number,
    required: [true, "The quantity is required"],
  },
  addedAt: {
    type: Date,
  },
});

CartSchema.index({ userId: 1, productId: 1 }, { unique: true });

export let Cart: Model<ICart>;
try {
  Cart = model<ICart>("cart");
} catch (error) {
  Cart = model("cart", CartSchema);
}

export default CartSchema;