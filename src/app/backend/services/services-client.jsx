"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteService } from "./actions";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function ServicesClient({ initialServices }) {
  const [services, setServices] = useState(initialServices);
  const router = useRouter();

  const handleEditService = (id) => {
    router.push(`/backend/services/${id}`);
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const result = await deleteService(id);
      if (result.success) {
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== id),
        );
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="min-h-screen bg-primary px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-secondary">Services</h2>
            <p className="mt-1 text-sm text-secondary-light">
              Manage your services and their content
            </p>
          </div>
          <button
            onClick={() => router.push("/backend/services/new")}
            className="gradient-color inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-tertiary-text transition-colors hover:opacity-90"
          >
            <Plus className="size-4" />
            Add Service
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-primary-light shadow">
          <div className="divide-y divide-secondary/10">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center gap-6 p-6 transition-colors hover:bg-primary"
              >
                <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={service.imageUrl}
                    alt={service.heading}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-medium text-secondary">
                    {service.heading}
                  </h3>
                  <p className="line-clamp-2 text-sm text-secondary-light">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.keyPoints.slice(0, 3).map((point, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-secondary/5 px-2.5 py-0.5 text-xs font-medium text-secondary"
                      >
                        {point}
                      </span>
                    ))}
                    {service.keyPoints.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-secondary/5 px-2.5 py-0.5 text-xs font-medium text-secondary-light">
                        +{service.keyPoints.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditService(service.id)}
                    className="rounded-lg p-2 text-secondary transition-colors hover:bg-primary hover:text-secondary"
                    title="Edit Service"
                  >
                    <Pencil className="size-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    title="Delete Service"
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
