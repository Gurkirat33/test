"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/actions/logout";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logoutAction();
      if (result.success) {
        router.push("/signin");
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-secondary transition-colors hover:bg-primary disabled:opacity-50`}
    >
      <LogOut className="size-5" />
      <span>{isPending ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
