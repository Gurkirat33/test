"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolio, updatePortfolio } from "../actions";
import { uploadToCloudinary } from "@/utils/uploadImage";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

export default function PortfolioForm({ initialData }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    imageUrl: initialData?.imageUrl || "",
    tags: initialData?.tags?.join(", ") || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadStats, setUploadStats] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const processedTags = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag);

      const portfolioData = {
        title: formData.title.trim(),
        imageUrl: formData.imageUrl,
        tags: processedTags,
      };

      const result = initialData?.id
        ? await updatePortfolio(initialData.id, portfolioData)
        : await createPortfolio(portfolioData);

      if (result.success) {
        router.push("/backend/portfolio");
        router.refresh();
      } else {
        setError(result.error || "Failed to save portfolio item");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "Failed to save portfolio item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    const maxSize = 10 * 1024 * 1024; 
    if (file.size > maxSize) {
      setError("Image size must be less than 10MB");
      return;
    }

    try {
      setUploadingImage(true);
      setError("");

      const result = await uploadToCloudinary(file);

      setFormData(prev => ({ ...prev, imageUrl: result.url }));
      setUploadStats({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        compressionRatio: result.compressionRatio,
        dimensions: result.report?.dimensions,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(error.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: "" }));
    setUploadStats(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8 p-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-border bg-primary p-2.5 text-secondary placeholder-secondary-light/50 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter project title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary">
            Project Image
          </label>
          <div className="mt-2">
            {formData.imageUrl ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                <Image
                  src={formData.imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-2 top-2 rounded-full bg-secondary/80 p-1 text-white hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
                {uploadStats && (
                  <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    {uploadStats.dimensions} • {uploadStats.originalSize} → {uploadStats.compressedSize} ({uploadStats.compressionRatio} reduction)
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-primary-light p-12">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                    {uploadingImage ? (
                      <Loader2 className="h-6 w-6 animate-spin text-secondary" />
                    ) : (
                      <Upload className="h-6 w-6 text-secondary" />
                    )}
                  </div>
                  <div className="mt-4 flex text-sm leading-6 text-secondary">
                    <label className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-secondary-light">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-border bg-primary p-2.5 text-secondary placeholder-secondary-light/50 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter tags separated by commas"
            required
          />
          <p className="mt-1 text-sm text-secondary-light">
            Separate tags with commas (e.g., Web Design, UI/UX, Branding)
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || uploadingImage}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
