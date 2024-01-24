import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ResturantScheme = new Schema({
  name: {
    type: String,
    require: true,
  },
  resturantId: {
    type: String,
    require: true,
  },
});

export const ResturantDeals = mongoose.model("Resturant Deals", ResturantScheme);
