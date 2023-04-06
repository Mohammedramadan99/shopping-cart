import mongoose from "mongoose";
const { Schema } = mongoose;

const sectionSchema = new Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Section", sectionSchema);
