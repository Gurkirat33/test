import { Home, Users, Settings, BarChart2 } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../LogoutButton";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/backend" },
    { name: "Hero Section", icon: BarChart2, path: "/backend/hero-section" },
    { name: "Services", icon: BarChart2, path: "/backend/services" },
    { name: "Portfolio", icon: Users, path: "/backend/portfolio" },
    { name: "Team Section", icon: Users, path: "/backend/team" },
    { name: "Settings", icon: Settings, path: "/backend/settings" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 top-16 w-64 border-r border-secondary/10 bg-primary-light transition-transform duration-200 ease-in-out`}
    >
      <nav className="flex h-full flex-col justify-between p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-secondary transition-colors hover:bg-primary`}
                >
                  <Icon className="size-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <LogoutButton />
      </nav>
    </div>
  );
}
