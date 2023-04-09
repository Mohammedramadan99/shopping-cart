import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: [],
});

export default mongoose.model("Cart", cartSchema);
