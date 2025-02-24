import mongoose from "mongoose";

const contact2Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    eventDetail: { type: String, required: true },
    howDidYouHearAboutUs: {
      type: String,
      enum: ["Social Media", "Recommendation", "Google", "Others"],
      required: true,
    },
  },
  { timestamps: true }
);

const Contact2Schema = mongoose.model("Contact2", contact2Schema);

export default Contact2Schema;
