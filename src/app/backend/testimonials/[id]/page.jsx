import { getTestimonial } from "../actions";
import TestimonialForm from "./testimonial-form";

const emptyTestimonial = {
  name: "",
  location: "",
  image: "",
  content: "",
};

export default async function TestimonialDetails({ params }) {
  const { id } = params;

  if (id === "new") {
    return <TestimonialForm initialData={emptyTestimonial} id="new" />;
  }

  try {
    const testimonial = await getTestimonial(id);

    if (!testimonial) {
      return <div>Testimonial not found</div>;
    }

    return <TestimonialForm initialData={testimonial} id={id} />;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
