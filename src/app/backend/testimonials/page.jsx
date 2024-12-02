import { getTestimonials } from "./actions";
import TestimonialsClient from "./testimonials-client";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <div className="bg-primary">
      <TestimonialsClient initialTestimonials={testimonials} />
    </div>
  );
}