import {Contact2} from "../models/Contact2Model.js";
import nodemailer from "nodemailer";

import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";


// CREATE NEW CONTACT 2
export const newContact = catchAsyncError(async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      howDidYouHearAboutUs,
      eventDetail = {} // Ensure eventDetail is at least an empty object
    } = req.body;

    // Extract event details correctly
    const {
      date,
      time,
      venueAddress,
      numberOfGuests,
      additionalRequirements,
    } = eventDetail;

    // Collect missing fields
    const missingFields = [];

    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!email) missingFields.push("email");
    if (!phoneNumber) missingFields.push("phoneNumber");
    if (!country) missingFields.push("country");
    if (!howDidYouHearAboutUs) missingFields.push("howDidYouHearAboutUs");

    // Ensure eventDetail fields are checked correctly
    if (!date) missingFields.push("eventDetail.date");
    if (!time) missingFields.push("eventDetail.time");
    if (!venueAddress) missingFields.push("eventDetail.venueAddress");
    if (numberOfGuests === undefined) missingFields.push("eventDetail.numberOfGuests");
    if (!additionalRequirements) missingFields.push("eventDetail.additionalRequirements");

    // If any field is missing, return an error
    if (missingFields.length > 0) {
      return next(new ErrorHandler(`Missing required fields: ${missingFields.join(", ")}`, 400));
    }

    // Save to MongoDB
    const newMessage = new Contact2({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      howDidYouHearAboutUs,
      eventDetail: {
        date,
        time,
        venueAddress,
        numberOfGuests,
        additionalRequirements,
      },
    });

    await newMessage.save();

    // Send Email (Nodemailer logic remains unchanged)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission - ${firstName} ${lastName}`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                background-color: #f4f4f4;
                padding: 20px;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                background-color: #007bff;
                color: white;
                padding: 10px;
                border-radius: 6px;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
              }
              .email-content {
                margin-top: 20px;
              }
              .email-content p {
                font-size: 16px;
                margin-bottom: 10px;
              }
              .email-footer {
                margin-top: 20px;
                font-size: 12px;
                text-align: center;
                color: #888;
              }
              ul {
                list-style: none;
                padding: 0;
              }
              ul li {
                font-size: 14px;
                margin-bottom: 5px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">New Inquiry Received</div>
              <div class="email-content">
                <p>Details:</p>
                <ul>
                  <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Phone:</strong> ${phoneNumber}</li>
                  <li><strong>Country:</strong> ${country}</li>
                  <li><strong>How Did You Hear About Us?:</strong> ${howDidYouHearAboutUs}</li>
                  <li><strong>Event Date:</strong> ${date}</li>
                  <li><strong>Event Time:</strong> ${time}</li>
                  <li><strong>Venue Address:</strong> ${venueAddress}</li>
                  <li><strong>Number of Guests:</strong> ${numberOfGuests}</li>
                  <li><strong>Additional Requirements:</strong> ${additionalRequirements}</li>
                </ul>
              </div>
              <div class="email-footer">
                <p>This email was sent automatically. Please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };
    

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
      contact: newMessage,
    });

  } catch (error) {
    console.error("Error in newContact:", error);
    return next(new ErrorHandler("An error occurred while processing the request.", 500));
  }
});




// GET ALL CONTACTS
export const getAllContacts = catchAsyncError(async (req, res, next) => {
  const contacts = await Contact2.find();

  res.status(200).json({
    success: true,
    count: contacts.length,
    contacts,
  });
});

// GET SINGLE CONTACT
export const getSingleContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact2.findById(id);

  if (!contact) {
    return next(new ErrorHandler("Contact not found", 404));
  }

  res.status(200).json({
    success: true,
    contact,
  });
});

// DELETE SINGLE CONTACT

export const deleteContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact2.findById(id);

  if (!contact) {
    return next(new ErrorHandler("Contact not found", 404));
  }

  await contact.deleteOne();
  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});
