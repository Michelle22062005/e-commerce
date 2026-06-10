import { Schema, model, Model, Document, Types } from "mongoose";

export interface IFavorite extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  savedAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>({
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
  savedAt: {
    type: Date,
  },
});

FavoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

export let Favorite: Model<IFavorite>;
try {
  Favorite = model<IFavorite>("favorites");
} catch (error) {
  Favorite = model("favorites", FavoriteSchema);
}

export default FavoriteSchema;