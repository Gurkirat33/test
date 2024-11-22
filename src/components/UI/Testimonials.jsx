import React from "react";
import { testimonials } from "../data/TestimonialsData";
import Image from "next/image";

const TestimonialCard = ({ testimonial }) => (
  <div className="group relative w-full rounded-xl shadow-md  bg-primary-light p-6 md:p-8">

    <p className="relative z-10 mb-8  leading-relaxed description-text">
      {testimonial.content}
    </p>

    <div className="relative z-10 flex items-start gap-4">
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        width={100}
        height={100}
        className="h-12 w-12 rounded-full object-cover border-2 border-[#d92662]"
      />
      <div className="flex-1">
        <h4 className="text-base font-medium text-secondary">
          {testimonial.name}
        </h4>
        <p className="mb-1 text-sm text-secondary-light">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const TestimonialColumn = ({ testimonials, speed, index }) => (
  <div
    className={`relative h-[800px] overflow-hidden md:h-[700px] ${index == 2 ? "hidden md:flex" : ""} ${index == 3 ? "hidden lg:flex" : ""}`}
  >
    <div
      className="animate-scroll absolute flex w-full flex-col gap-6"
      style={{
        animation: `scroll ${speed}s linear infinite`,
      }}
    >
      {[...testimonials, ...testimonials].map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      <div className="relative z-10 mb-8 text-center">
        <div className="mb-4">
          <div className="relative inline-block">
            <span className="block mb-2 text-sm font-medium tracking-[0.3em] gradient-color-text uppercase">What People Think</span>
            <div className="relative">
              <h2 className="text-3xl md:text-6xl font-bold mb-3 relative inline-block">
                <span className="relative inline-block">
                  Loved by
                  <span className="relative gradient-color-text ml-3 inline-block">
                    thousands
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] gradient-color"></span>
                  </span>
                </span>
              </h2>
            </div>
            <p className="mt-6 md:text-xl text-secondary-light/90 max-w-2xl mx-auto">
              Join our thriving community of satisfied users who have transformed their experience with us
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-40" />

      <div className="section-container relative">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <TestimonialColumn
            testimonials={testimonials[0]}
            speed="20"
            index={1}
          />
          <TestimonialColumn
            testimonials={testimonials[1]}
            speed="26"
            index={2}
          />
          <TestimonialColumn
            testimonials={testimonials[2]}
            speed="20"
            index={3}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
