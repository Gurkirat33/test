import { getTeamMembers } from "./actions";
import TeamClient from "./team-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="min-h-screen bg-primary">
      <TeamClient initialTeam={teamMembers} />
    </div>
  );
}
