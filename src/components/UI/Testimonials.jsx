import React from "react";
import { testimonials } from "../data/TestimonialsData";
import Image from "next/image";

const TestimonialCard = ({ testimonial }) => (
  <div className="group relative flex-shrink-0 w-[350px] md:w-[400px] rounded-lg bg-primary-light overflow-hidden">
    <div className="flex gap-2">
      <div className="relative w-[120px]">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          className="object-cover h-full"
          width={120}
          height={180}
          style={{ height: '180px' }}
        />
      </div>
      <div className="flex-1 py-6 px-3">
        <div className="mb-2">
          <h4 className="font-semibold mb-0.5">
            {testimonial.name}
          </h4>
          <p className="text-sm text-secondary-light">{testimonial.location}</p>
        </div>
        <p className="text-secondary-light text-[13px] tracking-wider -mt-0.5">
          {testimonial.content}
        </p>
      </div>
    </div>
  </div>
);

const InfiniteSlider = ({ items, direction = "left", speed = 35, className = "" }) => {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div className="animate-slide flex gap-6" 
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal"
        }}>
        {items.map((testimonial, idx) => (
          <TestimonialCard key={`${testimonial.name}-${idx}`} testimonial={testimonial} />
        ))}
        {items.map((testimonial, idx) => (
          <TestimonialCard key={`${testimonial.name}-repeat-${idx}`} testimonial={testimonial} />
        ))}
      </div>
      <div 
        className="animate-slide flex gap-4" 
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal"
        }}
        aria-hidden={true}
      >
        {items.map((testimonial, idx) => (
          <TestimonialCard key={`${testimonial.name}-${idx}-2`} testimonial={testimonial} />
        ))}
        {items.map((testimonial, idx) => (
          <TestimonialCard key={`${testimonial.name}-repeat-${idx}-2`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <div className="relative py-12 overflow-hidden bg-primary">
       <div className="relative inline-block text-center w-full p-12">
    
    <span className="block mb-2 text-sm font-medium tracking-[0.3em] gradient-color-text uppercase">What Our Clients Say

</span>
    <div className="relative">
      <h2 className="text-3xl md:text-6xl font-bold mb-3 relative inline-block">
        <span className="relative inline-block">
        Real Stories, Real 
          <span className="relative gradient-color-text ml-3 inline-block">Success
            <span className="absolute -bottom-2 left-0 w-full h-[2px] gradient-color"></span>
          </span>
        </span>
      </h2>
    </div>
  </div>
      <div className="flex flex-col gap-6">
        <InfiniteSlider items={testimonials[0]} speed={50} direction="left" />
        <InfiniteSlider items={testimonials[1]} speed={40} direction="right" className="" />
        {/* <InfiniteSlider items={testimonials[2]} speed={50} direction="left" /> */}
      </div>
    </div>
  );
};

export default TestimonialsSection;
