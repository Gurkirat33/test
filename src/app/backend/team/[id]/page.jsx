import { getTeamMember } from "./actions";
import TeamForm from "./team-form";

export default async function TeamMemberPage({ params }) {
  const member = await getTeamMember(params.id);
  const isNew = params.id === "new";

  return (
    <div className="min-h-screen bg-primary px-4 py-10">
      <div className="max-w-3xl">
        <h1 className="mb-8 text-3xl font-semibold text-secondary">
          {isNew ? "Add New Team Member" : "Edit Team Member"}
        </h1>
        <TeamForm initialData={member} id={params.id} />
      </div>
    </div>
  );
}
