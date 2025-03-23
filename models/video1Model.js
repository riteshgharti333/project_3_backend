import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Video1 = mongoose.model("Video1", videoSchema);
