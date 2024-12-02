"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { uploadToCloudinary } from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "../actions";
import Image from "next/image";

export default function TestimonialForm({ initialData, id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");
  const [uploadStats, setUploadStats] = useState(null);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    image: initialData?.image?.url || initialData?.image || "",
    content: initialData?.content || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      setImageError("Please upload an image file");
      return;
    }

    try {
      setLoading(true);
      setImageError("");
      const imageUrl = await uploadToCloudinary(file, setUploadStats);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageError("Failed to upload image");
    } finally {
      setLoading(false);
      setUploadStats(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    try {
      const action = id === "new" ? createTestimonial : updateTestimonial;
      const result = await (id === "new" 
        ? action(formData)
        : action(id, formData)
      );

      if (result.errors) {
        setFormError(result.errors.join(", "));
        return;
      }

      if (result.success) {
        router.push("/backend/testimonials");
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      setFormError("Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary p-4 sm:p-6 lg:p-8">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-secondary">
              {id === "new" ? "Add New Testimonial" : "Edit Testimonial"}
            </h2>
            <p className="mt-1 text-sm text-secondary-light">
              Fill in the details below to {id === "new" ? "create" : "update"} a testimonial
            </p>
          </div>

          {formError && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
              {formError}
            </div>
          )}

          <div className="space-y-4 rounded-lg bg-primary-light p-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-secondary">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-primary p-2 text-secondary outline-none ring-1 ring-secondary/20 transition-shadow focus:ring-2 focus:ring-secondary/40"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-secondary">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg bg-primary p-2 text-secondary outline-none ring-1 ring-secondary/20 transition-shadow focus:ring-2 focus:ring-secondary/40"
                placeholder="Enter location"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-secondary">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg bg-primary p-2 text-secondary outline-none ring-1 ring-secondary/20 transition-shadow focus:ring-2 focus:ring-secondary/40"
                placeholder="Enter testimonial content"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-secondary">
                Image
              </label>
              <div className="mt-1 flex items-center gap-4">
                {formData.image && (
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                    {console.log(formData)}
                    <Image
                      src={formData.image.url || formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                      className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}
                <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-secondary ring-1 ring-secondary/20 transition-colors hover:bg-primary/80">
                  <Upload className="size-4" />
                  Upload Image
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              {imageError && (
                <p className="mt-1 text-sm text-red-500">{imageError}</p>
              )}
              {uploadStats && (
                <div className="mt-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300"
                      style={{ width: `${uploadStats.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-secondary-light">
                    Uploading: {uploadStats.progress}%
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/backend/testimonials")}
              className="rounded-lg bg-primary-light px-4 py-2 text-sm text-secondary transition-colors hover:bg-primary-light/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="gradient-color rounded-lg px-4 py-2 text-sm text-tertiary-text transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
