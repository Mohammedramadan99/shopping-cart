import mongoose from "mongoose";
const { Schema } = mongoose;

const familySchema = new Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please parent is required"],
    },
    members: [
      {
        idNumber: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Family", familySchema);
