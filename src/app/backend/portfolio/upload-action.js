"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage({ file }) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: "portfolio",
      transformation: [
        { quality: "auto:best" },
        { fetch_format: "auto" },
        { width: 1200, crop: "limit" },
      ],
    });

    return {
      success: true,
      url: result.secure_url,
      originalSize: result.bytes,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message };
  }
}
