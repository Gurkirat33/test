"use client";

import { Trash2 } from "lucide-react";
import { deleteTeamMember } from "./actions";

export default function DeleteButton({ id }) {
  const handleDeleteMember = async () => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      await deleteTeamMember(id);
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  return (
    <button
      onClick={handleDeleteMember}
      className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50/10 hover:text-red-400"
      title="Delete Member"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}
