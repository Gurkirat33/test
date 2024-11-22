"use client";

import DemoImage from "../../../public/demo.jpeg";
import DemoImage2 from "../../../public/demo2.avif";
import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Card, Carousel } from "./BlogSection";

export default function BlogSection() {
  const carouselRef = useRef(null);
  const initialScroll = 0;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="h-full w-full py-6 md:py-20 dark:bg-primary-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h2 className="pl-4 font-sans text-3xl font-bold  md:text-5xl">
          Blog Section
        </h2>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
      <Carousel
        items={cards}
        carouselRef={carouselRef}
        checkScrollability={checkScrollability}
      />
    </div>
  );
}

export const data = [
  {
    category: "Productivity",
    title: "Clever Ways to Organize Your Life",
    description:
      " Throughout this guide, you'll find practical resources, recommended readings, and actionable tips for better organization.",
    src: DemoImage,
  },
  {
    category: "Technology",
    title: "Technology is Transforming Our World",
    description:
      "Explore how cutting-edge technology is reshaping various aspects of our daily lives and business operations.",
    src: DemoImage2,
  },
  {
    category: "Lifestyle",
    title: "Streamline Your Daily Routines",
    description:
      "Discover tips and tools to enhance productivity, reduce stress, and make your day-to-day tasks more manageable.",
    src: DemoImage2,
  },
  {
    category: "Innovation",
    title: "Smart Apps to Maximize Productivity",
    description:
      "Uncover a range of solutions using minimalist techniques designed to improve your workflow and efficiency.",
    src: DemoImage,
  },
  {
    category: "Innovation",
    title: "Smart Apps to Maximize Productivity",
    description:
      "Uncover a range of solutions using minimalist techniques designed to improve your workflow and efficiency.",
    src: DemoImage,
  },
  {
    category: "Innovation",
    title: "Smart Apps to Maximize Productivity",
    description:
      "Uncover a range of solutions using minimalist techniques designed to improve your workflow and efficiency.",
    src: DemoImage,
  },
];
