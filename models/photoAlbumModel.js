import mongoose from "mongoose";

const photoAlbumSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one image is required.",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const PhotoAlbum = mongoose.model("PhotoAlbum", photoAlbumSchema);
