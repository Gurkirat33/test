"use client";

import { Plus, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getHeroSection, deleteHeroSection } from "./actions";
import Image from "next/image";

export default function Page() {
  const [heroSections, setHeroSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroSections();
  }, []);

  const fetchHeroSections = async () => {
    try {
      const data = await getHeroSection();
      setHeroSections(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hero section?")) {
      try {
        await deleteHeroSection(id);
        await fetchHeroSections();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Hero Sections</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage your hero sections and their content
          </p>
        </div>
        <Link
          href="/backend/hero-section/new"
          className="gradient-color inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          <Plus className="size-4" />
          Add Hero Section
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : heroSections.length === 0 ? (
        <div className="text-center py-4">No hero sections found</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {heroSections.map((hero) => (
            <div
              key={hero._id}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                {hero.images.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3]">
                    <Image
                      src={image}
                      alt={`Hero image ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
              <h3 className="font-semibold">{hero.heading}</h3>
              <p className="text-sm text-gray-600 mt-1">{hero.subHeading}</p>
              <p className="text-sm mt-2 line-clamp-2">{hero.description}</p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/backend/hero-section/${hero._id}`}
                  className="inline-flex items-center gap-1 rounded bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
                >
                  <Pencil className="size-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(hero._id)}
                  className="inline-flex items-center gap-1 rounded bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
                >
                  <Trash className="size-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}