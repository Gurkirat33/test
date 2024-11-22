import Breadcrumb from "@/components/UI/Breadcrumb";
import ServiceForm from "@/components/UI/ServiceForm";
import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import { getDbConnection } from "@/lib/auth";
import serviceModel from "@/models/service.model";
import { unstable_cache } from 'next/cache';
import Image from "next/image";
import ServicesSidebar from "@/components/UI/ServicesSidebar";

export const revalidate = 3600;

const getServiceBySlug = unstable_cache(
  async (slug) => {
    try {
      await getDbConnection();
      const service = await serviceModel.findOne({ slug }).lean();
      if (!service) return null;
      
      return {
        id: service._id.toString(),
        longDescription: service.longDescription || "",
        imageUrl: service.imageUrl || "",
      };
    } catch (error) {
      console.error("Error fetching service:", error);
      return null;
    }
  },
  ['service-detail'],
  {
    revalidate: 3600,
    tags: ['service-detail']
  }
);

const getAllServices = unstable_cache(
  async () => {
    try {
      await getDbConnection();
      const services = await serviceModel.find({}, 'heading slug').lean();
      return services.map(service => ({
        id: service._id.toString(),
        heading: service.heading || "",
        slug: service.slug || "",
      }));
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  },
  ['services-list'],
  {
    revalidate: 3600,
    tags: ['services-data']
  }
);

export default async function ServicePage({ params }) {
  const { slug } = params;
  
  const serviceData = servicesData.find(service => service.slug === slug);
  const dbService = await getServiceBySlug(slug);
  const allServices = await getAllServices();
  
  if (!serviceData) {
    notFound();
  }

  return (
    <div className="pt-20">
      <Breadcrumb/>
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-8">
          <ServicesSidebar services={allServices} />

          <div className="flex-1 min-w-0">
            <h1 className="text-4xl lg:text-5xl font-semibold mb-8">{serviceData.title}</h1>
            
            {dbService?.imageUrl && (
              <div className="mb-8">
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '280px' }}>
                  <Image
                    src={dbService.imageUrl}
                    alt={`${serviceData.title} illustration`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {dbService?.longDescription && (
              <div className="prose prose-lg max-w-none description-text">
                <div dangerouslySetInnerHTML={{ __html: dbService.longDescription }} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <ServiceForm />
          </div>
        </div>
      </div>
    </div>
  );
}
