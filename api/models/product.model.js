import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    productName: { type: String, required: true },
    price: {
      type: Number,
    },
    image: {
      type: String,
      // required: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", userSchema);
