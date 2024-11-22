"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, Star, Shield } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const useIsFirstRender = () => {
  const isFirst = useRef(true);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  return isFirst.current;
};

export default function HeroSectionClient({ heroData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [heroData.length]);

  if (!heroData?.length) return null;

  const currentHero = heroData[currentIndex];

  return (
    <div className="relative w-full min-h-[400px] flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={isFirstRender ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={!isFirstRender ? { opacity: 0, x: -20 } : undefined}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <span className="gradient-color-text block mb-5 mt-2 font-medium 2xl:block">
            {currentHero.subHeading}
          </span>
          <h1 className="mb-6 text-4xl font-semibold sm:text-5xl lg:text-6xl">
            {currentHero.heading}
          </h1>
          <p className="mb-8 description-text text-base">
            {currentHero.description}
          </p>
          <div className="mb-12 flex gap-2 sm:gap-4  sm:space-y-0">
            <Link 
              href={currentHero.serviceUrl}
              className="gradient-color inline-flex items-center justify-center w-full  px-2 sm:px-4 py-3 md:px-8 md:py-4 font-bold text-tertiary-text sm:w-auto"
            >
              {currentHero.serviceName}
            </Link>
            <Link href={"/contact"} className="block w-full border border-border px-2 sm:px-4 py-3 md:px-8 md:py-4 font-semibold sm:w-auto text-center">
              Book Appointment
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center">
              <Shield className="mr-2 h-6 w-6 text-green-400" />
              <p className="text-secondary">
                100% Satisfaction Guaranteed
              </p>
            </span>
            <span className="flex items-center">
              <Star className="mr-2 h-6 w-6 text-yellow-400" />
              <p className="text-secondary">
                5-Star Rated Agency{" "}
              </p>
            </span>
            <span className="flex items-center">
              <Zap className="mr-2 h-6 w-6 text-blue-400" />
              <p className="text-secondary">
                Lightning Fast Delivery
              </p>
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
