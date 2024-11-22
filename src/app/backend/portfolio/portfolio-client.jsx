"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { deletePortfolio } from "./actions";
import Image from "next/image";

export default function PortfolioClient({ initialPortfolio }) {
  const [portfolios, setPortfolios] = useState(initialPortfolio);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  const handleEditPortfolio = (id) => {
    router.push(`/backend/portfolio/${id}`);
  };

  const handleDeletePortfolio = async (id) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return;
    
    try {
      setDeletingId(id);
      const result = await deletePortfolio(id);
      
      if (result?.success) {
        setPortfolios((prev) =>
          prev.filter((portfolio) => portfolio.id !== id)
        );
        router.refresh();
      } else {
        console.error("Failed to delete portfolio:", result?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container mx-auto min-h-screen space-y-8 px-4 py-10">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold text-secondary">Portfolio Section</p>
        <button
          onClick={() => router.push("/backend/portfolio/new")}
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-tertiary-text transition-colors hover:bg-secondary/90"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className="group relative overflow-hidden rounded-xl bg-primary-light p-6 transition hover:shadow-lg"
          >
            <div className="flex items-start gap-6">
              <div className="relative aspect-video w-48 overflow-hidden rounded-lg">
                <Image
                  src={portfolio.imageUrl}
                  alt={portfolio.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium text-secondary">
                  {portfolio.title}
                </h3>
                <p className="mt-2 text-secondary-light">{portfolio.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {portfolio.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-secondary/5 px-3 py-1 text-sm text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditPortfolio(portfolio.id)}
                  className="rounded-lg bg-primary p-2 text-secondary transition-colors hover:bg-secondary hover:text-tertiary-text"
                >
                  <Pencil className="size-5" />
                </button>
                <button
                  onClick={() => handleDeletePortfolio(portfolio.id)}
                  disabled={deletingId === portfolio.id}
                  className="rounded-lg bg-primary p-2 text-secondary transition-colors hover:bg-red-500 hover:text-white disabled:opacity-50"
                >
                  {deletingId === portfolio.id ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Trash2 className="size-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
