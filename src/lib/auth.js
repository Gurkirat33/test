import mongoose from "mongoose";
import { cache } from "react";
import Admin from "@/models/admin";

export const getDbConnection = cache(async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Using existing database connection");
      return mongoose.connection;
    }

    const database = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("Database connected successfully");
    return database.connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to database");
  }
});

export const findUserByUsername = cache(async (username) => {
  try {
    await getDbConnection();

    const user = await Admin.findOne({ username })
      .select("+password")
      .lean()
      .exec();

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw new Error("Failed to find user");
  }
});
