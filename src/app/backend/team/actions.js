"use server";

import { getDbConnection } from "@/lib/auth";
import teamModel from "@/models/team.model";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
  try {
    await getDbConnection();
    const members = await teamModel.find().sort({ order: 1 });

    return members.map((member) => ({
      id: member._id.toString(),
      name: member.name,
      role: member.role,
      imageUrl: member.imageUrl,
      order: member.order || 0,
    }));
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error("Failed to fetch team members");
  }
}

export async function upsertTeamMember(data) {
  try {
    await getDbConnection();

    const memberData = {
      name: data.name,
      role: data.role,
      imageUrl: data.imageUrl,
      order: data.order || 0,
    };

    if (data.id === "new") {
      await teamModel.create(memberData);
    } else {
      await teamModel.findByIdAndUpdate(data.id, memberData);
    }

    revalidatePath("/backend/team");
    return { success: true };
  } catch (error) {
    console.error("Error upserting team member:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTeamMember(id) {
  try {
    await getDbConnection();
    await teamModel.findByIdAndDelete(id);
    revalidatePath("/backend/team");
    return { success: true };
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { success: false, error: error.message };
  }
}
