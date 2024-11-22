import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default function TeamClient({ initialTeam }) {
  return (
    <div className="min-h-screen bg-primary px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-secondary">
              Team Members
            </h2>
            <p className="mt-1 text-sm text-secondary-light">
              Manage your team members and their information
            </p>
          </div>
          <Link
            href={"/backend/team/new"}
            className="gradient-color inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-tertiary-text transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl bg-primary-light shadow">
          <div className="divide-y divide-border">
            {initialTeam.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-6 p-6 transition-colors hover:bg-primary"
              >
                <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-medium text-secondary">
                    {member.name}
                  </h3>
                  <p className="text-sm text-secondary-light">{member.role}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/backend/team/${member.id}`}
                    className="rounded-lg p-2 text-secondary-light transition-colors hover:bg-primary hover:text-secondary"
                    title="Edit Member"
                  >
                    <Pencil className="h-5 w-5" />
                  </Link>
                  <DeleteButton id={member.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
