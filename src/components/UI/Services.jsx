"use client";

import React from "react";
import { useState } from "react";
import { ChevronUp, ChevronDown, MoveDown } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

const services = [
  {
    id: 1,
    name: "Meet",
    tagline: "Understanding Your Vision",
    description:
      "We don’t just complete projects, we understand your business needs and offer result-oriented solutions that suit your online business and maximize your ROI.",
      buttonName:"Lets Meet",
      buttonLink:"/contact",
    image:
      "/banner1.svg",
  },
  {
    id: 2,
    name: "Plan",
    tagline: "Strategizing for Success",
    description:
      "Whether it is website design, custom coding or development, we know the importance of planning and brainstorming to ensure you are given with the best.",
      buttonName:"Start Planning",
      buttonLink:"/contact",
    image:
      "/banner2.svg",
  },
  {
    id: 3,
    name: "Design & Development",
    tagline: "Bringing Ideas to Life",
    description:
      "We expand on the plan to develop a unique, classy, and visually appealing website and revising the possibilities until a single, clear solution emerges.",
      buttonName:"Start Your Project",
      buttonLink:"/contact",
    image:
      "/banner3.svg",
  },
  {
    id: 4,
    name: "Testing",
    tagline: "Ensuring Perfection",
    description:
      "Our projects undergo stringent testing sessions to ensure the website works great on different screen sizes, like smartphones, tablets and laptops.",
      buttonName:"Start Your Project",
      buttonLink:"/contact",
    image:
      "/banner4.svg",
  },
  {
    id: 5,
    name: "Launch",
    tagline: "Your Digital Success Starts Here",
    description:
      "Now that the solution has been clearly designed, we’ll take your site live to the world by doing all little things that need to be done to launch.",
      buttonName:"Start Your Project",
      buttonLink:"/contact",
    image:
      "/banner5.svg",
  },
];

const ServicesTimeline = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    if (swiper && activeIndex < services.length - 1) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper && activeIndex > 0) {
      swiper.slidePrev();
    }
  };

  return (
    <>
          <div className="bg-extra-bg relative inline-block text-center w-full p-12">
            <span className="block mb-2 text-sm font-medium tracking-[0.3em] gradient-color-text uppercase">How We Work</span>
            <div className="relative">
              <h2 className="text-3xl md:text-6xl font-bold mb-3 relative inline-block">
                <span className="relative inline-block">
                The Momentum
                  <span className="relative gradient-color-text ml-3 inline-block">Process
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] gradient-color"></span>
                  </span>
                </span>
              </h2>
            </div>
              <MoveDown size={40} className="animate-bounce mx-auto mt-4 text-[#d92662]"/>
          </div>
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Right Navigation Section */}
      <div className="absolute bottom-0 right-[3%] xl:right-[9%] top-0 z-20 flex flex-col items-center justify-center">
        <div className="absolute left-0 h-full w-px bg-white/30" />
        <button
          onClick={goPrev}
          className={`absolute top-8 left-10 rounded-full p-2 transition-all duration-300 hover:bg-white/10 ${
            activeIndex === 0 ? "text-gray-500" : "text-white"
          }`}
          disabled={activeIndex === 0}
        >
          <ChevronUp size={24} />
        </button>

        <div className="flex top-4 md:flex-col absolute md:relative right-12  lg:right-0 gap-4 md:gap-14 md:py-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative cursor-pointer"
              onClick={() => swiper?.slideTo(index)}
            >
              <div
                className={`hidden md:block absolute -left-[4px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "scale-125 gradient-color"
                    : "bg-white/50 group-hover:bg-white"
                } ${index < activeIndex ? "bg-white" : ""}`}
              />
              <div
                className={`md:pl-8  text-sm md:text-basefont-medium md:text-lg md:font-bold transition-all duration-300 ${
                  index === activeIndex
                    ? "translate-x-2 gradient-color-text"
                    : "text-white/70 group-hover:text-white"
                }`}
              >
                {service.name}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={goNext}
          className={`absolute bottom-8 left-10 rounded-full p-2 transition-all duration-300 hover:bg-white/10 ${
            activeIndex === services.length - 1 ? "text-gray-500" : "text-white"
          }`}
          disabled={activeIndex === services.length - 1}
        >
          <ChevronDown size={24} />
        </button>
      </div>

      {/* Main Content Section */}
      <Swiper
        direction="vertical"
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full w-full"
        slidesPerView={1}
        speed={800}
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <div className="relative h-full w-full">
              <div className="absolute bg-black md:bg-transparent inset-0 z-10 md:bg-gradient-to-r md:from-black/60 md:via-black/10 md:to-black/60" />

              <img
                src={service.image}
                alt={service.name}
                className="hidden md:block absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 z-20 flex items-center  md:top-[14%]">
                <div className="md:w-[50%] pl-[5%] lg:pl-[3%] xl:pl-[10%] pr-8">
            
                  <div className="space-y-5">
                    <h2 className="text-3xl xl:text-4xl font-semibold leading-tight text-white">
                      {service.name}
                    </h2>
                    {/* <p className="text-gray-200 font-medium text-sm  rounded-full w-fit">{service.tagline}</p> */}
                    <p className="max-w-2xl  text-[15px] tracking-[1px] leading-relaxed text-gray-200">
                      {service.description}
                    </p>

                    <Link href={service.buttonLink} className="w-fit block gradient-color font-medium    px-5 py-2.5 text-tertiary-text">
                      {service.buttonName}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
};

export default ServicesTimeline;
