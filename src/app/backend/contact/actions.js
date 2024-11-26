"use server";

import { getDbConnection } from "@/lib/auth";
import contactModel from "@/models/contact.model";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(formData) {
  const emailContent = `
    New Contact Form Submission
    
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone || 'Not provided'}
    Message: ${formData.message}
    
    Submitted at: ${new Date().toLocaleString()}
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "gurkiratsingh13a@gmail.com",
    subject: `New Contact Form Submission from ${formData.name}`,
    text: emailContent,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d92662;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${formData.message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  };
  console.log(mailOptions);
  await transporter.sendMail(mailOptions);
}

export async function submitContactForm(formData) {
  try {
    await getDbConnection();

    const contact = await contactModel.create({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      message: formData.message,
    });

    await sendEmail(formData);

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
