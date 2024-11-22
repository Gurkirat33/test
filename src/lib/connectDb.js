import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const database = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = database.connections[0].readyState;
    console.log("Db connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

export default connectDb;