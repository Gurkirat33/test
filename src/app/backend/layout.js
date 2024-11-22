"use client";

import { Menu } from "lucide-react";
import Sidebar from "@/components/UI/dashboard/Sidebar";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-primary">
      <div className="fixed left-0 right-0 top-0 z-10 h-16 border-b border-secondary/10 bg-primary-light">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button className="rounded-lg p-2 text-secondary hover:bg-primary">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-secondary">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <Link
              href="/"
              target="_blank"
              className="gradient-color rounded-lg px-4 py-2 text-tertiary-text"
            >
              Go to Frontend
            </Link>
          </div>
        </div>
      </div>

      <Sidebar />

      <div className={`pl-64 pt-16 transition-all duration-200`}>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
