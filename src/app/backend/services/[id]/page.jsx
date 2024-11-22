import { getService } from "../actions";
import ServiceForm from "./service-form";

const emptyService = {
  imageUrl: "",
  heading: "",
  description: "",
  keyPoints: "",
  slug: "",
};

export default async function ServiceDetails({ params }) {
  const { id } = params;

  if (id === "new") {
    return <ServiceForm initialData={emptyService} id="new" />;
  }

  try {
    const service = await getService(id);

    if (!service) {
      return <div>Service not found</div>;
    }

    return <ServiceForm initialData={service} id={id} />;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
