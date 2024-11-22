"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarComponent() {
  const pathname = usePathname();
  const backend = pathname.startsWith("/backend");

  return !backend && <Navbar />;
  // return <Navbar />;
}
