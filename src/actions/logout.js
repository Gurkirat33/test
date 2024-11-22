"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  try {
    cookies().delete("accessToken");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Failed to logout" };
  }
}
