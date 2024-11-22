import { getHeroSection } from "@/app/backend/hero-section/actions";
import HeroSectionClient from "./HeroSectionClient";
import BrowserForImages from "./Browsers/BrowserForImages";
import { unstable_cache } from 'next/cache';

const getHeroData = unstable_cache(
  async () => {
    const data = await getHeroSection();
    return data.map(hero => ({
      ...hero,
      _id: hero._id.toString()
    }));
  },
  ['hero-data'],
  {
    revalidate: 3600,
    tags: ['hero-data']
  }
);

export default async function HeroSection() {
  const heroData = await getHeroData();

  if (!heroData?.length) {
    return null;
  }

  return (
    <header className="relative flex min-h-screen w-full items-center">
      <div className="section-container w-full relative pb-20 pt-28 md:pt-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <HeroSectionClient 
            heroData={heroData.map(hero => ({
              subHeading: hero.subHeading,
              heading: hero.heading,
              description: hero.description,
              serviceName: hero.serviceName,
              serviceUrl: hero.serviceUrl,
            }))}
          />
          
          <div className="relative w-full">
            <BrowserForImages 
              projectData={heroData.map(hero => ({
                browserHeading: hero.browserHeading,
                browserCatagory: hero.browserCatagory,
                browserOutcome: hero.browserOutcome,
                images: hero.images,
              }))}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
