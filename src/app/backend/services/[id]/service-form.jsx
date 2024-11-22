"use client";

import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { uploadToCloudinary } from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { createService, updateService } from "../actions";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { 
    ssr: false,
    loading: () => <p className="h-48 w-full animate-pulse rounded-lg bg-primary"></p>
  }
);

export default function ServiceForm({ initialData, id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");
  const [uploadStats, setUploadStats] = useState(null);
  const [formData, setFormData] = useState({
    heading: initialData?.heading || "",
    description: initialData?.description || "",
    longDescription: initialData?.longDescription || "",
    imageUrl: initialData?.imageUrl || "",
    keyPoints: Array.isArray(initialData?.keyPoints) 
      ? initialData.keyPoints.join("\n") 
      : "",
    slug: initialData?.slug || "",
  });

  useEffect(() => {
    console.log("Initial data:", initialData);
    console.log("Current form data:", formData);
  }, [initialData, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Field changed:", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLongDescriptionChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      longDescription: content
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please upload an image file");
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 10) {
      setImageError("File size must be less than 10MB");
      return;
    }

    try {
      setLoading(true);
      setImageError("");
      const result = await uploadToCloudinary(file);

      setFormData((prev) => ({
        ...prev,
        imageUrl: result.url,
      }));

      setUploadStats({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        compressionRatio: result.compressionRatio,
        dimensions: result.report?.dimensions,
      });
    } catch (error) {
      console.error("Upload error:", error);
      setImageError("Failed to upload and compress image");
      setUploadStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
    setUploadStats(null);
    setImageError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    
    try {
      console.log("Form data before submission:", formData);

      const serviceData = {
        heading: formData.heading.trim(),
        description: formData.description.trim(),
        longDescription: formData.longDescription.trim(),
        imageUrl: formData.imageUrl.trim(),
        keyPoints: formData.keyPoints
          .split("\n")
          .map(point => point.trim())
          .filter(point => point),
        slug: formData.slug.trim(),
      };

      console.log("Processed service data:", serviceData);

      let response;
      if (id === "new") {
        response = await createService(serviceData);
      } else {
        response = await updateService(id, serviceData);
      }

      console.log("Server response:", response);

      if (response.success) {
        router.push("/backend/services");
        router.refresh();
      } else {
        throw new Error("Failed to save service");
      }
    } catch (error) {
      console.error("Error saving service:", error);
      setFormError(error.message || "Failed to save service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8 p-6">
      {formError && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{formError}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary">
            Service Title
          </label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-border bg-primary-light px-4 py-2 text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary">
            URL Slug
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-border bg-primary-light px-4 py-2 text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary">
            Service Image
          </label>

          <div className="flex items-start space-x-4">
            <div className="relative h-40 w-40 flex-shrink-0">
              {formData.imageUrl ? (
                <div className="relative h-full w-full overflow-hidden rounded-lg border border-border">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute right-1 top-1 rounded-full bg-secondary/80 p-1 text-white hover:bg-secondary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-border bg-primary-light">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-secondary-light" />
                    <span className="mt-2 block text-sm text-secondary-light">
                      Upload Image
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              )}
            </div>
            {uploadStats && (
              <div className="text-sm text-secondary-light">
                <p>Original size: {uploadStats.originalSize}</p>
                <p>Compressed size: {uploadStats.compressedSize}</p>
                <p>Reduction: {uploadStats.compressionRatio}%</p>
                {uploadStats.dimensions && (
                  <p>
                    Dimensions: {uploadStats.dimensions.width}x
                    {uploadStats.dimensions.height}
                  </p>
                )}
              </div>
            )}
          </div>
          {imageError && (
            <p className="mt-2 text-sm text-red-500">{imageError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary">
            Short Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-border bg-primary-light px-4 py-2 text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            required
            placeholder="Brief overview of the service"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Long Description
          </label>
          <div className="rounded-lg border border-border overflow-hidden">
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={formData.longDescription}
              onEditorChange={handleLongDescriptionChange}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                skin: (typeof window !== 'undefined' && document.documentElement.classList.contains('dark')) ? 'oxide-dark' : 'oxide',
                content_css: (typeof window !== 'undefined' && document.documentElement.classList.contains('dark')) ? 'dark' : 'default'
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary">
            Key Points (one per line)
          </label>
          <textarea
            name="keyPoints"
            value={formData.keyPoints}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-lg border border-border bg-primary-light px-4 py-2 text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Enter key points, one per line"
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push("/backend/services")}
          className="rounded-lg border border-border px-4 py-2 text-secondary hover:bg-primary-light"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="gradient-color rounded-lg px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
