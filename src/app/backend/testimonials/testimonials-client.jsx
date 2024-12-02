"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteTestimonial } from "./actions";
import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";

export default function TestimonialsClient({ initialTestimonials }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const router = useRouter();

  const handleEditTestimonial = (id) => {
    router.push(`/backend/testimonials/${id}`);
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const result = await deleteTestimonial(id);
      if (result.success) {
        setTestimonials((prevTestimonials) =>
          prevTestimonials.filter((testimonial) => testimonial.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="min-h-screen bg-primary px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-secondary">Testimonials</h2>
            <p className="mt-1 text-sm text-secondary-light">
              Manage your testimonials and their content
            </p>
          </div>
          <button
            onClick={() => router.push("/backend/testimonials/new")}
            className="gradient-color inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-tertiary-text transition-colors hover:opacity-90"
          >
            <Plus className="size-4" />
            Add Testimonial
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-primary-light shadow">
          <div className="divide-y divide-secondary/10">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex items-center gap-6 p-6 transition-colors hover:bg-primary"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    width={96}
                    height={96}
                    src={testimonial.image?.url || testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-medium text-secondary">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-secondary-light">
                    {testimonial.location}
                  </p>
                  <p className="line-clamp-2 text-sm text-secondary-light">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditTestimonial(testimonial.id)}
                    className="rounded-lg p-2 text-secondary transition-colors hover:bg-primary hover:text-secondary"
                    title="Edit Testimonial"
                  >
                    <Pencil className="size-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-500/10"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
