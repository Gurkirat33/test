"use server";

import { getDbConnection } from "@/lib/auth";
import teamModel from "@/models/team.model";
import { revalidatePath } from "next/cache";

export async function getTeamMember(id) {
  if (id === "new") return null;

  try {
    await getDbConnection();
    const member = await teamModel.findById(id);
    if (!member) return null;

    return {
      id: member._id.toString(),
      name: member.name,
      role: member.role,
      imageUrl: member.imageUrl,
      order: member.order,
    };
  } catch (error) {
    console.error("Error fetching team member:", error);
    return null;
  }
}

export async function getTeamMembers() {
  try {
    await getDbConnection();
    const members = await teamModel.find().sort({ order: 1 });
    return members.map((member) => ({
      id: member._id.toString(),
      name: member.name,
      role: member.role,
      imageUrl: member.imageUrl,
      order: member.order,
    }));
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error("Failed to fetch team members");
  }
}

export async function upsertTeamMember(data) {
  try {
    await getDbConnection();

    if (data.id === "new") {
      await teamModel.create({
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl,
        socialLinks: data.socialLinks,
        order: data.order,
      });
    } else {
      await teamModel.findByIdAndUpdate(data.id, {
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl,
        socialLinks: data.socialLinks,
        order: data.order,
      });
    }

    revalidatePath("/backend/team");
    return { success: true };
  } catch (error) {
    console.error("Error upserting team member:", error);
    return { success: false, error: error.message };
  }
}
