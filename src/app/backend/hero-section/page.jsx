import { getHeroSection } from "./actions";
// import HeroClient from "./hero-client";

import dynamic from "next/dynamic";

const HeroClient = dynamic(
  () => import("./hero-client"),
);

// export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HeroSectionPage() {
  const heroSections = await getHeroSection();
  return <HeroClient initialHeroSections={heroSections} />;
}