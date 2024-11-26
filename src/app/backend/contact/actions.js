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

export async function getContacts() {
  try {
    await getDbConnection();
    
    const contacts = await contactModel
      .find({})
      .sort({ createdAt: -1 })
      .lean();

    return {
      contacts: contacts.map(contact => ({
        id: contact._id.toString(),
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        message: contact.message,
        createdAt: contact.createdAt,
      }))
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }
}
