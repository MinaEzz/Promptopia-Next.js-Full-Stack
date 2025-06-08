import "server-only";
import mongoose from "mongoose";

let isConnected = false;
export const connectDB = async () => {
  if (isConnected) return;
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
