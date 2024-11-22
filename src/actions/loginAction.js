"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { findUserByUsername } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function loginAction(_, formData) {
  try {
    const { username, password } = formData;

    if (!username || !password) {
      return { error: "Please provide username and password" };
    }

    const user = await findUserByUsername(username);

    if (!user) {
      return { error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user._id.toString() })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    cookies().set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login" };
  }
}
