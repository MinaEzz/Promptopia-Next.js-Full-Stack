import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
      minlength: [3, "Prompt must be at least 3 characters long"],
    },
    tag: {
      type: String,
      required: [true, "Tag is required"],
      minlength: [3, "Tag must be at least 3 characters long"],
    },
  },
  { timestamps: true }
);

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", promptSchema);

export default Prompt;
