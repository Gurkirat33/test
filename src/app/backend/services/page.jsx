import { getDbConnection } from "@/lib/auth";
import serviceModel from "@/models/service.model";
import ServicesClient from "./services-client";
import { unstable_cache } from 'next/cache';

export const revalidate = 3600;

const serializeService = (service) => ({
  id: service._id.toString(),
  imageUrl: service.imageUrl || "",
  heading: service.heading || "",
  description: service.description || "",
  keyPoints: Array.isArray(service.keyPoints) ? service.keyPoints : [],
  slug: service.slug || "",
});

const getServices = unstable_cache(
  async () => {
    try {
      await getDbConnection();
      const services = await serviceModel.find({}).lean();
      return services.map(serializeService);
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  },
  ['services-data'],
  {
    revalidate: 3600,
    tags: ['services-data']
  }
);

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="bg-primary">
      <ServicesClient initialServices={services} />
    </div>
  );
}
