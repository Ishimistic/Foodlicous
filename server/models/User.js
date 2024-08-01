import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Food",
      default: [],
    },
    cart: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId },
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
    orders: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId },
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
