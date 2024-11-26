import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    return;
  }
  try {
    const database = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = database.connections[0].readyState;
  } catch (error) {
    process.exit(1);
  }
}

export default connectDb;