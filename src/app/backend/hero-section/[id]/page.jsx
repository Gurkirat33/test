"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { getHeroSection } from "../actions";
import HeroForm from "../hero-form";

export default function EditHeroSection({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState(null);
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getHeroSection();
        const foundHero = data.find(h => h._id === id);
        if (foundHero) {
          setHero(foundHero);
        } else {
          router.push("/backend/hero-section");
        }
      } catch (error) {
        console.error("Error fetching hero:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id, router]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!hero) {
    return <div className="text-center py-4">Hero section not found</div>;
  }

  return <HeroForm hero={hero} />;
}
