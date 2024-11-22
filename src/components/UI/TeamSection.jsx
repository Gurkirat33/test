import Image from "next/image";
import { getTeamMembers } from "@/app/backend/team/actions";

export default async function TeamSection() {
  const members = await getTeamMembers();

  return (
    <section className="w-full bg-primary-light py-16 rounded-md">
      <div className="section-container">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-secondary">The Team Behind Your Success</h2>
        <p className="mt-4 text-secondary-light">
          Passionate professionals dedicated to bringing your vision to life
        </p>
      </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member) => (
            <div key={member.id} className="group relative">
              <div className="relative mb-4 aspect-[3/4]">
                <div className="absolute inset-3 border border-border/10" />
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#d92662]" />
                <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#d92662]" />
                <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#d92662]" />
                <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#d92662]" />

                <div className="absolute inset-0 bg-black/20 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white p-4 text-sm font-medium">
                    {member.role}
                  </p>
                </div>

                <div className="absolute -right-8 bottom-0 h-1/2">
                  <p className="vertical-text h-full flex  text-lg font-bold tracking-wider text-secondary">
                    {member.name}
                  </p>
                </div>
              </div>

            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
