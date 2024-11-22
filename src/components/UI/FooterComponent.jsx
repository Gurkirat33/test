"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterComponent() {
  const pathname = usePathname();
  const backend = pathname.startsWith("/backend");

  return !backend && <Footer />;
}
