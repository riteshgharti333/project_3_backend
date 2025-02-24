import Contact2 from "../models/Contact2Model.js";
import nodemailer from "nodemailer";

import { catchAsyncError } from "../middlewares/catchAsyncError.js";

// CREATE NEW CONTACT
export const newContact = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, eventDetail, howDidYouHearAboutUs } = req.body;

  // Save the contact message in the database
  const newMessage = new Contact2({
    firstName,
    lastName,
    email,
    phoneNumber,
    eventDetail,
    howDidYouHearAboutUs,
  });

  await newMessage.save();

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Email options
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
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="email-content">
              <p><strong>First Name:</strong> ${firstName}</p>
              <p><strong>Last Name:</strong> ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p><strong>Event Detail:</strong> ${eventDetail}</p>
              <p><strong>How Did You Hear About Us?:</strong> ${howDidYouHearAboutUs}</p>
            </div>
            <div class="email-footer">
              <p>Thank you for reaching out!</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(new ErrorHandler("Error sending email", 500));
    }
    console.log("Email sent: " + info.response);
  });

  res.status(201).json({
    success: true,
    message: "Contact message saved successfully, and email sent!",
    contact: newMessage,
  });
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
