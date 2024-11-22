"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertTeamMember } from "./actions";
import { uploadToCloudinary } from "@/utils/uploadImage";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

export default function TeamForm({ initialData, id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadStats, setUploadStats] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id,
    name: initialData?.name || "",
    role: initialData?.role || "",
    imageUrl: initialData?.imageUrl || "",
    order: initialData?.order || 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await upsertTeamMember(formData);
      if (result.success) {
        router.push("/backend/team");
        router.refresh();
      } else {
        setError("Failed to save team member");
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      setError(error.message || "Error saving team member");
    } finally {
      setLoading(false);
    }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-secondary-light">
          Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-border bg-primary p-2.5 text-secondary shadow-sm focus:ring-2 focus:ring-secondary-light"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-light">
          Role
        </label>
        <input
          type="text"
          required
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-border bg-primary p-2.5 text-secondary shadow-sm focus:ring-2 focus:ring-secondary-light"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-light">
          Profile Image
        </label>
        <div className="mt-2">
          {formData.imageUrl ? (
            <div className="relative aspect-square w-40 overflow-hidden rounded-lg border border-border">
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
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-primary-light p-8">
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
        <label className="block text-sm font-medium text-secondary-light">
          Order
        </label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: parseInt(e.target.value) })
          }
          className="mt-1 block w-full rounded-lg border border-border bg-primary p-2.5 text-secondary shadow-sm focus:ring-2 focus:ring-secondary-light"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-border px-4 py-2 text-secondary-light transition-colors hover:text-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Saving..." : "Save Member"}
        </button>
      </div>
    </form>
  );
}
