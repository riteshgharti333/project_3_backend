import mongoose from "mongoose";

let isConnected = false;   // ✅ Flag to track connection status
let retryAttempts = 0;      // ✅ Counter for retries
const MAX_RETRIES = 5;      // ✅ Maximum retry limit
const RETRY_INTERVAL = 5000; // ✅ 5 seconds interval

export const connectDB = async () => {
  if (isConnected) {
    console.log("⚠️ Already connected to MongoDB. Skipping reconnection.");
    return;  // Prevent multiple connections
  }

  console.log("🔌 Connecting to MongoDB...");

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 8000,   // Timeout after 8 sec
      socketTimeoutMS: 45000,           // Close inactive sockets after 45 sec
      connectTimeoutMS: 10000,          // Connection timeout
      maxPoolSize: 20,                  // Max concurrent connections
      minPoolSize: 5,                   // Min idle connections
      autoIndex: true,                  // Auto create indexes
      family: 4,                        // Use IPv4
    });

    console.log("✅ MongoDB Connected");
    isConnected = true;                // ✅ Mark as connected
    retryAttempts = 0;                  // ✅ Reset retry attempts

    // ✅ MongoDB Event Listeners (No infinite loop)
    mongoose.connection.on("disconnected", () => {
      console.log("🔌 MongoDB Disconnected.");
      isConnected = false;
      if (retryAttempts < MAX_RETRIES) {
        console.log(`🔄 Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
        setTimeout(() => connectDB(), RETRY_INTERVAL);
        retryAttempts++;
      } else {
        console.error("❌ Max retries reached. Check MongoDB server.");
      }
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔗 MongoDB Reconnected.");
      isConnected = true;
      retryAttempts = 0;  // ✅ Reset retry attempts
    });

    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB Connection Error:", error);

      if (!isConnected && retryAttempts < MAX_RETRIES) {
        console.log(`🔄 Retrying due to error... Attempt ${retryAttempts + 1}`);
        retryAttempts++;
        setTimeout(() => connectDB(), RETRY_INTERVAL);
      } else if (retryAttempts >= MAX_RETRIES) {
        console.error("❌ Max retries reached. Check MongoDB server.");
      }
    });

    // ✅ Graceful shutdown handling
    process.on("SIGINT", async () => {
      console.log("🚦 Closing MongoDB connection...");
      await mongoose.connection.close();
      console.log("✅ MongoDB connection closed.");
      process.exit(0);
    });

  } catch (error) {
    console.error("❌ Initial MongoDB Connection Failed:", error);

    if (!isConnected && retryAttempts < MAX_RETRIES) {
      console.log(`🔄 Retrying initial connection... Attempt ${retryAttempts + 1}`);
      retryAttempts++;
      setTimeout(() => connectDB(), RETRY_INTERVAL);
    } else {
      console.error("❌ Max retries reached. Check MongoDB server.");
    }
  }
};
