import React from "react";
import {
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const IMAGE_CONFIG = {
  width: 1200,
  height: 675,
  quality: 90,
  className: "object-cover w-full h-full",
};

export const ServiceCard = ({
  heading,
  icon,
  description,
  keyPoints,
  imageUrl,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-primary-light">
      <div className="relative h-[270px]">
        <Image
          src={imageUrl}
          alt={heading}
          fill
          quality={IMAGE_CONFIG.quality}
          className={IMAGE_CONFIG.className}
          priority
        />
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h3 className="mb-3 text-2xl font-semibold tracking-tight text-secondary">
            {heading}
          </h3>
          <p className="text-secondary-light">{description}</p>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {keyPoints.map((point, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-secondary"
            >
              <div className="gradient-color mr-2 h-1 w-1 rounded-full" />
              {point}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <Link
            href=""
            className="gradient-color-text inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
          >
            Explore Service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
