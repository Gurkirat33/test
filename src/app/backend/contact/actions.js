"use server";

import { getDbConnection } from "@/lib/auth";
import contactModel from "@/models/contact.model";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData) {
  try {
    await getDbConnection();

    const contact = await contactModel.create({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      message: formData.message,
    });

    revalidatePath("/backend/leads");
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: error.message };
  }
}

export async function getContacts(page = 1, limit = 10) {
  try {
    await getDbConnection();
    
    const contacts = await contactModel
      .find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await contactModel.countDocuments();

    return {
      contacts: contacts.map(contact => ({
        id: contact._id.toString(),
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        message: contact.message,
        status: contact.status,
        createdAt: contact.createdAt,
      })),
      total,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }
}
