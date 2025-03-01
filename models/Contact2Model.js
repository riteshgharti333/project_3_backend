import mongoose from "mongoose";

const contact2Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    howDidYouHearAboutUs: {
      type: String,
      enum: ["Social Media", "Recommendation", "Google", "Others"],
      required: true,
    },
    eventDetail: {
      date: { type: Date, required: true },
      time: { type: String, required: true },
      venueAddress: { type: String, required: true },
      numberOfGuests: { type: Number, required: true },
      additionalRequirements: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Contact2 = mongoose.model("Contact2", contact2Schema);
