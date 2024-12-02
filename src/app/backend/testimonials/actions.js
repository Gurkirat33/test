"use server";

import { getDbConnection } from "@/lib/auth";
import testimonialModel from "@/models/testimonials.model";
import { revalidatePath } from "next/cache";

const serializeTestimonial = (testimonial) => {
  const serialized = {
    id: testimonial._id.toString(),
    name: testimonial.name || "",
    location: testimonial.location || "",
    image: testimonial.image || "",
    content: testimonial.content || ""
  };
  return serialized;
};

const validateTestimonial = (data) => {
  const errors = [];
  if (!data.name?.trim()) {
    errors.push("Name is required");
  }
  
  if (!data.location?.trim()) {
    errors.push("Location is required");
  }

  if (!data.content?.trim()) {
    errors.push("Content is required");
  }
  return errors;
};

export async function getTestimonial(id) {
  try {
    await getDbConnection();
    const testimonial = await testimonialModel.findById(id);
    return testimonial ? serializeTestimonial(testimonial) : null;
  } catch (error) {
    console.error("Error getting testimonial:", error);
    throw new Error("Failed to get testimonial");
  }
}

export async function deleteTestimonial(id) {
  try {
    await getDbConnection();
    await testimonialModel.findByIdAndDelete(id);
    revalidatePath("/backend/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw new Error("Failed to delete testimonial");
  }
}

export async function updateTestimonial(id, data) {
  try {
    const errors = validateTestimonial(data);
    if (errors.length > 0) {
      return { errors };
    }

    await getDbConnection();
    const testimonial = await testimonialModel.findById(id);

    if (!testimonial) {
      return { errors: ["Testimonial not found"] };
    }

    testimonial.name = data.name;
    testimonial.location = data.location;
    testimonial.image = data.image;
    testimonial.content = data.content;

    await testimonial.save();
    revalidatePath("/backend/testimonials");
    revalidatePath("/");

    return { success: true, data: serializeTestimonial(testimonial) };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw new Error("Failed to update testimonial");
  }
}

export async function createTestimonial(data) {
  try {
    console.log(1)
    const errors = validateTestimonial(data);
    if (errors.length > 0) {
        return { errors };
    }
    console.log(2)

    await getDbConnection();
    console.log("Data from backedn",data);
    const testimonial = await testimonialModel.create({
      name: data.name,
      location: data.location,
      image: data.image.url,
      content: data.content
    });
    
    revalidatePath("/backend/testimonials");
    revalidatePath("/");

    return { success: true, data: serializeTestimonial(testimonial) };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw new Error("Failed to create testimonial");
  }
}

export async function getTestimonials() {
  try {
    await getDbConnection();
    const testimonials = await testimonialModel.find().sort({ createdAt: -1 });
    return testimonials.map(serializeTestimonial);
  } catch (error) {
    console.error("Error getting testimonials:", error);
    throw new Error("Failed to get testimonials");
  }
}