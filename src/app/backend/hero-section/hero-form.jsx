"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/utils/uploadImage";
import { Upload } from "lucide-react";
import { createHeroSection } from "./actions";
import { useRouter } from "next/navigation";

export default function HeroForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [formData, setFormData] = useState({
    subHeading: "",
    heading: "",
    description: "",
    serviceName: "",
    serviceUrl: "",
    browserOutcome: ""
  });

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Please select only image files");
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError("Each image must be less than 10MB");
        return;
      }
    }

    setImages(files);
    setError("");
  };

  const handleUpload = async () => {
    if (!images[0]) {
      setError("Please select 4 images first");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const urls = [];
      for (let i = 0; i < 1; i++) {
        const result = await uploadToCloudinary(images[i]);
        if (!result?.url) {
          throw new Error(`Failed to upload image ${i + 1}`);
        }
        urls.push(result.url);
      }
      setUploadedUrls(urls);
      return urls;
    } catch (err) {
      setError(err.message || "Failed to upload images");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const imageUrls = await handleUpload();
      if (!imageUrls) return;

      const requiredFields = [
        'subHeading',
        'heading',
        'description',
        'serviceName',
        'serviceUrl',
      ];

      for (const field of requiredFields) {
        if (!formData[field]?.trim()) {
          throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        }
      }

      const result = await createHeroSection({
        ...formData,
        images: imageUrls
      });

      if (!result?.success) {
        throw new Error(result?.error || "Failed to save hero section");
      }

      router.push("/backend/hero-section");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to save hero section");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Sub Heading</label>
          <input
            type="text"
            value={formData.subHeading}
            onChange={(e) => setFormData(prev => ({...prev, subHeading: e.target.value}))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Heading</label>
          <input
            type="text"
            value={formData.heading}
            onChange={(e) => setFormData(prev => ({...prev, heading: e.target.value}))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Service Name</label>
          <input
            type="text"
            value={formData.serviceName}
            onChange={(e) => setFormData(prev => ({...prev, serviceName: e.target.value}))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Service URL</label>
          <input
            type="text"
            value={formData.serviceUrl}
            onChange={(e) => setFormData(prev => ({...prev, serviceUrl: e.target.value}))}
            className="w-full p-2 border rounded"
            required
          />
        </div>


       

        <div>
          <label className="block text-sm font-medium mb-2">Browser Outcome</label>
          <input
            type="text"
            value={formData.browserOutcome}
            onChange={(e) => setFormData(prev => ({...prev, browserOutcome: e.target.value}))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          
          <input
            type="file"
            accept="image/*"
            
            onChange={handleImageSelect}
            className="hidden"
            id="images"
            disabled={loading}
          />
          <label
            htmlFor="images"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-400"
          >
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <span className="text-sm text-gray-500">
              {images[0] 
                ? `Selected ${images.length} image` 
                : "Click to select 1 image"}
            </span>
          </label>
        </div>

        {images[0] && (
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !images[0]}
        className={`w-full p-3 text-white rounded-lg ${
          loading || !images[0]
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Saving..." : "Save Hero Section"}
      </button>
    </form>
  );
}
