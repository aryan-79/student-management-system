import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "SMS",
    });
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connected to db");
  }
};

export default connectDb;
