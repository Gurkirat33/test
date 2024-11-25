"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const useIsFirstRender = () => {
  const isFirst = useRef(true);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  return isFirst.current;
};

export default function BrowserForImages({ projectData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === projectData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [projectData.length]);

  if (!projectData?.length) return null;

  const currentProject = projectData[currentIndex];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="relative border-b border-gray-200 bg-gray-100 p-2">
          <div className="absolute left-2 flex space-x-1">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto w-4/5 max-w-md rounded-md bg-white px-4 py-1 text-center text-xs text-gray-500">
            www.giftechies.com
          </div>
        </div>

        <div className="relative h-[420px] bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 p-4"
              initial={isFirstRender ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={!isFirstRender ? { opacity: 0, x: -20 } : undefined}
              transition={{ duration: 0.5 }}
            >
              <div className="flex h-full flex-col">
                <div className="relative flex-1">
                  <div className="absolute inset-0">
                    <div className="h-full">
                      <motion.img
                        src={currentProject.images[0]}
                        alt="Project preview"
                        className="h-full w-full rounded-lg shadow-md object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {currentProject.browserOutcome && (
                    <div className="absolute bottom-0 right-0 rounded-lg bg-white/80 px-2 py-2 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="px-3 text-sm font-bold text-black">
                          {currentProject.browserOutcome}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>         
        </div>
      </div>
    </div>
  );
}
