"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const Carousel = ({ items, carouselRef, checkScrollability }) => {
  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={"mx-auto flex max-w-7xl flex-row justify-start gap-4 pl-4"}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Card = ({ card }) => {
  return (
    <div className="group relative h-[380px] w-[300px] overflow-hidden rounded-2xl md:w-[360px]">
      <div className="absolute inset-0">
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      <div className="absolute bottom-0 z-10 p-6">
        {/* <span className="mb-2 block text-sm font-medium text-indigo-300">
          {card.category}
        </span> */}
        <h3 className="mb-2 text-2xl font-semibold text-white [text-wrap:balance]">
          {card.title}
        </h3>
        <p className="mb-4 text-sm text-gray-200  tracking-[0.5px]">
          {card.description}
        </p>
        <button className="inline-flex items-center text-sm font-medium text-white transition-colors hover:text-indigo-200">
          Read more
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
