import mongoose from "mongoose";

const Schema = mongoose.Schema;

const couponSchema = new Schema({
  code: String,
  discount: Number,
  usersUsed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Coupon = mongoose.model("Coupon", couponSchema);
