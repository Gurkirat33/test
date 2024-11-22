import connectDb from "@/lib/connectDb";
import Admin from "@/models/admin";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDb();

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    const newAdmin = new Admin({
      username,
      password,
    });

    await newAdmin.save();

    console.log("Admin user added successfully:", newAdmin);

    return NextResponse.json(
      { message: "Admin user created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding admin user:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 },
    );
  } finally {
    await mongoose.connection.close();
  }
}
