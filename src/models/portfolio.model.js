import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.models?.Portfolio ||
  mongoose.model("Portfolio", portfolioSchema);
