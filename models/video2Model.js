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

export const Video2 = mongoose.model("Video2", videoSchema);
