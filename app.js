import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./middlewares/error.js";
import authRouter from "./routes/authRoute.js";
import homeBannerRouter from "./routes/homeBannerRoute.js";
import contactRouter from "./routes/contactRoute.js";
import portfolioRouter from "./routes/portfolioRoute.js";
import teamRouter from "./routes/teamRoute.js";

import contact2Router from "./routes/contact2Route.js";

import visitorRouter from "./routes/visiterRoute.js";

import photoAlbumRouter from "./routes/photoAlbumRoute.js";

// Initialize Express app
export const app = express();

// Load environment variables
config({
  path: "./data/config.env",
});

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://project-3-admin-xr5l.vercel.app",
  "https://project003-sigma.vercel.app",
];

// Configure CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies and authorization headers
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/home-banner", homeBannerRouter);
app.use("/api/contact", contactRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/team", teamRouter);

app.use("/api/contact2", contact2Router);

app.use("/api/visitors", visitorRouter);

app.use("/api/photoAlbum", photoAlbumRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Project 3");
});

// Error Middleware
app.use(errorMiddleware);
