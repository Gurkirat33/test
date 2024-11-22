import { getTeamMembers } from "./team/actions";
import { getPortfolioItems } from "./portfolio/actions";
import { getServices } from "./services/actions";
import {  Users, Briefcase, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [team, portfolio, services] = await Promise.all([
    getTeamMembers(),
    getPortfolioItems(),
    getServices(),
  ]);

  const stats = [
    {
      label: "Team Members",
      value: team.length,
      icon: Users,
      href: "/backend/team",
      color: "text-secondary",
      bgColor: "bg-secondary/5",
    },
    {
      label: "Portfolio Items",
      value: portfolio.length,
      icon: ImageIcon,
      href: "/backend/portfolio",
      color: "text-secondary",
      bgColor: "bg-secondary/5",
    },
    {
      label: "Services",
      value: services.length,
      icon: Briefcase,
      href: "/backend/services",
      color: "text-secondary",
      bgColor: "bg-secondary/5",
    },
  ];

  return (
    <div className="min-h-screen bg-primary px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-secondary">Dashboard</h1>
          <p className="mt-1 text-secondary-light">
            Welcome back! Here's an overview of your content.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative overflow-hidden rounded-xl bg-primary-light p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-between">
                <div>
                  <stat.icon className={`${stat.color} size-6`} />
                  <p className="mt-4 text-2xl font-semibold text-secondary">
                    {stat.value}
                  </p>
                  <p className="text-secondary-light">{stat.label}</p>
                </div>
                <div
                  className={`flex size-12 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <ArrowUpRight className={`${stat.color} size-6`} />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 w-full bg-gradient-to-r from-secondary/20 to-transparent" />
            </Link>
          ))}
        </div>

        {/* Recent Items */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Team Members */}
          <div className="rounded-xl bg-primary-light p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary">Recent Team Members</h2>
              <Link
                href="/backend/team"
                className="flex items-center gap-2 text-secondary-light transition-colors hover:text-secondary"
              >
                View all <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="space-y-4">
              {team.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 rounded-lg bg-primary p-4"
                >
                  <div className="relative size-12 overflow-hidden rounded-lg">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary">{member.name}</h3>
                    <p className="text-sm text-secondary-light">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Portfolio Items */}
          <div className="rounded-xl bg-primary-light p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary">Recent Portfolio</h2>
              <Link
                href="/backend/portfolio"
                className="flex items-center gap-2 text-secondary-light transition-colors hover:text-secondary"
              >
                View all <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="space-y-4">
              {portfolio.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg bg-primary p-4"
                >
                  <div className="relative size-12 overflow-hidden rounded-lg">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary">{item.title}</h3>
                    <p className="text-sm text-secondary-light">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
